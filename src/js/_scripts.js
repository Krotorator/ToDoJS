import { getNowDate, renderDoneTask } from "./form";
require("./form");
const toDos = document.querySelector("#toDos");
let chekboxes = document.querySelectorAll(".todos__item-checkbox");
const plus = document.querySelector("#plus");
const overlay = document.querySelector("#overlay");

select.addEventListener("click", function(e) {});

plus.addEventListener("click", function(e) {
    addForm.setAttribute("style", "display:flex");
    overlay.classList.add("overlay--active");
});

toDos.addEventListener("click", function(e) {
    console.log(e.target.tagName);

    if (e.target.tagName == "INPUT" && e.target.checked) {
        taskDisapearAfterCheck(e.target);
        deleteTaskFromStorage(e.target);
    } else if (e.target.getAttribute("id") == "doneDelete") {
        isDoneDisapearOnCloseBtn(e.target);
        deleteIsDoneFromStorage(e.target.nextElementSibling);
    } else if (e.target.classList.contains("doneDelete")) {
        isDoneDisapearOnCloseBtn(e.target.parentElement);
    } else if (e.target.tagName == "path") {
        console.log(e.target.parentElement.parentElement);

        isDoneDisapearOnCloseBtn(e.target.parentElement.parentElement.parentElement);
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
        const taskCounter = document.querySelector("#taskCounter");
        taskCounter.innerText = parseInt(taskCounter.innerText) - 1;
    }, 1000);
}

function isDoneDisapearOnCloseBtn(element) {
    let parrentItem = element.parentElement.parentElement;
    setTimeout(() => {
        parrentItem.classList.add("todos__item--hide");
    }, 500);
    setTimeout(() => {
        parrentItem.remove();
        parrentItem.classList.remove("todos__item--hide");
        const doneCounter = document.querySelector("#doneCounter");
        doneCounter.innerText = parseInt(doneCounter.innerText) - 1;
    }, 1000);
}

function deleteTaskFromStorage(checkbox) {
    let existTasks = JSON.parse(localStorage.getItem(getNowDate()));
    let deletedTask;
    for (let i = 0; i < existTasks.toDo.length; i++) {
        if (existTasks.toDo[i].idFor == checkbox.id) {
            deletedTask = existTasks.toDo.splice(i, 1);

            existTasks.isDone.push(deletedTask[0]);
            renderDoneTask(deletedTask[0]);
        }
    }
    localStorage.setItem(getNowDate(), JSON.stringify(existTasks));
}

function deleteIsDoneFromStorage(label) {
    let existTasks = JSON.parse(localStorage.getItem(getNowDate()));
    let deletedIsDone;
    for (let i = 0; i < existTasks.isDone.length; i++) {
        if (existTasks.isDone[i].idFor == label.getAttribute("for")) {
            deletedIsDone = existTasks.isDone.splice(i, 1);
        }
    }
    localStorage.setItem(getNowDate(), JSON.stringify(existTasks));
}
