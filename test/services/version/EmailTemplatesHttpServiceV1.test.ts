const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { EmailTemplateV1 } from '../../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../../src/data/version1/EmailTemplateStatusV1';
import { EmailTemplatesMemoryPersistence } from '../../../src/persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesController } from '../../../src/logic/EmailTemplatesController';
import { EmailTemplatesHttpServiceV1 } from '../../../src/services/version1/EmailTemplatesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let TEMPLATE1: EmailTemplateV1 = {
    id: '1',
    name: 'template1',
    from: null,
    reply_to: null,
    subject: { en: 'Text 1' },
    text: { en: 'Text 1' },
    html: { en: 'Text 1' },
    status: EmailTemplateStatusV1.Completed
};
let TEMPLATE2: EmailTemplateV1 = {
    id: '2',
    name: 'template2',
    from: null,
    reply_to: null,
    subject: { en: 'Text 2' },
    text: { en: 'Text 2' },
    html: { en: 'Text 2' },
    status: EmailTemplateStatusV1.Completed
};

suite('EmailTemplatesHttpServiceV1', ()=> {    
    let service: EmailTemplatesHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new EmailTemplatesMemoryPersistence();
        let controller = new EmailTemplatesController();

        service = new EmailTemplatesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-emailtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-emailtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-emailtemplates', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', async () => {
        let template1, template2;

        // Create one template
        let template = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email_templates/create_template',
                {
                    template: TEMPLATE1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE1.name);
        assert.equal(template.text.en, TEMPLATE1.text.en);

        template1 = template;

        // Create another template
        template = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email_templates/create_template',
                {
                    template: TEMPLATE2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE2.name);
        assert.equal(template.text.en, TEMPLATE2.text.en);

        template2 = template;

        // Get all templates
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email_templates/get_templates',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the template
        template1.text = { en: 'Updated Content 1' };

        template = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email_templates/update_template',
                {
                    template: template1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template);
        assert.equal(template.text.en, 'Updated Content 1');
        assert.equal(template.name, TEMPLATE1.name);

        template1 = template;

        // Delete template
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email_templates/delete_template_by_id',
                {
                    template_id: template1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

        // Try to get delete template
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email_templates/get_template_by_id',
                {
                    template_id: template1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);
    });
});