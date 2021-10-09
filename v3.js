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
				console.log(type);
				console.log(handler);
				el.addEventListener(type, handler);
			});
		}
		return el;
	},
});
