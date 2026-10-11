import type { VQLUQ } from "@wxn0brp/vql-client/vql";
import { BaseBuilder } from "./base.js";
export declare class FindBuilder extends BaseBuilder {
    _collection: string;
    _selectValues?: string[];
    _limitValue?: number;
    _excludeValues?: string[];
    _optionsValue?: Record<string, any>;
    constructor(dbName: string, _collection: string);
    select(...fields: string[]): this;
    exclude(...fields: string[]): this;
    limit(n: number): this;
    offset(n: number): this;
    sortBy(field: string): this;
    sortAsc(asc?: boolean): this;
    reverse(rev?: boolean): this;
    min(field: any): this;
    max(field: any): this;
    avg(field: any): this;
    groupBy(field: any): this;
    count(field: any): this;
    _setOption(key: string, value: any): void;
    query(): VQLUQ;
}
