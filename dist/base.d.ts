import type { Search, VQLUQ } from "@wxn0brp/vql-client/vql";
export declare abstract class Builder {
    _dbName: string;
    _vars: Record<string, any>;
    _collection: string;
    _searchValue?: Search;
    constructor(_dbName: string);
    _buildQuery(op: string, data: any): VQLUQ;
    var(name: string, value: any): this;
    vars(vars: Record<string, any>): this;
    where(search: Search): this;
}
export declare class BaseBuilder extends Builder {
    _oneValue: boolean;
    one(on?: boolean): this;
}
