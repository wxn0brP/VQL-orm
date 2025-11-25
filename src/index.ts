import type { Search, VQL_OP_Find, VQL_Query, VQLUQ } from "@wxn0brp/vql-client/vql";
import { deepMerge } from "./merge";

export class VQL_ORM {
    _collection: string;
    _select: string[];
    _search: Search;
    _limit: number;
    _one: boolean;
    _vars: Record<string, any>;

    constructor(public dbName: string) {
        this.reset();
    }

    setDbName(dbName: string) {
        this.dbName = dbName;
    }

    from(collection: string) {
        this._collection = collection;
        return this;
    }

    select(...select: string[]) {
        this._select = (this._select || []).concat(select);
        return this;
    }

    where(search: Search) {
        this._search = deepMerge(this._search, search);
        return this;
    }

    limit(limit: number) {
        this._limit = limit;
        return this;
    }

    one(on = true) {
        this._one = on;
        return this;
    }

    var(name: string, value: any) {
        this._vars[name] = value;
        return this;
    }

    vars(vars: Record<string, any>) {
        this._vars = deepMerge(this._vars, vars);
        return this;
    }

    query(): VQLUQ {
        const op = "find" + (this._one ? "One" : "");
        const q: VQL_Query = {
            db: this.dbName,
            d: {}
        } as any;

        const qData: VQL_OP_Find = {
            collection: this._collection,
            search: this._search,
        }

        if (Object.keys(this._select).length) qData.select = this._select;
        if (this._limit) qData.limit = this._limit;

        // @ts-ignore
        q.d[op] = qData;

        if (Object.keys(this._vars)) q.var = this._vars;

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

export function VO(db: string) {
    return new VQL_ORM(db);
}