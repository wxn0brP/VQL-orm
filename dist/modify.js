import { BaseBuilder, Builder } from "./base.js";
export class AddBuilder extends BaseBuilder {
    _collection;
    _dataValue;
    _idGen;
    constructor(dbName, _collection, _dataValue) {
        super(dbName);
        this._collection = _collection;
        this._dataValue = _dataValue;
    }
    id_gen(id_gen) {
        this._idGen = id_gen;
        return this;
    }
    query() {
        const data = {
            data: this._dataValue,
        };
        if (this._idGen !== undefined)
            data.id_gen = this._idGen;
        return this._buildQuery("add", data);
    }
}
export class UpdateBuilder extends BaseBuilder {
    _collection;
    _updaterValue;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    updater(updater) {
        this._updaterValue = updater;
        return this;
    }
    query() {
        const data = {
            updater: this._updaterValue,
        };
        return this._buildQuery("update", data);
    }
}
export class UpdateOneOrAddBuilder extends Builder {
    _collection;
    _updaterValue;
    _addArg;
    _idGen;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    updater(updater) {
        this._updaterValue = updater;
        return this;
    }
    add_arg(add_arg) {
        this._addArg = add_arg;
        return this;
    }
    id_gen(id_gen) {
        this._idGen = id_gen;
        return this;
    }
    query() {
        const data = {
            updater: this._updaterValue,
        };
        if (this._addArg)
            data.add_arg = this._addArg;
        if (this._idGen !== undefined)
            data.id_gen = this._idGen;
        return this._buildQuery("updateOneOrAdd", data);
    }
}
export class ToggleOneBuilder extends Builder {
    _collection;
    _dataValue;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    data(data) {
        this._dataValue = data;
        return this;
    }
    query() {
        const data = {};
        if (this._dataValue)
            data.data = this._dataValue;
        return this._buildQuery("toggleOne", data);
    }
}
