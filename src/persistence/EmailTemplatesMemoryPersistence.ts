import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { IEmailTemplatesPersistence } from './IEmailTemplatesPersistence';

export class EmailTemplatesMemoryPersistence 
    extends IdentifiableMemoryPersistence<EmailTemplateV1, string> 
    implements IEmailTemplatesPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchMultilanguageString(value: any, search: string): boolean {
        for (let prop in value) {
            if (value.hasOwnProperty(prop)) {
                let text = '' + value[prop];
                if (this.matchString(text, search))
                    return true;
            }
        }
        return false;
    }

    private matchSearch(item: EmailTemplateV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        if (this.matchMultilanguageString(item.subject, search))
            return true;
        if (this.matchMultilanguageString(item.text, search))
            return true;
        if (this.matchMultilanguageString(item.html, search))
            return true;
        if (this.matchString(item.status, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let status = filter.getAsNullableString('status');
        let name = filter.getAsNullableString('name');
        
        return (item) => {
            if (id && item.id != id) 
                return false;
            if (name && item.name != name) 
                return false;
            if (status && item.status != status) 
                return false;
            if (search && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EmailTemplateV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByIdOrName(correlationId: string, idOrName: string): Promise<EmailTemplateV1> {
        let item = this._items.find((item) => item.id == idOrName || item.name == idOrName);

        if (item == null) {
            this._logger.trace(correlationId, "Found item by %s", idOrName);
            throw new NotFoundException(
                correlationId,
                'EMAIL_TEMPLATE_NOT_FOUND',
                'Email template ' + idOrName + ' was not found'
            ).withDetails('id_or_name', idOrName);
            
        } 

        this._logger.trace(correlationId, "Found item by %s", idOrName);
        return item;
    }

}
