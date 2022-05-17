function go() {
  _go(
    users,
    _filter(function (user) {
      return user.age >= 30;
    }),
    _map(__get("name")),
    console.log
  );

  const users = [
    { id: 1, name: "ID", age: 12 },
    { id: 2, name: "AB", age: 24 },
    { id: 3, name: "CD", age: 36 },
    { id: 4, name: "EF", age: 48 },
    { id: 5, name: "HJ", age: 60 },
    { id: 6, name: "QK", age: 10 },
    { id: 7, name: "HB", age: 30 },
    { id: 8, name: "JH", age: 50 },
  ];

  function _go(arg) {
    let fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
  }

  function _rest(list, num) {
    let slice = Array.prototype.slice;
    return slice.call(list, num || 1);
  }

  function _pipe() {
    let fns = arguments;
    return function (arg) {
      return _reduce(
        fns,
        function (arg, fn) {
          return fn(arg);
        },
        arg
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

  function _each(list, iterator) {
    let keys = _keys(list);
    for (let i = 0, length = keys.length; i < length; i++) {
      iterator(list[(keys[i], keys[i])]);
    }
    return list;
  }

  function _keys(object) {
    return _is_object(obj) ? Object.keys(obj) : [];
  }

  function _is_object(object) {
    return typeof object == "object" && !!object;
  }

  function _filter(list, predict) {
    const newList = [];

    _each(list, function (value) {
      if (predict(value)) newList.push(value);
    });
    return newList;
  }

  function _map(list, mapper) {
    const newList = [];

    _each(list, function (value, key) {
      newList.push(mapper(value, key));
    });
    return newList;
  }

  let __get = _curryr(function (object, key) {
    return object == null ? undefined : object[key];
  });
  let __map = _curryr(_map);
  let __each = _curryr(_each);
  let __filter = _curryr(_filter);

  function _curryr(fn) {
    return function (a, b) {
      return arguments.length == 2
        ? fn(a, b)
        : function (b) {
            return fn(b, a);
          };
    };
  }
}
