const users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

const _mapConst = _curryr(_mapFunction);
const _eachConst = _curryr(_eachFunction);
const _filterConst = _curryr(_filterFunction);
const _get = _curryr(function (object, key) {
  // object[key] = key의 value
  return object == null ? undefined : object[key];
});

// go - filter - each - keys - is_object
//

// go(값, 계산함수, ..., 계산함수, 결과함수)
_go(
  users,
  _filterConst(function (user) {
    return user.age >= 30;
  }),
  _mapConst(_get("name")),
  console.log
);

// argument = users
function _go(argument) {
  // arguments = users
  const functions = _rest(arguments);
  return _pipe.apply(null, functions)(argument);
}

// list = users
// number = _filterA(function(users) {return user.age > 30;}
function _rest(list, number) {
  const slice = Array.prototype.slice;
  return slice.call(list, number || 1);
}

// list = users
// predicate = _filterA(function (user) {return user.age >= 30;})
function _filterFunction(list, predicate) {
  const newList = [];

  _eachFunction(list, function (value) {
    if (predicate(value)) newList.push(value);
  });

  return newList;
}

// list = users
// iterator = function (value) {if (predicate(value)) newList.push(value);}
function _eachFunction(list, iterator) {
  // keys = ["0", "1", ... ,"7"]
  let keys = _keys(list);

  for (let i = 0, length = keys.length; i < length; i++) {
    // list[key[i]] = {id: i, name: iname, age: iage}
    iterator(list[keys[i]], keys[i]);
  }

  // list =
  return list;
}

// users의 property를 반복하여 array 형태로 반환함.
// object = users
// Object.keys(object) = ["0", "1", ... ,"7"]
function _keys(object) {
  return _is_object(object) ? Object.keys(object) : [];
}

// TypeChecker
// object = users
function _is_object(object) {
  return typeof object == "object" && !!object;
}

// map(callback(currentValue, index, map()을 호출한 array), thisArg)
// thisArg = callback을 실행할 때 this로 사용되는 값. 객체겠지?
// callback
function _mapFunction(list, mapper) {
  const newList = [];

  // _get("name")
  _eachFunction(list, function (value, key) {
    newList.push(mapper(value, key));
  });

  return newList;
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}

function _pipe() {
  let functions = arguments;

  return function (argument) {
    return _reduce(
      functions,
      function (argument, fn) {
        return fn(argument);
      },
      argument
    );
  };
}

function _reduce(list, iterator, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }

  _eachFunction(list, function (value) {
    memo = iterator(memo, value);
  });

  return memo;
}
