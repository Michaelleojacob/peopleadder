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

//cache container
const cacheContainer = (() => {
	const container = document.querySelector('#container');
	return { container };
})();

//dom input and button
const addPersonUI = (function () {
	const handleSubmit = e => {
		e.preventDefault();
		const personName = domTree.childNodes[0].value;
		if (personName === '') return;
		createNewPersonLi(personName);
		domTree.childNodes[0].value = '';
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

//dom placeholder
const createPersonWrapper = (() => {
	const liParentTree = domManager.domElement({
		type: 'ul',
		classes: ['liParent'],
	});
	return { liParentTree };
})();

//each person.
const createNewPersonLi = name => {
	const deletePerson = e => {
		e.target.closest('div').remove();
	};
	const person = domManager.domElement({
		classes: ['personWrapper'],
		children: [
			domManager.domElement({
				text: name,
			}),
			domManager.domElement({
				type: 'button',
				text: 'X',
				events: [{ type: 'click', handler: deletePerson }],
			}),
		],
	});

	createPersonWrapper.liParentTree.appendChild(person);
};

const appendToContainer = (() => {
	container.appendChild(addPersonUI.domTree);
	container.appendChild(createPersonWrapper.liParentTree);
})();

//dummy data
createNewPersonLi('mikey');
createNewPersonLi('sam');
createNewPersonLi('fred');
