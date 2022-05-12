"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.EmailTemplatesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const EmailTemplatesServiceFactory_1 = require("../build/EmailTemplatesServiceFactory");
class EmailTemplatesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("email_templates", "Email templates function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-emailtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailTemplatesServiceFactory_1.EmailTemplatesServiceFactory());
    }
}
exports.EmailTemplatesLambdaFunction = EmailTemplatesLambdaFunction;
exports.handler = new EmailTemplatesLambdaFunction().getHandler();
//# sourceMappingURL=EmailTemplatesLambdaFunction.js.map