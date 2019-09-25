module.exports = function(RED) {

    'use strict';
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var index = -1;

    function ResourceNode(config) {

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

            //internalPointer setup
            // if(node.wires!='' && node.wires!=null && node.wires!=undefined){
            //     var wires = JSON.stringify(node.wires);
            //     wires = wires.replace('[[','');
            //     wires = wires.replace(']]','');
            // }
            // resources[index].internalPointer = wires;
            //======================================================

            //======================================================
            //internalPointer setup
            //console.log("=============== internalPointer setup =================");
            //console.log("!!!![ 1) wagons[index].internalPointer ]!!!========>>> "+JSON.stringify(node.wires));
            //internalPointer setup
            var wiresStr = JSON.stringify(node.wires);
            if(wiresStr!='' && wiresStr!=null && wiresStr!=undefined && wiresStr.includes('[') &&
                wiresStr.includes(']') && wiresStr.includes('"')){
                //console.log("!!!![ 1) wagons[index].internalPointer ]!!!========>>> "+JSON.stringify(wiresStr));
                wiresStr = wiresStr.replace('[[','');
                wiresStr = wiresStr.replace(']]','');
                wiresStr = wiresStr.replace(/"/g, "");
                resources[index].internalPointer = wiresStr;
                //console.log("!!!![ 2) wagon:wires ]!!!========>>> "+JSON.stringify(wiresStr));
            }
            //console.log("!!!![ 3) wagons[index].internalPointer ]!!!========>>> "+JSON.stringify(node.wires));


            //======================================================
            //node id setup
            node.internalId = "";
            node.internalId= msg.message.train.internalId;
            //======================================================

            //======================================================
            var env = repositoryServiceLocator.getMircroservicesTestEnv();
            var host = env.host;
            var port = env.port;


            //======================================================


            //======================================================
            console.log("=============== resources setup =================");
            //resources setup
            msg.message.train.resources = resources[index];

            //======================================================
            //add Resource
            var res = request('POST','http://'+host+':'+port+'/RepositoryService/resource/add/'+msg.message.train.internalId+'/', {
                json: resources[index],
            });
            var result =  JSON.parse(res.getBody('utf8'));
            if(result!=null || result!="" || result!=undefined){
                msg.message.train.resources = result;
            }
            //======================================================
            console.log("!!!![ before call add Resource: trainNode ]!!!========");
            node.parentWireId =  [];
            node.parentWireId.push(msg.wagonNode.id);
            console.log("!!!![ before addResourceNode Call: msg.trainNode.id ]!!!========>>> "+JSON.stringify(msg.wagonNode.id));
            console.log("!!!![ before addResourceNode Call: node.parentWireId ]!!!========>>> "+JSON.stringify(node.parentWireId));

            //add nodered metadata
            node.correlationObjectId = msg.message.train.resources.correlationObjectId;
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/resourceNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: node,
            });
            //======================================================


            msg.resourceNode = node;
            console.log("!!!![ brefore send resource msg: msg.resourceNode ]!!!========>>> "+JSON.stringify(msg.resourceNode));
            node.send(msg);
        });
    }

    index++;
    RED.nodes.registerType("Resource",ResourceNode);
}