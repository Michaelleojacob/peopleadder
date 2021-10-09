(function () {
	// ... all vars and functions are in this scope only
	// still maintains access to all globals
})();

//? < iteration one > ?\\
//unrevealing. Everything is scoped and thus inaccessable.
(function () {
	const obj = {};
	const container = document.querySelector('#container');
	// console.log(container);
	const mydiv = document.createElement('div');
	mydiv.textContent = 'hi i am a div';
	mydiv.classList.add('mydiv');
	obj.domThing = mydiv;
	// console.log(obj);\
	// container.appendChild(mydiv);
	return obj;
})();
// console.log(obj);
//? </ iteration one > ?\\

//? < iteration two > ?\\
//uses destructuring, outside the object.
//due const testing = (function(){}) we can now save the output of this function.
const testing = (function () {
	const obj = {};
	//set the property on the object.
	obj.container = document.querySelector('#container');
	//making a dom element
	const mydiv = document.createElement('div');
	mydiv.textContent = 'hi i am a div';
	mydiv.classList.add('mydiv');
	//adding the dom element to the obj on the first line of this component
	obj.domThing = mydiv;
	//for testing the component, and returning the object.
	// console.log(obj);
	return obj;
})();
//?testing the obj properties. Testing is the object in a way.
//?this way is able to be mutated though.
// console.log(testing.container);
// console.log(testing.domThing);
//?destructuring
const { domThing, container } = testing;
// console.log(domThing);
// console.log(container);
//?proof it works.
// container.appendChild(domThing);
//? </ iteration two > ?\\

//? < iteration three > ?\\
const testing2 = (function () {
	const obj = {
		parent: document.querySelector('#container'),
		makeMyDiv() {
			const mydiv = document.createElement('div');
			mydiv.textContent = 'hi i am a div';
			mydiv.classList.add('mydiv');
			return mydiv;
		},
		appendDiv() {
			this.parent.appendChild(this.makeMyDiv());
		},
	};
	//?both this one and the one below work.
	// obj.appendDiv();
	return obj;
})();
//?this one as well
// testing2.appendDiv();
//? </ iteration three > ?\\
