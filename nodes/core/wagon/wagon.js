module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';

    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
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

        //UC03 - init
        wagons[index].checkMetadataAccess = config.checkMetadataAccess;
        wagons[index].checkGeneralRegistryPolicy = config.checkGeneralRegistryPolicy;
        wagons[index].expectedTimePointsForAllpatientsFrom = config.expectedTimePointsForAllpatientsFrom;
        wagons[index].expectedTimePointsForAllpatientsTo = config.expectedTimePointsForAllpatientsTo;
        wagons[index].cutValue = config.cutValue;
        wagons[index].shouldBeAggregated = config.shouldBeAggregated;
        wagons[index].accessConstraints = new Object();
        wagons[index].accessConstraints.patientRegistry = config.patientRegistry;
        wagons[index].accessConstraints.severity = config.severity;
        wagons[index].accessConstraints.rareDisease = config.rareDisease;
        wagons[index].accessConstraints.treatmentCenter = config.treatmentCenter;
        wagons[index].accessConstraints.restrictionsOnPersonalData = config.restrictionsOnPersonalData;
        //UC03 - end




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
            //UC03 - init
            wagons[index].checkMetadataAccess = config.checkMetadataAccess;
            wagons[index].checkGeneralRegistryPolicy = config.checkGeneralRegistryPolicy;
            wagons[index].expectedTimePointsForAllpatientsFrom = config.expectedTimePointsForAllpatientsFrom;
            wagons[index].expectedTimePointsForAllpatientsTo = config.expectedTimePointsForAllpatientsTo;
            wagons[index].cutValue = config.cutValue;
            wagons[index].shouldBeAggregated = config.shouldBeAggregated;
            wagons[index].accessConstraints = new Object();
            wagons[index].accessConstraints.patientRegistry = config.patientRegistry;
            wagons[index].accessConstraints.severity = config.severity;
            wagons[index].accessConstraints.rareDisease = config.rareDisease;
            wagons[index].accessConstraints.treatmentCenter = config.treatmentCenter;
            wagons[index].accessConstraints.restrictionsOnPersonalData = config.restrictionsOnPersonalData;
            //UC03 - end
            //======================================================

            msg.message.train.wagons = wagons;
            //console.log("Wagon.js Second Call: " +JSON.stringify(wagons[index]));
            //======================================================
            //var res = request('POST', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/add/wagon/train/'+msg.message.train.internalId, {
            var res = request('POST', 'http://'+repositoryServiceLocator.getEnv().host+':'+repositoryServiceLocator.getEnv().port+'/RepositoryService/train/add/wagon/train/'+msg.message.train.internalId, {
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