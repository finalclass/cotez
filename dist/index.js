/// <reference path="./typings.d.ts" />
"use strict";
var cote = require('cote');
var single_init_1 = require('single-init');
var debug = require('debug');
var log = debug('cotez:info');
var logError = debug('cotez:error');
var Requester = (function () {
    function Requester(name) {
        log('new Requester("' + name + '")');
        this.clientSingleInit = new single_init_1.default(function (done) {
            log('Instantiating client');
            var client = new cote.Requester({ name: name });
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
                    log('Got result', result);
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
        this.coteResponder.on(eventType, function (req, done) {
            log('Got request for event ' + eventType);
            handler(req).then(done).catch(function (err) { throw err; });
        });
    };
    return Responder;
}());
exports.Responder = Responder;
//# sourceMappingURL=index.js.map