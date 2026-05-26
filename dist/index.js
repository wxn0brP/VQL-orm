import { deepMerge } from "./merge.js";
class Builder {
    _dbName;
    _vars = {};
    _collection;
    constructor(_dbName) {
        this._dbName = _dbName;
    }
    _buildQuery(op, data) {
        const q = { db: this._dbName, d: {} };
        const thisAny = this;
        if (thisAny._oneValue)
            op = op + "One";
        data = {
            collection: this._collection,
            ...data
        };
        if (thisAny._searchValue)
            data.search = thisAny._searchValue;
        q.d[op] = data;
        if (Object.keys(this._vars).length)
            q.var = this._vars;
        return q;
    }
    var(name, value) {
        this._vars[name] = value;
        return this;
    }
    vars(vars) {
        this._vars = deepMerge(this._vars, vars);
        return this;
    }
}
export class BaseBuilder extends Builder {
    _searchValue;
    _oneValue = false;
    constructor(dbName) {
        super(dbName);
    }
    where(search) {
        this._searchValue = deepMerge(this._searchValue || {}, search);
        return this;
    }
    one(on = true) {
        this._oneValue = on;
        return this;
    }
}
export class FindBuilder extends BaseBuilder {
    _collection;
    _selectValues;
    _limitValue;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    select(...fields) {
        this._selectValues = (this._selectValues || []).concat(fields);
        return this;
    }
    limit(n) {
        this._limitValue = n;
        return this;
    }
    query() {
        const data = {};
        if (this._selectValues?.length)
            data.select = this._selectValues;
        if (this._limitValue)
            data.limit = this._limitValue;
        return this._buildQuery("find", data);
    }
}
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
        const data = { data: this._dataValue };
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
            updater: this._updaterValue
        };
        return this._buildQuery("update", data);
    }
}
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
export class UpdateOneOrAddBuilder extends Builder {
    _collection;
    _searchValue;
    _updaterValue;
    _addArg;
    _idGen;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    where(search) {
        this._searchValue = deepMerge(this._searchValue || {}, search);
        return this;
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
        const data = { collection: this._collection, search: this._searchValue, updater: this._updaterValue };
        if (this._addArg)
            data.add_arg = this._addArg;
        if (this._idGen !== undefined)
            data.id_gen = this._idGen;
        return this._buildQuery("updateOneOrAdd", data);
    }
}
export class ToggleOneBuilder extends Builder {
    _collection;
    _searchValue;
    _dataValue;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    where(search) {
        this._searchValue = deepMerge(this._searchValue || {}, search);
        return this;
    }
    data(data) {
        this._dataValue = data;
        return this;
    }
    query() {
        const data = { collection: this._collection, search: this._searchValue };
        if (this._dataValue)
            data.data = this._dataValue;
        return this._buildQuery("toggleOne", data);
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
        return this._buildQuery(this._op, { collection: this._collection });
    }
}
export class GetCollectionsBuilder extends Builder {
    query() {
        return this._buildQuery("getCollections", {});
    }
}
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
    /** same as find */
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
}
export function VO(db) {
    return new VQL_ORM(db);
}
