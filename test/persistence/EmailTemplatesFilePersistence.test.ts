import { EmailTemplatesFilePersistence } from '../../src/persistence/EmailTemplatesFilePersistence';
import { EmailTemplatesPersistenceFixture } from './EmailTemplatesPersistenceFixture';

suite('EmailTemplatesFilePersistence', ()=> {
    let persistence: EmailTemplatesFilePersistence;
    let fixture: EmailTemplatesPersistenceFixture;
    
    setup(async () => {
        persistence = new EmailTemplatesFilePersistence('./data/email_templates.test.json');

        fixture = new EmailTemplatesPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});