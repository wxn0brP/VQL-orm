import { BaseBuilder, Builder } from "./base.js";
export class RemoveBuilder extends BaseBuilder {
    _collection;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    query() {
        return this._buildQuery("remove", {});
    }
}
export class CollectionOpBuilder extends Builder {
    _op;
    _collection;
    constructor(dbName, _op, _collection) {
        super(dbName);
        this._op = _op;
        this._collection = _collection;
    }
    query() {
        return this._buildQuery(this._op, {
            collection: this._collection,
        });
    }
}
export class GetCollectionsBuilder extends Builder {
    query() {
        return this._buildQuery("getCollections", {});
    }
}
