/// <reference path="./typings.d.ts" />
"use strict";
var cote = require('cote');
var single_init_1 = require('single-init');
var Requester = (function () {
    function Requester(name) {
        this.client = new single_init_1.default(function (done) {
            var client = new cote.Requester({ name: name });
            client.on('ready', function () { return done(client); });
        });
    }
    Requester.prototype.send = function (event) {
        return this.client.get().then(function (client) {
            return new Promise(function (resolve, reject) {
                client.get(event, resolve);
            });
        });
    };
    return Requester;
}());
exports.Requester = Requester;
var Responder = (function () {
    function Responder(advertisement) {
        this.coteResponder = new cote.Responder(advertisement);
    }
    Responder.prototype.on = function (eventType, handler) {
        this.coteResponder.on(eventType, function (req, done) {
            handler(req).then(done).catch(function (err) { throw err; });
        });
    };
    return Responder;
}());
exports.Responder = Responder;
//# sourceMappingURL=index.js.map