"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class EmailTemplateV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('from', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('reply_to', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('subject', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withRequiredProperty('text', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('html', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('status', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.EmailTemplateV1Schema = EmailTemplateV1Schema;
//# sourceMappingURL=EmailTemplateV1Schema.js.map