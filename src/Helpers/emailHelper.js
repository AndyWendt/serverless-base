'use strict';

const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1"
});

const ses = new AWS.SES();

exports.sendEmail = sendEmail;

function sendEmail(from, to, subject, message, done) {
    const params = {
        Destination: {
            ToAddresses: to
        },
        Message: {
            Body: {
                Html: {
                    Data: message,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: subject,
                Charset: 'UTF-8'
            }
        },
        Source: from
    };

    ses.sendEmail(params, done);
}