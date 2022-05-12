const assert = require('chai').assert;

import { ConfigParams, MultiString } from 'pip-services3-commons-nodex';

import { EmailTemplateV1 } from '../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../src/data/version1/EmailTemplateStatusV1';
import { EmailTemplatesLambdaFunction } from '../../src/container/EmailTemplatesLambdaFunction';

let TEMPLATE1: EmailTemplateV1 = {
    id: '1',
    name: 'template1',
    from: null,
    reply_to: null,
    subject: new MultiString({ en: 'Text 1' }),
    text: new MultiString({ en: 'Text 1' }),
    html: new MultiString({ en: 'Text 1' }),
    status: EmailTemplateStatusV1.Completed
};
let TEMPLATE2: EmailTemplateV1 = {
    id: '2',
    name: 'template2',
    from: null,
    reply_to: null,
    subject: new MultiString({ en: 'Text 2' }),
    text: new MultiString({ en: 'Text 2' }),
    html: new MultiString({ en: 'Text 2' }),
    status: EmailTemplateStatusV1.Completed
};

suite('EmailTemplatesLambdaFunction', ()=> {
    let lambda: EmailTemplatesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-emailtemplates:persistence:memory:default:1.0',
            'controller.descriptor', 'service-emailtemplates:controller:default:default:1.0'
        );

        lambda = new EmailTemplatesLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        var template1, template2;

        // Create one template
        let template = await lambda.act(
            {
                role: 'email_templates',
                cmd: 'create_template',
                template: TEMPLATE1
            }
        );

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE1.name);
        assert.equal(template.text.en, TEMPLATE1.text.en);

        template1 = template;

        // Create another template
        template = await lambda.act(
            {
                role: 'email_templates',
                cmd: 'create_template',
                template: TEMPLATE2
            }
        );

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE2.name);
        assert.equal(template.text.en, TEMPLATE2.text.en);

        template2 = template;

        // Get all templates
        let page = await lambda.act(
            {
                role: 'email_templates',
                cmd: 'get_templates'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the template
        template1.text = { en: 'Updated Content 1' };

        template = await lambda.act(
            {
                role: 'email_templates',
                cmd: 'update_template',
                template: template1
            }
        );

        assert.isObject(template);
        assert.equal(template.text.en, 'Updated Content 1');
        assert.equal(template.name, TEMPLATE1.name);

        template1 = template;

        // Delete template
        await lambda.act(
            {
                role: 'email_templates',
                cmd: 'delete_template_by_id',
                template_id: template1.id
            }
        );

        // Try to get delete template
        template = await lambda.act(
            {
                role: 'email_templates',
                cmd: 'get_template_by_id',
                template_id: template1.id
            }
        );

        assert.isNull(template || null);
    });
});