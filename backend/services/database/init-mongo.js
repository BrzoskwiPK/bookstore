// Seeding database with some users

db.createCollection("users");

db.users.insertMany([
  {
    username: "admin",
    password: "admin",
    email: "admin@wsei.pl",
    role: "admin"
  },
  {
    username: "user",
    password: "password",
    email: "user@wsei.pl",
    role: "standard"
  },
  {
    username: "user2",
    password: "password",
    email: "user2@wsei.pl",
    role: "standard"
  }
]);

// Indexing "username" field
db.users.createIndex({ username: 1 }, { unique: true });
