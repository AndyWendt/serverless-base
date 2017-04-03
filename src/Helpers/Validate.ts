import {ApiException} from "./CustomException";
import {Response} from "./Response";
const validateUUID:any = require('uuid-validate');

export class Validate {

    static uuidV4(string:string):boolean{
        const result = validateUUID(string, 4);

        if (false === result) {
            throw new ApiException(Response.badRequest("Id is not a UUID", {'id': 'Invalid'}));
        }

        return result;
    }
}