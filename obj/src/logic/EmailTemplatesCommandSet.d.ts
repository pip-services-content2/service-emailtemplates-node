import { CommandSet } from 'pip-services3-commons-nodex';
import { IEmailTemplatesController } from './IEmailTemplatesController';
export declare class EmailTemplatesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEmailTemplatesController);
    private makeGetEmailTemplatesCommand;
    private makeGetEmailTemplateByIdCommand;
    private makeGetEmailTemplateByIdOrNameCommand;
    private makeCreateEmailTemplateCommand;
    private makeUpdateEmailTemplateCommand;
    private makeDeleteEmailTemplateByIdCommand;
}
