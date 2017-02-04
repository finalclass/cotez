/// <reference path="./typings.d.ts" />

import * as cote from 'cote';
import SingleInit from 'single-init';

import * as debug from 'debug';

const log = debug('cotez:info');
const logError = debug('cotez:error');

export interface ICoteEvent {
    type: string;
}

export class Requester {

    private clientSingleInit: SingleInit<any>;

    constructor(advert: any) {
        log('new Requester("' + advert.name + '")');
        this.clientSingleInit = new SingleInit((done) => {
            log('Instantiating client');
            let client = new cote.Requester(advert);
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
                client.send(event, (result) => {
                    resolve(result);
                });
            });
        });
    }

}

export class Responder {

    private coteResponder: any;

    constructor(advertisement: any) {
        log('new Responder("' + advertisement.name + '")');
        this.coteResponder = new cote.Responder(advertisement);
    }

    public on(eventType: string, handler: (event: ICoteEvent) => Promise<any>) {
        log('Start listening for ' + eventType);
        this.coteResponder.on(eventType, (event: ICoteEvent, done) => {
            log('Got request for event ' + eventType);
            handler(event).then(done).catch((err) => { throw err });
        });
    }
}
