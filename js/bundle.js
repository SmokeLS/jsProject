/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/js/modules/calc.js":
/*!*********************************!*\
  !*** ./dist/js/modules/calc.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    const gender = document.querySelectorAll("#gender div"),
          activityBlocks = document.querySelectorAll("[data-activity]"),
          consitution = document.querySelectorAll(".calculating__choose_medium input");

    let height, weight, age, totalActivity,
    sex = localStorage.getItem("sex") || "female",
    activity= localStorage.getItem("activity") || 1.375;

    calcActivity(weight, height, age, activity, sex);

    gender.forEach(block => {
        block.addEventListener("click", chooseDivBlock.bind(null, "calculating__choose-item_active"));
    });

    gender.forEach(block => {
        block.classList.remove("calculating__choose-item_active")
        if (block.getAttribute("id") === sex){
            block.classList.add("calculating__choose-item_active");
        }
    });

    activityBlocks.forEach(block => {
        block.addEventListener("click", chooseDivBlock.bind(null, "calculating__choose-item_active"));
    });

    activityBlocks.forEach(block => {
        block.classList.remove("calculating__choose-item_active");
        if (block.getAttribute("data-activity") == activity){
            block.classList.add("calculating__choose-item_active");
        }
    });

    consitution.forEach(inp => {
        inp.addEventListener("input", () => {
            if (inp.value.match(/\D/g)){
                inp.style.border = '1px solid red';
            }else{
                inp.style.border = "none";
            }

            switch (inp.getAttribute("id")){
                case "weight":
                    weight = +inp.value;
                    break;
                case "height":
                    height = +inp.value;
                    break;
                case "age":
                    age = +inp.value;
                    break;
            }

            calcActivity(weight, height, age, activity, sex);
        });
    })

    function chooseDivBlock(newClass, e){
        if(e.target && e.target.getAttribute("id") && e.target.parentNode == gender[0].parentNode){
            gender.forEach(div => div.classList.remove(newClass));
            sex = e.target.getAttribute("id");
            e.target.classList.add(newClass);

            localStorage.setItem("sex", sex);

            calcActivity(weight, height, age, activity, sex);
        }

        if(e.target && e.target.getAttribute("id") && e.target.parentNode == activityBlocks[0].parentNode){
            activityBlocks.forEach(div => div.classList.remove(newClass));
            activity = e.target.getAttribute("data-activity");
            e.target.classList.add(newClass);

            localStorage.setItem("activity", activity);

            calcActivity(weight, height, age, activity, sex);
        }
    }

    function calcActivity(weight, height, age, activity, sex){
        const result = document.querySelector(".calculating__result span");

        if (!weight || !height || !age || !activity || !sex){
            result.textContent = "____";
            return;
        }

        if (sex === "male"){
            totalActivity = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
        } else {
            totalActivity = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
        }
        result.textContent = totalActivity;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./dist/js/modules/classes.js":
/*!************************************!*\
  !*** ./dist/js/modules/classes.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./dist/js/services/service.js");


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

    Object(_services_service__WEBPACK_IMPORTED_MODULE_0__["getData"])('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimage, title, descr, price})=> {
            new Menu(img,altimage,title,descr,price,'.menu__field .container').render();
        });
    });
}

/* harmony default export */ __webpack_exports__["default"] = (classes);

/***/ }),

/***/ "./dist/js/modules/forms.js":
/*!**********************************!*\
  !*** ./dist/js/modules/forms.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./dist/js/services/service.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./dist/js/modules/modal.js");



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

        Object(_services_service__WEBPACK_IMPORTED_MODULE_0__["postData"])('http://localhost:3000/requests', jsonData)
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
                Object(_modal__WEBPACK_IMPORTED_MODULE_1__["closeModal"])(modal);
            },4000);
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/*! exports provided: default, openModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
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

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(sliderWrapperSelector, sliderSelector, slidesSelector, nextArrowSelector,prevArrowSelector) {
    const sliderInner = document.querySelector(sliderWrapperSelector),
          slider = document.querySelector(sliderSelector),
          slides = document.querySelectorAll(slidesSelector),
          total = document.querySelector("#total"),
          current = document.querySelector("#current"),
          next = document.querySelector(nextArrowSelector),
          prev = document.querySelector(prevArrowSelector),
          width = window.getComputedStyle(slider).width;
    let offset = parseInt(width) * slides.length,
        sliderIndex = 1;

    sliderInner.style.cssText =  `display: flex; width: ${offset}px; transition: .5s all;`;
    slider.style.cssText = 'overflow: hidden;';

    current.textContent = addZero(sliderIndex);
    total.textContent = addZero(slides.length);

    next.addEventListener("click",() => {
        if (sliderIndex >= slides.length){
            sliderIndex = 1;
            showSlider(sliderIndex-1);
        }else{
            sliderIndex++;
            showSlider(sliderIndex-1);
        }

        current.textContent = addZero(sliderIndex);
    });

    prev.addEventListener("click", () => {
        if (sliderIndex <= 1){
            sliderIndex = slides.length;
            showSlider(sliderIndex-1);
        }else{
            sliderIndex--;
            showSlider(sliderIndex-1);
        }
        
        current.textContent = addZero(sliderIndex);
    });

    function showSlider(numb) {
        offset = parseInt(width)*numb;
        sliderInner.style.cssText +=  `transform: translateX(-${offset}px);`;
    }

    function addZero(numb) {
        if (numb < 10){
            return `0${numb}`;
        }else{
            return numb;
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(endtime, timerSelector) {
    const deadline = new Date(endtime),
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

        keepUpdated();

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

    setClock(timerSelector,deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./dist/js/script.js":
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./dist/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./dist/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./dist/js/modules/forms.js");
/* harmony import */ var _modules_classes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/classes */ "./dist/js/modules/classes.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./dist/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./dist/js/modules/calc.js");








window.addEventListener("DOMContentLoaded",(event)=>{
    const modalWindow = document.querySelector(".modal");

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__items", ".tabheader__item", ".tabcontent");
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])("2020-10-20",".timer");
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])(modalWindow);
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])(modalWindow);
    Object(_modules_classes__WEBPACK_IMPORTED_MODULE_4__["default"])(".container");
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])(".offer__slider-inner", ".offer__slider", ".offer__slide", ".offer__slider-next", ".offer__slider-prev");
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])(); 
});

/***/ }),

/***/ "./dist/js/services/service.js":
/*!*************************************!*\
  !*** ./dist/js/services/service.js ***!
  \*************************************/
/*! exports provided: getData, postData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
async function postData(url, data){
    const res = await fetch(url,{
        method: "POST",
        headers:{
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

async function getData(url){
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`the mistake appeared in ${url} and res is equal to ${res}`);
    }

    return await res.json();
}




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map