import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { EmailTemplatesServiceFactory } from '../build/EmailTemplatesServiceFactory';

export class EmailTemplatesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("email_templates", "Email templates function");
        this._dependencyResolver.put('controller', new Descriptor('service-emailtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailTemplatesServiceFactory());
    }
}

export const handler = new EmailTemplatesLambdaFunction().getHandler();