var fs = require('fs');

module.exports = function (RED) {

    'use strict';
    var message = require('../lib/Message.js');
    var request = require('sync-request');

    function ArtifactNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var artifacts = [];
        var artifact = new Object();
        artifact.name = config.name;
        artifact.filename = config.filename;
        artifact.format = config.format;
        artifact.filedata = config.filedata;



        this.on('input', function (msg) {
            var index = config.filedata.indexOf(';base64,');
            if (index === -1) {
                node.error('File format error', msg);
            } else {
                var filedata = config.filedata.substring(index + ';base64,'.length);
                var buf = new Buffer(filedata, 'base64');
                if (config.format === 'utf8') {
                    msg.payload = buf.toString();
                } else {
                    msg.payload = buf;
                }


                msg.message.train.wagons.resources.artifact = artifact;

                var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/artifact/train/'+msg.message.train.internalId, {
                    json: artifact,
                });
                var artifactResult =  JSON.parse(res.getBody('utf8'));
                msg.message.train.wagons.resources.artifact = artifactResult;


                node.send(msg);
            }
        });


    }
    RED.nodes.registerType("Artifact", ArtifactNode);
};