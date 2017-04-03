import * as AWS from 'aws-sdk';

export class AwsServices {
    AWS: any;
    constructor() {
        AWS.config.update({
            region: "us-west-2"
        });

        this.AWS = AWS;
    }

    dynamoDb():AWS.DynamoDB.DocumentClient {
        return new this.AWS.DynamoDB.DocumentClient();
    }

    ses():AWS.SES {
        return new this.AWS.SES();
    }

    dynamoScan(table:string):Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
        return new Promise((resolve, reject) => {

            const itemParams = {
                TableName: table,
            };

            this.dynamoDb().scan(itemParams, (err, success) => {
                if (err) {
                    return reject(err);
                }

                return resolve(success);
            });
        });
    }

    dynamoQuery(itemParams:AWS.DynamoDB.DocumentClient.QueryInput):Promise<AWS.DynamoDB.DocumentClient.QueryOutput> {
        return new Promise((resolve, reject) => {
            this.dynamoDb().query(itemParams, (err, success) => {
                if (err) {
                    return reject(err);
                }

                return resolve(success);
            });
        });
    }

    dynamoPut(table:string, item:Object):Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
        return new Promise((resolve, reject) => {
            const itemParams = {
                TableName: table,
                Item: item
            };

            this.dynamoDb().put(itemParams, (err, success) => {
                if (err) {
                    return reject(err);
                }

                return resolve(success);
            });
        });
    }

    dynamoUpdate(params:AWS.DynamoDB.DocumentClient.UpdateItemInput):Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
        return new Promise(function (resolve, reject) {
            this.dynamoDb().update(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    dynamoGet(table:string, key:Object):Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
        let params = {
            TableName: table,
            Key: key
        };

        return new Promise((resolve, reject) => {
            this.dynamoDb().get(params, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }
}
