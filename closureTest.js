const users = [
  { id: 1, name: "Han", age: 10 },
  { id: 2, name: "Bit", age: 20 },
  { id: 3, name: "Heo", age: 30 },
  { id: 4, name: "Kim", age: 40 },
  { id: 5, name: "Kap", age: 50 },
  { id: 6, name: "Swo", age: 60 },
  { id: 7, name: "Jeo", age: 70 },
  { id: 8, name: "Yom", age: 80 },
  { id: 9, name: "Nim", age: 90 },
];

filter;
each;
map;
curry;
curryr;
reduce;
pipe;
go;

let _filter = curryr(filter);
let _map = curryr(map);
go(
  users,
  _filter(function (user) {
    return user.age > 20;
  }),
  _map(function (user) {
    return user.name + "|" + user.age;
  }, console.log)
);
