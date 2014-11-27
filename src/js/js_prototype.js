/**
 * Created by Administrator on 14-10-20.
 */
/**
 * 用对象直接量创建对象
 * @type {{}}
 */
function T1(){
    var empty = {};
    var point = {x:0,y:0};
    var point2 = {
        x : point.x,
        Y : point.y
    };
    var book = {
        "main title": "JavaScript",
        "sub-title": "The Definitive Guide",
        "for": "all audiences",
        author: {
            firstname: "david",
            surname: "Flanagan"
        }
    }
}
/**
 * 用new运算符创建并初始化一个对象，关键字new后面跟随一个函数调用。这里的函数称作
 * 构造函数（constructor），构造函数可以初始化一个新创建的对象
 * @type {Array}
 */
function T2(){
    var a = new Array();
    var d = new Date();
    var r = new RegExp("js");
}

/**
 * ECMAScript定义一个名为Object.create()的方法，它创建一个新对象，其中第一个参数是这个对象的原型。
 * Object.create()是一个静态函数，而不是提供给某个对象调用的方法。
 */
function T3(){
    var o3 = {
        x: 1,
        y: 1,
        z: function(){
            alert(o3.x);
        }
    }
    var o1 = Object.create(o3); //o1继承属性x和y
    //alert(o1.toString());
    //alert(o3.isPrototypeOf(o1)); //true 说明o3存在于o1的原型链中
    //alert(o1.isPrototypeOf(o3)); //false 说明o3不存在于o1的原型链中
    //alert(o3.hasOwnProperty('x')); //true 说明o3中存在x属性或函数
    //alert(o3.hasOwnProperty('z')); //true 说明o3中存在z属性或函数
    //o3.z(); //访问o3对象中z函数
    o1.z(); //1 说明可以通过o1对象访问z函数，也即o1继承了o3的属性或函数
}
/*
这样传入null定义对象的话，不会继承任何东西，甚至不包含基础方法，比如toString()，也就是说，它不能喝"+"
运算符一起工作
 */
function Test(){
    var o2 = Object.create(null);
    //o2.toString();
    alert(o2.isPrototypeOf('Object'));  // o2.isPrototypeOf is not a function，这就说明不能访问这个函数

    var o4 = object.create(object.prototype); //这种形式创建的对象与{}和new Object()一样，也就是空对象

}
/**
 * 将P作为原型对象，返回一个新对象，且该新对象继承了参数对象（原型对象）的属性
 * @param p
 * @returns {p|*}
 */
function inherit(p){
    if(null == p){
        throw TypeError();
    }
    if(this.create){ //如果Object.create存在
        return Object.create(p);
    }
    var t = typeof p;
    if(t != "object" && t != "function"){
        throw TypeError();
    }
    function f(){}; //定义一个空的构造函数
    f.prototype = p; //让p做安慰f的原型
    return new f();
}

/**
 * 属性的查询和设置
 * 查询方式：1、标示符，由于标示符不是js中数据类型，所以不能修改它们
 *           2、字符串，字符串是js中的数据类型，所以可以修改它们,也就是说可以使用for/in进行遍历
 */
var book = {
    author: "JavaScript",
    name: "js",
    surname: "jsName",
    title: "title_new"
}
function T4(){
    var author = book.author,
        name = book.surname,
        title = book["title"];
    //alert(author+ " " + name + " " + title);
    book["title"] = "title_new"; //对对象属性进行赋值（设置），这种方式称之为关联数组，js中对象都是关联对象
    //book.title = "title_new"; //设置
    //alert(book["title"]);
    for(var t in book){ //循环遍历
        alert(book[t]);
    }
}
/**
 * 给对象(portfolio)添加新属性(stockname)
 * @param portfolio
 * @param stockname
 * @param shares
 */
function addstock(portfolio, stockname, shares){
    portfolio[stockname] = shares;
}
/*
    遍历对象属性
 */
var portfolio = {
    s: 80,
    q: 12
}
var quote = {
    s: 12,
    q: 90
}
function getQuote(stock){
    return quote[stock];
}
function getValue(){
    var total = 0.0;
    for(var t in portfolio){
        var shares = portfolio[t];
        var price = getQuote(t);
        total += shares * price;
    }
    return total;
}
function T5(){
    alert(getValue());
}
/**
 * 原型对象与继承原型对象的对象关系
 * @constructor
 */
function T6(){
    var unitcircle = {r: 1};
    var c = inherit(unitcircle); //这里的unitcircle作为原型对象
    c.x = 1;
    c.y = 1;
    c.r = 2;
    unitcircle.r; //1，原型对象没有改变
}
/**
 * 读取属性出错
 * @constructor
 */
function T7(){
    //book.sur; //undefined，报错，因为属性根本不存在
    /**
     * 跑出一个类型错误异常，undefined没有length属性。
     * 除非确定book和book.sur都是对象，否则不能这样写表达式book.sur.length
     * @type {length|*|Function|length|Number|length}
     */
    //var len = book.sur.length;
    /**
     * 针对上面提出两种方法
     */
    /*1、冗余*/
    /*var len = undefined;
    if(book){
        if(book.sur){
            len = book.sur.length;
        }
    }*/
    /*2、更加简单，利用&&运算符的短路行为可以组织类型错误异常*/
    /*var len = book && book.sur && book.sur.length;*/
}
/**
 * delete运算符操作。delete运算符只能删除自有属性，不能删除继承属性，
 * 如果要删除继承属性，只能从定义这个属性的原型对象上删除它
 * @constructor
 */
function T8(){
    delete book.surname;
    delete book.author;

    var a = {
        p: {x: 1},
        y: 1
    };
    var b = a;
    //delete a.p; //这种很容易造成内存泄露
    alert(b.p); //Object object，如果delete a.p之后显示undefined
    alert(b.p.x); // 1
    alert(b.y); // 1
}

function T9(){
    o = {
        x: 1
    }
    delete o.x; //true
    delete o.x; //true
    delete o.toString; //true
    delete 1; //true

    //delete Object.prototype; //不能删除，属性是不可配置的
    var x = 1; //声明全局变量
    //delete this.x; //不能删除全局变量
    function f(){} //声明全局函数
    //delete this.f; //不能删除全局函数

    this.y = 1; //创建一个可配置的全局属性（不用var）
    delete this.y; //删除，最好使用this关键字，在严格模式下，只能使用this关键字删除属性或方法
    alert(y); //y is undefined
    //alert(this.y); //undefined
}

function T10(){
    function f(){}
    alert(f.constructor === f); //false
    alert(f.constructor); //function Function(){[native code]}
    alert(T10.constructor === f); //false
    alert(T10.constructor); //function Function(){[native code]}
}
/*
    组合模式：构造函数+原型模式
    js中常用创建对象方式
    变量类型属性：用构造函数传递
    函数类型变量：用原型模式声明
*/
function Student(){} //无参构造函数
function Student(age, name){ //有参构造函数
    this._age = age;
    this._name = name;
}

Student.prototype.setName = function(name2){
    this._name = name2;
}
Student.prototype.getName = function(){
    return this._name;
}
Student.prototype.setAge = function(age2){
    this._age = age2;
}
Student.prototype.getAge = function(){
    return this._age;
}
/*测试对象constructor属性*/
function T11(){
    var s = new Student("23", "huangwei");
    var ss = new Student();
    alert(Student.prototype); //object Object
    alert(s.prototype); //undefined，但是不报错
    alert(Object.isPrototypeOf(Student)); //false
    alert(Object.prototype.isPrototypeOf(Student)); //true 这里还是不解啊，换成Object.prototype.isPrototypeOf(Student),ok!
    /*上面两个访问例子，证明访问prototype属性，必须是通过类.prototype方式，通过对象（类的实例）是不行的*/
    //alert(s.getName()); //huangwei
    //alert(s.constructor === Student); //true，证明Student类或s的构造函数就是上面的Student(age, name)
    alert(s.constructor); //内容就是"function Student(age, name){this._age = age;this._name = name}"
                          //如果有多个构造函数，则遍历构造函数到最后一个，这个取决构造函数顺序。
    alert(ss.constructor); //function Student(age, name){this._age = age;this._name = name}
}

/*检测属性*/
function T12(){
    var o = {
        x: 1
    }
    //alert(Object.getPrototypeOf(o)); //object Object
    if("x" in o){
        if("toString" in o){
            alert(o.constructor); // function Object(){[native code]} 这是Object类默认的构造函数
                                  //因为o对象是没有显式的构造函数，所以访问到的是上级（向上查询）
                                  //的构造函数
            alert(Object.prototype); //object Object，这里和上面Student类访问prototype属性一样
            //alert(Object.isPrototypeOf(Student));  //没有显式的继承，就不能访问？
            //解决：这里只能从Object.prototype.isPrototypeOf()检测
        }
    }

    o.hasOwnProperty("x"); //true
    o.hasownproperty("y"); //false
    o.hasownproperty("toString"); //false  toString非自有属性
}
/*判断属性方法*/
function T13(){
    var o = {
        x: undefined,
        y: null
    }
    o.x !== undefined //false 属性存在但值为undefined
    o.y !== null; //false 属性存在但值为undefined
    "x" in o; //true
    "y" in o; //true
    delete o.x;
    alert("x" in o); //false
}
/*过滤继承属性或方法*/
function T14(){
    var o = {
        x: 1,
        f: function(){
        }
    }
    var o1 = inherit(o);
    o1.y = 2;
    o1.z = 3;
    for(p in o1){ //继承属性
        if(!o.hasOwnProperty(p)){
            alert(o1[p]);
            continue;
        }
    }
    for(p in o1){  //方法
        if(typeof o1[p] !== "function"){  //2、3、1  从这里可以看出这个熟悉下那个访问顺序
                                          //先访问自有属性，然后再访问继承属性
            alert(o1[p]);
            continue;
        }
    }
}
/*将p中科枚举属性复制到o中*/
function extend(o, p){
    for(prop in p){
        o[prop] = p[prop];
    }
    return o;
}

/*将p中可枚举属性复制到o中，并返回o
如果存在同名属性，则o中属性不受影响
但是不处理setter和getter函数
*/
function merge(o, p){
    for(prop in p){
        if(o.hasOwnProperty(prop)){
            continue;
        }
        o[prop] = p[prop];
    }
    return o;
}
/*遍历o中属性，如果没有同名属性在p中，则从o删除该属性*/
function restrict(o, p){
    for(prop in o){
        if(!(prop in p)){
            delete o[prop];
        }
    }
    return o;
}
/*如果o中属性在p中存在同名属性，则从o中删除这个属性*/
function subtract(o, p){
    for(prop in p){
        delete o[prop];
    }
    return o;
}
/*返回一个对象，这个对象同时有o和p中属性，存在同名使用p中属性*/
function union(o, p){
    return extend(extend({}, o), p);
}
/*返回一个对象，同时（同时存在）o和p属性，同名使用o中属性*/
function intersection(o, p){
    return restrict(extend({}, o), p);
}
/*返回存放o中可枚举的自有属性*/
function keys(o){  //该函数在ECMAScript5中有实现，另外有Object.getOwnPropertyNames()，返回所有属性（可枚举与不可枚举）
    if(typeof o != "object"){
        throw TypeError();
    }
    var result = [];
    for(var prop in o){
        if(o.hasOwnProperty(prop)){
            result.push(prop);
        }
    }
    return result;
}

/*setter和getter
    js会把这些函数当做对象的方法来调用
*/
function T16(){
    var p = {
        x: 1.0,
        y: 2.0,
        get r(){
            return Math.sqrt(this.x*this.x + this.y*this.y);
        },
        set r(newValue){
            var oldValue = Math.sqrt(this.x*this.x + this.y*this.y);
            var ratio = newValue/oldValue;
            this.x *= ratio; 
            //注意这里的this关键字用法，这里的this关键字指向的这个点的对象（p）
            this.y *= ratio;
        },
        // theta是只读存取器属性，只具有getter属性
        get theta(){
            return Math.atan2(this.y, this.x);
        }
    }
}
/*测试setter和getter*/
function T17(){
    var p = {
        x: 1.0,
        y: 2.0,
        get r(){
            return Math.sqrt(this.x*this.x + this.y*this.y);
        },
        set r(newValue){
            var oldValue = Math.sqrt(this.x*this.x + this.y*this.y);
            var ratio = newValue/oldValue;
            this.x *= ratio; 
            //注意这里的this关键字用法，这里的this关键字指向的这个点的对象（p）
            this.y *= ratio;
        },
        // theta是只读存取器属性，只具有getter属性
        get theta(){
            return Math.atan2(this.y, this.x);
        }
    }
    var q = inherit(p);
    alert(q.x +" "+ q.y +" "+ q.r +" " +q.theta);
}
/*使用getter和setter实现对象属性的自增序列*/
function T18(){  //怎样体现n的自增性？见下面
    var serialnum = {
        $n: 0,
        get next(){
            return this.$n++;
        },
        set next(n){
            if(n > this.$n){
                this.$n = n;
            }else {
                throw "序列号的值不能比当前值小";
            }
        }
    }
    for(var j = 0;j < 3;j++){  //这里体现自增性
        alert(serialnum.next);
    }
    //如果"这里"将serialnum（循环后的serialnum）作为原型对象继承，属性$n使用的是for循环执行后的$n值--2
    /*var o = inherit(serialnum);  
    for(var i = 0;i < 3;i++){
        alert(o.next);
    }*/
}
/*该函数返回对象的属性描述符*/
//其中getOwnPropertyDescriptor()函数只能得到自有属性的描述符
//如果要获得继承属性的特性，需要遍历原型链(getPropertyof())
function T19(){
    var o = Object.getOwnPropertyDescriptor({x: 1}, "x");
    var result = [];
    for(var prop in o){
        //alert(prop +": "+ o[prop]);
        result.push(prop);
    }
    return result;
}
function T20(o, p){
    var object = o.getOwnPropertyDescriptor(o, p);
    var result = [];
    for(var prop in object){
        result.push(prop);
    }
    return result;
}
/*设置对象属性特性*/
function T21(){
    var o = {};
    //添加一个不可枚举的属性X
    Object.defineProperty(o, "x", {
        value: 1,
        writable: true,
        enumerable: false,
        configurable: true
    });
    o.x;  // => 1
    Object.keys(o); // => []
    Object.defineProperty(o, "x", {writable: false});
    o.x = 2; //操作失败但不报错，而在严格模式中抛出异常
    Object.defineProperty(o, "x", {value: 2});  //由于该属性是课配置的，所以可以使用该方式进行修改
    Object.defineProperty(o, "x", {get: function(){return 0;}});
    o.x // => 0   
}

/*一次性添加多个属性*/
function T22(){
    var p = Object.defineProperties({}, {
        x: {value: 1, writable: true, enumerable: true, configurable: true},
        y: {value: 1, writable: true, enumerable: true, configurable: true},
        r: {
            get: function() {return Math.sqrt(this.x*this.x + this.y*this.y);},
            enumerable: true,
            configurable: true
        }
    });
    alert(Object.keys(p));
}
/*测试*/
function T23(){
    Object.defineProperty(Object.prototype,
        "extend", //定义Object.prototype.extend
        {
            writable: true,
            enumerable: false,   //定为不可枚举
            configurable: true,
            value: function(o){ //值就是这个函数
                var names = Object.getOwnPropertyNames(o); //得到所有自由属性，包含不可枚举类型
                for(var i = 0; i < names.length; i++){
                    if(namse[i] in this){
                        continue;
                    }
                    var desc = Object.getOwnPropertyDescriptor(o, names[i]);
                    Object.defineProperty(this, names[i], desc);
                }
            }
        });
    //alert(this);  //object Window
}

/*对象三属性：
    prototype class extensible-attribute
*/
/*classof()*/
function classof(o){
    if(null === o) return "Null";
    if(undefined === o) return "undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}
/*可扩展性：
    Object.esExtensible(o); //判断对象o是否可扩展
    Object.preventExtensions(o); //将对象o转为不可扩展，
    一旦设置为不可扩展，就不能改成可扩展，且该函数值影响对象本身，
    也就是说如果给一个不可扩展对象的原型添加属性，那么这个对象同样会继承这些信属性。
*/

/*Object.seal()与Object.preventExtensions()相似，
    除了将对象设置为不可扩展，还可以将对象的所有自由属性设置为不可配置。
    也就是说不能给这个对象添加属性，而且属性也不能删除或配置，
    不过它的已有可写属性依然可以设置（也就是对value进行设置）。
    对于已经封闭的对象是不能解封的。可以使用Object.isSealed()判断是否封闭。
    对应Object.freeze()函数更加严格锁定（冻结）对象，除了设置扩展性和不可设置之外，
    还可以将属性设置只读，但是如果存储器属性具有setter方法，
    则该属性不受影响任然可以给属性赋值和调用 检测函数：Object.isFrozen();
    preventExtensions(),seal(),freeze()函数返回值都是对象
*/
/*创建一个封闭对象，包含一个冻结的原型和一个不可枚举的属性*/
var oclose = Object.seal(Object.create(Object.freeze({x: 1}), {y: {value: 2, writable: true}}));

/*序列化与反序列化对象
    stringify()：
    序列化对象，但是只能序列化课枚举的自有属性
    parse()：还原对象
*/
function T24(){
    var o = {
        x: 1,
        y: {
            z: [false, null, ""]
        }
    };
    var s = JSON.stringify(o);
    alert(s);
    p = JSON.parse(s);
    alert(p.toString());
    for(var prop in p){
        alert(prop);
    }
}
/*测试toString()、toLocaleString()、toJSON()、valueOf()*/
//valueOf()函数和toString()函数很类似，需要获得对象的原始值时，调用valueOf()函数
function T25(){
    var str = [];
    for(var i = 0; i < 6; i++){
        str.push(i);
    }
    var num = 1;
    //alert(str.pop());  //类似出栈，数组最后一个
    //alert(str.toLocaleString());
    //alert(num.toLocaleString());

    var d = new Date();
    //alert(d.toString()); //不同格式的日期
    //alert(d.toLocaleString());
    alert(d.toJSON());
    alert(d.valueOf());
    function t(){
        alert();
    }
    //alert(t.toString()); //函数源代码
}
/*数组结构：
    数组的元素可能是任意类型，并且同一个数组中不同元素可能是不同的类型，甚至可能是对象或者其它数组，好比对象的数组或数组的数组
*/
/*该函数功能，遍历数组元素，元素类型不定*/
function listArray(){
    var b = [2, [1, {x: 1, y: 2}], [2, {x: 3, y: 4}]];
    for(var prop in b){
        if(classof(b[prop]) === "Array"){
            for(var prop1 in b[prop]){
                if(classof(b[prop][prop1]) === "Object"){
                    for(var o in b[prop][prop1]){
                        alert("对象属性："+ b[prop][prop1][o]);
                    }
                }
                else{
                    alert("数组中数组值："+ b[prop][prop1]);
                }
            }
        }
        else{
            alert("数组值："+ b[prop]);
        }
    }
}

function T26(){
    var o = {};
    o[1] = "one"; //给对象添加属性"1"，同时设置value为"one"
    for(var prop in o){
        alert(prop +": "+ o[prop]);
    }

    var a = [];
    a[-1.23] = true; //这里创建一个"-1.23"的属性
    a["1000"] = 0; //这是数组的第1001个元素
    a[1.000] = 1;//这里的a[1.000]与a[1]等价
}

function T27(){
    var a1 = [,,,]; 
    a1[0] = undefined;
    var a2 = new Array(3);
    a2 = [1,2,3,4,5];
    //火狐与谷歌同样结果
    //alert(0 in a1); //false ???
    //alert(0 in a2); //false
    //alert(a1);
    for(var prop in a1){
        //alert(a1[prop]);
        //alert(null);
        if(a1[prop] == ""){
            alert("kong");
        } else if(a1[prop] == null){ //这里的undefined等于null  等价
            alert("nu"); 
            alert(a1[prop]); //undefined
        }else if (a1[prop] == undefined) { //如果把这个放前面同样会执行
            alert("un");
        }else{
            alert(prop); //显示数组下标
        }
        //alert(prop in a1); //判断下标是否在数组中
    }
    //alert(a1.length); // 3
    a2.length = 3;
    alert(a2); //这里就变成1,2,3
    a2.length = 0; //删除数组所有元素
    a2.length = 5; //长度为5，但没有元素 new Array(5);
    //上面写法也就是说可以通过设置数组长度的方法来剪切数组（不可逆），扩展数组
    Object.defineProperty(a2, "length", {writable: false}); //这样就可以设置a2数组长度不可改
}
//数组元素的添加和删除
function T28(){
    a = []; //申明数组
    a[0] = "zero"; //给数组添加新元素
    a.push("one");
    a.push("two", "three"); //同时添加多个元素
    a[a.length] = "four"; //添加新元素
    a.unshift("1"); //在数组首部插入新元素，并将其他元素移动到更高的索引处
    alert(a);
    delete a[0]; //数组索引0处不存在元素
    alert(a.length); //数组长度不变 使用delete删除元素，不影响数组长度
    //使用shift()与unshift()函数可以对数组头部进行删除和添加
    //同样使用pop()与push()可以对数组尾部进行删除和添加
    for(var i = 0, len = a.length; i < len; i++){
        if(!a[i]) continue; //跳过null undefined 不存在的元素
        if(a[i] === undefined) continue; //跳过undefined 不存在元素
        if(!(i in a)) continue; //跳过不存在的元素
    }
    //如果数组中存在不存在的元素，可以使用for/in结构遍历数组，这样不存在的元素将不会遍历到，但是使用
    //for/in结构遍历数组会遍历到继承的属性，索引使用for/in遍历时，必须使用hasOwnProperty()来判断是否是继承属性
}
/*
测试数组forEach遍历方法，但在IE中不存在
其实JS中不支持真正的多维数组，只是简单的模拟（数组的数组）见T31()
*/
function T29(){
    var data = [1,2,3,4,5];
    var sumOfSquares = 0;
    data.forEach(function(x){ //forEach方法在IE中存在，也就是说Array.Prototepy.forEach不存在
        sumOfSquares += x*x;
    });
    alert(sumOfSquares);
}
/*
测试数组join()：将数组组成特定字符串
        split()：拆分成数组
        reverse()：将数组元素颠倒顺序
        sort()：数组元素排序，默认按照字母表排序，如果带有参数function(a, b){ return a-b;} 从大到小
                function(s, t){
                    var a = s.toLowerCase();
                    var b = t.toLowerCase();
                    if(a < b){
                        return -1;
                    }
                    if(a > b){
                        return 1;
                    }
                    return 0;
                }
                这样的写法就是不区分大小写，按照字母的顺序排序
        concat()：合并数组，但是不递归合并数组
        slice()：返回指定数组的片段 或子数组，参数为起始位置，不影响原始数组
        splice()：删除数组元素，但是影响（操作或改变）原数组
        push()：给数组尾端添加新元素（可多个）
        pop()：退出数组最后元素（数组长度减1）
*/
function T30(){
    var a = [1, 2, 3];
    a.join(); //"1,2,3" 默认为逗号分隔
    a.join(" "); //"1 2 3"
    a.join(""); //不适用任何分隔符 "123"
    a.join().split(","); //还原成分数组
}
/*
多维数组
*/
function T31(){
    var table = new Array(10); //10行
    for(var i = 0; i < table.length; i++){
        table[i] = new Array(10); //10列
    }
    for(var row = 0; row < table.length; row++){
        for(var col = 0; col < table[row].length; col++){
            table[row][col] = row*col;
        }
    }
    alert(table);
}
/*
测试数组toString()和toLocaleString()
*/
function T32(){
    var a = [1222233333, "2", "3"];
    alert(a.toString()); // 1222233333,2,3
    alert(a.toLocaleString()); //1,222,233,333,2,3
}
/*利用push()和pop()实现栈（先进后出）
*/
function T33(){
    var stack = [];
    stack.push(1, 2); //返回数组长度 2
    stack.pop(); //返回数组最后一个元素 2
    stack.push(3); //同样返回数组长度 2
    stack.push([3, 4]); //返回数组长度 3 添加后方括号消失 在添加的时候如果不加上方括号，就表示两个元素
    alert(stack.pop()); // 3,4 没有外面方括号
    alert(stack + " " +stack.length);
}
/*
测试数组函数
*/
function T34(){
    var data = [1, 2, 3, 4, 5];
    var sum = 0;
    //forEach()，该函数无法提前终止循环，如想提前终止循环，必须在try/catch语句中跑出异常
    data.forEach(function(value){
        sum += value;
    });
    //alert(sum);
    data.forEach(function(v, i, a){ //三个参数：数组元素，索引，数组，forEach函数操作（影响原数组）
        a[i] = v + 1;
    });
    //alert(data);
    //map()
    b = data.map(function(x){ return x*x; });//该函数将data数组中每一元素传递给自定义函数function(x){XXXX}
    //该函数返回值为新的数组，而且该函数不操作（改变）原数组
    //alert(b);
    //filter()一般用来过滤、提取数组中特定的元素，返回值同样是数组
    smallValues = data.filter(function(x){
        return x < 6;
    });
    //alert(smallValues);//2,3,4,5
    var sparse = [ 1, , 2, 3, 4, 5, 6, 7];
    //alert(sparse.length); //长度为7
    //alert(sparse); //1, , 2, 3, 4, 5, 6, 7
    var dense = sparse.filter(function(){ return true; }); //过滤掉不存在的元素，索引经过filter处理的元素总是稠密的
    //alert(dense); //1, 2, 3, 4, 5, 6, 7 这样会过滤掉其中不存在的元素
    dense = dense.filter(function(value) { //压缩处理删除undefined和null元素
        return value !== undefined && value != null;
    });
    //every()和some()函数相当于对 所有和存在  数学中量词一样
    var t = dense.every(function(x){return x < 10;}); //这里申明变量不能用Boolean，这里JS会自动识别
    //alert(t); //true
    var tat = [1, 2, 3, 4, 5];
    var _sum = tat.reduce(
        function(x, y){
            return x+y;
        }, 0); //数组求和
    var _product = tat.reduce(
        function(x, y){
            return x*y;
        }, 1);
    //alert(_sum + " " + _product);
    //indexOf()从头开始  lastIndexOf()反向查找  两个函数都是用于查找指定元素  字符串中也有类似的方法
    //该函数查找数组中匹配的元素的索引，返回一个数组
    function findAll(a, x){
        var results = [];
        len = a.length;
        pos = 0;
        while(pos < len){
            pos = a.indexOf(x, pos);
            if(pos === -1){
                break;
            }
            results.push(pos);
            pos ++;
        }
        return results;
    }
    function tes(){
        var san = 3;
    }
    alert(findAll(tat, 1));
}

function T35(){
    var a = {};
    var  i = 0;
    while(i < 10){
        a[i] = i * i; //给a对象增加一个i属性，值为i*i
        i++;
    }
    a.length = i; //增加新属性length 值为i
    //通过以上步骤，就生成一个类数组
    var total = 0; 
    for(var j = 0;j < a.length; j++){ //遍历伪数组
        total += a[j];
    }
    alert(total);
}
































































