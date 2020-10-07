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

export default slider;