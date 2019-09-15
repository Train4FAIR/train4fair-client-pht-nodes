var fs = require('fs');

module.exports = function (RED) {

    'use strict';
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
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
                //var buf = new Buffer(filedata, 'base64');
                var buf = new Buffer.from(filedata, 'base64');

                if (config.format === 'utf8') {
                    msg.payload = buf.toString();
                } else {
                    msg.payload = buf;
                }
                //var filedata = config.filedata;

                //var res = request('POST', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/add/artifact/train/'+msg.message.train.internalId, {
                var res = request('POST', 'http://' + repositoryServiceLocator.getEnv().host + ':' + repositoryServiceLocator.getEnv().port + '/RepositoryService/train/add/artifact/train/' + msg.message.train.internalId, {
                    json: artifacts[index],
                });
                var trainResult = JSON.parse(res.getBody('utf8'));
                msg.message.train = trainResult;

                node.send(msg);
            }
        });

    }

    index++;
    RED.nodes.registerType("Artifact", ArtifactNode);
}

//     node.send(msg);
// });
// }
//
// index++;
// RED.nodes.registerType("Resource",ResourceNode);
// }