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


                //======================================================

                //internalPointer setup
                console.log("=============== internalPointer setup =================")
                // if(node.wires!='' && node.wires!=null && node.wires!=undefined){
                //     var wires = JSON.stringify(node.wires);
                //     wires = wires.replace('[[','');
                //     wires = wires.replace(']]','');
                // }
                // artifacts[index].internalPointer = wires;
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
                    artifacts[index].internalPointer = wiresStr;
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
                //resources setup
                console.log("=============== artifacts setup =================")
                msg.message.train.artifacts = artifacts[index];

                //======================================================
                //add Artifact
                var res = request('POST', 'http://' + host + ':' + port + '/RepositoryService/artifact/add/' + msg.message.train.internalId+'/', {
                    json: artifacts[index],
                });
                var result =  JSON.parse(res.getBody('utf8'));
                if(result!=null || result!="" || result!=undefined){
                    msg.message.train.artifacts = result;
                }

                //======================================================
                //add nodered metadata
                //console.log("!!!![ 1) msg.message.train.resources ]!!!========>>> "+index+" ==>"+JSON.stringify(msg.message.train.resources));
                console.log("!!!![ 1) msg.message.train.artifacts.correlationObjectId) ]!!!========>>> "+index+" ==>"+JSON.stringify(msg.message.train.artifacts.correlationObjectId));
                node.correlationObjectId = artifacts[index].correlationObjectId;

                console.log("!!!![ before call add Wagon: trainNode ]!!!========");
                node.parentWireId =  [];
                node.parentWireId.push(msg.resourceNode.id);
                console.log("!!!![ before addWagonNode Call: msg.resourceNode.id ]!!!========>>> "+JSON.stringify(msg.resourceNode.id));
                console.log("!!!![ before addWagonNode Call: node.parentWireId ]!!!========>>> "+JSON.stringify(node.parentWireId));

                node.correlationObjectId = msg.message.train.artifacts.correlationObjectId;
                console.log("!!!![ before addWagonNode Call: msg.message.train.artifacts.correlationObjectId ]!!!========>>> "+JSON.stringify(msg.message.train.artifacts.correlationObjectId));
                console.log("!!!![ before addWagonNode Call: node.correlationObjectId ]!!!========>>> "+JSON.stringify(node.correlationObjectId));
                var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/artifactNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                    json: node,
                });
                //======================================================



                //msg.resourceNode = undefined;
                node.send(msg);
            }
        });

    }

    index++;
    RED.nodes.registerType("Artifact", ArtifactNode);
}
