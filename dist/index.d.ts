/// <reference path="../src/typings.d.ts" />
export interface ICoteEvent {
    type: string;
}
export declare class Requester {
    private clientSingleInit;
    constructor(advert: any);
    send(event: ICoteEvent): Promise<{}>;
}
export declare class Responder {
    private coteResponder;
    constructor(advertisement: {
        name: string;
        respondsTo: string[];
    });
    on(eventType: string, handler: (req: ICoteEvent) => Promise<any>): void;
}
