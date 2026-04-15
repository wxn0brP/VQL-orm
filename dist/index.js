import { deepMerge } from "./merge.js";
export class VQL_ORM {
    dbName;
    _collection;
    _select;
    _search;
    _limit;
    _one;
    _vars;
    constructor(dbName) {
        this.dbName = dbName;
        this.reset();
    }
    setDbName(dbName) {
        this.dbName = dbName;
    }
    from(collection) {
        this._collection = collection;
        return this;
    }
    select(...select) {
        this._select = (this._select || []).concat(select);
        return this;
    }
    where(search) {
        this._search = deepMerge(this._search, search);
        return this;
    }
    limit(limit) {
        this._limit = limit;
        return this;
    }
    one(on = true) {
        this._one = on;
        return this;
    }
    var(name, value) {
        this._vars[name] = value;
        return this;
    }
    vars(vars) {
        this._vars = deepMerge(this._vars, vars);
        return this;
    }
    query() {
        const op = "find" + (this._one ? "One" : "");
        const q = {
            db: this.dbName,
            d: {}
        };
        const qData = {
            collection: this._collection,
            search: this._search,
        };
        if (Object.keys(this._select).length)
            qData.select = this._select;
        if (this._limit)
            qData.limit = this._limit;
        // @ts-ignore
        q.d[op] = qData;
        if (Object.keys(this._vars))
            q.var = this._vars;
        this.reset();
        return q;
    }
    reset() {
        this._collection = "";
        this._select = [];
        this._search = {};
        this._limit = 0;
        this._one = false;
        this._vars = {};
    }
}
export function VO(db) {
    return new VQL_ORM(db);
}
