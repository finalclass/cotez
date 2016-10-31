/// <reference path="./typings.d.ts" />

import * as cote from 'cote';
import SingleInit from 'single-init';

import * as debug from 'debug';

const log = debug('cotez:info');
const logError = debug('cotez:error');

export interface ICoteEvent {
    type: string;
}

export interface ICoteRequest {
    val: any;
}

export class Requester {

    private clientSingleInit: SingleInit<any>;

    constructor(name: string) {
        log('new Requester("' + name + '")');
        this.clientSingleInit = new SingleInit((done) => {
            log('Instantiating client');
            let client = new cote.Requester({ name });
            client.on('ready', () => {
                log('Client reqdy');
                done(null, client);
            });
        });
    }

    public send(event: ICoteEvent) {
        log('Sending event', event.type);
        return this.clientSingleInit.get().then((client) => {
            return new Promise((resolve, reject) => {
                client.get(event, (result) => {
                    resolve(result);
                    log('Got result', result);
                });
            });
        });
    }

}

export class Responder {

    private coteResponder: any;

    constructor(advertisement: { name: string; respondsTo: string[] }) {
        log('new Responder("' + advertisement.name + '")');
        this.coteResponder = new cote.Responder(advertisement);
    }

    on(eventType: string, handler: (req: ICoteRequest) => Promise<any>) {
        log('Start listening for ' + eventType);
        this.coteResponder.on(eventType, (req:ICoteRequest, done) => {
            log('Got request for event ' + eventType);
            handler(req).then(done).catch((err) => {throw err});
        });
    }
}
