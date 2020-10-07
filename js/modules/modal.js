function modal(modalSelector) {
    const btnModal = document.querySelectorAll("[data-modal]"),
          btnCloseModal = document.querySelectorAll("[data-close]");

    modalSelector.addEventListener("click", (e)=>{
        if (e.target && e.target.tagName == "DIV"){
            closeModal(modalSelector);
        }

        if (e.target && e.target.tagName == "BUTTON"){
            openModal(modalSelector);
            clearInterval(timerId);
        }
    });

    btnModal.forEach(btn=> {
        btn.addEventListener("click", ()=>{
            openModal(modalSelector);
        });
    });

    window.addEventListener("keyup", (event)=> {
        if (event.key == "Escape" && modalSelector.classList.contains("show")){
            closeModal(modalSelector);
        }
    });

    modalSelector.addEventListener("click", function (event) {
        const target = event.target;

        if(target && target === this){
            closeModal(modalSelector);
        }
    });

    const timerId = setInterval(()=>{
        modalSelector.classList.add("show");
    },10000);

    window.addEventListener("scroll", (event)=>{
        if (document.documentElement.clientHeight + window.pageYOffset == document.documentElement.scrollHeight){
            modalSelector.classList.add("show");
        }
    });
}

function openModal(modalSelector){
    modalSelector.classList.remove("hide");
    modalSelector.classList.add("show");
}

function closeModal(modalSelector){
    modalSelector.classList.remove("show");
    modalSelector.classList.add("hide");
}

export default modal;
export {openModal,closeModal};