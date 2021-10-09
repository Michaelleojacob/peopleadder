const obj = {
	var1: 'var1',
	method1() {
		return console.log('hello from obj.method1');
	},
	_private() {
		return console.log('this should be a _private method');
	},
};

const test1 = (function (my) {
	console.log(my);
	const _private = (my._private = my._private || {}),
		_seal = (my._seal =
			my._seal ||
			function () {
				delete my._private;
				delete my._seal;
				delete my._unseal;
			}),
		_unseal = (my._unseal =
			my._unseal ||
			function () {
				my._private = _private;
				my._seal = _seal;
				my._unseal = _unseal;
			});

	// permanent access to _private, _seal, and _unseal

	_private();
	return my;
})(obj || {});

console.log(test1);
