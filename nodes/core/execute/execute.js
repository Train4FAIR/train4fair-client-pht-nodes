module.exports = function(RED) {
    'use strict';
    var request = require('sync-request');
    var index = -1;

    var artifacts = [];
    console.log("Starting Execute Node");
    function ExecuteNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;


        this.on('input', function(msg) {

            //create the clients, call the service and show the result. Finally add all to the result metadata Tracker.
            console.log("1: land page customization as index.html of the webdav folder");
            console.log("2: Send Files to webdav");
            //============================================================================================================

            //###################################################
            // var res = request('POST', 'http://0.0.0.0:80/RepositoryService/train/landpage/customization/webdav/'+msg.message.train.internalId);
            // var trainResult =  JSON.parse(res.getBody('utf8'));
            // console.log("### result ==========>>> "+JSON.stringify(trainResult))
            // msg.message.train = trainResult;
            //###################################################

            //console.log(" msg: "+JSON.stringify( msg));
            //console.log(" msg.message: "+JSON.stringify( msg.message));
            //console.log(" msg.message.train: "+JSON.stringify( msg.message.train));
            console.log(" msg.message.train.wagons: "+JSON.stringify( msg.message.train.wagons));

            var res = request('POST', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/add/artifacts/webdav/'+msg.message.train.internalId);
            var trainResult =  JSON.parse(res.getBody('utf8'));
            console.log("### result ==========>>> "+JSON.stringify(trainResult))
            msg.message.train = trainResult;
            //============================================================================================================
            // console.log("2: Customize and the land page and upload as the index page of the other files/artifacts.");
            // console.log("3: Upload the datacite metadata, including the pointer for the Train Land page.");
            // //The lande page should contains instruction to access the Train metadata in our repository through the Repository API.
            // console.log("4: Improve the Rest API. A token based authentication should be added");
            // console.log("5: Try to integrate the oauth default from node-red.");
            // console.log("6: Return the result.");

            node.send(msg);
        });


    }
    index++;
    RED.nodes.registerType("Execute",ExecuteNode);




}