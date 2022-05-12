import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';

export interface IEmailTemplatesPersistence extends IGetter<EmailTemplateV1, string>, IWriter<EmailTemplateV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>>;

    getOneById(correlationId: string, id: string): Promise<EmailTemplateV1>;

    getOneByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1>;

    create(correlationId: string, item: EmailTemplateV1): Promise<EmailTemplateV1>;

    update(correlationId: string, item: EmailTemplateV1): Promise<EmailTemplateV1>;

    deleteById(correlationId: string, id: string): Promise<EmailTemplateV1>;
}
