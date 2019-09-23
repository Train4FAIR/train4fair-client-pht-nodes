'use strict';
var request = require('sync-request');

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


    getInternalId: function (){
        var env = this.getMircroservicesTestEnv();
        //var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/InternalId');
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalId');
        var internalId = res.getBody('utf8');
        return internalId
    },

    getInternalPointer: function (){
        var env = this.getMircroservicesTestEnv();
        //var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/InternalPointer');
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalPointer');

        var internalPointer = res.getBody('utf8');
        return internalPointer
    },

    getInternalVersion: function (){
        var env = this.getMircroservicesTestEnv();
        //var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:9091/RepositoryService/train/InternalVersion');
        var res = request('GET', 'http://'+env.host+':'+env.port+'/RepositoryService/train/InternalVersion');
        var internalVersion = res.getBody('utf8');
        return internalVersion
    }


}