module.exports = function(RED) {

    var trainUtil = require("../lib/util/TrainUtil.js");
    var message = require('../lib/model/Message.js');
    var request = require('sync-request');
    var repositoryServiceLocator = require('../lib/util/RepositoryService.js');
    var alert = require('alert-node');

    var index = 0;

    function Train4FAIRHEADNode(config) {
        console.log("Starting Train Node!!!...");
        RED.nodes.createNode(this,config);
        var node = this;

        // Train Core
        message = new Object();
        message.train = new Object();
        message.train = new Object();
        console.log("===== [Train4FAIRHEADNode] before input|config.name: "+config.name)
        message.train.name = config.name;
        console.log("===== [Train4FAIRHEADNode] before input|message.train.name: "+message.train.name)
        message.train.description = config.description;
        message.train.sourceRepository = config.sourceRepository;
        message.train.userToken = config.userToken;
        message.train.internalId = repositoryServiceLocator.getInternalTrainId();
        message.train.internalTrainId = repositoryServiceLocator.getInternalTrainId();
        message.train.internalVersion = repositoryServiceLocator.getInternalVersion();
        message.train.internalPointer = "";

        //Train DataCite Core
        message.train.datacite = new Object();
        message.train.datacite.language = config.language;
        message.train.datacite.version = config.version;
        message.train.datacite.publicationYear = config.publicationYear;
        message.train.datacite.publisher = config.publisher;


        //Train DataCite - Identifier
        message.train.datacite.identifier = new Object();
        message.train.datacite.identifier.identifierType = config.identifierType;
        message.train.datacite.identifier.content = config.identifierContent;

        //Train DataCite - Creators
        message.train.datacite.creators = new Object();
        message.train.datacite.creators.creator = [];
        message.train.datacite.creators.creator[index]= new Object();
        message.train.datacite.creators.creator[index].affiliation = config.creatorAffiliation;
        message.train.datacite.creators.creator[index].givenName = config.creatorGivenName;
        message.train.datacite.creators.creator[index].familyName = config.creatorFamilyName;
        message.train.datacite.creators.creator[index].creatorName = new Object();
        message.train.datacite.creators.creator[index].creatorName.nameType = config.nameType;
        message.train.datacite.creators.creator[index].creatorName.content = config.creatorContent;
        message.train.datacite.creators.creator[index].nameIdentifier = new Object();
        message.train.datacite.creators.creator[index].nameIdentifier.nameIdentifierScheme = config.creatorNameIdentifierScheme;
        message.train.datacite.creators.creator[index].nameIdentifier.schemeURI = config.creatorSchemeURI;
        message.train.datacite.creators.creator[index].nameIdentifier.content = config.nameIdentifierContent;

        //Train DataCite - Subjects
        message.train.datacite.subjects = new Object();
        message.train.datacite.subjects.subject = [];
        message.train.datacite.subjects.subject [index]= new Object();
        message.train.datacite.subjects.subject[index].schemeURI = config.subjectSchemeURI;
        message.train.datacite.subjects.subject[index].content = config.subjectContent;
        message.train.datacite.subjects.subject[index].subjectScheme = config.subjectScheme;

        //Train DataCite - Dates
        message.train.datacite.dates = new Object();
        message.train.datacite.dates.date = [];
        message.train.datacite.dates.date [index] = new Object();
        message.train.datacite.dates.date[index].dateType = config.dateType;
        message.train.datacite.dates.date[index].dateInformation = config.dateInformation;
        message.train.datacite.dates.date[index].content = config.dateContent;

        //Train DataCite - Formats
        message.train.datacite.formats  = new Object();
        message.train.datacite.formats.format = [];
        message.train.datacite.formats.format[index] = new Object();
        message.train.datacite.formats.format[index].content = config.format;

        //Train DataCite - RightsList
        message.train.datacite.rightsList = new Object();
        message.train.datacite.rightsList.rights = [];
        message.train.datacite.rightsList.rights [index]= new Object();
        message.train.datacite.rightsList.rights[index].rightsURI = config.rightsURI;
        message.train.datacite.rightsList.rights[index].content = config.rightsContent;

        //Train DataCite - Titles
        message.train.datacite.titles = new Object();
        message.train.datacite.titles.title = [];
        message.train.datacite.titles.title[index]= new Object();
        message.train.datacite.titles.title[index].content = config.titleContent;
        message.train.datacite.titles.title[index].titleType = config.titleType;

        //Train DataCite - Descriptions
        message.train.datacite.descriptions = new Object();
        message.train.datacite.descriptions.description = [];
        message.train.datacite.descriptions.description [index] = new Object();
        message.train.datacite.descriptions.description[index].descriptionType = config.descriptionType;
        message.train.datacite.descriptions.description[index].content = config.descriptionContent;

        //Train DataCite - Contributors
        message.train.datacite.contributors = new Object();
        message.train.datacite.contributors.contributor = [];
        message.train.datacite.contributors.contributor [index] = new Object();
        message.train.datacite.contributors.contributor[index].affiliation = config.contributorAffiliation;
        message.train.datacite.contributors.contributor[index].givenName = config.contributorGivenName;
        message.train.datacite.contributors.contributor[index].familyName = config.contributorFamilyName;
        message.train.datacite.contributors.contributor[index].contributorType = config.contributorType;
        message.train.datacite.contributors.contributor[index].contributorName = config.contributorName;
        message.train.datacite.contributors.contributor[index].nameIdentifier = new Object();
        message.train.datacite.contributors.contributor[index].nameIdentifier.nameIdentifierScheme = config.contributorNameIdentifierScheme;
        message.train.datacite.contributors.contributor[index].nameIdentifier.schemeURI = config.contributorNameIdentifierSchemeURI;
        message.train.datacite.contributors.contributor[index].nameIdentifier.content = config.contributorNameIdentifierContent;

        //Train DataCite - FundingReferences
        message.train.datacite.fundingReferences = new Object();
        message.train.datacite.fundingReferences.fundingReference = [];
        message.train.datacite.fundingReferences.fundingReference [index] = new Object();
        message.train.datacite.fundingReferences.fundingReference[index].funderName = config.funderName;
        message.train.datacite.fundingReferences.fundingReference[index].awardNumber = config.awardNumber;
        message.train.datacite.fundingReferences.fundingReference[index].awardTitle = config.awardTitle;
        message.train.datacite.fundingReferences.fundingReference[index].funderIdentifier = new Object();
        message.train.datacite.fundingReferences.fundingReference[index].funderIdentifier.funderIdentifierType = config.funderIdentifierType;
        message.train.datacite.fundingReferences.fundingReference[index].funderIdentifier.content = config.fundingReferenceContent;

        //Train DataCite - ResourceType
        message.train.datacite.resourceType = new Object();
        message.train.datacite.resourceType.resourceTypeGeneral = config.resourceTypeGeneral;
        message.train.datacite.resourceType.content = config.resourceTypeContent;

        //Train UC03 - Example
        message.train.isAccessConstraintsOk = config.resourceTypeGeneral;
        message.train.hasGeneralRegistryPolicy = config.hasGeneralRegistryPolicy;
        message.train.hasEnoughPatientOcurrences = config.hasEnoughPatientOcurrences;
        message.train.aggregationResult = config.aggregationResult;




        this.on('input', function(msg) {
            message = new Object();
            message.train = new Object();
            console.log("===== [Train4FAIRHEADNode] after input|config.name: "+config.name)
            message.train.name = config.name;
            console.log("===== [Train4FAIRHEADNode] after input|message.train.name: "+message.train.name)
            message.train.description = config.description;
            message.train.sourceRepository = config.sourceRepository;
            message.train.userToken = config.userToken;
            message.train.internalId = repositoryServiceLocator.getInternalTrainId();
            message.train.internalTrainId = repositoryServiceLocator.getInternalTrainId();
            message.train.internalVersion = repositoryServiceLocator.getInternalVersion();
            message.train.internalPointer = repositoryServiceLocator.getInternalPointer();

            //Train DataCite Core
            message.train.datacite = new Object();
            message.train.datacite.language = config.language;
            message.train.datacite.version = config.version;
            message.train.datacite.publicationYear = config.publicationYear;
            message.train.datacite.publisher = config.publisher;


            //Train DataCite - Identifier
            message.train.datacite.identifier = new Object();
            message.train.datacite.identifier.identifierType = config.identifierType;
            message.train.datacite.identifier.content = config.identifierContent;

            //Train DataCite - Creators
            message.train.datacite.creators = new Object();
            message.train.datacite.creators.creator = [];
            message.train.datacite.creators.creator[index]= new Object();
            message.train.datacite.creators.creator[index].affiliation = config.creatorAffiliation;
            message.train.datacite.creators.creator[index].givenName = config.creatorGivenName;
            message.train.datacite.creators.creator[index].familyName = config.creatorFamilyName;
            message.train.datacite.creators.creator[index].creatorName = new Object();
            message.train.datacite.creators.creator[index].creatorName.nameType = config.nameType;
            message.train.datacite.creators.creator[index].creatorName.content = config.creatorContent;
            message.train.datacite.creators.creator[index].nameIdentifier = new Object();
            message.train.datacite.creators.creator[index].nameIdentifier.nameIdentifierScheme = config.creatorNameIdentifierScheme;
            message.train.datacite.creators.creator[index].nameIdentifier.schemeURI = config.creatorSchemeURI;
            message.train.datacite.creators.creator[index].nameIdentifier.content = config.nameIdentifierContent;

            //Train DataCite - Subjects
            message.train.datacite.subjects = new Object();
            message.train.datacite.subjects.subject = [];
            message.train.datacite.subjects.subject [index]= new Object();
            message.train.datacite.subjects.subject[index].schemeURI = config.subjectSchemeURI;
            message.train.datacite.subjects.subject[index].content = config.subjectContent;
            message.train.datacite.subjects.subject[index].subjectScheme = config.subjectScheme;

            //Train DataCite - Dates
            message.train.datacite.dates = new Object();
            message.train.datacite.dates.date = [];
            message.train.datacite.dates.date [index] = new Object();
            message.train.datacite.dates.date[index].dateType = config.dateType;
            message.train.datacite.dates.date[index].dateInformation = config.dateInformation;
            message.train.datacite.dates.date[index].content = config.dateContent;

            //Train DataCite - Formats
            message.train.datacite.formats  = new Object();
            message.train.datacite.formats.format = [];
            message.train.datacite.formats.format[index] = new Object();
            message.train.datacite.formats.format[index].content = config.format;

            //Train DataCite - RightsList
            message.train.datacite.rightsList = new Object();
            message.train.datacite.rightsList.rights = [];
            message.train.datacite.rightsList.rights [index]= new Object();
            message.train.datacite.rightsList.rights[index].rightsURI = config.rightsURI;
            message.train.datacite.rightsList.rights[index].content = config.rightsContent;

            //Train DataCite - Titles
            message.train.datacite.titles = new Object();
            message.train.datacite.titles.title = [];
            message.train.datacite.titles.title[index]= new Object();
            message.train.datacite.titles.title[index].content = config.titleContent;
            message.train.datacite.titles.title[index].titleType = config.titleType;

            //Train DataCite - Descriptions
            message.train.datacite.descriptions = new Object();
            message.train.datacite.descriptions.description = [];
            message.train.datacite.descriptions.description [index] = new Object();
            message.train.datacite.descriptions.description[index].descriptionType = config.descriptionType;
            message.train.datacite.descriptions.description[index].content = config.descriptionContent;

            //Train DataCite - Contributors
            message.train.datacite.contributors = new Object();
            message.train.datacite.contributors.contributor = [];
            message.train.datacite.contributors.contributor [index] = new Object();
            message.train.datacite.contributors.contributor[index].affiliation = config.contributorAffiliation;
            message.train.datacite.contributors.contributor[index].givenName = config.contributorGivenName;
            message.train.datacite.contributors.contributor[index].familyName = config.contributorFamilyName;
            message.train.datacite.contributors.contributor[index].contributorType = config.contributorType;
            message.train.datacite.contributors.contributor[index].contributorName = config.contributorName;
            message.train.datacite.contributors.contributor[index].nameIdentifier = new Object();
            message.train.datacite.contributors.contributor[index].nameIdentifier.nameIdentifierScheme = config.contributorNameIdentifierScheme;
            message.train.datacite.contributors.contributor[index].nameIdentifier.schemeURI = config.contributorNameIdentifierSchemeURI;
            message.train.datacite.contributors.contributor[index].nameIdentifier.content = config.contributorNameIdentifierContent;

            //Train DataCite - FundingReferences
            message.train.datacite.fundingReferences = new Object();
            message.train.datacite.fundingReferences.fundingReference = [];
            message.train.datacite.fundingReferences.fundingReference [index] = new Object();
            message.train.datacite.fundingReferences.fundingReference[index].funderName = config.funderName;
            message.train.datacite.fundingReferences.fundingReference[index].awardNumber = config.awardNumber;
            message.train.datacite.fundingReferences.fundingReference[index].awardTitle = config.awardTitle;
            message.train.datacite.fundingReferences.fundingReference[index].funderIdentifier = new Object();
            message.train.datacite.fundingReferences.fundingReference[index].funderIdentifier.funderIdentifierType = config.funderIdentifierType;
            message.train.datacite.fundingReferences.fundingReference[index].funderIdentifier.content = config.fundingReferenceContent;

            //Train DataCite - ResourceType
            message.train.datacite.resourceType = new Object();
            message.train.datacite.resourceType.resourceTypeGeneral = config.resourceTypeGeneral;
            message.train.datacite.resourceType.content = config.resourceTypeContent;



            //Train UC03 - Example
            message.train.isAccessConstraintsOk = config.resourceTypeGeneral;
            message.train.hasGeneralRegistryPolicy = config.hasGeneralRegistryPolicy;
            message.train.hasEnoughPatientOcurrences = config.hasEnoughPatientOcurrences;
            message.train.aggregationResult = config.aggregationResult;

            //======================================================
            console.log("=============== train setup =================");
            // msg setup
            msg.message = message;
            msg.message.train = message.train;
            //======================================================

            //Flow setup
            message.train.flow = new Object();
            message.train.flow.flowID = node.z;
            message.train.flow.flowURL='http://'+repositoryServiceLocator.getTrainModellingToolEnvironment().host+':'+repositoryServiceLocator.getTrainModellingToolEnvironment().port+'/#flow/'+node.z;
            message.train.flow.description = msg.message.train.description;
            //======================================================

            //internalPointer setup
            if(node.wires==null || node.wires.length==0 || (node.wires.length==1 && (node.wires[0]==null ||node.wires[0].length==0))){
                console.log("1: Fail to save the Train: "+message.train.name+". Please verify your Workflow. One Wagon node should be associated to the Train node");
            }
            msg.message.train.internalPointer = trainUtil.convertWiresArrayToString(node.wires);
            //======================================================

            //======================================================
            //node id setup
            node.internalId = "";
            node.internalId= msg.message.train.internalId;
            //======================================================
            //get doi place

            //======================================================
            var env = repositoryServiceLocator.getMircroservicesEnvironment();
            var host = env.host;
            var port = env.port;
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

            //add nodered metadata
            console.log("!!!!! ======= add nodered metadata !!!!! =======");
            node.internalId = msg.message.train.internalId;
            node.internalPointer = msg.message.train.internalPointer;
            node.correlationObjectId = msg.message.train.correlationObjectId;
            if((node.correlationObjectId==null || node.correlationObjectId=="" || node.correlationObjectId==undefined)){
                console.log("4: Fail to save the Train: "+msg.message.train.name+". Please verify your Workflow: ");
            }
            var res = request('POST', 'http://'+host+':'+port+'/RepositoryService/trainNode/add/'+msg.message.train.internalId+'/'+msg.message.train.internalVersion, {
                json: node,
            });
            //======================================================



            console.log("===== [Train4FAIRHEADNode] before send|msg.message.train.name: "+msg.message.train.name)
            msg.trainNode = node;

            node.send(msg);

            console.log("Train end");
        });



    }
    index++;
    RED.nodes.registerType("Train Head",Train4FAIRHEADNode);
}