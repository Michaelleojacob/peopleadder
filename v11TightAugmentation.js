// const MODULE = (function (my) {
// 	const old_moduleMethod = my.moduleMethod;

// 	my.moduleMethod = function () {
// 		// method override, has access to old through old_moduleMethod...
// 	};

// 	return my;
// })(MODULE);

lol = {
	prop1: 'hi',
	method1() {
		console.log(this.prop1);
	},
};

const test2 = (function (my) {
	console.log(lol);
	console.log(my);
	console.log(lol === my); //* true.

	// let old_moduleMethod = my.method1;
	// console.log(old_moduleMethod);

	my.old_moduleMethod = my.method1;

	my.replaceMethod = function () {
		my.old_moduleMethod = function () {
			console.log('omg');
		};
	};
	return my;
})(lol);

// test2.old_moduleMethod();

test2.old_moduleMethod(); //* this one #=> 'hi';
lol.method1();
test2.replaceMethod(); //* gets replaced here
test2.method1();
test2.old_moduleMethod(); //* has now been updated #=> 'omg';
lol.method1();
