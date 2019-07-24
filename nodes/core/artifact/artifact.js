var fs = require('fs');

module.exports = function (RED) {

    'use strict';
    var message = require('../lib/Message.js');
    var request = require('sync-request');
    var index = -1;

    function ArtifactNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var artifacts = [];
        artifacts[index] = new Object();
        artifacts[index].name = config.name;
        artifacts[index].filename = config.filename;
        artifacts[index].format = config.format;
        artifacts[index].filedata = config.filedata;



        this.on('input', function (msg) {
            var counter = config.filedata.indexOf(';base64,');
            if (counter === -1) {
                node.error('File format error', msg);
            } else {
                var filedata = config.filedata.substring(counter + ';base64,'.length);
                var buf = new Buffer(filedata, 'base64');
                if (config.format === 'utf8') {
                    msg.payload = buf.toString();
                } else {
                    msg.payload = buf;
                }

                console.log(" msg.message.train.wagons.resources: "+JSON.stringify( msg.message.train.wagons.resources));

                var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/artifact/train/'+msg.message.train.internalId, {
                    json: artifacts[index],
                });
                var trainResult =  JSON.parse(res.getBody('utf8'));
                console.log("result ==========>>> "+JSON.stringify(trainResult))
                msg.message.train = trainResult;

                node.send(msg);
            }
        });


    }
    index++;
    RED.nodes.registerType("Artifact", ArtifactNode);
};