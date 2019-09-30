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
    }
}