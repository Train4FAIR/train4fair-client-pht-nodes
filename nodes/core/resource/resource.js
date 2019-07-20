module.exports = function(RED) {

    'use strict';
    var message = require('../lib/Message.js');

    function ResourceNode(config) {
        console.log("Starting Resource Node");
        RED.nodes.createNode(this,config);
        var node = this;

        var resources = new Object();
        resources.resource = [];
        resources.resource[0] = new Object();
        resources.resource[0].name = config.name;
        resources.resource[0].description = config.description;
        //OCI
        resources.resource[0].oci = new Object();
        resources.resource[0].oci.created = config.created;
        resources.resource[0].oci.author = config.author;
        resources.resource[0].oci.architecture = config.architecture;
        resources.resource[0].oci.os = config.os;
        resources.resource[0].oci.config  = new Object();
        resources.resource[0].oci.user = config.user;
        resources.resource[0].oci.exposedPorts = [];
        resources.resource[0].oci.exposedPorts[0]  = new Object();
        resources.resource[0].oci.port = config.port;
        resources.resource[0].oci.protocol = config.protocol;
        resources.resource[0].oci.env = [];
        resources.resource[0].oci.env[0]   =  new Object();;
        resources.resource[0].oci.entrypoint = [];
        resources.resource[0].oci.entrypoint[0]  =  new Object();
        resources.resource[0].oci.cmd = [];
        resources.resource[0].oci.cmd[0] =  new Object();
        resources.resource[0].oci.volumes = [];
        resources.resource[0].oci.volumes[0] =  new Object();
        resources.resource[0].oci.env = config.env;
        resources.resource[0].oci.entrypoint = config.entrypoint;
        resources.resource[0].oci.cmd = config.cmd;
        resources.resource[0].oci.volumes = config.volumes;

        this.on('input', function(msg) {


            msg.message.train.wagons[0].resources = resources;

            var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/resources/train/'+msg.message.train.internalId, {
                json: resources,
            });
            var resourcesResult =  JSON.parse(res.getBody('utf8'));
            msg.message.train.wagons.resources = resourcesResult;

            node.send(msg);
        });
    }
    RED.nodes.registerType("Resource",ResourceNode);
}