import { Arg } from "@wxn0brp/vql-client/vql";
import { CollectionOpBuilder, GetCollectionsBuilder, RemoveBuilder } from ".";
import { FindBuilder } from "./find";
import {
	AddBuilder,
	ToggleOneBuilder,
	UpdateBuilder,
	UpdateOneOrAddBuilder,
} from "./modify";
import { RelationBuilder } from "./relation";

export class VQL_ORM {
	constructor(public _dbName: string) {}

	setDbName(dbName: string) {
		this._dbName = dbName;
		return this;
	}

	find(collection: string) {
		return new FindBuilder(this._dbName, collection);
	}

	from(collection: string) {
		return new FindBuilder(this._dbName, collection);
	}

	add(collection: string, data: Arg<any>) {
		return new AddBuilder(this._dbName, collection, data);
	}

	update(collection: string) {
		return new UpdateBuilder(this._dbName, collection);
	}

	remove(collection: string) {
		return new RemoveBuilder(this._dbName, collection);
	}

	updateOneOrAdd(collection: string) {
		return new UpdateOneOrAddBuilder(this._dbName, collection);
	}

	toggleOne(collection: string) {
		return new ToggleOneBuilder(this._dbName, collection);
	}

	removeCollection(collection: string) {
		return new CollectionOpBuilder(
			this._dbName,
			"removeCollection",
			collection,
		);
	}

	ensureCollection(collection: string) {
		return new CollectionOpBuilder(
			this._dbName,
			"ensureCollection",
			collection,
		);
	}

	issetCollection(collection: string) {
		return new CollectionOpBuilder(this._dbName, "issetCollection", collection);
	}

	getCollections() {
		return new GetCollectionsBuilder(this._dbName);
	}

	relation() {
		return new RelationBuilder(this._dbName);
	}
}
