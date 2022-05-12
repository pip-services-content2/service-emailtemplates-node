"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplatesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_prometheus_nodex_1 = require("pip-services3-prometheus-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const EmailTemplatesServiceFactory_1 = require("../build/EmailTemplatesServiceFactory");
class EmailTemplatesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("email_templates", "Email templates microservice");
        this._factories.add(new EmailTemplatesServiceFactory_1.EmailTemplatesServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
        this._factories.add(new pip_services3_prometheus_nodex_1.DefaultPrometheusFactory);
    }
}
exports.EmailTemplatesProcess = EmailTemplatesProcess;
//# sourceMappingURL=EmailTemplatesProcess.js.map