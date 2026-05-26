import { expect, test } from "bun:test";
import { VO } from "../src/index";
import type { Search, Updater, Arg } from "@wxn0brp/vql-client/vql";

test("1. basic query building", () => {
    const orm = VO("testDB");
    const query: any = orm
        .from("users")
        .select("name", "email")
        .where({ $gt: { age: 18 } })
        .limit(10)
        .query();

    expect(query.db).toBe("testDB");
    expect(query.d.find.collection).toBe("users");
    expect(query.d.find.select).toEqual(["name", "email"]);
    expect(query.d.find.search.$gt.age).toBe(18);
    expect(query.d.find.limit).toBe(10);
});

test("2. findOne query", () => {
    const orm = VO("testDB");
    const query: any = orm.find("users").one().select("id").where({ id: 1 }).query();

    expect(query.d.findOne).toBeDefined();
    expect(query.d.findOne.collection).toBe("users");
    expect(query.d.findOne.select).toEqual(["id"]);
    expect(query.d.findOne.search.id).toBe(1);
});

test("3. vars functionality", () => {
    const orm = VO("testDB");
    const query: any = orm.from("users").var("userId", 123).vars({ status: "active" }).query();

    expect(query.var.userId).toBe(123);
    expect(query.var.status).toBe("active");
});

test("4. query generation after chaining", () => {
    const orm = VO("testDB")
        .from("posts")
        .select("title", "content")
        .where({ published: true })
        .limit(5)
        .one(true);

    const query: any = orm.query();
    expect(query.d.findOne.collection).toBe("posts");
    expect(query.d.findOne.select).toEqual(["title", "content"]);
    expect(query.d.findOne.search.published).toBe(true);
    expect(query.d.findOne.limit).toBe(5);
});

test("5. set database name", () => {
    const orm = VO("testDB");
    orm.setDbName("newDB");

    expect(orm._dbName).toBe("newDB");
});

test("6. add query", () => {
    const orm = VO("testDB");
    const data: Arg<any> = { name: "John", age: 25 };
    const query: any = orm.add("users", data).query();

    expect(query.d.add.collection).toBe("users");
    expect(query.d.add.data).toEqual(data);
});

test("7. add query with id_gen", () => {
    const orm = VO("testDB");
    const data: Arg<any> = { name: "John" };
    const query: any = orm.add("users", data).id_gen(true).query();

    expect(query.d.add.collection).toBe("users");
    expect(query.d.add.data).toEqual(data);
    expect(query.d.add.id_gen).toBe(true);
});

test("8. update query", () => {
    const orm = VO("testDB");
    const search: Search = { id: 1 };
    const updater: Updater<any> = { $set: { name: "Jane" } };
    const query: any = orm.update("users").where(search).updater(updater).query();

    expect(query.d.update.collection).toBe("users");
    expect(query.d.update.search).toEqual(search);
    expect(query.d.update.updater).toEqual(updater);
});

test("9. updateOne query", () => {
    const orm = VO("testDB");
    const search: Search = { id: 1 };
    const updater: Updater<any> = { $set: { name: "Jane" } };
    const query: any = orm.update("users").where(search).updater(updater).one().query();

    expect(query.d.updateOne.collection).toBe("users");
    expect(query.d.updateOne.search).toEqual(search);
    expect(query.d.updateOne.updater).toEqual(updater);
});

test("10. remove query", () => {
    const orm = VO("testDB");
    const search: Search = { id: 1 };
    const query: any = orm.remove("users").where(search).query();

    expect(query.d.remove.collection).toBe("users");
    expect(query.d.remove.search).toEqual(search);
});

test("11. removeOne query", () => {
    const orm = VO("testDB");
    const search: Search = { id: 1 };
    const query: any = orm.remove("users").where(search).one().query();

    expect(query.d.removeOne.collection).toBe("users");
    expect(query.d.removeOne.search).toEqual(search);
});

test("12. updateOneOrAdd query", () => {
    const orm = VO("testDB");
    const search: Search = { email: "test@example.com" };
    const updater: Updater<any> = { $set: { name: "Test" } };
    const query: any = orm.updateOneOrAdd("users").where(search).updater(updater).query();

    expect(query.d.updateOneOrAdd.collection).toBe("users");
    expect(query.d.updateOneOrAdd.search).toEqual(search);
    expect(query.d.updateOneOrAdd.updater).toEqual(updater);
});

test("13. updateOneOrAdd with add_arg", () => {
    const orm = VO("testDB");
    const search: Search = { email: "test@example.com" };
    const updater: Updater<any> = { $set: { name: "Test" } };
    const addArg: Arg<any> = { email: "test@example.com", name: "Test" };
    const query: any = orm.updateOneOrAdd("users").where(search).updater(updater).add_arg(addArg).query();

    expect(query.d.updateOneOrAdd.add_arg).toEqual(addArg);
});

test("14. updateOneOrAdd with id_gen", () => {
    const orm = VO("testDB");
    const query: any = orm.updateOneOrAdd("users").where({ id: 1 }).updater({ $set: {} }).id_gen(false).query();

    expect(query.d.updateOneOrAdd.id_gen).toBe(false);
});

test("15. toggleOne query", () => {
    const orm = VO("testDB");
    const search: Search = { id: 1 };
    const query: any = orm.toggleOne("users").where(search).query();

    expect(query.d.toggleOne.collection).toBe("users");
    expect(query.d.toggleOne.search).toEqual(search);
});

test("16. toggleOne with data", () => {
    const orm = VO("testDB");
    const search: Search = { id: 1 };
    const data: Arg<any> = { lastAccessed: new Date().toISOString() };
    const query: any = orm.toggleOne("users").where(search).data(data).query();

    expect(query.d.toggleOne.data).toEqual(data);
});

test("17. removeCollection query", () => {
    const orm = VO("testDB");
    const query: any = orm.removeCollection("users").query();

    expect(query.d.removeCollection.collection).toBe("users");
});

test("18. ensureCollection query", () => {
    const orm = VO("testDB");
    const query: any = orm.ensureCollection("users").query();

    expect(query.d.ensureCollection.collection).toBe("users");
});

test("19. issetCollection query", () => {
    const orm = VO("testDB");
    const query: any = orm.issetCollection("users").query();

    expect(query.d.issetCollection.collection).toBe("users");
});

test("20. getCollections query", () => {
    const orm = VO("testDB");
    const query: any = orm.getCollections().query();

    expect(query.d.getCollections).toBeDefined();
    expect(query.d.getCollections).toEqual({});
});

test("21. vars with all builders", () => {
    const orm = VO("testDB");

    const findQuery: any = orm.from("users").var("test", 1).query();
    expect(findQuery.var.test).toBe(1);

    const addQuery: any = orm.add("users", {}).var("test", 2).query();
    expect(addQuery.var.test).toBe(2);

    const updateQuery: any = orm.update("users").var("test", 3).query();
    expect(updateQuery.var.test).toBe(3);
});

test("22. deepMerge in where clauses", () => {
    const orm = VO("testDB");
    const query: any = orm.from("users")
        .where({ $gt: { age: 18 } })
        .where({ status: "active" })
        .query();

    expect(query.d.find.search.$gt.age).toBe(18);
    expect(query.d.find.search.status).toBe("active");
});

test("23. select multiple calls accumulate", () => {
    const orm = VO("testDB");
    const query: any = orm.from("users")
        .select("name")
        .select("email", "age")
        .query();

    expect(query.d.find.select).toEqual(["name", "email", "age"]);
});

test("24. builder instances are independent", () => {
    const orm = VO("testDB");
    const builder1 = orm.from("users").select("name");
    const builder2 = orm.from("posts").select("title");

    const query1: any = builder1.query();
    const query2: any = builder2.query();

    expect(query1.d.find.select).toEqual(["name"]);
    expect(query2.d.find.select).toEqual(["title"]);
});
