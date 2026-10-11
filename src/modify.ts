import { Arg, Updater } from "@wxn0brp/vql-client/vql";
import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { BaseBuilder, Builder } from "./base";

export class AddBuilder extends BaseBuilder {
	_idGen?: boolean;

	constructor(
		dbName: string,
		public _collection: string,
		public _dataValue: Arg<any>,
	) {
		super(dbName);
	}

	id_gen(id_gen: boolean) {
		this._idGen = id_gen;
		return this;
	}

	query(): VQLUQ {
		const data: any = {
			data: this._dataValue,
		};
		if (this._idGen !== undefined) data.id_gen = this._idGen;
		return this._buildQuery("add", data);
	}
}
export class UpdateBuilder extends BaseBuilder {
	_updaterValue?: Updater<any>;

	constructor(
		dbName: string,
		public _collection: string,
	) {
		super(dbName);
	}

	updater(updater: Updater<any>) {
		this._updaterValue = updater;
		return this;
	}

	query(): VQLUQ {
		const data: any = {
			updater: this._updaterValue,
		};
		return this._buildQuery("update", data);
	}
}
export class UpdateOneOrAddBuilder extends Builder {
	_updaterValue!: Updater<any>;
	_addArg?: Arg<any>;
	_idGen?: boolean;

	constructor(
		dbName: string,
		public _collection: string,
	) {
		super(dbName);
	}

	updater(updater: Updater<any>) {
		this._updaterValue = updater;
		return this;
	}

	add_arg(add_arg: Arg<any>) {
		this._addArg = add_arg;
		return this;
	}

	id_gen(id_gen: boolean) {
		this._idGen = id_gen;
		return this;
	}

	query(): VQLUQ {
		const data: any = {
			updater: this._updaterValue,
		};
		if (this._addArg) data.add_arg = this._addArg;
		if (this._idGen !== undefined) data.id_gen = this._idGen;
		return this._buildQuery("updateOneOrAdd", data);
	}
}

export class ToggleOneBuilder extends Builder {
	_dataValue?: Arg<any>;

	constructor(
		dbName: string,
		public _collection: string,
	) {
		super(dbName);
	}

	data(data: Arg<any>) {
		this._dataValue = data;
		return this;
	}

	query(): VQLUQ {
		const data: any = {};
		if (this._dataValue) data.data = this._dataValue;
		return this._buildQuery("toggleOne", data);
	}
}
