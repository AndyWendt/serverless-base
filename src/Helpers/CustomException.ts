import {ResponseInterface} from "./Response";


export declare class Error {
    public name: string;
    public message?: string;
    public stack: string;
    constructor(message?: string);
}

export class ApiException extends Error {

    private _response: ResponseInterface;

    constructor(response:ResponseInterface, public message?) {
        super(message);
        this.name = 'ApiException';
        this.message = message;
        this.stack = (<any>new Error()).stack;
        this._response = response;
    }
    toString() {
        return this.name + ': ' + this.message;
    }
    get response(): ResponseInterface {
        return this._response;
    }
}
