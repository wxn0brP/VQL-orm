import type { Arg, Search, Updater, VQLUQ } from "@wxn0brp/vql-client/vql";
import { deepMerge } from "./merge";

abstract class Builder {
    _vars: Record<string, any> = {};
    _collection: string;

    constructor(public _dbName: string) { }

    _buildQuery(op: string, data: any): VQLUQ {
        const q: any = { db: this._dbName, d: {} };
        const thisAny = this as any;

        if (thisAny._oneValue) op = op + "One";

        data = {
            collection: this._collection,
            ...data
        }

        if (thisAny._searchValue) data.search = thisAny._searchValue;

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
}

export class BaseBuilder extends Builder {
    _searchValue?: Search;
    _oneValue = false;

    constructor(dbName: string) {
        super(dbName);
    }

    where(search: Search) {
        this._searchValue = deepMerge(this._searchValue || {}, search);
        return this;
    }

    one(on = true) {
        this._oneValue = on;
        return this;
    }
}

export class FindBuilder extends BaseBuilder {
    _selectValues?: string[];
    _limitValue?: number;

    constructor(dbName: string, public _collection: string) {
        super(dbName);
    }

    select(...fields: string[]) {
        this._selectValues = (this._selectValues || []).concat(fields);
        return this;
    }

    limit(n: number) {
        this._limitValue = n;
        return this;
    }

    query(): VQLUQ {
        const data: any = {};
        if (this._selectValues?.length) data.select = this._selectValues;
        if (this._limitValue) data.limit = this._limitValue;
        return this._buildQuery("find", data);
    }
}

export class AddBuilder extends BaseBuilder {
    _idGen?: boolean;

    constructor(dbName: string, public _collection: string, public _dataValue: Arg<any>) {
        super(dbName);
    }

    id_gen(id_gen: boolean) {
        this._idGen = id_gen;
        return this;
    }

    query(): VQLUQ {
        const data: any = { data: this._dataValue };
        if (this._idGen !== undefined) data.id_gen = this._idGen;
        return this._buildQuery("add", data);
    }
}

export class UpdateBuilder extends BaseBuilder {
    _updaterValue?: Updater<any>;

    constructor(dbName: string, public _collection: string) {
        super(dbName);
    }

    updater(updater: Updater<any>) {
        this._updaterValue = updater;
        return this;
    }

    query(): VQLUQ {
        const data: any = {
            updater: this._updaterValue
        };
        return this._buildQuery("update", data);
    }
}

export class RemoveBuilder extends BaseBuilder {
    constructor(dbName: string, public _collection: string) {
        super(dbName);
    }

    query(): VQLUQ {
        return this._buildQuery("remove", {});
    }
}

export class UpdateOneOrAddBuilder extends Builder {
    _searchValue?: Search;
    _updaterValue!: Updater<any>;
    _addArg?: Arg<any>;
    _idGen?: boolean;

    constructor(dbName: string, public _collection: string) {
        super(dbName);
    }

    where(search: Search) {
        this._searchValue = deepMerge(this._searchValue || {}, search);
        return this;
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
        const data: any = { collection: this._collection, search: this._searchValue, updater: this._updaterValue };
        if (this._addArg) data.add_arg = this._addArg;
        if (this._idGen !== undefined) data.id_gen = this._idGen;
        return this._buildQuery("updateOneOrAdd", data);
    }
}

export class ToggleOneBuilder extends Builder {
    _searchValue?: Search;
    _dataValue?: Arg<any>;

    constructor(dbName: string, public _collection: string) {
        super(dbName);
    }

    where(search: Search) {
        this._searchValue = deepMerge(this._searchValue || {}, search);
        return this;
    }

    data(data: Arg<any>) {
        this._dataValue = data;
        return this;
    }

    query(): VQLUQ {
        const data: any = { collection: this._collection, search: this._searchValue };
        if (this._dataValue) data.data = this._dataValue;
        return this._buildQuery("toggleOne", data);
    }
}

export class CollectionOpBuilder extends Builder {
    constructor(dbName: string, public _op: string, public _collection: string) {
        super(dbName);
    }

    query(): VQLUQ {
        return this._buildQuery(this._op, { collection: this._collection });
    }
}

export class GetCollectionsBuilder extends Builder {
    query(): VQLUQ {
        return this._buildQuery("getCollections", {});
    }
}

export class VQL_ORM {
    constructor(public _dbName: string) { }

    setDbName(dbName: string) {
        this._dbName = dbName;
        return this;
    }

    find(collection: string) {
        return new FindBuilder(this._dbName, collection);
    }

    /** same as find */
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
        return new CollectionOpBuilder(this._dbName, "removeCollection", collection);
    }

    ensureCollection(collection: string) {
        return new CollectionOpBuilder(this._dbName, "ensureCollection", collection);
    }

    issetCollection(collection: string) {
        return new CollectionOpBuilder(this._dbName, "issetCollection", collection);
    }

    getCollections() {
        return new GetCollectionsBuilder(this._dbName);
    }
}

export function VO(db: string) {
    return new VQL_ORM(db);
}
