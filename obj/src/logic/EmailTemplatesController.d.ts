import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { IEmailTemplatesController } from './IEmailTemplatesController';
export declare class EmailTemplatesController implements IConfigurable, IReferenceable, ICommandable, IEmailTemplatesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>>;
    getTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1>;
    getTemplateByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1>;
    createTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1>;
    updateTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1>;
    deleteTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1>;
}
