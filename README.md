# Serverless Base

Run `nvm install 6.10` and `nvm use 6.10` to get the right version of node. 

## Typescript

To compile: 

```bash
tsc
```

To watch and compile: 

```bash
tsc --watch
```

Or use the built-in WebStorm or PHPStorm compiler.

### Locally

https://github.com/motdotla/node-lambda
 
Install `node-lamda` globally and ensure that your project has the `aws-sdk` package. 

Run `node-lambda setup` and then fill in the appropriate values in the `.env`. If you use the `aws-sdk` in your code, 
you'll need to supply your AWS credentials. 

Some functions will require information from an `event.json`, you'll need to specify the path in the command call. 

* `node-lambda run --handler src/projectReports.emailProjectTimeTotals`

#### Unit Testing

https://github.com/vandium-io/lambda-tester

```javascript
const LambdaTester = require( 'lambda-tester' );

const myHandler = require( '../index' ).handler;

describe( 'handler', function() {

    it( 'test success', function() {

        return LambdaTester( myHandler )
            .event( { name: 'Fred' } )
            .expectResult();
    });
});
```

### JWT Generation

Installation: `npm install -g jwtgen`

`jwt-secret-from-auth0` is your `AUTH0-SECRET`.  For unit testing the `AUTH0-SECRET` is `secret`.

Since we did not specify an expiration, the token should be good indefinitely. 

```bash
jwtgen -a HS256 -c "email=dev@test.com" -s "jwt-secret-from-auth0"
```

## Setup

### Serverless installation

```bash
npm install serverless -g
```


### AWS CLI Installation

AWS CLI Install: https://aws.amazon.com/cli/

```bash
pip install awscli
```

### Configure AWS


Have your AWS `Secret Access Key` and your `Access Key ID` ready. Those should have been sent to you by the project lead.

AWS will prompt you for your `Secret Access Key` and your `Access Key ID`.   

Use `us-west-2` for the `Default region name`.

```bash
aws configure --profile yourawsprofile
```

## Deployment

To deploy: 

```bash
# Dev
serverless deploy --stage dev

# Staging
serverless deploy --stage staging

# Production
serverless deploy --stage production
```

To remove a deployment: 

```bash
serverless remove -v --stage dev
```


### Lambda Environment Variables

See the `app/serverless.yml` for the necessary environment variables that need to be added to lambda.  

The Auth0 Secret comes from the Auth0 dashboard. 

https://github.com/serverless/examples/blob/master/aws-node-env-variables-encrypted-in-a-file/README.md

```bash
# You must decrypt for each stage that you will be using
serverless encrypt --stage staging --password 'pwd'
serverless decrypt --stage staging --password 'pwd'
```

## DynamoDB Resources

http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

https://github.com/automategreen/dynamoose
