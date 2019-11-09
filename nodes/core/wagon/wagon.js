module.exports = function(RED) {
    console.log("Starting Wagon Node");
    'use strict';
    var trainUtil = require("../lib/util/TrainUtil.js");
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var alert = require('alert-node');
    var index = -1;

    function Wagon4PHTNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var wagons = [];
        wagons[index] = new Object();
        wagons[index].name = config.name;
        wagons[index].internalWagonId = repositoryServiceLocator.getInternalWagonId();
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
            node.parentWireId =  [];
            node.parentWireId.push(msg.trainNode.id);

            var wagons = [];
            wagons[index] = new Object();
            wagons[index].name = config.name;
            wagons[index].internalWagonId = repositoryServiceLocator.getInternalWagonId();
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
            var env = repositoryServiceLocator.getMircroservicesEnvironment();
            var host = env.host;
            var port = env.port;
            //======================================================


            //======================================================
            //console.log("=============== wagon setup =================");
            //Wagon setup
            msg.message.train.wagons = wagons[index];


            //======================================================
            //setup internal variables
            console.log(index+"!!!![ add nodered metadata : parentWireId, internalId and internalPointer ]!!!========");
            //======================================================
            if((node.wires==null || node.wires.length==0)||(((node.wires.length==1) && (node.wires[0]==null ||node.wires[0].length==0)))){
                console.log("5: Fail to save the Wagon: "+msg.message.train.wagons.name+". Please verify your Workflow, at least one Resource node should be associated to the Wagon node");
            }


            msg.message.train.wagons.internalPointer = trainUtil.convertWiresArrayToString(node.wires);
            node.parentWireId =  [];
            node.parentWireId.push(msg.trainNode.id);
            node.internalId= msg.message.train.internalId;
            if((wagons[index].internalPointer==null || wagons[index].internalPointer=="" || wagons[index].internalPointer==undefined)||
                (node.parentWireId==null || node.parentWireId.length==0 || node.parentWireId==undefined) ||
                (node.internalId==null || node.internalId=="" || node.internalId==undefined)){

                console.log("6: Fail to save the Wagon: "+msg.message.train.wagons.name+". Please verify your Workflow: ");

            }
            //======================================================
            //add wagon
            msg.message.train.wagons.internalId = msg.message.train.internalId;
            msg.message.train.wagons.internalWagonId = wagons[index].internalWagonId;
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/wagon/add/'+msg.message.train.internalId+'/', {
                json: wagons[index],
            });
            var wagonsResult =  JSON.parse(res.getBody('utf8'));
            if(wagonsResult!=null || wagonsResult!="" || wagonsResult!=undefined){
                msg.message.train.wagons = wagonsResult;
            }else{
                console.log("7: Fail to save the Wagon: "+msg.message.train.wagons.name+". Please verify your Workflow: ");
            }

            node.correlationObjectId = msg.message.train.wagons.correlationObjectId;

            if((node.correlationObjectId==null || node.correlationObjectId=="" || node.correlationObjectId==undefined)){
                console.log("8: Fail to save the Wagon: "+msg.message.train.wagons.name+". Please verify your Workflow: ");
            }

            node.internalId = msg.message.train.internalId;
            node.internalWagonId = wagons[index].internalWagonId;
            node.internalPointer = msg.message.train.wagons.internalPointer;

            //console.log('wagon node => node.internalWagonId: '+node.internalWagonId)
            //console.log('wagon node => msg.message.train.wagons.internalId: '+msg.message.train.wagons.internalWagonId)
            //======================================================
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/wagonNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion, {
                json: node,
            });
            //======================================================


            //msg.wagonNode.internalWagonId

            msg.wagonNode = node;
            node.send(msg);
        });
    }
    index++;
    RED.nodes.registerType("Wagon PHT",Wagon4PHTNode);
}