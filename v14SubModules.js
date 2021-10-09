//* this is just adding on to the existing obj.
//* it's no different than doing obj.method2 = (){};

const obj = {
	var1: 'var1',
	method1() {
		return console.log('hello from method1');
	},
};

obj.sub = (function () {
	var my = {};

	my.method2 = function () {
		return console.log('hello from sub.method2');
	};

	return my;
})();

obj.method1();
console.log(obj.sub);
obj.sub.method2();

//! < 2 >

const obj2 = {
	var1: 'var1',
	method1() {
		return console.log('hello from obj2.method1');
	},
};
obj2.method2 = function () {
	return console.log('hello from a new method!');
};

obj2.method1();
obj2.method2();

//! </ 2 >
