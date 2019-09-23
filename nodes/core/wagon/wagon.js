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



            //======================================================

            //internalPointer setup
            if(node.wires!='' && node.wires!=null && node.wires!=undefined){
                var wires = JSON.stringify(node.wires);
                wires = wires.replace('[[','');
                wires = wires.replace(']]','');
            }
            wagons[index].internalPointer = wires;
            //======================================================

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
            console.log("=============== wagon setup =================");
            //Wagon setup
            msg.message.train.wagons = wagons[index];


            //======================================================
            //add wagon
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/wagon/add/'+msg.message.train.internalId+'/', {
                json: wagons[index],
            });
            var wagonsResult =  JSON.parse(res.getBody('utf8'));
            if(wagonsResult!=null || wagonsResult!="" || wagonsResult!=undefined){
                msg.message.train.wagons = wagonsResult;
            }

            //======================================================

            //add nodered metadata
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/wagonNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion, {
                json: node,
            });
            //======================================================
            node.parentWireId =  [];
            node.parentWireId.push(msg.trainNode.id);


            msg.wagonNode = node;
            //msg.trainNode = undefined;
            node.send(msg);
        });
    }
    index++;
    RED.nodes.registerType("Wagon",WagonNode);
}