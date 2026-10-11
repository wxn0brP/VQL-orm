import type { VQLUQ } from "@wxn0brp/vql-client/vql";
import { BaseBuilder } from "./base";

export class FindBuilder extends BaseBuilder {
	_selectValues?: string[];
	_limitValue?: number;
	_excludeValues?: string[];
	_optionsValue?: Record<string, any>;

	constructor(
		dbName: string,
		public _collection: string,
	) {
		super(dbName);
	}

	select(...fields: string[]) {
		this._selectValues = (this._selectValues || []).concat(fields);
		return this;
	}

	exclude(...fields: string[]) {
		this._excludeValues = (this._excludeValues || []).concat(fields);
		return this;
	}

	limit(n: number) {
		this._limitValue = n;
		return this;
	}

	offset(n: number) {
		this._setOption("offset", n);
		return this;
	}

	sortBy(field: string) {
		this._setOption("sortBy", field);
		return this;
	}

	sortAsc(asc = true) {
		this._setOption("sortAsc", asc);
		return this;
	}

	reverse(rev = true) {
		this._setOption("reverse", rev);
		return this;
	}

	min(field: any) {
		this._setOption("min", field);
		return this;
	}

	max(field: any) {
		this._setOption("max", field);
		return this;
	}

	avg(field: any) {
		this._setOption("avg", field);
		return this;
	}

	groupBy(field: any) {
		this._setOption("groupBy", field);
		return this;
	}

	count(field: any) {
		this._setOption("count", field);
		return this;
	}

	_setOption(key: string, value: any) {
		this._optionsValue = {
			...this._optionsValue,
			[key]: value,
		};
	}

	query(): VQLUQ {
		const data: any = {};
		if (this._selectValues?.length) data.select = this._selectValues;
		if (this._limitValue) data.limit = this._limitValue;
		if (this._optionsValue) data.options = this._optionsValue;

		const searchOpts: any = {};
		if (this._excludeValues?.length) searchOpts.exclude = this._excludeValues;
		if (Object.keys(searchOpts).length) data.searchOpts = searchOpts;

		return this._buildQuery("find", data);
	}
}
