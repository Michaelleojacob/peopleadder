//the purpose of this is to clone, and replace a method on the old object
//objToClone will be getting cloned, and it's method moduleMethod is repalced.

objToClone = {
	var1: 'var1',
	method1() {
		return console.log('method1 was called');
	},
	var2: 'var2',
	moduleMethod() {
		return console.log('this is the old moduleMethod');
	},
};

var test1 = (function (old) {
	// console.log(old); //* (old === objToClone)
	let my = {};

	//* loop over 'old' obj, cloning it to 'my' obj
	for (let key in old) {
		if (old.hasOwnProperty(key)) {
			my[key] = old[key];
		}
	}

	//* private since it's scoped to the function.
	var super_moduleMethod = old.moduleMethod;
	// console.log(super_moduleMethod);

	my.publicSuperMethod = super_moduleMethod;

	my.moduleMethod = function () {
		//* override method on the clone, access to super through super_moduleMethod
		return console.log('replaced lelelelelel');
	};

	return my;
})(objToClone);

objToClone.moduleMethod();
// test1.super_moduleMethod(); //* this will throw and error
test1.publicSuperMethod(); //* this is the old method. publicSuperMethod == objToClone.moduleMethod;
test1.moduleMethod();
