import { deepMerge } from "./merge.js";
export class Builder {
    _dbName;
    _vars = {};
    _collection;
    _searchValue;
    constructor(_dbName) {
        this._dbName = _dbName;
    }
    _buildQuery(op, data) {
        const q = {
            db: this._dbName,
            d: {},
        };
        const thisAny = this;
        if (thisAny._oneValue)
            op = op + "One";
        data = {
            collection: this._collection,
            ...data,
        };
        if (this._searchValue)
            data.search = this._searchValue;
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
    where(search) {
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
