import { Builder } from "./base.js";
export class RelationBuilder extends Builder {
    _path;
    _relations;
    _manyValue;
    _selectValues;
    _optionsValue;
    constructor(dbName) {
        super(dbName);
    }
    path(collection, field) {
        this._path = [
            collection,
            field,
        ];
        return this;
    }
    relations(relations) {
        this._relations = relations;
        return this;
    }
    many(many = true) {
        this._manyValue = many;
        return this;
    }
    select(...fields) {
        this._selectValues = (this._selectValues || []).concat(fields);
        return this;
    }
    options(options) {
        this._optionsValue = options;
        return this;
    }
    query() {
        const r = {
            path: this._path,
            search: this._searchValue || {},
            relations: this._relations || {},
        };
        if (this._manyValue !== undefined)
            r.many = this._manyValue;
        if (this._selectValues?.length)
            r.select = this._selectValues;
        if (this._optionsValue)
            r.options = this._optionsValue;
        const q = {
            db: this._dbName,
            r,
        };
        if (Object.keys(this._vars).length)
            q.var = this._vars;
        return q;
    }
}
