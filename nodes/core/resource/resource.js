module.exports = function(RED) {

    'use strict';
    var message = require('../lib/Message.js');
    var request = require('sync-request');
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
            var res = request('POST', 'http://menzel.informatik.rwth-aachen.de/RepositoryService/train/add/resource/train/'+msg.message.train.internalId, {
                json: resources[index],
            });
            var result =  JSON.parse(res.getBody('utf8'));
            msg.message.train.wagons.resources = result;
            //======================================================

            //======================================================
            var res = request('GET', 'http://menzel.informatik.rwth-aachen.de/RepositoryService/train/all/'+msg.message.train.internalId);
            var train =  JSON.parse(res.getBody('utf8'));
            msg.message.train = train;
            //======================================================

            node.send(msg);
        });
    }

    index++;
    RED.nodes.registerType("Resource",ResourceNode);
}