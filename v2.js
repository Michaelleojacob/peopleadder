//global spaghetti.
//testing a few small things.

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

const container = document.querySelector('#container');

const lol = e => {
	console.log('hi');
};

const mything = domManager({
	type: 'button',
	text: 'hello',
	classes: ['class1', 'class2'],
	events: [{ type: 'click', handler: lol }],
});

console.log(mything);
console.log(mything.createDomElement());

container.appendChild(mything.createDomElement());
