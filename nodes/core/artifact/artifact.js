var fs = require('fs');

module.exports = function (RED) {

    'use strict';

    var trainUtil = require("../train/util/TrainUtil.js");
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var alert = require('alert-node');
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


                //======================================================
                //resources setup
                    console.log("=============== artifacts setup =================")
                    msg.message.train.artifacts = artifacts[index];
                //======================================================
                //setup internal variables
                console.log("!!!![ add environment metadata : parentWireId, internalId and internalPointer ]!!!========");
                //======================================================
                if(node.wires==null || node.wires.length==0 || (node.wires.length==1 && (node.wires[0]==null ||node.wires[0].length==0))){
                    console.log("9: Fail to save the Artifact: "+msg.message.train.artifacts.name+". Please verify your Workflow, at least one Execute node should be associated to the Artifact node");
                }
                //======================================================
                //node setup
                node.internalId= msg.message.train.internalId;
                msg.message.train.artifacts.internalPointer = trainUtil.convertWiresArrayToString(node.wires);
                node.parentWireId =  [];
                node.parentWireId.push(msg.resourceNode.id);

                if((msg.message.train.artifacts.internalPointer==null || msg.message.train.artifacts.internalPointer=="" || msg.message.train.artifacts.internalPointer==undefined)||
                    (node.parentWireId==null || node.parentWireId.length==0 || node.parentWireId==undefined) ||
                    (node.internalId==null || node.internalId=="" || node.internalId==undefined)){

                    console.log("================================================================================");
                    console.log("10: Fail to save the Artifact: "+artifacts[index].name+". Please verify your Workflow: ");

                }
                //======================================================


                //======================================================
                var env = repositoryServiceLocator.getMircroservicesTestEnv();
                var host = env.host;
                var port = env.port;
                //======================================================

                //======================================================
                //add Artifact
                msg.message.train.artifacts.internalId = msg.message.train.internalId;
                msg.message.train.artifacts.internalPointer = msg.message.train.artifacts.internalPointer;
                var res = request('POST', 'http://' + host + ':' + port + '/RepositoryService/artifact/add/' + msg.message.train.internalId+'/', {
                    json: artifacts[index],
                });
                var result =  JSON.parse(res.getBody('utf8'));
                if(result!=null || result!="" || result!=undefined){
                    msg.message.train.artifacts = result;
                }else{
                    console.log("11: Fail to save the Artifact: "+msg.message.train.artifacts.name+". Please verify your Workflow: ");
                }

                node.correlationObjectId = msg.message.train.artifacts.correlationObjectId;

                if((node.correlationObjectId==null || node.correlationObjectId=="" || node.correlationObjectId==undefined)){
                    console.log("12: Fail to save the Artifact: "+msg.message.train.artifacts.name+". Please verify your Workflow: ");
                }


                //======================================================
                //add nodered metadata
                node.internalId = msg.message.train.internalId;
                node.internalPointer = msg.message.train.internalPointer;

                var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/artifactNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                    json: node,
                });
                //======================================================


                msg.artifactNode = node;
                node.send(msg);
            }
        });

    }

    index++;
    RED.nodes.registerType("Artifact", ArtifactNode);
}
