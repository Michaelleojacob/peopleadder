const domManager = (function () {
	function domElement({
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
	}
	return { domElement };
})();

const addPersonUI = (function () {
	const handleSubmit = e => {
		e.preventDefault();
		console.log(e);
	};
	const domTree = domManager.domElement({
		type: 'form',
		classes: ['parent'],
		events: [{ type: 'submit', handler: handleSubmit }],
		children: [
			domManager.domElement({
				type: 'input',
				attributes: { placeholder: 'name' },
			}),
			domManager.domElement({
				type: 'button',
				text: 'add person',
			}),
		],
	});
	return { domTree };
})();

const createPersonWrapper = (() => {
	const liParentTree = domManager.domElement({
		type: 'ul',
		classes: ['liParent'],
	});
	return { liParentTree };
})();

const createNewPersonLi = name => {
	const person = domManager.domElement({
		classes: ['personWrapper'],
		children: [
			domManager.domElement({
				text: name,
			}),
			domManager.domElement({
				type: 'button',
				text: 'X',
			}),
		],
	});

	createPersonWrapper.liParentTree.appendChild(person);
};

const appendToContainer = (() => {
	const container = document.querySelector('#container');
	container.appendChild(addPersonUI.domTree);
	container.appendChild(createPersonWrapper.liParentTree);
})();
