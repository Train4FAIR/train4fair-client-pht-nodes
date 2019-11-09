module.exports = function(RED) {

    'use strict';
    var message = require('../lib/model/Message.js');
    var trainUtil = require("../lib/util/TrainUtil.js");
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var alert = require('alert-node');
    var index = -1;

    function Resource4PHTNode(config) {

        console.log("Starting Resource Node");
        RED.nodes.createNode(this,config);
        var node = this;

        var resources = [];
        resources[index] = new Object();
        resources[index].name = config.name;
        resources[index].description = config.description;
        //OCI
        resources[index].oci = new Object();
        resources[index].oci.created = config.created;
        resources[index].oci.author = config.author;
        resources[index].oci.architecture = config.architecture;
        resources[index].oci.os = config.os;
        resources[index].oci.config  = new Object();
        resources[index].oci.config.user = config.user;
        resources[index].oci.config.exposedPorts = [];
        resources[index].oci.config.exposedPorts[index] = new Object();
        resources[index].oci.config.exposedPorts[index].port = config.port;
        resources[index].oci.config.exposedPorts[index].protocol = config.protocol;
        resources[index].oci.config.cmd = [];
        resources[index].oci.config.cmd[index] = new Object();
        resources[index].oci.config.cmd[index] = config.cmd;
        resources[index].oci.config.volumes = [];
        resources[index].oci.config.volumes[index]  = new Object();
        resources[index].oci.config.volumes[index]  = config.volumes;

        resources[index].oci.config.env = config.env;
        resources[index].oci.config.entrypoint = config.entrypoint;

        this.on('input', function(msg) {

            //======================================================
            var resources = [];
            resources[index] = new Object();
            resources[index].name = config.name;
            resources[index].description = config.description;
            //OCI
            resources[index].oci = new Object();
            resources[index].oci.created = config.created;
            resources[index].oci.author = config.author;
            resources[index].oci.architecture = config.architecture;
            resources[index].oci.os = config.os;
            resources[index].oci.config  = new Object();
            resources[index].oci.config.user = config.user;
            resources[index].oci.config.exposedPorts = [];
            resources[index].oci.config.exposedPorts[index] = new Object();
            resources[index].oci.config.exposedPorts[index].port = config.port;
            resources[index].oci.config.exposedPorts[index].protocol = config.protocol;
            resources[index].oci.config.cmd = [];
            resources[index].oci.config.cmd[index] = new Object();
            resources[index].oci.config.cmd[index] = config.cmd;
            resources[index].oci.config.volumes = [];
            resources[index].oci.config.volumes[index]  = new Object();
            resources[index].oci.config.volumes[index]  = config.volumes;

            resources[index].oci.config.env = [];
            resources[index].oci.config.env.push(config.env);

            resources[index].oci.config.entrypoint= [];
            resources[index].oci.config.entrypoint.push(config.entrypoint);


            //======================================================

            //======================================================
            console.log("=============== resources setup =================");
            //resources setup
            msg.message.train.resources = resources[index];

            //======================================================
            //setup internal variables
            console.log("!!!![ add environment metadata : parentWireId, internalId and internalPointer ]!!!========");

            if(node.wires==null || node.wires.length==0 || (node.wires.length==1 && (node.wires[0]==null ||node.wires[0].length==0))){
                console.log("13: Fail to save the Resource: "+resources[index].name+". Please verify your Workflow, at least one Artifact node should be associated to the Resource node");
            }

            node.internalId= msg.message.train.internalId;
            msg.message.train.resources.internalPointer = trainUtil.convertWiresArrayToString(node.wires);
            node.parentWireId =  [];
            node.parentWireId.push(msg.wagonNode.id);


            if((msg.message.train.resources.internalPointer==null || msg.message.train.resources.internalPointer=="" || msg.message.train.resources.internalPointer==undefined)||
                (node.parentWireId==null || node.parentWireId.length==0 || node.parentWireId==undefined) ||
                (node.internalId==null || node.internalId=="" || node.internalId==undefined)){
                console.log("14: Fail to save the Resource: "+resources[index].name+". Please verify your Workflow: ");

            }
            //======================================================


            //======================================================
            var env = repositoryServiceLocator.getMircroservicesEnvironment();
            var host = env.host;
            var port = env.port;


            //======================================================




            //======================================================
            //add Resource
            msg.message.train.resources.internalId = msg.message.train.internalId;
            msg.message.train.resources.internalPointer = msg.message.train.resources.internalPointer;
            var res = request('POST','http://'+host+':'+port+'/RepositoryService/resource/add/'+msg.message.train.internalId+'/', {
                json: resources[index],
            });
            var result =  JSON.parse(res.getBody('utf8'));
            if(result!=null || result!="" || result!=undefined){
                msg.message.train.resources = result;
            }else{
                console.log("16: Fail to save the Resource: "+msg.message.train.resources.name+". Please verify your Workflow: ");
            }

            node.correlationObjectId = msg.message.train.resources.correlationObjectId;
            if((node.correlationObjectId==null || node.correlationObjectId=="" || node.correlationObjectId==undefined)){
                console.log("15: Fail to save the Resource: "+msg.message.train.resources.name+". Please verify your Workflow: ");
            }
            //======================================================
            //add nodered metadata
            node.internalId = msg.message.train.internalId;
            node.internalPointer = msg.message.train.internalPointer;
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/resourceNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: node,
            });
            //======================================================


            msg.resourceNode = node;
            node.send(msg);
        });
    }

    index++;
    RED.nodes.registerType("Resource PHT",Resource4PHTNode);
}