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
            // console.log(index+") =============== trainNode at wagon =================");
            // console.log("!!!![ 1) msg.trainNode ]!!!========>>> "+index+" ==>"+JSON.stringify(msg.trainNode));
            // console.log("!!!![ 1) msg.trainNode.id ]!!!========>>> "+index+" ==>"+JSON.stringify(msg.trainNode.id));

            node.parentWireId =  [];
            node.parentWireId.push(msg.trainNode.id);
            // console.log(index+") =============== node.parentWireId: wagon ================="+JSON.stringify(node.parentWireId));
            // console.log(index+") =============== wagon Node =================");

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
                wagons[index].internalPointer = wiresStr;
                //console.log("!!!![ 2) wagon:wires ]!!!========>>> "+JSON.stringify(wiresStr));
            }
            //console.log("!!!![ 3) wagons[index].internalPointer ]!!!========>>> "+JSON.stringify(node.wires));


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
            //console.log("=============== wagon setup =================");
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
            console.log("!!!![ before call add Wagon: trainNode ]!!!========");
            node.parentWireId =  [];
            node.parentWireId.push(msg.trainNode.id);
            console.log("!!!![ before addWagonNode Call: msg.trainNode.id ]!!!========>>> "+JSON.stringify(msg.trainNode.id));
            console.log("!!!![ before addWagonNode Call: node.parentWireId ]!!!========>>> "+JSON.stringify(node.parentWireId));

            //add nodered metadata
            node.correlationObjectId = msg.message.train.wagons.correlationObjectId;
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/wagonNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion, {
                json: node,
            });
            //======================================================




            msg.wagonNode = node;
            console.log("!!!![ brefore send wagon msg: msg.wagonNode ]!!!========>>> "+JSON.stringify(msg.wagonNode));
            node.send(msg);
        });
    }
    index++;
    RED.nodes.registerType("Wagon",WagonNode);
}