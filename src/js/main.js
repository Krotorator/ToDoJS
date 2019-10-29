import { getNowDate, renderNewTask, renderDoneTask } from "./form";
import { HighlightNotEmptyDay } from "./calendar";
import { deleteIsDoneFromStorage, isDoneDisapearOnCloseBtn } from "./_scripts";
export { renderAllDoneTasks, renderAllExistTasks, thisDate };

export default function renderAllExistTasks(arr) {
    if (arr && arr.toDo) {
        if (Array.isArray(arr.toDo)) {
            arr.toDo.sort(function(a, b) {
                return parseInt(a.taskTime.substr(0, 2)) - parseInt(b.taskTime.substr(0, 2));
            });
            arr.toDo.forEach(taskObj => {
                renderNewTask(taskObj);
                const todoSignal = document.querySelector("#todoSignal");
                todoSignal.innerText = parseInt(arr.toDo.length);
            });
        } else {
            renderNewTask(arr.toDo);
        }
    }
}

require("./_scripts");
require("./form");
require("./done");
require("./calendar");

// window.onload = function() {
const toDoLink = document.querySelector(".link__todo");
const doneLink = document.querySelector(".link__done");
const toDoBody = document.querySelector("#todos_body");
const taskEditAll = [...document.querySelectorAll("#taskEdit")];
const editInput = document.querySelector("#edit");
const deleteAllBtn = document.querySelector("#deleteAll");
const deletePopup = document.querySelector("#deletePopup");
const toDos = document.querySelector("#toDos");

toDos.addEventListener("click", function(e) {
    if (e.target.id == "taskEdit") {
        editForm.setAttribute("style", "display:flex");
        overlay.classList.add("overlay--active");
        editInput.value = e.target.previousElementSibling.previousElementSibling.innerText;
        editTask.addEventListener("click", () => {
            const editInputNow = document.querySelector("#edit");
            if (!editInput.value) {
                editInput.classList.add("input-alert");
                setTimeout(() => {
                    editInput.classList.remove("input-alert");
                }, 1500);
            } else {
                e.target.previousElementSibling.previousElementSibling.innerText =
                    editInputNow.value;
                editForm.setAttribute("style", "display:none");
                overlay.classList.remove("overlay--active");

                const thisStorage = JSON.parse(localStorage.getItem(thisDate()));

                for (const taskType in thisStorage) {
                    thisStorage[taskType].forEach(sotorageItem => {
                        if (
                            sotorageItem.unique ==
                            e.target.previousElementSibling.previousElementSibling.dataset.unique
                        ) {
                            sotorageItem.taskText =
                                e.target.previousElementSibling.previousElementSibling.innerText;
                        }
                    });
                    localStorage.setItem(thisDate(), JSON.stringify(thisStorage));
                }
            }
        });
    } else if (e.target.id == "returnLayer") {
        deleteIsDoneFromStorage(
            e.target.parentElement.previousElementSibling.previousElementSibling
                .previousElementSibling,
            true
        );
        isDoneDisapearOnCloseBtn(e.target.parentElement);
        const todoSignal = document.querySelector("#todoSignal");
        todoSignal.classList.add("signal-animate");
        setTimeout(() => {
            todoSignal.classList.remove("signal-animate");
        }, 800);
    }
});
editClose.addEventListener("click", function(e) {
    editForm.setAttribute("style", "display:none");
    overlay.classList.remove("overlay--active");
});

toDoLink.addEventListener("click", () => {
    doneBody.classList.add("hide");
    doneLink.classList.remove("link--active");
    toDoBody.classList.remove("hide");
    toDoLink.classList.add("link--active");
    plus.removeAttribute("disabled", "disabled");
    plus.classList.remove("button__add--big-disabled");
});
doneLink.onclick = () => {
    toDoBody.classList.add("hide");
    toDoLink.classList.remove("link--active");
    doneBody.classList.remove("hide");
    doneLink.classList.add("link--active");
    plus.setAttribute("disabled", "disabled");
    plus.classList.add("button__add--big-disabled");
};

deleteAllBtn.addEventListener("click", () => {
    deletePopup.setAttribute("style", "display: flex");
    overlay.classList.add("overlay--active");
});

deletePopup.addEventListener("click", e => {
    if (e.target.id == "deleteConfirm") {
        const calendarDays = [...calendarContainer.children];
        calendarDays.forEach(day => {
            if (day.firstElementChild.dataset.date == thisDate()) {
                day.firstElementChild.classList.remove("calendar__item-highlighted");
                localStorage.removeItem(thisDate());
            }
        });

        // localStorage.removeItem(thisDate());
        tasksContainer.innerHTML = "";
        doneContainer.innerHTML = "";
        todoSignal.innerText = 0;
        doneSignal.innerText = 0;
        deletePopup.setAttribute("style", "display: none");
        overlay.classList.remove("overlay--active");
    } else if (e.target.id == "deleteCancel" || e.target.id == "deleteClose") {
        deletePopup.setAttribute("style", "display: none");
        overlay.classList.remove("overlay--active");
    }
});

function getAllTasksFromLocalStorage(key) {
    let existTasks = JSON.parse(localStorage.getItem(key));
    return existTasks;
}

function renderAllDoneTasks(arr) {
    if (arr && arr.isDone) {
        if (Array.isArray(arr.isDone)) {
            arr.isDone.forEach(taskObj => {
                renderDoneTask(taskObj);
            });
        } else {
            renderDoneTask(arr.isDone);
        }
    }
}

function thisDate() {
    let thisDate;
    const calendarDays = [...calendarContainer.children];
    calendarDays.forEach(day => {
        if (day.firstElementChild.classList.contains("calendar__item-active")) {
            thisDate = day.firstElementChild.dataset.date;
        }
    });
    return thisDate;
}
// };
