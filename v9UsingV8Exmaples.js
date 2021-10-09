var test1 = (function () {
	var my = {};
	const privateVariable = 1;

	function privateMethod() {
		return this.privateVariable;
	}

	my.moduleProperty = 1;
	my.moduleMethod = function () {
		return this.moduleProperty++;
	};

	return my;
})();

// console.log(test1);
// console.log(test1.my); //undefined

// console.log(test1.moduleProperty); // 1
// test1.moduleProperty = 2;
// console.log(test1.moduleProperty); // 1

// test1.privateVariable = 3;
// console.log(test1.privateVariable);
// console.log(test1);

// console.log(test1.privateMethod());

//! < 2 > !\\
//* !!Revealing pattern!! *\\
//? we can see privateMethod, since it is being returned ?\\
var test2 = (function () {
	var my = {};
	const privateVariable = 1;
	function privateMethod() {
		// return this.privateVariable; //*this does not work
		return privateVariable; //* this does
	}
	my.moduleProperty = 1;
	my.moduleMethod = function () {
		return this.moduleProperty++;
	};
	return { my, privateMethod };
})();
// console.log(test2);
// console.log(test2.my);
// console.log(test2.my.moduleProperty);
// console.log(test2.privateMethod());
// console.log(test2.privateVariable); //* this will be undefined since it's not being returned.
//* 	return { my, privateMethod, privateVariable }; makes the line above work. *\\
//! </ 2 > !\\

//! </ 3 > !\\
const test3 = (function () {
	const my = {
		privateVariable: 1,
		privateMethod() {
			return this.privateVariable;
		},
		moduleProperty: 'a',
		moduleMethod() {
			return this.moduleProperty();
		},
	};
	return my;
})();
// console.log(test3);
// console.log(test3.privateVariable);
//! </ 3 > !\\

//! testing the difference between:
//! return my;
//! and
//! return { my };
//? seems to just add useless code.
//? test3.moduleProperty works.
//? test4.moduleProperty does NOT work.
//? test4.my.moduleProperty does work. => unneeded.

//! </ 4 > !\\
const test4 = (function () {
	const my = {
		privateVariable: 1,
		privateMethod() {
			return this.privateVariable;
		},
		moduleProperty: 'a',
		moduleMethod() {
			return this.moduleProperty();
		},
	};
	return { my };
})();
// const thing1 = test4; //* these end up being the same.
// console.log(test4); //* these end up being the same.
// console.log(thing1); //* these end up being the same.
// console.log(test4.my.privateVariable);
// console.log(test4.privateVariable); //* undefined.
// console.log(thing1.privateVariable); //* undefined.
//! </ 4 > !\\
