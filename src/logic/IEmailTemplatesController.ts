import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';

export interface IEmailTemplatesController {
    getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>>;

    getTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1>;

    getTemplateByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1>;

    createTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1>;

    updateTemplate(correlationId: string, template: EmailTemplateV1): Promise<EmailTemplateV1>;

    deleteTemplateById(correlationId: string, id: string): Promise<EmailTemplateV1>;
}
