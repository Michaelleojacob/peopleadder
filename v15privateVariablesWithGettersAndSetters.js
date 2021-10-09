const test1 = (() => {
	let num = 0;
	function incrementNum() {
		// return num++; //* does NOT work for some reason
		return ++num; //* does work.
		// return (num = num + 1);
	}
	function getNum() {
		return console.log(num);
	}
	return { incrementNum, getNum };
})();

console.log(test1);
console.log(test1.num);
test1.num = 14; //* this is setting a property on test1.
console.log(test1.num); //* this shows the line above.
//now on to the non scuffed examples #=>
test1.getNum(); //* this gets the internal value
test1.incrementNum();
test1.getNum();
test1.incrementNum();
test1.incrementNum();
test1.getNum();
