const domManager = (() => {
	const my = {
		createDomElement({
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
					el.addEventListener(type, handler);
				});
			}
			return el;
		},
	};
	return my;
})();

//?global spaghetti
const child = domManager.createDomElement({
	type: 'button',
	text: 'button',
	classes: ['class1'],
	attributes: { style: 'background:pink' },
	events: [
		{
			type: 'click',
			handler: function () {
				console.log('hi');
			},
		},
	],
	children: [domManager.createDomElement({ text: 'hello' })],
});
// const container = document.querySelector('#container');
// container.appendChild(child);

//? non global spaghetti
const makeChild = (() => {
	const my = {
		clickHandler(e) {
			console.log(e.target);
		},
		parentEl: document.querySelector('#container'),
		makeTree() {
			const childEl = domManager.createDomElement({
				type: 'button',
				text: 'button',
				classes: ['class1'],
				attributes: { style: 'background:pink' },
				events: [
					{
						type: 'click',
						handler: this.clickHandler,
					},
				],
				children: [domManager.createDomElement({ text: 'hello' })],
			});
			return childEl;
		},
		init() {
			const el = this.makeTree();
			this.parentEl.appendChild(el);
		},
	};
	return my.init();
})();
