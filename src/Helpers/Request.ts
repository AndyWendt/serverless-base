import {APIGatewayEvent} from '@types/aws-lambda'
import {Validate} from "./Validate";

export class Request {
  /**
   * parses the request payload
   * @param {APIGatewayEvent} event
   * @returns {Object}
   */
  static payload<T>(event: APIGatewayEvent):T {
    return JSON.parse(event.body);
  }

  static pathParameter(parameter:string, event:APIGatewayEvent):string {
    return event.pathParameters[parameter];
  }

  static getIdFromPathAndValidate(parameter:string, event:APIGatewayEvent):string {
    const result = this.pathParameter(parameter, event);
    Validate.uuidV4(result);

    return result;
  }
}
