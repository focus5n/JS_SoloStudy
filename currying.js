// 원본 정보
const $users = [{ id: 1, name: "ID", age: 36 }]
// 조건만 입력하도록 매개변수의 순서를 반대로 변경함.
const $curriedEach = _curryingReverse(_each)
const $curriedFilter = _curryingReverse(_filter)
const $curriedMap = _curryingReverse(_map)
// 출력하길 원하는 key 값을 설정함. $get("keyName")
const $get = _curryingReverse(function(object, key) {
    return object == null ? undefined : object[key]
})

// 프로그램 시작지점입니다.
// _go(계산하길 원하는 정보, 걸러내길 원하는 조건, 가공하길 원하는 조건, 로그 출력)
_go($users,
    $curriedFilter(function(user) {return user.age >= 30}),
    $curriedMap(_get("name")),
     console.log)

// 데이터를 조건에 따라 걸러낸 결과값을 출력함.
function _go(origin) {
    const $conditions = _rest(arguments);
    return _pipe.apply(null, $conditions)(origin)
}

// 데이터와 조건 함수를 분리함.
function _rest(origin, index) {
    return [].slice.call(origin, index || 1)
}

// 여러 조건 함수를 함축한 함수 하나를 반환함.
function _pipe() {
    const $conditions = arguments;
    return function(data) {
        return _reduce($conditions,
                        function(data, condition) {return condition(data)},
                        data)
    }
}

// 조건 함수에 데이터를 매개변수로 삼아서 실행하는 함수를 반환함.
function _reduce(conditions, executer, data) {
    if(arguments.length == 2) {
        data = conditions[0]
        conditions = _rest(conditions)
    }

    _each(conditions,
          function(condition) {data = executer(data, condition)})

    return data
}

// 인자를 여럿 받는 함수 하나를, 인자를 하나씩 받는 함수 여럿으로 분리함.
function _curryingReverse(calculator) {
    return function(data, expression) {
        return arguments.length == 2 ? calculator(data, expression) : function(expression) {
            return calculator(expression, data)
        }
    }
}

// 계산하길 원하는 정보를 list 배열로 받고, 원하는 조건이 담긴 함수를 iterator 함수로 받아서, 조건 함수 개수만큼 반복문을 실행함.
function _each(list, iterator) {
    const $keys = _key(list)

    for(let index in $keys) {
        iterator(list[index], index)
    }

    return list
}

// 정보가 담긴 something 객체의 key 값을 배열에 담아서 반환하고, 객체가 아니라면 빈 배열로 치환하여 반환함.
function _key(something) {
    return $isObject == true ? Object.keys[something] : []
}

// 정보가 담긴 something 인자가 객체인지 확인하고, 객체가 맞다면 true 값을 반환하고, 객체가 아니라면 false 값을 반환함.
function $isObject(something) {
    return typeof something == "object" ? true : false 
}

// list 배열을 받아서 predicate 함수로 조건에 부합하는 정보만 걸러낸 뒤, 해당 정보만 담은 filteredList를 반환함.
function _filter(list, predicate) {
    const $filteredList = []

    _each(list, function(value) {
        if(predicate(value)) $filteredList.push(value)
    })

    return $filteredList
}

// list 배열을 받아서 mapper 함수로 원하는 정보만 출력하도록 설정한 뒤, 해당 정보를 담은 mappedList를 반환함.
function _map(list, mapper) {
    const $mappedList = []

    _each(list, function(value, key) {
        $mappedList.push(mapper(value, key))
    })

    return $mappedList
}