import { BaseBuilder } from "./base.js";
export class FindBuilder extends BaseBuilder {
    _collection;
    _selectValues;
    _limitValue;
    _excludeValues;
    _optionsValue;
    constructor(dbName, _collection) {
        super(dbName);
        this._collection = _collection;
    }
    select(...fields) {
        this._selectValues = (this._selectValues || []).concat(fields);
        return this;
    }
    exclude(...fields) {
        this._excludeValues = (this._excludeValues || []).concat(fields);
        return this;
    }
    limit(n) {
        this._limitValue = n;
        return this;
    }
    offset(n) {
        this._setOption("offset", n);
        return this;
    }
    sortBy(field) {
        this._setOption("sortBy", field);
        return this;
    }
    sortAsc(asc = true) {
        this._setOption("sortAsc", asc);
        return this;
    }
    reverse(rev = true) {
        this._setOption("reverse", rev);
        return this;
    }
    min(field) {
        this._setOption("min", field);
        return this;
    }
    max(field) {
        this._setOption("max", field);
        return this;
    }
    avg(field) {
        this._setOption("avg", field);
        return this;
    }
    groupBy(field) {
        this._setOption("groupBy", field);
        return this;
    }
    count(field) {
        this._setOption("count", field);
        return this;
    }
    _setOption(key, value) {
        this._optionsValue = {
            ...this._optionsValue,
            [key]: value,
        };
    }
    query() {
        const data = {};
        if (this._selectValues?.length)
            data.select = this._selectValues;
        if (this._limitValue)
            data.limit = this._limitValue;
        if (this._optionsValue)
            data.options = this._optionsValue;
        const searchOpts = {};
        if (this._excludeValues?.length)
            searchOpts.exclude = this._excludeValues;
        if (Object.keys(searchOpts).length)
            data.searchOpts = searchOpts;
        return this._buildQuery("find", data);
    }
}
