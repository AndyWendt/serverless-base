import {Callback as lambdaCallback, APIGatewayEvent} from '@types/aws-lambda'
import { Context as lambdaContext } from '@types/aws-lambda'
import {Response} from "../Helpers/Response";
import {Auth} from "../Helpers/Auth";
import {Request} from "../Helpers/Request";


export function add(event: APIGatewayEvent, context: lambdaContext, callback: lambdaCallback): any {
    try {

    } catch (e) {
        Response.handleError(e, callback);
    }
}
