import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { BaseBuilder, Builder } from "./base.js";
export declare class RemoveBuilder extends BaseBuilder {
    _collection: string;
    constructor(dbName: string, _collection: string);
    query(): VQLUQ;
}
export declare class CollectionOpBuilder extends Builder {
    _op: string;
    _collection: string;
    constructor(dbName: string, _op: string, _collection: string);
    query(): VQLUQ;
}
export declare class GetCollectionsBuilder extends Builder {
    query(): VQLUQ;
}
