// Data
// 디버깅 편의성을 위해서 값을 하나로 설정
const users = [
  { id: 1, name: "ID", age: 36 },
  // { id: 2, name: "BJ", age: 32 },
  // { id: 3, name: "JM", age: 32 },
  // { id: 4, name: "PJ", age: 27 },
  // { id: 5, name: "HA", age: 25 },
  // { id: 6, name: "JE", age: 26 },
  // { id: 7, name: "JI", age: 31 },
  // { id: 8, name: "MP", age: 23 },
];

const curriedFilter = _curryr(_filter);
const curriedMap = _curryr(_map);
const $curriedEach = _curryr(_each);
const _get = _curryr(function (object, key) {
  return object == null ? undefined : object[key];
});


// Start
_go(
  users,
  // 1. curryr 함수에 _filter 함수를 인수로 할당한 값을 리턴: f(b), b = f(user)
  curriedFilter(function (user) {
    return user.age > 29;
  }),
  // 2. _curryr 함수에 _get("name") 함수를 인수로 할당한 값을 리턴 curriedMap( f(a, b) )
  // 3. _curryr 함수에 f(a,b) 함수를 인수로 할당한 값을 리턴 f(b), b = f(a, b`)
  curriedMap(_get("name")),
  // f()
  console.log
);

// 5. argument = users
function _go(argument) {

  // 4. arguments = users, f(b), f(b), f()  // arguments는 유사배열
  // 6. _rest 함수 실행
  // 7. functions = [f(b), f(b), f()] // functions는 배열
  const functions = _rest(arguments);

  // 8. _pipe.apply(null, functions) 호출
  // 12. _pipe(argmuemt) 호출
  return _pipe.apply(null, functions)(argument);
}

// list = [users, f(b), f(b), f()]
// number = undefined
function _rest(list, number) {
  
  // 전역 객체(global)을 참조하는 빈 배열을 만들고 slice method를 호출한다.
  const slice = Array.prototype.slice;

  // [].slice는 함수를 반환하며, 모든 함수는 call method를 포함한다.
  // slice 함수는 원본 배열을 변경하지 않고, 새로운 배열 객체를 반환한다.
  // call method의 첫 인자로 list를 받아서 this에 list를 할당한다.
  return slice.call(list, number || 1);
}

// 매개변수 없음
function _pipe() {
  // 9. arguments = [f(b), f(b), f()]
  // 10. functions = [f(b), f(b), f()]
  const functions = arguments;

  // 11. f (argument) 함수를 리턴함.
  return function (argument) {
    // arguments = users

    // functions = [f(b), f(b), f()]
    // function(argument, func)
    // 13. _reduce 함수를 리턴함.
    return _reduce(
      //arguments = argument

      functions,
      function(argument, func) {
        return func(argument);
      },
      argument
    );
  };
}

// list = [f(b), f(b), f()]
// iterator = function(argument, func)
// memo = users
function _reduce(list, iterator, memo) {

  // arguments.legnth == 3이므로 해당 if문을 실행하지 않고 넘어간다.
  // arguments.length == 2는 앞에서 _rest 함수가 실행되지 않았음을 가정한다.
  if (arguments.length == 2) {

    // 만약 data와 function이 분리되어 있지 않을 경우, data만 memo에 할당하기 위함.
    memo = list[0];

    // 이 단계에서 _rest 함수로 function만 분리하여 list에 할당함.
    list = _rest(list);
  }

  // list = [f(b), f(b), f()]
  // iterator = func(argument)
  // func = value
  // argument = memo
  // iterator = value(memo)
  // memo = users
  // iterator = value(users)
  $curriedEach(list, function(value) {

    // iterator = function(argument, func)
    // memo = function(memo, value)
    // memo = value(memo)
    // users = value(users)
    // users = f(b)
    // users = f(users)
    // users = _filter(users, a)
    // users = _filter(users, predicate)
    memo = iterator(memo, value);
  });

  return memo;
}

//
function _curryr(func) {

  // 함수 호출을 한 번만 하면 function(a, b) 함수를 리턴함.
  return function(a, b) {

    // 함수 호출을 두 번 하면 func(a, b) 혹은 function(b) 함수를 리턴함.
    // func(a,b) 함수는 원본 함수를 그대로 리턴하는 것임.
    return arguments.length == 2
      ? func(a, b)
      : function(b) {
          return func(b, a);
        };
  };
}

// list = users
// predicate = function(user) { return user.age >= 30 }
function _filter(list, predicate) {
  const filteredList = [];

  $curriedEach(list, function (value) {
    if (predicate(value)) filteredList.push(value);
  });

  return filteredList;
}

// list = [f(b), f(b), f()]
// iterator = function(value)
function _each(list, iterator) {

  // list = [f(b), f(b), f()]
  // keys = ["0", "1", "2"]
  const keys = _keys(list);

  // keys = ["0", "1", "2"]
  // keys.length = 3
  for (let i = 0; i < keys.length; i++) {

    // iterator = function(value) { memo = iterator(memo, value); }
    // keys[i] = "0"
    // list[keys[i]] = list["0"]
    // iterator(list["0"], "0")
    // iterator(f(b))
    iterator(list[keys[i]], keys[i]);
  }

  return list;
}

// object = list = [f(b), f(b), f()] 
function _keys(object) {

  // Object.keys(object) 함수는 object 객체의 property key 값을 담은 배열을 리턴하거나, key-value 타입이 아니라면 index 값을 문자열로 표현한 값을 배열로 리턴함.
  // 빈 배열은 배열이 아니라서 에러가 날 경우를 걸러내기 위해서 배열이 아닐 경우, 빈 배열을 리턴하도록 설정함.
  return _isObejct(object) ? Object.keys(object) : [];
}

// object = [f(b), f(b), f()] 
function _isObejct(object) {

  // typeof는 object 타입형을 문자열로 반환함.
  // "object" && !!object는 타입형이 object라면 boolean 타입으로 값을 리턴하도록 설정함.
  // !!는 이중부정으로 true를 뜻하고, !!object는 object 타입이 true라는 것을 의미함.
  return typeof object == "object" && !!object;
}

function _map(list, mapper) {
  const mappedList = [];

  _each(list, function (value, key) {
    mappedList.push(mapper(value, key));
  });

  return mappedList;
}