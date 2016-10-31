/// <reference path="../src/typings.d.ts" />
export interface ICoteEvent {
    type: string;
}
export interface ICoteRequest {
    val: any;
}
export declare class Requester {
    private client;
    constructor(name: string);
    send(event: ICoteEvent): Promise<{}>;
}
export declare class Responder {
    private coteResponder;
    constructor(advertisement: {
        name: string;
        respondsTo: string[];
    });
    on(eventType: string, handler: (req: ICoteRequest) => Promise<any>): void;
}
