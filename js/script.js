
window.addEventListener('DOMContentLoaded', () =>{
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title'),
        empty = document.querySelector('.empty').cloneNode(true);

    function openCart () {
        "use strict";
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeCart () {
        "use strict";
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click',openCart);
    close.addEventListener('click',closeCart);

    goodsBtn.forEach(function (btn,i) {
        "use strict";
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');

            trigger.remove();

            showConfirm();
            calcGoods(1);

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';

            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);

            if(empty){
                empty.remove();
            }
            calcTotal();
            removeFromCart();
        });
    });

    titles.forEach(function (titel) {
        if(titel.textContent.length < 70){
            return;
        }else{
            const str = titel.textContent.slice(0,70)+ '...';
            titel.textContent = str;
        }
    });

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        let id = setInterval(frame,10);
        function frame() {

            if (counter === 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }

        }

    }

    function calcGoods(i) {

        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = i + items.length;

    }
    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper >.goods__item >.goods__price > span');
        let total = 0;

        prices.forEach(function (item) {
            total += +item.textContent;
        });
        totalCost.textContent = total;
        return total;
    }

    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');

        removeBtn.forEach(function (btn,i) {
            btn.addEventListener('click',function () {
                btn.parentElement.remove();
                calcGoods(0);
                calcTotal();
                if(calcTotal() ===0){
                    cartWrapper.appendChild(empty);
                }
            });
        });
    }
});
