import type { VQLUQ } from "@wxn0brp/vql-client/vql";
import { Builder } from "./base.js";
export declare class RelationBuilder extends Builder {
    _path?: [
        string,
        string
    ];
    _relations?: Record<string, any>;
    _manyValue?: boolean;
    _selectValues?: string[];
    _optionsValue?: Record<string, any>;
    constructor(dbName: string);
    path(collection: string, field: string): this;
    relations(relations: Record<string, any>): this;
    many(many?: boolean): this;
    select(...fields: string[]): this;
    options(options: Record<string, any>): this;
    query(): VQLUQ;
}
