import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { IEmailTemplatesPersistence } from './IEmailTemplatesPersistence';
export declare class EmailTemplatesMemoryPersistence extends IdentifiableMemoryPersistence<EmailTemplateV1, string> implements IEmailTemplatesPersistence {
    constructor();
    private matchString;
    private matchMultilanguageString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>>;
    getOneByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1>;
}
