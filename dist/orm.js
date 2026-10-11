import { CollectionOpBuilder, GetCollectionsBuilder, RemoveBuilder } from "./index.js";
import { FindBuilder } from "./find.js";
import { AddBuilder, ToggleOneBuilder, UpdateBuilder, UpdateOneOrAddBuilder, } from "./modify.js";
import { RelationBuilder } from "./relation.js";
export class VQL_ORM {
    _dbName;
    constructor(_dbName) {
        this._dbName = _dbName;
    }
    setDbName(dbName) {
        this._dbName = dbName;
        return this;
    }
    find(collection) {
        return new FindBuilder(this._dbName, collection);
    }
    from(collection) {
        return new FindBuilder(this._dbName, collection);
    }
    add(collection, data) {
        return new AddBuilder(this._dbName, collection, data);
    }
    update(collection) {
        return new UpdateBuilder(this._dbName, collection);
    }
    remove(collection) {
        return new RemoveBuilder(this._dbName, collection);
    }
    updateOneOrAdd(collection) {
        return new UpdateOneOrAddBuilder(this._dbName, collection);
    }
    toggleOne(collection) {
        return new ToggleOneBuilder(this._dbName, collection);
    }
    removeCollection(collection) {
        return new CollectionOpBuilder(this._dbName, "removeCollection", collection);
    }
    ensureCollection(collection) {
        return new CollectionOpBuilder(this._dbName, "ensureCollection", collection);
    }
    issetCollection(collection) {
        return new CollectionOpBuilder(this._dbName, "issetCollection", collection);
    }
    getCollections() {
        return new GetCollectionsBuilder(this._dbName);
    }
    relation() {
        return new RelationBuilder(this._dbName);
    }
}
