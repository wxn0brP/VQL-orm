# @wxn0brp/vql-orm

A lightweight and intuitive query builder for VQL (Valthera Query Language). This ORM-like library provides a fluent, chainable interface to construct VQL queries programmatically.

## Installation

```bash
npm install @wxn0brp/vql-orm @wxn0brp/vql-client
```

**Note:** `@wxn0brp/vql-client` is a `peerDependency` and must be installed alongside this package.

## Usage

The main entry point is the `VO` (VQL ORM) factory function, which creates a new query builder instance.

Here's a basic example of how to build a `find` query:

```typescript
import { VO } from "@wxn0brp/vql-orm";

// Create a query builder instance for the "myShop" database
const qb = VO("myShop");

// Build a query
const userQuery = qb
    .from("users")
    .select("name", "email", "age")
    .where({
        status: "active",
        $gt: { age: 18 }
    })
    .limit(10)
    .query(); // This generates the final VQL query object and resets the builder

console.log(JSON.stringify(userQuery, null, 2));
```

This will produce the following VQL query object:

```json
{
  "db": "myShop",
  "d": {
    "find": {
      "collection": "users",
      "search": {
        "status": "active",
        "$gt": {
          "age": 18
        }
      },
      "select": [
        "name",
        "email",
        "age"
      ],
      "limit": 10
    }
  }
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.