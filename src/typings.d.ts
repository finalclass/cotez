declare module "cote" {
    export var Requester:any;
    export class Responder {
        constructor(advertisement:{name:string;respondsTo:string[]});
        on(eventType:string, handler:(req:ICoteRequest, callback:(response?:any)=>void)=>void):void;
    }
    export var Publisher:any;
    export var Subscriber:any;
    export interface ICoteRequest {
        val:any;
    }
}