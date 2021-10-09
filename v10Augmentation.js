//* set my as an empty object.
var MODULE = (function (my) {
	my = {};
	my.anotherMethod = function () {
		console.log('hi');
	};
	return my;
})(MODULE);
// console.log(my);
// MODULE.anotherMethod();

//* set my to an empty object if nothing is passed in.
//* via
//* (test2 || {});
var test2 = (function (my) {
	my.anotherMethod = () => {
		console.log('hi');
	};
	return my;
})(test2 || {});
test2.anotherMethod();
