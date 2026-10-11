import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { BaseBuilder, Builder } from "./base";

export class RemoveBuilder extends BaseBuilder {
	constructor(
		dbName: string,
		public _collection: string,
	) {
		super(dbName);
	}

	query(): VQLUQ {
		return this._buildQuery("remove", {});
	}
}

export class CollectionOpBuilder extends Builder {
	constructor(
		dbName: string,
		public _op: string,
		public _collection: string,
	) {
		super(dbName);
	}

	query(): VQLUQ {
		return this._buildQuery(this._op, {
			collection: this._collection,
		});
	}
}

export class GetCollectionsBuilder extends Builder {
	query(): VQLUQ {
		return this._buildQuery("getCollections", {});
	}
}
