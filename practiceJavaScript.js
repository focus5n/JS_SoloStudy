// Worker
_go(
  users,
  _filter(function (user) {
    return user.age > 29;
  }),
  _map(_get("name")),
  console.log
);

// _go Logics
function _go(argument) {
  const functions = _rest(arguments);

  return _pipe.apply(null, functions)(argument);
}

function _rest(list, number) {
  const slice = Array.prototype.slice;

  return slice.call(list, number || 1);
}

function _pipe() {
  const functions = arguments;

  return function (argument) {
    return _reduce(
      functions,
      function (argument, 함수) {
        return 함수(argument);
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

  _each(list, function (value) {
    memo = iterator(memo, value);
  });

  return memo;
}

function _each() {}

// _filter Logics
const _filter = _curryr(_filter);

function _curryr(함수) {
  return function (a, b) {
    return arguments.length == 2
      ? 함수(a, b)
      : function (b) {
          return 함수(b, a);
        };
  };
}

function _filter(list, predicate) {
  const filteredList = [];

  _each(list, function (value) {
    if (predicate(value)) filteredList.push(value);
  });

  return filteredList;
}

function _each(list, iterator) {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    iterator(list[keys[i]], keys[i]);
  }

  return list;
}

function _keys(object) {
  return _isObejct(object) ? Object.keys(object) : [];
}

function _isObejct(object) {
  return typeof object == "object" && !!object;
}

// _map Logics
const _map = _curryr(_map);

// function _curryr() {}

function _map(list, mapper) {
  const mappedList = [];

  _each(list, function (value, key) {
    mappedList.push(mapper(value, key));
  });

  return mappedList;
}

const _get = _curryr(function (object, key) {
  return object == null ? undefined : object[key];
});

// function _each() {}

// function _keys() {}

// function _isObejct() {}

// Data
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
