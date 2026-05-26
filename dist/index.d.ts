import type { Arg, Search, Updater, VQLUQ } from "@wxn0brp/vql-client/vql";
declare abstract class Builder {
    _dbName: string;
    _vars: Record<string, any>;
    _collection: string;
    constructor(_dbName: string);
    _buildQuery(op: string, data: any): VQLUQ;
    var(name: string, value: any): this;
    vars(vars: Record<string, any>): this;
}
export declare class BaseBuilder extends Builder {
    _searchValue?: Search;
    _oneValue: boolean;
    constructor(dbName: string);
    where(search: Search): this;
    one(on?: boolean): this;
}
export declare class FindBuilder extends BaseBuilder {
    _collection: string;
    _selectValues?: string[];
    _limitValue?: number;
    constructor(dbName: string, _collection: string);
    select(...fields: string[]): this;
    limit(n: number): this;
    query(): VQLUQ;
}
export declare class AddBuilder extends BaseBuilder {
    _collection: string;
    _dataValue: Arg<any>;
    _idGen?: boolean;
    constructor(dbName: string, _collection: string, _dataValue: Arg<any>);
    id_gen(id_gen: boolean): this;
    query(): VQLUQ;
}
export declare class UpdateBuilder extends BaseBuilder {
    _collection: string;
    _updaterValue?: Updater<any>;
    constructor(dbName: string, _collection: string);
    updater(updater: Updater<any>): this;
    query(): VQLUQ;
}
export declare class RemoveBuilder extends BaseBuilder {
    _collection: string;
    constructor(dbName: string, _collection: string);
    query(): VQLUQ;
}
export declare class UpdateOneOrAddBuilder extends Builder {
    _collection: string;
    _searchValue?: Search;
    _updaterValue: Updater<any>;
    _addArg?: Arg<any>;
    _idGen?: boolean;
    constructor(dbName: string, _collection: string);
    where(search: Search): this;
    updater(updater: Updater<any>): this;
    add_arg(add_arg: Arg<any>): this;
    id_gen(id_gen: boolean): this;
    query(): VQLUQ;
}
export declare class ToggleOneBuilder extends Builder {
    _collection: string;
    _searchValue?: Search;
    _dataValue?: Arg<any>;
    constructor(dbName: string, _collection: string);
    where(search: Search): this;
    data(data: Arg<any>): this;
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
export declare class VQL_ORM {
    _dbName: string;
    constructor(_dbName: string);
    setDbName(dbName: string): this;
    find(collection: string): FindBuilder;
    /** same as find */
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
}
export declare function VO(db: string): VQL_ORM;
export {};
