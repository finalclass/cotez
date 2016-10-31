/// <reference path="./typings.d.ts" />

import * as cote from 'cote';
import SingleInit from 'single-init';

export interface ICoteEvent {
    type: string;
}

export interface ICoteRequest {
    val: any;
}

export class Requester {

    private client: SingleInit<any>;

    constructor(name: string) {
        this.client = new SingleInit((done) => {
            let client = new cote.Requester({ name });
            client.on('ready', () => done(client));
        });
    }

    public send(event: ICoteEvent) {
        return this.client.get().then((client) => {
            return new Promise((resolve) => {
                client.get(event, resolve);
            });
        });
    }

}

export class Responder {

    private coteResponder: any;

    constructor(advertisement: { name: string; respondsTo: string[] }) {
        this.coteResponder = new cote.Responder(advertisement);
    }

    on(eventType: string, handler: (req: ICoteRequest) => Promise<any>) {
        this.coteResponder.on(eventType, (req:ICoteRequest, done) => {
            handler(req).then(done).catch((err) => {throw err});
        });
    }
}
