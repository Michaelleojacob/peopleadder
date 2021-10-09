//sub models

const domwrapper = (() => {
	const domManager = {
		createElement({
			type = 'div',
			text = null,
			classes = null,
			attributes = null,
			events = null,
			children = null,
		}) {
			const el = document.createElement(type);

			if (classes !== null) {
				el.classList.add(...classes);
			}

			if (text !== null) {
				el.textContent = text;
			}

			if (attributes !== null) {
				for (let key in attributes) {
					el.setAttribute(key, attributes[key]);
				}
			}
			if (children !== null) {
				children.map(x => el.appendChild(x));
			}
			if (events !== null) {
				events.map(({ type, handler }) => {
					// console.log(handler);
					el.addEventListener(type, handler);
				});
			}
			return el;
		},
	};
	return domManager;
})();

const testingAnOutsideModule = (() => {
	const outsideModuleWrapper = {
		omg(e) {
			console.log(e);
		},
	};
	return outsideModuleWrapper;
})();

const outsideModule2 = (function () {
	const wrapperForOutside2 = {
		outsideModuleLogHi() {
			console.log('hi');
		},
		outsideModuleLogParam(num) {
			console.log(num);
		},
	};

	return wrapperForOutside2;
})();

// outsideModule2.outsideModuleLogHi();
// outsideModule2.outsideModuleLogParam(6);

// console.log(
// 	domwrapper.createElement({
// 		type: 'div',
// 		text: 'hello',
// 		classes: ['class1'],
// 		events: [{ type: 'mouseover', handler: testingAnOutsideModule.omg }],
// 	})
// );

//! handler: this === window. Not sure why !\\
//? in a function it works, outside the function, it does not ?\\
const makeButton = (function () {
	const buttonwrapper = {
		logEvent(ev) {
			console.log('hi from logEvent');
		},
		//? this failed because the object cannot reference itself.
		failedTest: domwrapper.createElement({
			type: 'div',
			text: 'hello',
			classes: ['class1'],
			// events: [{ type: 'click', handler:  }],
		}),
		successfulTest() {
			// console.log(this.e);
			this.buttonElement = domwrapper.createElement({
				type: 'div',
				text: 'hello',
				classes: ['class1'],
				events: [{ type: 'click', handler: this.logEvent }],
			});
			return this.buttonElement;
		},
		parentEl: document.querySelector('#container'),
		renderToDom() {
			const variableToHoldDomOutput = this.successfulTest();
			this.parentEl.appendChild(variableToHoldDomOutput);
		},
	};
	return buttonwrapper;
})();

makeButton.renderToDom();

// const haha = (() => {
// 	const mything = {
// 		init() {
// 			this.cacheDom();
// 			this.render();
// 		},
// 		cacheDom() {
// 			this.container = document.querySelector('#container');
// 		},
// 		clickMe(e) {
// 			console.log(e.target);
// 		},
// 		domthing: domwrapper.createElement({
// 			type: 'button',
// 			text: 'v4 click',
// 			classes: 'helloFromV4',
// 			events: [{ type: 'click', handler: () => 'hi' }],
// 		}),
// 		render() {
// 			this.container.appendChild(this.domthing);
// 		},
// 	};
// 	mything.init();
// })();
