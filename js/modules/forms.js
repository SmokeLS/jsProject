import {postData} from '../services/service';
import {openModal, closeModal} from './modal';

function forms(modal) {
    const forms = document.querySelectorAll("form");
    const message = {
        loading: "Подождите...",
        success: "Спасибо, мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach((form)=> {
        form.addEventListener("submit", showModal);
    });

    function showModal(e){
        e.preventDefault();

        const thanksModal = document.createElement("div"),
              modalDialog = document.querySelector(".modal__dialog");

        showMessage(message.loading);

        const formData = new FormData(this);
        
        let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', jsonData)
        .then(data => {
            showMessage(message.success);
        })
        .catch((error) => {
            showMessage(message.failure);
        })
        .finally(() => {this.reset();});

        function showMessage(message){
            thanksModal.classList.add("modal__dialog");
            modalDialog.classList.add("hide");
            thanksModal.innerHTML = `
            <div class ="modal__dialog">
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            </div>
            `;
            modal.append(thanksModal);

            setTimeout(()=>{
                thanksModal.remove();
                modalDialog.classList.remove("hide");
                modalDialog.classList.add("show");
                closeModal(modal);
            },4000);
        }
    }
}

export default forms;