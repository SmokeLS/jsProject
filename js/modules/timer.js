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

export default timer;