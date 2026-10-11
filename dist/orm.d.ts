import { Arg } from "@wxn0brp/vql-client/vql";
import { CollectionOpBuilder, GetCollectionsBuilder, RemoveBuilder } from "./index.js";
import { FindBuilder } from "./find.js";
import { AddBuilder, ToggleOneBuilder, UpdateBuilder, UpdateOneOrAddBuilder } from "./modify.js";
import { RelationBuilder } from "./relation.js";
export declare class VQL_ORM {
    _dbName: string;
    constructor(_dbName: string);
    setDbName(dbName: string): this;
    find(collection: string): FindBuilder;
    from(collection: string): FindBuilder;
    add(collection: string, data: Arg<any>): AddBuilder;
    update(collection: string): UpdateBuilder;
    remove(collection: string): RemoveBuilder;
    updateOneOrAdd(collection: string): UpdateOneOrAddBuilder;
    toggleOne(collection: string): ToggleOneBuilder;
    removeCollection(collection: string): CollectionOpBuilder;
    ensureCollection(collection: string): CollectionOpBuilder;
    issetCollection(collection: string): CollectionOpBuilder;
    getCollections(): GetCollectionsBuilder;
    relation(): RelationBuilder;
}
