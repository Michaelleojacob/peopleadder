const domManager = ({
	type = 'div',
	text = null,
	classes = null,
	attributes = null,
	events = null,
	children = null,
}) => ({
	type,
	text,
	classes,
	attributes,
	events,
	children,
	createDomElement() {
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
});

const wrapper = (() => {
	const lol = () => {
		console.log('clicked');
	};
	const mything = domManager({
		type: 'button',
		text: 'click me',
		classes: ['class1'],
		events: [{ type: 'click', handler: lol }],
	});
	const container = document.querySelector('#container');
	container.appendChild(mything.createDomElement());
})();

const outsideiife = () => {
	console.log('outside iife clicked');
};

//!  outside wrapper / iife !\\

const myoutside = domManager({
	type: 'button',
	text: `don't click me`,
	classes: ['class1'],
	events: [{ type: 'click', handler: outsideiife }],
});

const container = document.querySelector('#container');
container.appendChild(myoutside.createDomElement());
