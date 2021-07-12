var ahui_qn = function () {
    function chunk (array, size = 1){ // 将数组拆分成二维数组，，size为每个二维数组的长度
        var newArray = []
        var sum = size
        while (sum) {
          newArray.push(array.splice(0,size))
          sum--
          if (array.length == 0) {
              break
          }
        }
        return newArray
    }

    function compact (array) {  // 去除数组假值
        var newArray = []
        for (var i = 0; i < array.length; i++) {
            if (array[i]){
                newArray.push(array[i])
        }
        return newArray
         }
    }

    function unique (array) {   // 数组去重
        var newArray = []
        var map = {}
        for (var i = 0; i < array.length; i++) {
            if (array[i] in map) {
                continue
            }else {
                newArray.push(array[i]) 
                map[array[i]] = 0
            }
        }
        return newArray
    }

    function flattenDeep (array){   // 降低多维数组为一维数组
        return array.reduce((newArray, item) => {  // 创建一个新数组，和数组传入的每个元素
            return newArray.concat(Array.isArray(item) ? flattenDeep(item) : item)   
        },[])
    }

    function flattenDepth (array, depth = 1) {  // 指定降维数量
        if (depth == 0) {
            return array.slice()
        }
        var newArray = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i] 
            if (Array.isArray(item)) {
                item = flattenDepth(item, depth - 1)
                for (var j = 0; j < item.length; j++) {
                    newArray.push(item[j])
                }
            }else {
                newArray.push(item)
            }
        }
        return newArray
    }

    function forEach (collection , f) {
        for (var i = 0; i < collection.length; i++) {
            f(collection[i], i, collection)
        }
        return collection
    }

    function map(array, f) {
        var newArray = []
        for (var i = 0; i < array.length; i++) {
            newArray.push(f(array[i], i))  // push进一个新的数组
        }
        return newArray
      }

    function filter (array, f) {
        var newArray = []
        for (var i = 0; i < array.length; i++) {
            if (f(array[i],i)) {
                return newArray.push(array[i])
            }
        }
        return newArray
    }

    function reduce (array, f, initial) {
        for (var i = 0; i < array.length; i++) {
            initial = f(initial, array[i])
        }
        return initial
    }

    function zip (...array) {
        var newArray = []
        var count = array[0].length
        var sum = 0   // 控制遍历子数组的第几项
        while(count){
            var temporary = []
            for (var i = 0; i < array.length; i++) {
                temporary.push(array[i][sum])
            }
            count--
            sum++
            newArray.push(temporary)
        }
        return newArray
    }
    
    function unzip(array) {
        var newArray = []
        var count = array[0].length
        var sum = 0   // 控制遍历子数组的第几项
        while(count){
            var temporary = []
            for (var i = 0; i < array.length; i++) {
                temporary.push(array[i][sum])
            }
            count--
            sum++
            newArray.push(temporary)
        }
        return newArray
    }

    function keys (object) {   // 返回key
        var newArray = []
        if (typeof object == 'object') {
            for (var k in object) {
                newArray.push(k)
            }
        }else {
            var obj = {}
            for (var i = 0; i < object.length; i++) {
                obj[i] = object[i]
            }
            for (var j in obj) {
                newArray.push(j)
            }
        }
        return newArray
    }

    function values(object) {  // 返回值
        var newArray = []
        if (typeof object == 'object') {
            for (var k of object) {
                newArray.push(k)
            }
        }else{
            for (var i = 0; i < object.length; i++) {
                newArray.push(object[i])
            }
        }
        return newArray
    }
    
    return {
        chunk : chunk,
        compact : compact,
        unique : unique,
        flattenDeep : flattenDeep,
        flattenDepth : flattenDepth,
        forEach : forEach,
        map : map,
        filter : filter,
        reduce : reduce,
        zip : zip,
        unzip : unzip,
        keys : keys,
        values : values,
    }
}();
