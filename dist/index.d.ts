/// <reference path="../src/typings.d.ts" />
import * as cote from 'cote';
export interface ICoteEvent {
    type: string;
}
export declare class Requester {
    private client;
    constructor(name: string);
    send(event: ICoteEvent): Promise<{}>;
}
export declare var Responder: typeof cote.Responder;
