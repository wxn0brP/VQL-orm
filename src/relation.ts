import type { VQLUQ } from "@wxn0brp/vql-client/vql";
import { Builder } from "./base";

export class RelationBuilder extends Builder {
	_path?: [
		string,
		string,
	];
	_relations?: Record<string, any>;
	_manyValue?: boolean;
	_selectValues?: string[];
	_optionsValue?: Record<string, any>;

	constructor(dbName: string) {
		super(dbName);
	}

	path(collection: string, field: string) {
		this._path = [
			collection,
			field,
		];
		return this;
	}

	relations(relations: Record<string, any>) {
		this._relations = relations;
		return this;
	}

	many(many = true) {
		this._manyValue = many;
		return this;
	}

	select(...fields: string[]) {
		this._selectValues = (this._selectValues || []).concat(fields);
		return this;
	}

	options(options: Record<string, any>) {
		this._optionsValue = options;
		return this;
	}

	query(): VQLUQ {
		const r: any = {
			path: this._path,
			search: this._searchValue || {},
			relations: this._relations || {},
		};
		if (this._manyValue !== undefined) r.many = this._manyValue;
		if (this._selectValues?.length) r.select = this._selectValues;
		if (this._optionsValue) r.options = this._optionsValue;

		const q: any = {
			db: this._dbName,
			r,
		};
		if (Object.keys(this._vars).length) q.var = this._vars;
		return q as VQLUQ;
	}
}
