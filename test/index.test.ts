import { expect, test } from "bun:test";
import { VQL_ORM } from "../src/index";

test("ORM - basic query building", () => {
    const orm = new VQL_ORM("testDB");
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

test("ORM - findOne query", () => {
    const orm = new VQL_ORM("testDB");
    const query: any = orm.from("users").one().select("id").where({ id: 1 }).query();

    expect(query.d.findOne).toBeDefined();
    expect(query.d.findOne.collection).toBe("users");
    expect(query.d.findOne.select).toEqual(["id"]);
    expect(query.d.findOne.search.id).toBe(1);
});

test("ORM - vars functionality", () => {
    const orm = new VQL_ORM("testDB");
    const query: any = orm.from("users").var("userId", 123).vars({ status: "active" }).query();

    expect(query.var.userId).toBe(123);
    expect(query.var.status).toBe("active");
});

test("ORM - query generation after chaining", () => {
    const orm = new VQL_ORM("testDB");
    orm
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

test("ORM - reset functionality", () => {
    const orm = new VQL_ORM("testDB");
    orm.from("test").select("field").query();

    expect(orm._collection).toBe("");
    expect(orm._select).toEqual([]);
    expect(Object.keys(orm._search).length).toBe(0);
    expect(orm._limit).toBe(0);
    expect(orm._one).toBe(false);
    expect(Object.keys(orm._vars).length).toBe(0);
});

test("ORM - set database name", () => {
    const orm = new VQL_ORM("testDB");
    orm.setDbName("newDB");

    expect(orm.dbName).toBe("newDB");
});