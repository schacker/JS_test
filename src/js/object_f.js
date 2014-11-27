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

/*setter和getter*/
function T16(){
	var p = {
		x: 1.0,
		y: 2.0,
		get r(){
			return Math.sqrt(this.x*this.x + this.y*this.y);
		},
		set r(newValue){
			
		},
		get theta(){}
	}
}

