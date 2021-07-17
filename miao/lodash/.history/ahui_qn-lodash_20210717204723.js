var ahui_qn = function () {
    // 深度对比函数
    function isEqual(a, b) {
        if (a === b) {
            return true
        }
        var typea = typeof a // 获取数据类型
        var typeb = typeof b // 获取数据类型
        if (typea !== typeb) { // 类型不同返回false
            return false
        } else { // 类型相同往下走
            if (typea == 'object') { // 到这一步两个数据类型只能是要么两个相同的对象或者数组要么 一个对象一个数组

                if ((Array.isArray(a) && !Array.isArray(b)) || (Array.isArray(b) && !Array.isArray(a))) { // 判断a , b 是否  一个是数组一个是对象
                    return false
                }

                // 往后即同为数组或同为对象
                if (Array.isArray(a)) { // 如果是数组的话先判断长度是否相等 ，如果是对象的话那么往后走。
                    if (a.length !== b.length) {
                        return false
                    }
                } else { // 同为数组或者对象，判断属性的数量及内容
                    var keysa = Object.keys(a) // 如果是对象的话就  将对象的属性名转为数组
                    var keysb = Object.keys(b) // 如果是对象的话就  将对象的属性名转为数组
                    if (keysa.length !== keysb.length) { // 转为数组后看是否长度相等，即是不是拥有相同长度的属性名
                        return false
                    }
                }
                // 下面是对比对象的属性值和属性名是否相等
                for (var key in a) { // 获取对象 a 的属性名
                    if (!(key in b)) { // 看 b 这个对象里面有没有key(a 的属性名)这个值
                        return false
                    }
                    if (!isEqual(a[key], b[key])) { // 这个递归是对比 a ,  b两个对象的属性名的值是否相等，就是此函数的第一个if判断为此递归的终止条件
                        return false
                    }
                }
                return true
            } else {
                return a === b
            }
        }
    }


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
         }
         return newArray
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

    function flatten (array) {
       return  array.reduce((newArray, it) => {
            if (Array.isArray(it)) {
               it.forEach(x => {
                   newArray.push(x)
               })
            }else{
                newArray.push(it)
            }
        return newArray
        }, [])
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
    function fromPairs (array) {
        var map = {}
        for (let i = 0; i < array[0].length; i++) {
            map[array[i][0]] = array[i][1]
        }
        return map
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
            if (f(array[i])) {
                 newArray.push(array[i])
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
        if (typeof(object) == 'object') {
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

    function difference (array, ...values) {
        var newArray = array.slice()
        values = values.flat()

        values.forEach((x) => {
            newArray.forEach((j,i) => {
                if (x == j) {
                    newArray.splice(i,1)
                }
            })
        })
        return newArray
    }

    function differenceBy (array, values = [], f) {
        var newArray = array.slice()
        values = values.flat()
        if (typeof f == 'function') {
            for (let i = 0; i < values.length; i++) {
                  values[i] =  f(values[i])
            }
            for (let i = 0; i < newArray.length; i++) {
                newArray[i] =  f(newArray[i])
          }
          values.forEach((x) => {
            newArray.forEach((j,i) => {
                if (isEqual(x,j)) {
                    array.splice(i,1)
                }
            })
        })
        return array
        }
        
        values.forEach((x) => {
            newArray.forEach((j,i) => {
                if (isEqual(x,j)) {
                    newArray.splice(i,1)
                }
            })
        })
        return newArray
    }

    function differenceWith (array, values,f) {
        var newArray = array.slice()
        if (typeof f == 'function') {
            for (let i = 0; i < values.length; i++) {
                  values[i] =  f(values[i])
            }
            for (let i = 0; i < newArray.length; i++) {
                newArray[i] =  f(newArray[i])
          }
          values.forEach((x) => {
            newArray.forEach((j,i) => {
                if (isEqual(x,j)) {
                    array.splice(i,1)
                }
            })
        })
        return array
        }
    }

    function drop(array, n = 1) {
        var newArray = array.slice()
        for (let i = 0; i < n; i++) {
            newArray.shift()
        }
        return newArray
    }

    function dropRight(array, n = 1) {
        var newArray = array.slice()
        for (let i = 0; i < n; i++) {
            newArray.pop()
        }
        return newArray
    }

    function concat(array,...values) {
        for (let i = 0; i < values.length; i++) {
            if (Array.isArray(values[i])) {
                values[i].forEach(a => array.push(a))
            }else {
                array.push(values[i])
            }
        }
        return array
    }  

    function fill (array, filler, idx = 0, toIdx = array.length) {
        for (let i = idx; i < toIdx; i++) {
            array[i] = filler
        }
        return array
    }

    function head (array) {
        var newArray = array
        return newArray.shift()
    }

    function indexOf (array, value, fromIndex = 0) {
        for (let i = fromIndex; i < array.length; i++) {
            if (value == array[i]) return i
        }
        return -1
    }
    
    function initial (array) {
        var newArray = []
        for (let i = 0; i < array.length - 1; i++) {
            newArray.push(array[i])
        }
        return newArray
    }

    function intersection (...array) {
        var newArray = []
        for (var i = 0; i < array[0].length; i++) {
            for (var j = 1; j < array.length; j++) {
                if (!(array[j].includes(array[0][i]))) {
                    break  // 没有直接break
                }  
            }
            if (j == array.length) {   // 当后面两个数组都遍历完成后
                newArray.push(array[0][i])
            }
        return newArray
        }
    }    
    

    return {
        chunk : chunk,
        compact : compact,
        unique : unique,
        flatten : flatten,
        flattenDeep : flattenDeep,
        flattenDepth : flattenDepth,
        fromPairs : fromPairs,
        forEach : forEach,
        map : map,
        filter : filter,
        reduce : reduce,
        zip : zip,
        unzip : unzip,
        keys : keys,
        values : values,
        difference : difference,
        differenceBy : differenceBy,
        differenceWith : differenceWith,
        drop : drop,
        dropRight : dropRight,
        concat : concat,
        fill : fill,
        head : head,
        indexOf : indexOf,
        intersection : intersection,
    }
}();
