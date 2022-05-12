"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const EmailTemplateStatusV1_1 = require("./EmailTemplateStatusV1");
class EmailTemplateV1 {
    constructor(name, subject, text, html, status) {
        this.id = pip_services3_commons_nodex_1.IdGenerator.nextLong();
        this.name = name;
        this.subject = typeof subject == 'string' ? { en: subject } : subject;
        this.text = typeof text == 'string' ? { en: text } : text;
        this.html = typeof html == 'string' ? { en: html } : html;
        this.status = status || EmailTemplateStatusV1_1.EmailTemplateStatusV1.New;
    }
}
exports.EmailTemplateV1 = EmailTemplateV1;
//# sourceMappingURL=EmailTemplateV1.js.map