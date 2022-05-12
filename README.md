# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> EmailTemplates microservice

This is emailtemplates microservice from Pip.Services library. 
It shows to users inspirational emailtemplates on various topics.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process
* External APIs: HTTP/REST
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/client-emailtemplates-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class EmailTemplateV1 implements IStringIdentifiable {
    public id: string;
    public name: string;
    public from: string,
    public reply_to: string,
    public subject: MultiString;
    public text: MultiString;
    public html: MultiString;
    public status: string;
}

class EmailTemplateStatusV1 {
    public static readonly New = "new";
    public static readonly Writing = "writing";
    public static readonly Translating = "translating";
    public static readonly Verifying = "verifying";
    public static readonly Completed = "completed";
}

interface IEmailTemplatesV1 {
    getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>>;

    getTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1>;

    getTemplateByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1>;

    createTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1>;

    updateTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1>;

    deleteTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-emailtemplates-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services:container-info:default:default:1.0"
  name: "service-emailtemplates"
  description: "EmailTemplates microservice"

- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-emailtemplates:persistence:file:default:1.0"
  path: "./data/email_templates.json"

- descriptor: "service-emailtemplates:controller:default:default:1.0"

- descriptor: "service-emailtemplates:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-emailtemplates-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('client-emailtemplates-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.EmailTemplatesHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new emailtemplate
var template = {
    name: 'Welcome',
    subject: { en: 'Welcome to our product' },
    text: { en: 'Welcome <%= name %>!' },
    html: { en: '<h1>Welcome <%= name %>!<h1>' },
    status: 'completed'
};

let template = await client.createTemplate(
    null,
    template
);
```

```javascript
// Get welcome email template
let template = await client.getTemplateByIdOrName(
    null, 'Welcome'
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
