import { getNowDate, renderDoneTask, renderNewTask } from "./form";
import { thisDate, renderAllExistTasks } from "./main";
import { HighlightNotEmptyDay } from "./calendar";
export { deleteIsDoneFromStorage, isDoneDisapearOnCloseBtn };

require("./form");
const toDos = document.querySelector("#toDos");
let chekboxes = document.querySelectorAll(".todos__item-checkbox");
const plus = document.querySelector("#plus");
const overlay = document.querySelector("#overlay");
const doneSignal = document.querySelector("#doneSignal");

plus.addEventListener("click", function(e) {
    addForm.setAttribute("style", "display:flex");
    overlay.classList.add("overlay--active");
});

toDos.addEventListener("click", function(e) {
    if (e.target.tagName == "INPUT" && e.target.checked) {
        taskDisapearAfterCheck(e.target);
        deleteTaskFromStorage(e.target);
        doneSignal.classList.add("signal-animate");
        setTimeout(() => {
            doneSignal.classList.remove("signal-animate");
        }, 800);
    } else if (e.target.getAttribute("id") == "doneDelete") {
        isDoneDisapearOnCloseBtn(e.target);
        deleteIsDoneFromStorage(e.target.nextElementSibling);
    } else if (e.target.classList.contains("doneDelete")) {
        isDoneDisapearOnCloseBtn(e.target.parentElement);
        deleteIsDoneFromStorage(e.target.parentElement.nextElementSibling);
    } else if (e.target.getAttribute("id") == "doneDeletePath") {
        isDoneDisapearOnCloseBtn(e.target.parentElement.parentElement.parentElement);
        deleteIsDoneFromStorage(
            e.target.parentElement.parentElement.parentElement.nextElementSibling
        );
    }
});

function taskDisapearAfterCheck(element) {
    let checkbox = element;
    let parrentItem = checkbox.parentElement.parentElement;
    setTimeout(() => {
        parrentItem.classList.add("todos__item--hide");
    }, 500);
    setTimeout(() => {
        parrentItem.remove();
        parrentItem.classList.remove("todos__item--hide");
        const todoSignal = document.querySelector("#todoSignal");
        todoSignal.innerText = parseInt(todoSignal.innerText) - 1;
    }, 1000);
}

function isDoneDisapearOnCloseBtn(element) {
    let parrentItem = element.parentElement.parentElement;
    parrentItem.classList.add("todos__item--hide");
    setTimeout(() => {
        parrentItem.remove();
        doneSignal.innerText = parseInt(doneSignal.innerText) - 1;
    }, 1000);
}

function deleteTaskFromStorage(checkbox) {
    let activeDate;
    const calendarItems = [...document.querySelectorAll("#calendarItem")];
    calendarItems.forEach(item => {
        if (item.classList.contains("calendar__item-active")) {
            activeDate = item.dataset.date;
        }
    });
    let existTasks = JSON.parse(localStorage.getItem(activeDate));
    let deletedTask;
    for (let i = 0; i < existTasks.toDo.length; i++) {
        if (existTasks.toDo[i].idFor == checkbox.id) {
            deletedTask = existTasks.toDo.splice(i, 1);

            existTasks.isDone.push(deletedTask[0]);
            renderDoneTask(deletedTask[0]);
        }
    }
    localStorage.setItem(activeDate, JSON.stringify(existTasks));
    HighlightNotEmptyDay();
}

function deleteIsDoneFromStorage(label, flag = false) {
    let existTasks = JSON.parse(localStorage.getItem(thisDate()));
    console.log(existTasks);

    let deletedDone;
    for (let i = 0; i < existTasks.isDone.length; i++) {
        if (existTasks.isDone[i].idFor == label.getAttribute("for")) {
            deletedDone = existTasks.isDone.splice(i, 1);
            if (flag) {
                existTasks.toDo.push(deletedDone[0]);
                // renderNewTask(deletedDone[0]);
            }
        }
    }
    console.log(existTasks);
    tasksContainer.innerHTML = "";
    localStorage.setItem(thisDate(), JSON.stringify(existTasks));
    renderAllExistTasks(existTasks);
    HighlightNotEmptyDay();
}
