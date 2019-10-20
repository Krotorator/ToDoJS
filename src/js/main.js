import { getNowDate, renderNewTask, renderDoneTask } from "./form";
require("./_scripts");
require("./form");
require("./done");

window.onload = function() {
    const toDoLink = document.querySelector(".link__todo");
    const doneLink = document.querySelector(".link__done");
    const toDoBody = document.querySelector("#todos_body");

    toDoLink.addEventListener("click", () => {
        doneBody.classList.add("hide");
        doneLink.classList.remove("link--active");
        toDoBody.classList.remove("hide");
        toDoLink.classList.add("link--active");
    });
    doneLink.onclick = () => {
        toDoBody.classList.add("hide");
        toDoLink.classList.remove("link--active");
        doneBody.classList.remove("hide");
        doneLink.classList.add("link--active");
    };

    let allTasksArray = getAllTasksFromLocalStorage(getNowDate(getNowDate()));
    renderAllExistTasks(allTasksArray);
    renderAllDoneTasks(allTasksArray);

    function getAllTasksFromLocalStorage(key) {
        let existTasks = JSON.parse(localStorage.getItem(key));
        return existTasks;
    }

    function renderAllExistTasks(arr) {
        if (arr && arr.toDo) {
            if (Array.isArray(arr.toDo)) {
                arr.toDo.forEach(taskObj => {
                    renderNewTask(taskObj);
                });
            } else {
                renderNewTask(arr.toDo);
            }
        }
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
};
