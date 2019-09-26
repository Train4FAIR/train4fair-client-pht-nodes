'use strict';
var request = require('sync-request');

module.exports = {


    getMircroservicesTestEnv: function () {
        var res = request('GET', 'http://menzel.informatik.rwth-aachen.de:8881/ServiceDiscovery/train/service/discovery/TEST/MS/admin');
        var result = res.getBody('utf8');
        return JSON.parse(result);
    },
}