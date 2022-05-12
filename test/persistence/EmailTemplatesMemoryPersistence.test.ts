import { ConfigParams } from 'pip-services3-commons-nodex';

import { EmailTemplatesMemoryPersistence } from '../../src/persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesPersistenceFixture } from './EmailTemplatesPersistenceFixture';

suite('EmailTemplatesMemoryPersistence', ()=> {
    let persistence: EmailTemplatesMemoryPersistence;
    let fixture: EmailTemplatesPersistenceFixture;
    
    setup(async () => {
        persistence = new EmailTemplatesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new EmailTemplatesPersistenceFixture(persistence);
        
        await persistence.open(null);
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