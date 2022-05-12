"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplatesServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const EmailTemplatesMongoDbPersistence_1 = require("../persistence/EmailTemplatesMongoDbPersistence");
const EmailTemplatesFilePersistence_1 = require("../persistence/EmailTemplatesFilePersistence");
const EmailTemplatesMemoryPersistence_1 = require("../persistence/EmailTemplatesMemoryPersistence");
const EmailTemplatesController_1 = require("../logic/EmailTemplatesController");
const EmailTemplatesHttpServiceV1_1 = require("../services/version1/EmailTemplatesHttpServiceV1");
class EmailTemplatesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailTemplatesServiceFactory.MemoryPersistenceDescriptor, EmailTemplatesMemoryPersistence_1.EmailTemplatesMemoryPersistence);
        this.registerAsType(EmailTemplatesServiceFactory.FilePersistenceDescriptor, EmailTemplatesFilePersistence_1.EmailTemplatesFilePersistence);
        this.registerAsType(EmailTemplatesServiceFactory.MongoDbPersistenceDescriptor, EmailTemplatesMongoDbPersistence_1.EmailTemplatesMongoDbPersistence);
        this.registerAsType(EmailTemplatesServiceFactory.ControllerDescriptor, EmailTemplatesController_1.EmailTemplatesController);
        this.registerAsType(EmailTemplatesServiceFactory.HttpServiceDescriptor, EmailTemplatesHttpServiceV1_1.EmailTemplatesHttpServiceV1);
    }
}
exports.EmailTemplatesServiceFactory = EmailTemplatesServiceFactory;
EmailTemplatesServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-emailtemplates", "factory", "default", "default", "1.0");
EmailTemplatesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-emailtemplates", "persistence", "memory", "*", "1.0");
EmailTemplatesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-emailtemplates", "persistence", "file", "*", "1.0");
EmailTemplatesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-emailtemplates", "persistence", "mongodb", "*", "1.0");
EmailTemplatesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-emailtemplates", "controller", "default", "*", "1.0");
EmailTemplatesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-emailtemplates", "service", "http", "*", "1.0");
//# sourceMappingURL=EmailTemplatesServiceFactory.js.map