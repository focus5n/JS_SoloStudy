const ADD_MAKER = function (f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
};

const ADD_FIRST = ADD_MAKER(function (a, b) {
  return a + b;
});

const ADD_10 = ADD_FIRST(10);
