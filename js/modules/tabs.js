function tabs(tabsHeaderSelector, tabsItemSelector, tabsContentSelector) {
    const tabheader = document.querySelector(tabsHeaderSelector),
          tabs = tabheader.querySelectorAll(tabsItemSelector),
          tabscontent = document.querySelectorAll(tabsContentSelector);

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
}

export default tabs;