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

export default calc;