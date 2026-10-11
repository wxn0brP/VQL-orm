import { VQL_ORM } from "./orm.js";
export * from "./orm.js";
export * from "./other.js";
export * from "./relation.js";
export * from "./modify.js";
export * from "./find.js";
export * from "./base.js";
export function VO(db) {
    return new VQL_ORM(db);
}
