db.createUser(
  {
      user: "user",
      pwd: "password",
      roles: [
          {
              role: "readWrite",
              db: "mydb1"
          }
      ]
  }
);
db.createCollection('user1');