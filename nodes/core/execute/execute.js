module.exports = function(RED) {
    'use strict';
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var index = -1;

    var artifacts = [];
    console.log("Starting Execute Node");
    function ExecuteNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;


        this.on('input', function(msg) {




            //======================================================
            var env = repositoryServiceLocator.getMircroservicesTestEnv();
            var host = env.host;
            var port = env.port;
            //======================================================




            //======================================================
            //Retrieve Train
            console.log(" ========== Retrieve Train =============");
            var res = request('GET', 'http://'+host+':'+port+'/RepositoryService/train/'+msg.message.train.internalId);
            var trainResult =  JSON.parse(res.getBody('utf8'));
            msg.message.train = trainResult;
            //console.log("trainResult  ===> "+ trainResult);
            //======================================================
            //======================================================
            //Add Artifacts To webdav

            console.log(" ========== Artifacts To webdav =============");
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/train/webdav/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: msg.message.train,
            });
            var webdavResult =  JSON.parse(res.getBody('utf8'));
            var booleanWebdavResult = webdavResult;
            //======================================================

            //======================================================
            //Add Landpage

            console.log(" ========== Landpage To webdav =============");
            //console.log(":::::::::::::===> msg.message.train: "+msg.message.train);
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/train/landpage/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: msg.message.train,
            });
            var landpageResult =  JSON.parse(res.getBody('utf8'));
            var booleanResult = landpageResult;
            //console.log(":::::::::::::===> booleanResult: "+booleanResult);
            //======================================================


            //======================================================
            //Wrap Objects
            console.log(" ========== wrapper objects =============");
            console.log(":::::::::::::===> msg.message.train: "+JSON.stringify(msg.message.train));
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/train/wrapper/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: msg.message.train,
            });
            var trainWrapperResult =  JSON.parse(res.getBody('utf8'));
            msg.message.train = trainWrapperResult;
            console.log(":::::::::::::===> trainWrapperResult"+trainWrapperResult)
            //======================================================



            console.log(" ========== END =============");
            //Train UC03 - Example
            msg.message.train.isAccessConstraintsOk = true;
            msg.message.train.hasGeneralRegistryPolicy = false;
            msg.message.train.hasEnoughPatientOcurrences = true;
            msg.message.train.aggregationResult = "120.000 Patients was found!";
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