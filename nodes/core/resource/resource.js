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
            if(node.wires!='' && node.wires!=null && node.wires!=undefined){
                var wires = JSON.stringify(node.wires);
                wires = wires.replace('[[','');
                wires = wires.replace(']]','');
            }
            resources[index].internalPointer = wires;
            //======================================================

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
            //add nodered metadata
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/resourceNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: node,
            });
            //======================================================
            node.parentWireId =  [];
            node.parentWireId.push(msg.wagonNode.id);

            msg.resourceNode = node;
            //msg.wagonNode = undefined;
            node.send(msg);
        });
    }

    index++;
    RED.nodes.registerType("Resource",ResourceNode);
}