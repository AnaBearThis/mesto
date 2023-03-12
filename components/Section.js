export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._array = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderEls() {
        this._array.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}