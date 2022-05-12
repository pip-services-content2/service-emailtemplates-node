import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class EmailTemplateV1 implements IStringIdentifiable {
    constructor(name: string, subject: any, text: any, html: any, status?: string);
    id: string;
    name: string;
    from: string;
    reply_to: string;
    subject: any;
    text: any;
    html: any;
    status: string;
}
