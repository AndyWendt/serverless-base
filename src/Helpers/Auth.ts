import { Response } from './Response';
import { Role } from '../Users/UserInterfaces';
import * as jwt from 'jsonwebtoken';
import { APIGatewayEvent } from '@types/aws-lambda'
import { Callback as lambdaCallback } from '@types/aws-lambda'
import { Envs } from './Envs';
import {ApiException} from "./CustomException";

export interface Auth0UserData {
  email: string;
  app_metadata: {
    app_user_id: string;
    client_id: string;
    role: string;
  }
}

export interface JWTPayload {
  user_id: string;
  client_id: string;
  email: string;
  role: Role;
}


export class Auth {
  /**
   * Authenticate against a JWT provided in the event
   *
   * This will invoke the provided callback function if the JWT fails to verify
   * Otherwise, it will return a decoded JWT payload
   * @param {APIGatewayEvent} event
   * @returns {JWTPayload}
   */
  static authenticate(event: APIGatewayEvent):JWTPayload {
    try {
      const auth0JwtPayload = <Auth0UserData> jwt.verify(this.getJWT(event), this.getAuth0Secret());
      return {
        email: auth0JwtPayload.email,
        client_id: auth0JwtPayload.app_metadata.client_id,
        role: <Role> auth0JwtPayload.app_metadata.role,
        user_id: auth0JwtPayload.app_metadata.app_user_id,
      };
    } catch (err) {
      throw new ApiException(Response.unauthorized(err));
    }
  }

  static userBelongsToClient(clientId:string, event: APIGatewayEvent):JWTPayload {
    const decodedJWT = this.authenticate(event);

    if (this.isSuperAdmin(decodedJWT)) {
      return decodedJWT;
    }

    if (false === this.hasClientId(clientId, decodedJWT)) {
      throw new ApiException(Response.unauthorized('Failed authentication'));
    }

    return decodedJWT;
  }

  static userHasRoleAndBelongsToClient(clientId:string, roles:Array<Role>, event: APIGatewayEvent):JWTPayload {
    const decodedJWT = this.authenticate(event);
    if (this.isSuperAdmin(decodedJWT)) {
      return decodedJWT;
    }
    if (!this.hasOneOfRoles(roles, decodedJWT) || (decodedJWT.client_id !== clientId)) {
      throw new ApiException(Response.unauthorized('Failed authentication'));
    }

    return decodedJWT;
  }

  static checkUserId(userId:string, event: APIGatewayEvent):JWTPayload {
    const decodedJWT = this.authenticate(event);

    if (this.isSuperAdmin(decodedJWT)) {
      return decodedJWT;
    }

    if (false === this.isUser(userId, decodedJWT)) {
      throw new ApiException(Response.unauthorized('Failed authentication'));
    }

    return decodedJWT;
  }

  static checkRole(roles: Array<Role>, event: APIGatewayEvent):JWTPayload {
      const decodedJWT = this.authenticate(event);
      this.hasOneOfRoles(roles, decodedJWT);
      return decodedJWT;
  }

  static hasOneOfRoles(roles:Array<Role>, decodedJWT:JWTPayload):boolean {
    roles.forEach((role) => {
      if (false === this.hasRole(role, decodedJWT)) {
        throw new ApiException(Response.unauthorized({"message": "User does not have correct role for this action"}));
      }
    });

    return true;
  }


  static hasRole(role:Role, decodedJWT:JWTPayload):boolean {
    return decodedJWT.role === role;
  }

  /**
   * Returns JWT Authorization header
   * @param {APIGatewayEvent} event
   * @returns {string} Authorization
   */
  static getJWT(event: APIGatewayEvent): string {
    return event.headers['Authorization'];
  }

  /**
   * Returns AUTH0_SECRET
   * @returns {string} AUTH0_SECRET
   */
  static getAuth0Secret(): string {
    return Envs.auth0Secret();
  }

  static isSuperAdmin(decodedJWT:JWTPayload):boolean {
    return decodedJWT.role === 'SuperAdmin';
  }

  static hasClientId(clientId:string, decodedJWT:JWTPayload):boolean {
    return decodedJWT.client_id === clientId;
  }

  static isUser(userId:string, decodedJWT: JWTPayload):boolean {
    return decodedJWT.user_id === userId;
  }
}
