import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { EmailTemplatesMongoDbPersistence } from '../persistence/EmailTemplatesMongoDbPersistence';
import { EmailTemplatesFilePersistence } from '../persistence/EmailTemplatesFilePersistence';
import { EmailTemplatesMemoryPersistence } from '../persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesController } from '../logic/EmailTemplatesController';
import { EmailTemplatesHttpServiceV1 } from '../services/version1/EmailTemplatesHttpServiceV1';


export class EmailTemplatesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-emailtemplates", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-emailtemplates", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-emailtemplates", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-emailtemplates", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-emailtemplates", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-emailtemplates", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailTemplatesServiceFactory.MemoryPersistenceDescriptor, EmailTemplatesMemoryPersistence);
		this.registerAsType(EmailTemplatesServiceFactory.FilePersistenceDescriptor, EmailTemplatesFilePersistence);
		this.registerAsType(EmailTemplatesServiceFactory.MongoDbPersistenceDescriptor, EmailTemplatesMongoDbPersistence);
		this.registerAsType(EmailTemplatesServiceFactory.ControllerDescriptor, EmailTemplatesController);
		this.registerAsType(EmailTemplatesServiceFactory.HttpServiceDescriptor, EmailTemplatesHttpServiceV1);
	}
	
}
