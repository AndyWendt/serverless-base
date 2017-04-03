import {Contact} from "./ContactInterfaces";
import * as dynamoose from "dynamoose";
import {SchemaObject} from "dynamoose";

export class ContactRepository {
    Model: dynamoose.Model;

    constructor() {
        dynamoose.AWS.config.update({
            region: 'us-east-1'
        });

        const schema = new dynamoose.Schema(<SchemaObject>{
            id: { type: Number, hashKey: true },
        });

        this.Model = new dynamoose.Dynamoose().model('contacts', schema);
    }

    public put(contacts: Contact[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.Model.batchPut(contacts, {}, function (err, users) {
                if (err) { return reject(err); }
                resolve(users);
            });
        });
    }

    public all(): Promise<Contact[]> {
        return new Promise((resolve, reject) => {
            this.Model.scan<Contact>().exec((err, users) => {
                if (err) {
                    reject(err);
                }

                resolve(users);
            });
        });
    }
}
