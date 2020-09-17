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
});