import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { EmailTemplateV1Schema } from '../data/version1/EmailTemplateV1Schema';
import { IEmailTemplatesController } from './IEmailTemplatesController';

export class EmailTemplatesCommandSet extends CommandSet {
    private _logic: IEmailTemplatesController;

    constructor(logic: IEmailTemplatesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetEmailTemplatesCommand());
		this.addCommand(this.makeGetEmailTemplateByIdCommand());
		this.addCommand(this.makeGetEmailTemplateByIdOrNameCommand());
		this.addCommand(this.makeCreateEmailTemplateCommand());
		this.addCommand(this.makeUpdateEmailTemplateCommand());
		this.addCommand(this.makeDeleteEmailTemplateByIdCommand());
    }

	private makeGetEmailTemplatesCommand(): ICommand {
		return new Command(
			"get_templates",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getTemplates(correlationId, filter, paging);
            }
		);
	}

	private makeGetEmailTemplateByIdCommand(): ICommand {
		return new Command(
			"get_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let id = args.getAsString("template_id");
				return await this._logic.getTemplateById(correlationId, id);
            }
		);
	}

	private makeGetEmailTemplateByIdOrNameCommand(): ICommand {
		return new Command(
			"get_template_by_id_or_name",
			new ObjectSchema(true)
				.withRequiredProperty('id_or_name', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let idOrName = args.getAsString("id_or_name");
				return await this._logic.getTemplateByIdOrName(correlationId, idOrName);
            }
		);
	}

	private makeCreateEmailTemplateCommand(): ICommand {
		return new Command(
			"create_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new EmailTemplateV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let template = args.get("template");
				return await this._logic.createTemplate(correlationId, template);
            }
		);
	}

	private makeUpdateEmailTemplateCommand(): ICommand {
		return new Command(
			"update_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new EmailTemplateV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let template = args.get("template");
				return await this._logic.updateTemplate(correlationId, template);
            }
		);
	}
	
	private makeDeleteEmailTemplateByIdCommand(): ICommand {
		return new Command(
			"delete_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let id = args.getAsNullableString("template_id");
				return await this._logic.deleteTemplateById(correlationId, id);
			}
		);
	}

}