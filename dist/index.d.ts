import type { Search, VQLUQ } from "@wxn0brp/vql-client/vql";
export declare class VQL_ORM {
    dbName: string;
    _collection: string;
    _select: string[];
    _search: Search;
    _limit: number;
    _one: boolean;
    _vars: Record<string, any>;
    constructor(dbName: string);
    setDbName(dbName: string): void;
    from(collection: string): this;
    select(...select: string[]): this;
    where(search: Search): this;
    limit(limit: number): this;
    one(on?: boolean): this;
    var(name: string, value: any): this;
    vars(vars: Record<string, any>): this;
    query(): VQLUQ;
    reset(): void;
}
export declare function VO(db: string): VQL_ORM;
