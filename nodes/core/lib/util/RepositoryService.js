'use strict';
var request = require('sync-request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var sd_method;
module.exports = {





    getMircroservicesEnvironment: function(){
        var sd_method = process.env.sd_method;
        var sd_protocol = process.env.sd_protocol;
        var sd_host = process.env.sd_host;
        var sd_port = process.env.sd_port;
        var sd_env = process.env.sd_env;
        var sd_auth_token = process.env.sd_auth_token;
        var res = request(sd_method, sd_protocol+sd_host+':'+sd_port+'/ServiceDiscovery/train/service/discovery/'+sd_env+'/MS/'+sd_auth_token);

        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getTrainModellingToolEnvironment: function(){
        var sd_method = process.env.sd_method;
        var sd_protocol = process.env.sd_protocol;
        var sd_host = process.env.sd_host;
        var sd_port = process.env.sd_port;
        var sd_env = process.env.sd_env;
        var sd_auth_token = process.env.sd_auth_token;
        var res = request(sd_method, sd_protocol+sd_host+':'+sd_port+'/ServiceDiscovery/train/service/discovery/'+sd_env+'/TMT/'+sd_auth_token);

        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getDAVEnvironment: function(){
        var sd_method = process.env.sd_method;
        var sd_protocol = process.env.sd_protocol;
        var sd_host = process.env.sd_host;
        var sd_port = process.env.sd_port;
        var sd_env = process.env.sd_env;
        var sd_auth_token = process.env.sd_auth_token;
        var res = request(sd_method, sd_protocol+sd_host+':'+sd_port+'/ServiceDiscovery/train/service/discovery/'+sd_env+'/WEBDAV/'+sd_auth_token);
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getDAVDocEnvironment: function(){
        var sd_method = process.env.sd_method;
        var sd_protocol = process.env.sd_protocol;
        var sd_host = process.env.sd_host;
        var sd_port = process.env.sd_port;
        var sd_env = process.env.sd_env;
        var sd_auth_token = process.env.sd_auth_token;
        var res = request(sd_method, sd_protocol+sd_host+':'+sd_port+'/ServiceDiscovery/train/service/discovery/'+sd_env+'/WEBDAV_DOC/'+sd_auth_token);
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getDAVMetadataEnvironment: function(){
        var sd_method = process.env.sd_method;
        var sd_protocol = process.env.sd_protocol;
        var sd_host = process.env.sd_host;
        var sd_port = process.env.sd_port;
        var sd_env = process.env.sd_env;
        var sd_auth_token = process.env.sd_auth_token;
        var res = request(sd_method, sd_protocol+sd_host+':'+sd_port+'/ServiceDiscovery/train/service/discovery/'+sd_env+'/WEBDAV_METADATA/'+sd_auth_token);
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getDAVPageEnvironment: function(){
        var sd_method = process.env.sd_method;
        var sd_protocol = process.env.sd_protocol;
        var sd_host = process.env.sd_host;
        var sd_port = process.env.sd_port;
        var sd_env = process.env.sd_env;
        var sd_auth_token = process.env.sd_auth_token;
        var res = request(sd_method, sd_protocol+sd_host+':'+sd_port+'/ServiceDiscovery/train/service/discovery/'+sd_env+'/WEBDAV_PAGE/'+sd_auth_token);
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getInternalTrainId: function (){
        var env = this.getMircroservicesEnvironment();
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalTrainId');
        var internalId = res.getBody('utf8');
        return internalId
    },


    getInternalWagonId: function (){
        var env = this.getMircroservicesEnvironment();
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalWagonId');
        var internalId = res.getBody('utf8');
        return internalId
    },


    getDataciteDoiDraftStateMetadata: function(){
        var data =  '{"data":{"type":"dois","attributes":{"prefix":"10.20408"}}}'
        return data;
    },


    getInternalPointer: function (){


        var env = this.getMircroservicesEnvironment();
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalPointer');

        var internalPointer = res.getBody('utf8');
        return internalPointer
    },

    getInternalVersion: function (){
        var env = this.getMircroservicesEnvironment();
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalVersion/');
        var internalVersion = res.getBody('utf8');
        return internalVersion
    }


}