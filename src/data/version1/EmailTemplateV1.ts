import { IdGenerator } from 'pip-services3-commons-nodex';
import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
import { EmailTemplateStatusV1 } from './EmailTemplateStatusV1';

export class EmailTemplateV1 implements IStringIdentifiable {

    public constructor(
        name: string, subject: any, text: any, html: any, status?: string) {
        
        this.id = IdGenerator.nextLong();
        this.name = name;
        this.subject = typeof subject == 'string' ? { en: subject } : subject;
        this.text = typeof text == 'string' ? { en: text } : text;
        this.html = typeof html == 'string' ? { en: html } : html;
        this.status = status || EmailTemplateStatusV1.New;
    }

    public id: string;
    public name: string;
    public from: string;
    public reply_to: string;
    public subject: any; // MultiString
    public text: any; // MultiString
    public html: any; // MultiString
    public status: string;

}