/// <reference path="./typings.d.ts" />
"use strict";
var cote = require('cote');
var single_init_1 = require('single-init');
var debug = require('debug');
var log = debug('cotez:info');
var logError = debug('cotez:error');
var Requester = (function () {
    function Requester(advert) {
        log('new Requester("' + advert.name + '")');
        this.clientSingleInit = new single_init_1.default(function (done) {
            log('Instantiating client');
            var client = new cote.Requester(advert);
            client.on('ready', function () {
                log('Client reqdy');
                done(null, client);
            });
        });
    }
    Requester.prototype.send = function (event) {
        log('Sending event', event.type);
        return this.clientSingleInit.get().then(function (client) {
            return new Promise(function (resolve, reject) {
                client.send(event, function (result) {
                    resolve(result);
                });
            });
        });
    };
    return Requester;
}());
exports.Requester = Requester;
var Responder = (function () {
    function Responder(advertisement) {
        log('new Responder("' + advertisement.name + '")');
        this.coteResponder = new cote.Responder(advertisement);
    }
    Responder.prototype.on = function (eventType, handler) {
        log('Start listening for ' + eventType);
        this.coteResponder.on(eventType, function (event, done) {
            log('Got request for event ' + eventType);
            handler(event).then(done).catch(function (err) { throw err; });
        });
    };
    return Responder;
}());
exports.Responder = Responder;
//# sourceMappingURL=index.js.map