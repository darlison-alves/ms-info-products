export class EventApplication {
    name: string;
    payload: Object;
    constructor( name: string, payload: Object ) {
        this.name = name;
        this.payload = payload;
    }
}