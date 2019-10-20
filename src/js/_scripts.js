import { getNowDate, renderDoneTask } from "./form";
require("./form");
const toDos = document.querySelector("#toDos");
let chekboxes = document.querySelectorAll(".todos__item-checkbox");
const plus = document.querySelector("#plus");
const overlay = document.querySelector("#overlay");
const doneSignal = document.querySelector("#doneSignal");

select.addEventListener("click", function(e) {});

plus.addEventListener("click", function(e) {
    addForm.setAttribute("style", "display:flex");
    overlay.classList.add("overlay--active");
});

toDos.addEventListener("click", function(e) {
    console.log(e.target);

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
        const taskCounter = document.querySelector("#taskCounter");
        taskCounter.innerText = parseInt(taskCounter.innerText) - 1;
    }, 1000);
}

function isDoneDisapearOnCloseBtn(element) {
    let parrentItem = element.parentElement.parentElement;
    parrentItem.classList.add("todos__item--hide");
    setTimeout(() => {
        parrentItem.remove();
        const doneCounter = document.querySelector("#doneCounter");
        doneCounter.innerText = parseInt(doneCounter.innerText) - 1;
        doneSignal.innerText = parseInt(doneSignal.innerText) - 1;
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
    let deletedDone;
    for (let i = 0; i < existTasks.isDone.length; i++) {
        if (existTasks.isDone[i].idFor == label.getAttribute("for")) {
            deletedDone = existTasks.isDone.splice(i, 1);
            console.log(existTasks.isDone);
        }
    }
    localStorage.setItem(getNowDate(), JSON.stringify(existTasks));
}