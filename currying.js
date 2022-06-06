// 원본 정보
const $users = [{ id: 1, name: "ID", age: 36 },
                // { id: 2, name: "BJ", age: 32 },
                // { id: 3, name: "JM", age: 32 },
                // { id: 4, name: "PJ", age: 27 },
                // { id: 5, name: "HA", age: 25 },
                // { id: 6, name: "JE", age: 26 },
                // { id: 7, name: "JI", age: 31 },
                // { id: 8, name: "MP", age: 23 },
               ]
// 조건만 입력하도록 매개변수의 순서를 반대로 변경함.
const $curriedEach = _curryingReverse(_each)
const $curriedFilter = _curryingReverse(_filter)
const $curriedMap = _curryingReverse(_map)
// 출력하길 원하는 key 값을 설정함. $get("keyName")
const $curriedGet = _curryingReverse(function(object, key) {
    return object == null ? undefined : object[key]
})

// 프로그램 시작점임.
// _go(계산하길 원하는 정보, 걸러내길 원하는 조건, 가공하길 원하는 조건, 로그 출력)
_go($users,
    $curriedFilter(function(user) {return user.age >= 30}),
    $curriedMap($curriedGet("name")),
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

    $curriedEach(conditions,
          function(condition) {data = executer(data, condition)})

    return data
}

// 인자를 여럿 받는 함수 하나를, 인자를 하나씩 받는 함수 여럿으로 분리함.
function _curryingReverse(calculator) {
    return function(data, executer) {
        return arguments.length == 2 ? calculator(data, executer) : function(expression) {
            return calculator(expression, data)
        }
    }
}

// 조건 함수를 실행하여 얻은 결과값을 반환함.
function _each(conditions, executer) {
    const $keys = _key(conditions)

    for(const index in $keys) {
        executer(conditions[index], index)
    }

    return conditions
}

// 객체의 index 값을 반환함.
function _key(something) {
    return _isObject(something) == true ? Object.keys(something) : []
}

// 객체인지 확인하여 boolean 값을 반환함.
function _isObject(something) {
    return typeof something == "object" ? true : false 
}

// 조건에 부합하는 값만 필터링한 배열을 반환함.
function _filter(list, predicate) {
    const $filteredList = []

    $curriedEach(list, function(value) {
        if(predicate(value)) $filteredList.push(value)
    })

    return $filteredList
}

// list 배열을 받아서 mapper 함수로 원하는 정보만 출력하도록 설정한 뒤, 해당 정보를 담은 mappedList를 반환함.
function _map(list, mapper) {
    const $mappedList = []

    $curriedEach(list, function(value, key) {
        $mappedList.push(mapper(value, key))
    })

    return $mappedList
}