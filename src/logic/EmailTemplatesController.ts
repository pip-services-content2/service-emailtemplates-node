import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../data/version1/EmailTemplateStatusV1';
import { IEmailTemplatesPersistence } from '../persistence/IEmailTemplatesPersistence';
import { IEmailTemplatesController } from './IEmailTemplatesController';
import { EmailTemplatesCommandSet } from './EmailTemplatesCommandSet';

export class EmailTemplatesController implements  IConfigurable, IReferenceable, ICommandable, IEmailTemplatesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-emailtemplates:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EmailTemplatesController._defaultConfig);
    private _persistence: IEmailTemplatesPersistence;
    private _commandSet: EmailTemplatesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IEmailTemplatesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EmailTemplatesCommandSet(this);
        return this._commandSet;
    }
    
    public async getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1> {
        return await this._persistence.getOneById(correlationId, id);        
    }

    public async getTemplateByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1> {
        return await this._persistence.getOneByIdOrName(correlationId, idOrName);
    }

    public async createTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1> {

        template.status = template.status || EmailTemplateStatusV1.New;

        return await this._persistence.create(correlationId, template);
    }

    public async updateTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1> {

        template.status = template.status || EmailTemplateStatusV1.New;

        return await this._persistence.update(correlationId, template);
    }

    public async deleteTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1> {  
        return await this._persistence.deleteById(correlationId, id);
    }

}
