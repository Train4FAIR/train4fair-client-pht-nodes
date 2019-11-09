module.exports = function(RED) {

    var trainUtil = require("../lib/util/TrainUtil.js");
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var alert = require('alert-node');
    //var testutils = require('testutils.js');

    var index = 0;

    function Train4FAIRTesNode(config) {
        console.log("Test Node loading...");
        RED.nodes.createNode(this,config);
        var node = this;

        // Train Core
        message = new Object();
        message.train = new Object();
        console.log("===== Before input.config.name: "+config.name)
        message.train.name = config.name;
        console.log("===== Before input.config.name: "+message.train.name)
        message.train.description = config.description;
        message.train.sourceRepository = config.sourceRepository;
        message.train.userToken = config.userToken;


        this.on('input', function(msg) {
            console.log("Test Node loaded!");
            message = new Object();
            message.train = new Object();
            console.log("===== After input.config.name: "+config.name)
            message.train.name = config.name;
            console.log("===== After input.config.name: "+message.train.name)
            message.train.description = config.description;
            message.train.sourceRepository = config.sourceRepository;
            message.train.userToken = config.userToken;

            msg.message = message;
            //msg.payload = message;

            console.log("===== After input|msg.message.train.name: "+msg.message.train.name)
            //testutils.open();
            //console.log("===== After input|msg.payload.train.name: "+msg.message.payload.name)
            node.send(msg);

        });



    }
    RED.nodes.registerType("Test Node",Train4FAIRTesNode);
}