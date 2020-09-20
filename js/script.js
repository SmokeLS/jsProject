window.addEventListener("DOMContentLoaded",(event)=>{
    //tabs

    let tabheader = document.querySelector(".tabheader__items"),
        tabs = tabheader.querySelectorAll(".tabheader__item"),
        tabscontent = document.querySelectorAll(".tabcontent");

    hideTab();
    showTab();

    function showTab(i = 0) {
        tabs[i].classList.add("tabheader__item_active");
        tabscontent[i].classList.remove("hide","fade");
        tabscontent[i].classList.add("show","fade");
    }

    function hideTab() {
        tabs.forEach((item)=>{
            item.classList.remove("tabheader__item_active");
        });
        tabscontent.forEach((item)=>{
            item.classList.add("hide","fade");
        });
    }

    tabheader.addEventListener("click",(event)=>{
        let target = event.target;
        if (target && target.classList == "tabheader__item"){
            for(let i =0; i < tabs.length;i++){
                if (target == tabs[i]){
                    hideTab();
                    showTab(i);
                }
            }
        }
    });

    //timer
    
    const deadline = new Date("2020-09-20"),
          date = new Date();

    function checkDate(deadline) {
        const ms = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor((ms/1000/60/60 + new Date().getTimezoneOffset()/60)/24),
              hours = Math.floor((ms/1000/60/60 + new Date().getTimezoneOffset()/60)% 24),
              minutes = Math.floor(ms/1000/60 % 60),
              seconds = Math.floor(ms/1000 % 60);


        return {
            ms: ms,
            days : days,
            hours : hours,
            minutes : minutes,
            seconds : seconds
        };
    }

    function setClock(selector,deadline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds");


        setTimeout(keepUpdated,1000);

        function keepUpdated(){
            let now = checkDate(deadline);

            if (now.ms <= 0)
                return false;

            days.innerHTML = now.days;
            hours.innerHTML = now.hours;
            minutes.innerHTML = now.minutes;
            seconds.innerHTML = now.seconds;

            setTimeout(keepUpdated,1000);
        }
    }

    setClock(".timer",deadline);
    
    //modal

    const modal = document.querySelector(".modal"),
          btnModal = document.querySelectorAll("[data-modal]"),
          btnCloseModal = document.querySelectorAll("[data-close]");

    btnModal.forEach(btn=> {
        btn.addEventListener("click", ()=>{
            modal.classList.add("show");
            clearInterval(timerId);
        });
    });

    btnCloseModal.forEach(btn=> {
        btn.addEventListener("click", ()=> {
            modal.classList.remove("show");
        });
    });

    window.addEventListener("keyup", (event)=>{
        if (event.key == "Escape" && modal.classList.contains("show")){
            modal.classList.remove("show");
        }
    });

    modal.addEventListener("click", function (event) {
        const target = event.target;
        if(target && target === this){
            modal.classList.remove("show");
        }
    });

    // const timerId = setInterval(()=>{
    //     modal.classList.add("show");
    // },5000);

    window.addEventListener("scroll", (event)=>{
        if (document.documentElement.clientHeight + window.pageYOffset == document.documentElement.scrollHeight){
            modal.classList.add("show");modal.classList.add("show");
        }
    });

    // class
    const container = document.querySelector(".container");
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
    new Menu("img/tabs/post.jpg","post",'Меню "Постное"','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430, ".menu__field .container" ).render();
});