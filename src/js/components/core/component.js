export default class Component {

    constructor() {
        this._element = null;
        this._state = {};
        this._data = {};
        this._selector = {};
    }

    get element() {
        return this._element;
    }

    get template() {
        throw new Error('You have to defined components template');
    }

    render() {
        this._element = $(this.template);
        this.cache();
        this.bind();
        return this._element;
    }

    cache() {}

    uncache() {}

    bind() {}

    unbind() {}

    update() {}

    unrender() {
        this.unbind();
        this._element.remove();
        this._element = null;
    }
}