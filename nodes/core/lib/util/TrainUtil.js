'use strict';
var request = require('sync-request/lib/index');
var $ = require("jquery");

module.exports = {
    showNewIdentifierDialog: function (identifier,doiHandlerWebPage) {
        $("#newdraftidentifierdialog").modal();
    },

    convertWiresArrayToString : function(wires){
        var wiresStr = JSON.stringify(wires);
        if(wiresStr!='' && wiresStr!=null && wiresStr!=undefined && wiresStr.includes('[') &&
            wiresStr.includes(']') && wiresStr.includes('"')){
            wiresStr = wiresStr.replace('[[','');
            wiresStr = wiresStr.replace(']]','');
            wiresStr = wiresStr.replace(/"/g, "");
        }
        return wiresStr;
    },

    getBodyToCreateAnewFindableDOI : function(givenName,title,publisher,publicationYear,url){

        // console.log("train.datacite.creators.creator.givenName: "+train.datacite.creators.creator.givenName+"\n")
        // console.log("train.datacite.titles.title.content: "+train.datacite.titles.title.content+"\n")
        // console.log("train.datacite.publisher: "+train.datacite.publisher+"\n")
        // console.log("train.datacite.publisher: "+train.datacite.publicationYear+"\n")

        return "{\n" +
            "  \"data\": {\n" +
            "    \"type\": \"dois\",\n" +
            "    \"attributes\": {\n" +
            "      \"event\": \"publish\",\n" +
            "      \"prefix\":\"10.20408\",\n" +
            "      \"creators\": [{\n" +
            "        \"name\": \""+givenName+"\"\n" +
            "      }],\n" +
            "      \"titles\": [{\n" +
            "        \"title\": \""+title+"\"\n" +
            "      }],\n" +
            "      \"publisher\": \""+publisher+"\",\n" +
            "      \"publicationYear\":"+publicationYear+",\n" +
            "      \"types\": {\n" +
            "        \"resourceTypeGeneral\": \"Workflow\"\n" +
            "      },\n" +
            "      \"url\": \""+url+"\",\n" +
            "      \"schemaVersion\": \"http://datacite.org/schema/kernel-4\"\n" +
            "    }\n" +
            "  }\n" +
            "}"
    },

    getBodyToChangeDataciteStatus : function(){


       return " {\n" +
            "                \"data\":{\n" +
            "                \"id\":\"10.20408/m3z7-cv53\",\n" +
            "                    \"type\":\"DOI\",\n" +
            "                    \"attributes\":{\n" +
            "                    \"doi\":\"10.20408/m3z7-cv53\"\n" +
            "                        \"prefix\":\"10.20408\",\n" +
            "                        \"suffix\":\"m3z7-cv53\",\n" +
            "                        \"event\":\"publish\",\n" +
            "                        \"identifiers\":[\n" +
            "                        {\n" +
            "                            \"identifier\":\"10.20408/m3z7-cv53\",\n" +
            "                            \"identifierType\":\"NaN\",\n" +
            "                        }\n" +
            "                    ],\n" +
            "                        \"creators\":[\n" +
            "                        {\n" +
            "                            \"nameType\":\"0\",\n" +
            "                            \"nameIdentifiers\":[\n" +
            "                                {\n" +
            "                                    \"nameIdentifier\":\"https://orcid.org/0000-0001-6066-2602\",\n" +
            "                                    \"nameIdentifierScheme\":\"ORCID\",\n" +
            "                                    \"schemeUri\":\"http://orcid.org/\",\n" +
            "                                }\n" +
            "                            ],\n" +
            "                            \"name\":\"[object Object]\",\n" +
            "                            \"givenName\":\"oya\",\n" +
            "                            \"familyName\":\"Alves Chaves\",\n" +
            "                            \"affiliation\":\"Fraunhofer FIT\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "\n" +
            "                        \"titles\":[\n" +
            "                        {\n" +
            "                            \"title\":\"BMI  Train\" ,\n" +
            "                            \"titleType\":\"ALTERNATIVETITLE\",\n" +
            "                            \"lang\":\"en\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                        \"publisher\":\"DataCite\",\n" +
            "                        \"publicationYear\":\"2019\",\n" +
            "\n" +
            "\n" +
            "                        \"subjects\":[\n" +
            "                        {\n" +
            "                            \"subject\":\"BMI Train for Computer Science\",\n" +
            "                            \"subjectScheme\":\"dewey\",\n" +
            "                            \"schemeUri\":\"http://dewey.info/\",\n" +
            "                            \"valueUri\":\"valueUri\",\n" +
            "                            \"lang\":\"en\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "\n" +
            "                    \"contributors\":[\n" +
            "                        {\n" +
            "                            \"nameType\":\"PERSONAL\",\n" +
            "                            \"nameIdentifiers\":[\n" +
            "                                {\n" +
            "                                    \"nameIdentifier\":\"null\",\n" +
            "                                    \"nameIdentifierScheme\":\"ORCID\",\n" +
            "                                    \"schemeUri\":\"null\"\n" +
            "                                }\n" +
            "                            ],\n" +
            "                            \"name\":\"Yeliz Ucer\",\n" +
            "                            \"givenName\":\"Yeliz\",\n" +
            "                            \"familyName\":\"Ucer\",\n" +
            "                            \"affiliation\":\"Frauhofer Fit\",\n" +
            "                            \"contributorType\":\"PROJECTMANAGER\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "\n" +
            "                        \"dates\":[\n" +
            "                        {\n" +
            "                            \"date\":\"28/06/2019\",\n" +
            "                            \"dateType\":\"VALID\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                        \"language\":\"en\",\n" +
            "                        \"types\":{\n" +
            "                        \"resourceTypeGeneral\":\"TRAIN\",\n" +
            "                            \"resourceType\":\"Software\"\n" +
            "                    },\n" +
            "                        \"sizes\":[\n" +
            "                        \"1G\"\n" +
            "                    ],\n" +
            "                        \"formats\":[\"application/json\"\n" +
            "                    ],\n" +
            "                        \"version\":\"1.0.0\",\n" +
            "                        \"rightsList\":[\n" +
            "                        {\n" +
            "                            \"rights\":\"CC0 1.0 Universal\",\n" +
            "                            \"rightsUri\":\"http://creativecommons.org/publicdomain/zero/1.0/\",\n" +
            "                            \"lang\":\"en\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                        \"descriptions\":[\n" +
            "                        {\n" +
            "                            \"description\":\"Calculates the BMI of the Patients in a specific data center\",\n" +
            "                            \"lang\":\"en\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                    \"fundingReferences\":[\n" +
            "                        {\n" +
            "                            \"funderName\":\"Smith Care\",\n" +
            "                            \"funderIdentifier\":,\n" +
            "                            \"funderIdentifierType\":\"OTHER\",\n" +
            "                            \"awardNumber\":\"000-6687687-678678\",\n" +
            "                            \"awardUri\":\"awardUri\",\n" +
            "                            \"awardTitle\":\"Fair Metadata\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                        \"url\":\"http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/swagger-ui.html\",\n" +
            "                        \"contentUrl\":[\n" +
            "\"http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/5d920bd19141a44a2620276b\"\n" +
            "                    ],\n" +
            "                        \"source\":\"https://www.npmjs.com/package/node-red-contrib-trainnodeset\",\n" +
            "                        \"isActive\":\"true\",\n" +
            "                        \"landingPage\":{\n" +
            "                        \"checked\":\"true\",\n" +
            "                            \"url\":\"http://127.0.0.1:9999/5d920bd19141a44a2620276b/index.html\",\n" +
            "                            \"contentType\":\"text/html\",\n" +
            "                            \"bodyhasPid\":\"true\"\n" +
            "                    }\n" +
            "                }\n" +
            "            }\n" +
            "            }\n";


    }
}