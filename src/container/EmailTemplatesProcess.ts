import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultPrometheusFactory } from 'pip-services3-prometheus-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { EmailTemplatesServiceFactory } from '../build/EmailTemplatesServiceFactory';

export class EmailTemplatesProcess extends ProcessContainer {

    public constructor() {
        super("email_templates", "Email templates microservice");
        this._factories.add(new EmailTemplatesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
        this._factories.add(new DefaultPrometheusFactory);
    }

}
