const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { EmailTemplateV1 } from '../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../src/data/version1/EmailTemplateStatusV1';

import { IEmailTemplatesPersistence } from '../../src/persistence/IEmailTemplatesPersistence';

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
let TEMPLATE3: EmailTemplateV1 = {
    id: '3',
    name: 'template3',
    from: null,
    reply_to: null,
    subject: { en: 'Text 2' },
    text: { en: 'Text 2' },
    html: { en: 'Text 2' },
    status: EmailTemplateStatusV1.Translating
};

export class EmailTemplatesPersistenceFixture {
    private _persistence: IEmailTemplatesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateEmailTemplates() {
        // Create one template
        let template = await this._persistence.create(null, TEMPLATE1);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE1.name);
        assert.equal(template.status, TEMPLATE1.status);
        assert.equal(template.text.en, TEMPLATE1.text.en);

        // Create another template
        template = await this._persistence.create(null, TEMPLATE2);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE2.name);
        assert.equal(template.status, TEMPLATE2.status);
        assert.equal(template.text.en, TEMPLATE2.text.en);

        // Create yet another emailtemplate
        template = await this._persistence.create(null, TEMPLATE3);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE3.name);
        assert.equal(template.status, TEMPLATE3.status);
        assert.equal(template.text.en, TEMPLATE3.text.en);
    }
                
    public async testCrudOperations() {
        let template1: EmailTemplateV1;

        // Create items
        await this.testCreateEmailTemplates();

        // Get all emailtemplates
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        template1 = page.data[0];

        // Update the template
        template1.text.en = 'Updated Content 1';

        let template = await this._persistence.update(null, template1);
        
        assert.isObject(template);
        assert.equal(template.text.en, 'Updated Content 1');
        assert.equal(template.id, template1.id);

        // Get delete template by name
        template = await this._persistence.getOneByIdOrName(null, template1.name);

        assert.equal(template.id, template1.id);

        // Delete template
        await this._persistence.deleteById(null, template1.id);

        // Try to get delete template
        template = await this._persistence.getOneById(null, template1.id);

        assert.isNull(template || null);
    }

    public async testGetWithFilter() {
        // Create templates
        await this.testCreateEmailTemplates();

        // Get templates filtered by name
        let emailTemplates = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                name: TEMPLATE1.name
            }),
            new PagingParams()
        );

        assert.isObject(emailTemplates);
        assert.lengthOf(emailTemplates.data, 1);

        // Get templates searched by substring
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                search: 'temp'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        // Get templates filtered by status
        emailTemplates = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                status: TEMPLATE3.status
            }),
            new PagingParams()
        );

        assert.isObject(emailTemplates);
        assert.lengthOf(emailTemplates.data, 1);
    }

}
