import { renderAllExistTasks, renderAllDoneTasks } from "./main";
export { HighlightNotEmptyDay };

const Handlebars = require("handlebars");
const moment = require("moment");
const calendarContainer = document.querySelector("#calendarContainer");
const arrowPrev = document.querySelector("#prev");
const arrowNext = document.querySelector("#next");
handlebarsRenderCalendarItems();
const calendarItems = document.querySelectorAll("#calendarItem");

if (calendarContainer.children) {
    setVisibleAndActiveCalendarItem();
    HighlightNotEmptyDay();
    arrowPrev.addEventListener("click", e => {
        controlCarousel("prev");
    });
    arrowNext.addEventListener("click", e => {
        controlCarousel("next");
    });
}

[...calendarItems].forEach(calendarItem => {
    calendarItem.addEventListener("click", function(e) {
        calendarItems.forEach(Item => {
            if (Item != e.target) {
                Item.classList.remove("calendar__item-active");
                tasksContainer.innerHTML = "";
                doneContainer.innerHTML = "";
            }
            if (!Item.classList.contains("calendar__item-active")) {
                calendarItem.classList.add("calendar__item-active");
                let allTasksArray = JSON.parse(localStorage.getItem(calendarItem.dataset.date));
                renderAllExistTasks(allTasksArray);
                renderAllDoneTasks(allTasksArray);
                const doneSignal = document.querySelector("#doneSignal");

                if (!allTasksArray) {
                    doneSignal.innerText = 0;
                    doneSignal.innerText = 0;
                } else {
                    doneSignal.innerText = allTasksArray.isDone.length;
                    todoSignal.innerText = allTasksArray.toDo.length;
                }
            }
        });
    });
});

function handlebarsRenderCalendarItems() {
    for (let i = 1; i < moment().daysInMonth() + 1; i++) {
        let calendarItemTemplateObj = {
            fullDate: `${i - 1}.${moment().month() + 1}.${moment().year()}`,
            day: moment(`${moment().month() + 1}.${i}.${moment().year()}`).format("ddd"),
            date: `${setDateField(i)}.${moment().month() + 1}`
        };
        function setDateField(i) {
            let day;
            if (i - 1 < 9) {
                day = "0" + i;
            } else {
                day = i;
            }
            return day;
        }
        const source = document.getElementById("calendarTemplate").innerHTML;
        const template = Handlebars.compile(source);
        const html = template(calendarItemTemplateObj);
        let div = document.createElement("div");
        div.innerHTML = html;
        div.setAttribute("style", "display:none");
        calendarContainer.append(div);
    }
}

function controlCarousel(direction) {
    const visibleDays = [];
    const calendarDays = [...calendarContainer.children];
    for (let i = 0; i < calendarDays.length; i++) {
        if (calendarDays[i].getAttribute("style") == "display:block") {
            calendarDays[i].setAttribute("style", "display:none");
            visibleDays.push(i);
        }
    }
    if (direction == "prev") {
        if (visibleDays[0] >= 1) {
            for (let i = 0; i < visibleDays.length; i++) {
                calendarDays[visibleDays[i] - 1].setAttribute("style", "display:block");
            }
        } else {
            visibleDays[0] = calendarDays.length - 3;
            visibleDays[1] = calendarDays.length - 2;
            visibleDays[2] = calendarDays.length - 1;
            visibleDays[3] = calendarDays.length;
            for (let i = 0; i < visibleDays.length; i++) {
                calendarDays[visibleDays[i] - 1].setAttribute("style", "display:block");
            }
        }
    } else if (direction == "next") {
        if (visibleDays[1] < calendarDays.length - 3) {
            console.log(visibleDays[3]);
            console.log(calendarDays.length);
            for (let i = 0; i < visibleDays.length; i++) {
                calendarDays[visibleDays[i] + 1].setAttribute("style", "display:block");
            }
        } else {
            // console.log(visibleDays);
            visibleDays[0] = 2;
            visibleDays[1] = 1;
            visibleDays[2] = 0;
            visibleDays[3] = -1;
            console.log(visibleDays);
            for (let i = 0; i < visibleDays.length; i++) {
                console.log(visibleDays);

                calendarDays[visibleDays[i] + 1].setAttribute("style", "display:block");
            }
        }
    }
}

function setVisibleAndActiveCalendarItem() {
    let nowDay = parseInt(moment().format("DD"));
    const calendarDays = [...calendarContainer.children];
    for (let i = nowDay - 1; i < nowDay + 3; i++) {
        calendarDays[nowDay].firstElementChild.classList.add("calendar__item-active");
        calendarDays[i].setAttribute("style", "display:block");
    }
    let allTasksArray = JSON.parse(
        localStorage.getItem(calendarDays[nowDay].firstElementChild.dataset.date)
    );
    renderAllExistTasks(allTasksArray);
    renderAllDoneTasks(allTasksArray);
}

function HighlightNotEmptyDay() {
    const calendarDays = [...calendarContainer.children];
    calendarDays.forEach(day => {
        if (localStorage.getItem(day.firstElementChild.dataset.date)) {
            if (
                JSON.parse(localStorage.getItem(day.firstElementChild.dataset.date)).isDone.length >
                    0 ||
                JSON.parse(localStorage.getItem(day.firstElementChild.dataset.date)).toDo.length > 0
            ) {
                day.firstElementChild.classList.add("calendar__item-highlighted");
            } else {
                day.firstElementChild.classList.remove("calendar__item-highlighted");
            }
        }
    });
}
