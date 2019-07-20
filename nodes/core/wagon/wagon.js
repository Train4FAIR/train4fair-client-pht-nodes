module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';

    var message = require('../lib/Message.js');
    var request = require('sync-request');

    function WagonNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var wagons = new Object();
        wagons.name = config.name;
        wagons.description = config.description;
        wagons.stationProfiles = new Object();
        wagons.stationProfiles.stationProfile = [];
        wagons.stationProfiles.stationProfile[0] = new Object();
        wagons.stationProfiles.stationProfile[0]  = config.stationProfile1;
        wagons.stationProfiles.stationProfile[1] = new Object();
        wagons.stationProfiles.stationProfile[1]  = config.stationProfile2;
        wagons.stationProfiles.stationProfile[2] = new Object();
        wagons.stationProfiles.stationProfile[2] = config.stationProfile3;


        this.on('input', function(msg) {


            var res = request('POST', 'http://0.0.0.0/RepositoryService/train/add/wagon/train/'+msg.message.train.internalId, {
                json: wagons,
            });
            var wagonsResult =  JSON.parse(res.getBody('utf8'));
            msg.message.train.wagons = wagonsResult;

            node.send(msg);
        });
    }

    RED.nodes.registerType("Wagon",WagonNode);
}