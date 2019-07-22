module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';

    var message = require('../lib/Message.js');
    var request = require('sync-request');
    var index = -1;

    function WagonNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var wagons = [];
        wagons[index] = new Object();
        wagons[index].name = config.name;
        wagons[index].description = config.description;
        wagons[index].stationProfiles = new Object();
        wagons[index].stationProfiles.stationProfile = [];
        wagons[index].stationProfiles.stationProfile[0] = new Object();
        wagons[index].stationProfiles.stationProfile[0]  = config.stationProfile1;
        wagons[index].stationProfiles.stationProfile[1] = new Object();
        wagons[index].stationProfiles.stationProfile[1]  = config.stationProfile2;
        wagons[index].stationProfiles.stationProfile[2] = new Object();
        wagons[index].stationProfiles.stationProfile[2] = config.stationProfile3;



        this.on('input', function(msg) {


            //======================================================
            var wagons = [];
            wagons[index] = new Object();
            wagons[index].name = config.name;
            wagons[index].description = config.description;
            wagons[index].stationProfiles = new Object();
            wagons[index].stationProfiles.stationProfile = [];
            wagons[index].stationProfiles.stationProfile[0] = new Object();
            wagons[index].stationProfiles.stationProfile[0]  = config.stationProfile1;
            wagons[index].stationProfiles.stationProfile[1] = new Object();
            wagons[index].stationProfiles.stationProfile[1]  = config.stationProfile2;
            wagons[index].stationProfiles.stationProfile[2] = new Object();
            wagons[index].stationProfiles.stationProfile[2] = config.stationProfile3;
            //======================================================

            msg.message.train.wagons = wagons;

            //======================================================
            var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/wagon/train/'+msg.message.train.internalId, {
                json: wagons[index],
            });
            var wagonsResult =  JSON.parse(res.getBody('utf8'));
            msg.message.train.wagons = wagonsResult;



            node.send(msg);
        });
    }
    index++;
    RED.nodes.registerType("Wagon",WagonNode);
}