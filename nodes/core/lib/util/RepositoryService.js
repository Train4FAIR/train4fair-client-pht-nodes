'use strict';
var request = require('sync-request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
module.exports = {


    getMircroservicesTestEnv: function(){
        var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:8881/ServiceDiscovery/train/service/discovery/TEST/MS/admin');
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getTMTTestEnv: function(){
        var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:8881/ServiceDiscovery/train/service/discovery/TEST/TMT/admin');
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },

    getDAVTestEnv: function(){
        var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:8881/ServiceDiscovery/train/service/discovery/TEST/WEBDAV/admin');
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },


    getInternalId: function (){
        var env = this.getMircroservicesTestEnv();
        //var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/InternalId');
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalId');
        var internalId = res.getBody('utf8');
        return internalId
    },

    getDataciteDoiDraftStateMetadata: function(){
        var data =  '{"data":{"type":"dois","attributes":{"prefix":"10.20408"}}}'
        return data;
    },


    getInternalPointer: function (){
        var env = this.getMircroservicesTestEnv();
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalPointer');

        var internalPointer = res.getBody('utf8');
        return internalPointer
    },

    getInternalVersion: function (){
        var env = this.getMircroservicesTestEnv();
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalVersion/');
        var internalVersion = res.getBody('utf8');
        return internalVersion
    }


}