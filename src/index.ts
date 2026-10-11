import { VQL_ORM } from "./orm";

export * from "./orm";
export * from "./other";
export * from "./relation";
export * from "./modify";
export * from "./find";
export * from "./base";

export function VO(db: string) {
	return new VQL_ORM(db);
}
