export default class Section {
    constructor({renderer}, container) {
        this._renderer = renderer;
        this._container = container;
    }

    renderItems(items, id) {
        items.forEach((item) => {
            this._renderer(item, id);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}