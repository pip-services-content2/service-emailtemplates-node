import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class EmailTemplatesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/email_templates');
        this._dependencyResolver.put('controller', new Descriptor('service-emailtemplates', 'controller', 'default', '*', '1.0'));
    }
}