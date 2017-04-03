import {ApiException} from "./CustomException";
import { Callback as lambdaCallback } from '@types/aws-lambda'

export interface ResponseInterface {
  statusCode: number;
  headers: {[name: string]: string},
  body: string;
}


export class Response {
  /**
   * Returns a success object
   * @param {Array<any>} collection
   * @returns {Object} Success object
   */
  static collection(collection: Array<any>):ResponseInterface {
    return this.success({'data': collection});
  }

  /**
   * Returns a success object
   * @param {*} item
   * @returns {Object} Success object
   */
  static item(item:any):ResponseInterface {
    return this.success({ 'data': item });
  }

  /**
   * Returns a successfull HTTP response object
   * @param {Object} body
   * @returns {Object} Success object
   */
  static success(body:any):ResponseInterface {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(body),
    };
  }

  /**
   * Returns an Unauthorized HTTP response object
   * @param {Object} error
   * @param {string} [message]
   * @returns {Object} Error object
   */
  static unauthorized(error:any, message?: string):ResponseInterface {
    return {
      statusCode: 401,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: message ? message : 'Unauthorized', error: error.toString()}),
    };
  }

  /**
   * Returns an HTTP Bad Request response object
   *
   * @param {string} message
   * @param {*} error
   * @returns {Object} Error object
   */
  static badRequest(message:string, error:any):ResponseInterface {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message, error: error.toString()}),
    };
  }

  /**
   * Returns an HTTP Server Error response object
   * @param {string} message
   * @param {any} error
   * @returns {Object} Error object
   */
  static error(message: string, error: any):ResponseInterface {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: message, error: error.toString()}),
    };
  }

  static handleError(e:any, callback:lambdaCallback ):void {
    if (e instanceof ApiException) {
      e = <ApiException>e;
      return callback(null, e.response);
    } else {
      return callback(null, Response.error('There was an uncaught application error', e.stack));
    }
  }
}
