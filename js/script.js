import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import forms from './modules/forms';
import classes from './modules/classes';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener("DOMContentLoaded",(event)=>{
    const modalWindow = document.querySelector(".modal");

    tabs(".tabheader__items", ".tabheader__item", ".tabcontent");
    timer("2020-10-20",".timer");
    modal(modalWindow);
    forms(modalWindow);
    classes(".container");
    slider(".offer__slider-inner", ".offer__slider", ".offer__slide", ".offer__slider-next", ".offer__slider-prev");
    calc(); 
});