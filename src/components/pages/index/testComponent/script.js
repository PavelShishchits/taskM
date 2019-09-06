import Component from '../../../../js/components/core/component';
import './style.scss';
import './svg/close.svg';
import './svg/twitter.svg';

class TestCompontent extends Component {

    constructor(products) {
        super();
        this._data = $.extend({}, {
            products
        });
        console.log('mew 2');
    }

    get template() {
        const {_data} = this;
        return `<div class="products">
                    ${_data.products.map((product) => {
                        return `<div class="product"><img src="${product.Image}"/><span>${product.Price}</span></div>`;
                    }).join('')} 
                </div>`;
    }
}

$(function () {
    const container = $('.test-component');

    if (!container.length) {
        return false;
    }

    const getData = (url) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                container.append(new TestCompontent(response).render());
            })
            .catch((error) => {
                console.error(error + 'mew');
            });
    };

    getData('http://localhost:4000/products');
});
