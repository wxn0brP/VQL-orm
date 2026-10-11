import { Arg, Updater } from "@wxn0brp/vql-client/vql";
import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { BaseBuilder, Builder } from "./base.js";
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
export declare class UpdateOneOrAddBuilder extends Builder {
    _collection: string;
    _updaterValue: Updater<any>;
    _addArg?: Arg<any>;
    _idGen?: boolean;
    constructor(dbName: string, _collection: string);
    updater(updater: Updater<any>): this;
    add_arg(add_arg: Arg<any>): this;
    id_gen(id_gen: boolean): this;
    query(): VQLUQ;
}
export declare class ToggleOneBuilder extends Builder {
    _collection: string;
    _dataValue?: Arg<any>;
    constructor(dbName: string, _collection: string);
    data(data: Arg<any>): this;
    query(): VQLUQ;
}
