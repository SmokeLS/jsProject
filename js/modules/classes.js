import {getData} from '../services/service'

function classes(containerSelector) {
    const container = document.querySelector(containerSelector);

    class Menu{
        constructor(src, alt, title, descr, price, parent){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = parent;
        }
        render(){
            let div = document.createElement("div");
            div.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>`;

            document.querySelector(this.parent).append(div);
        }
    }

    getData('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimage, title, descr, price})=> {
            new Menu(img,altimage,title,descr,price,'.menu__field .container').render();
        });
    });
}

export default classes;