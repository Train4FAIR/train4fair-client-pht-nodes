Message = {

    train:{
        name:"",
        description:"",
        sourceRepository:"",
        userToken:"",
        internalId:"",
        internalVersion:"",
        internalPointer:"",
        isAccessConstraintsOk:"",
        hasGeneralRegistryPolicy:"",
        hasEnoughPatientOcurrences:"",
        aggregationResult:"",

        datacite:{
            identifier: {
                identifierType:"",
                content:""
            },
            formats:{
                format:[
                    {
                        content:""
                    }
                ]
            },
            rightsList:{
                rights:[{
                    rightsURI:"",
                    content:""
                }]
            },
            creators:{
                creator:[
                    {
                        affiliation:"",
                        givenName:"",
                        familyName:"",
                        creatorName:
                            {
                                nameType:"",
                                content:""
                            },
                        nameIdentifier:
                            {
                                nameIdentifierScheme:"",
                                schemeURI:"",
                                content:""
                            }
                    }
                ]},
            subjects:{
                subject:[
                    {
                        schemeURI:"",
                        content:"",
                        subjectScheme:"",
                        xml:""
                    }
                ]
            },
            dates:
                {
                    date:[
                        {
                            dateType:"",
                            dateInformation:"",
                            content:""
                        },
                    ]
                },
            language:"",
            titles:{
                title:[
                    {
                        content:"",
                        xml:"",
                        titleType:""
                    }
                ]
            },
            relatedIdentifiers:{
                relatedIdentifier:[
                    {
                        relationType:"",
                        schemeURI:"",
                        relatedIdentifierType:"",
                        content:"",
                        relatedMetadataScheme:""},
                ]
            },
            version:"",
            descriptions:
                {
                    description:[
                        {
                            descriptionType:"",
                            content:"",
                            xml:""}
                    ]
                },
            alternateIdentifiers:{
                alternateIdentifier:
                    [
                        {
                            content:"",
                            alternateIdentifierType:""
                        }
                    ]
            },
            sizes:{size:[]},
            publisher:"",
            publicationYear:"",
            contributors:{
                contributor:
                    [
                        {
                            affiliation:"",
                            givenName:"",
                            familyName:"",
                            contributorType:"",
                            contributorName:"",
                            nameIdentifier:{
                                nameIdentifierScheme:"",
                                schemeURI:"",
                                content:""}},
                    ]
            },
            fundingReferences:{
                fundingReference:[
                    {
                        funderName:"",
                        funderIdentifier:
                            {
                                funderIdentifierType:"",
                                content:""
                            },
                        awardNumber:"",
                        awardTitle:""
                    },
                ]
            },
            resourceType:{
                resourceTypeGeneral:"",
                content:""
            },
        },

        wagons:[
            {
                name: "",
                description: "",
                checkMetadataAccess:"",
                checkGeneralRegistryPolicy:"",
                expectedTimePointsForAllpatientsFrom:"",
                expectedTimePointsForAllpatientsTo:"",
                cutValue:"",
                shouldBeAggregated:"",
                internalPointer:"",
                accessConstraints:{
                    patientRegistry:"",
                    severity:"",
                    rareDisease:"",
                    treatmentCenter:"",
                    restrictionsOnPersonalData:""
                },
                resources:
                    [
                        {
                            name: "",
                            description: "",
                            internalPointer:"",
                            artifacts:
                                [
                                    {
                                        name: "",
                                        filename: "",
                                        format: "",
                                        filedata:"",
                                        checksum: "",
                                        fileUrl: "",
                                        extension:"",
                                        internalPointer:""
                                    }
                                ],
                            oci: {
                                created: "",
                                author: "",
                                architecture: "",
                                os: "",
                                config: {
                                    user: "",
                                    exposedPorts:
                                        [
                                            {
                                                port: "",
                                                protocol: ""
                                            }
                                        ],
                                    env: [],
                                    entrypoint: [],
                                    cmd: [],
                                    volumes: []
                                }
                            },

                        },
                    ],
                stationProfiles: {
                    stationProfile:[{}]
                },
            }
            ],
        similarProjects:[],
        flow:{
            flowID:"",
            flowURL:"",
            description:"",
            documentationEntrypoint:"",
        },

    }

};