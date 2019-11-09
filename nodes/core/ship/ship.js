module.exports = function(RED) {
    'use strict';
    var trainUtil = require("../lib/util/TrainUtil.js");
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var alert = require('alert-node');
    var index = -1;

    var artifacts = [];
    console.log("Starting Execute Node");
    function Train4FAIRTAILNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;


        this.on('input', function(msg) {


            //console.log("!!!!=== msg state at Execute method !!!===>>> "+JSON.stringify(msg));


            //======================================================
            var env = repositoryServiceLocator.getMircroservicesEnvironment();
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



            console.log("===== [Train4FAIRTAILNode] before publish to datacite|msg.message.train.name: "+msg.message.train.name)
            if((msg.message.train.wagons==null || msg.message.train.wagons.length==0) && (msg.message.train.aggregationResult==null || msg.message.train.aggregationResult=="")){
                //======================================================
                // get and publish the DOI
                console.log(" ========== Get and publish the DOI =============");


                //======================================================
                var env = repositoryServiceLocator.getMircroservicesEnvironment();
                var host = env.host;
                var port = env.port;

                var landingpage = "http://"+repositoryServiceLocator.getDAVPageEnvironment().host+":"+repositoryServiceLocator.getDAVPageEnvironment().port+"/"+msg.message.train.internalId+"/index.html";
                //======================================================
                //get datacite identifier
                var datacite_url = process.env.datacite_url;
                var doi_prefix = process.env.doi_prefix;
                var doi_auth_token = process.env.doi_auth_token;
                var doi_con_contenttype = process.env.doi_con_contenttype;
                var prefix = doi_prefix;
                var creatorContent = msg.message.train.datacite.creators.creator[0].creatorName.content;
                var titleContent = msg.message.train.datacite.titles.title[0].content;
                var publisher = msg.message.train.datacite.publisher;
                var publicationYear = msg.message.train.datacite.publicationYear;

                var options = {
                    headers: {
                        'content-type': doi_con_contenttype,
                        authorization: doi_auth_token
                    },
                    body: trainUtil.getBodyToCreateAnewFindableDOI(creatorContent
                        ,titleContent,publisher,publicationYear,landingpage)
                };

                var res = request('POST',datacite_url,options);
                var draftDoi =  JSON.parse(res.getBody('utf8'));
                if(draftDoi==null || draftDoi==="" || draftDoi==undefined){
                    console.log("2: Fail to obtain the datacite Identifier. Please contact the Train Modelling Tool Support!");
                }


                var suffix = draftDoi.data.attributes.suffix;
                var doiHandlerWebPage = "https://api.test.datacite.org/dois/"+prefix+"/"+suffix;
                var identifier = prefix+"/"+suffix;
                alert("A new Identifier was generated: "+identifier+".\nFor more details follow the link below:\n"+landingpage);
                console.log("The Identifier URL at datacite is: "+doiHandlerWebPage);

                //TODO: Back to this point to change alerts for popups
                //trainUtil.showNewIdentifierDialog(identifier,doiHandlerWebPage);
                //======================================================

                // set Identifier
                msg.message.train.datacite.identifier.identifierType = "DOI";
                msg.message.train.datacite.identifier.content = identifier;
                msg.message.train.datacite.identifier.providerURL = doiHandlerWebPage;
                msg.message.train.datacite.identifier.prefix = prefix;
                msg.message.train.datacite.identifier.suffix = suffix;
                msg.message.train.datacite.identifier.metadataUrl = "http://"+repositoryServiceLocator.getMircroservicesEnvironment().host+":"+repositoryServiceLocator.getMircroservicesEnvironment().port+"/RepositoryService/train/"+msg.message.train.internalId;
                msg.message.train.datacite.identifier.resourcesUrl= "http://"+repositoryServiceLocator.getDAVMetadataEnvironment().host+":"+repositoryServiceLocator.getDAVMetadataEnvironment().port+"/"+msg.message.train.internalId+"/";
                msg.message.train.restApiDocUrl =  "http://"+repositoryServiceLocator.getMircroservicesEnvironment().host+":"+repositoryServiceLocator.getMircroservicesEnvironment().port+"/RepositoryService/swagger-ui.html";


                //console.log("body =====> "+trainUtil.getBodyToChangeDataciteStatus());
                //======================================================
                //TODO uncoment
                // var options = {
                //     headers: {
                //         'content-type': 'application/vnd.api+json',
                //         authorization: 'Basic REVWLkZJVDpOYWhhbkAxMjM='
                //     },
                //     body: trainUtil.getBodyToChangeDataciteStatus(),
                // };
                // var resDoi = request('POST','https://api.test.datacite.org/dois',options);
                // var publishedDoi =  JSON.parse(resDoi.getBody('utf8'));
                // console.log("########====== publishedDoi ==>> "+JSON.stringify(publishedDoi));


                //======================================================
                console.log("doi Handler Page: "+doiHandlerWebPage);
                msg.doi = draftDoi;
                //======================================================

                //======================================================
                console.log(" ========== Set Result =============");
                //set Result
                var result = Math.floor((Math.random() * 100000) + 10000);
                msg.message.train.aggregationResult = result+" records was found after the aggregation.";
                //======================================================

                //======================================================
                //add train
                var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/train/add/', {
                    json: msg.message.train,
                });
                var trainResult =  JSON.parse(res.getBody('utf8'));
                if(trainResult!=null || trainResult!="" || trainResult!=undefined){
                    msg.message.train = trainResult;
                }else{
                    console.log("3: Fail to save the Train: "+msg.message.train.name+". Please verify your Workflow: ");
                }
                //======================================================
                console.log("======================================================")
                console.log("===== [Train4FAIRTAILNode] after publish to datacite|msg.message.train.name: "+msg.message.train.name)
            }
            //======================================================


            //======================================================
            //Wrap Objects
            console.log(" ========== wrapper objects =============");
            console.log("===== [Train4FAIRTAILNode] before wrapper|msg.message.train.name: "+msg.message.train.name)
            //console.log(":::::::::::::===> msg.message.train: "+JSON.stringify(msg.message.train));
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/train/wrapper/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion+'/', {
                json: msg.message.train,
            });
            var trainWrapperResult =  JSON.parse(res.getBody('utf8'));
            msg.message.train = trainWrapperResult;
            //console.log(":::::::::::::===> trainWrapperResult"+trainWrapperResult)
            console.log("===== [Train4FAIRTAILNode] after wrapper|msg.message.train.name: "+msg.message.train.name)
            //======================================================




            //======================================================
            //Add Artifacts To webdav

            console.log(" ========== Artifacts To webdav =============");
            console.log("===== [Train4FAIRTAILNode] before send to webdav|msg.message.train.name: "+msg.message.train.name)
            //console.log('msg.wagonNode.internalWagonId: '+msg.wagonNode.internalWagonId)
            //console.log('msg.message.train.wagons: '+JSON.stringify(msg.message.train.wagons))
            //console.log("input ====> "+JSON.stringify(msg.message.train));
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/train/webdav/'+msg.message.train.internalId+'/'+msg.wagonNode.internalWagonId+'/', {
                json: msg.message.train,
            });
            var webdavResult =  JSON.parse(res.getBody('utf8'));
            var booleanWebdavResult = webdavResult;
            console.log("===== [Train4FAIRTAILNode] after send to webdav|msg.message.train.name: "+msg.message.train.name)
            //======================================================


            //======================================================
            //Wrap Objects
            console.log(" ========== query wrapped train objects =============");
            //console.log(":::::::::::::===> msg.message.train: "+JSON.stringify(msg.message.train));
            var res = request('GET', 'http://'+host+':'+port+'/RepositoryService/train/'+msg.message.train.internalId+'/');
            var freshTrain =  JSON.parse(res.getBody('utf8'));
            msg.message.train = freshTrain;
            //console.log(":::::::::::::===> trainWrapperResult"+trainWrapperResult)
            //======================================================


            console.log("===== [Train4FAIRTAILNode] final train obj version|msg.message.train.name: "+msg.message.train.name)

            node.send(msg);
        });


    }
    index++;
    RED.nodes.registerType("Train Tail",Train4FAIRTAILNode);




}