import type { Search, VQLUQ } from "@wxn0brp/vql-client/vql";
import { deepMerge } from "./merge";

export abstract class Builder {
	_vars: Record<string, any> = {};
	_collection: string;
	_searchValue?: Search;

	constructor(public _dbName: string) {}

	_buildQuery(op: string, data: any): VQLUQ {
		const q: any = {
			db: this._dbName,
			d: {},
		};
		const thisAny = this as any;

		if (thisAny._oneValue) op = op + "One";

		data = {
			collection: this._collection,
			...data,
		};

		if (this._searchValue) data.search = this._searchValue;

		q.d[op] = data;

		if (Object.keys(this._vars).length) q.var = this._vars;

		return q as VQLUQ;
	}

	var(name: string, value: any) {
		this._vars[name] = value;
		return this;
	}

	vars(vars: Record<string, any>) {
		this._vars = deepMerge(this._vars, vars);
		return this;
	}

	where(search: Search) {
		this._searchValue = deepMerge(this._searchValue || {}, search);
		return this;
	}
}

export class BaseBuilder extends Builder {
	_oneValue = false;

	one(on = true) {
		this._oneValue = on;
		return this;
	}
}
