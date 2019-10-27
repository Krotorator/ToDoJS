import { renderAllExistTasks, renderAllDoneTasks } from "./main";

const Handlebars = require("handlebars");

const addForm = document.querySelector("#addForm");
const editForm = document.querySelector("#editForm");

const select = document.querySelector("#select");
const taskInput = document.querySelector("#task");
const editInput = document.querySelector("#edit");
const addTask = document.querySelector("#addTask");
const editTask = document.querySelector("#editTask");
const tasksList = document.querySelector("#todos__items");
const tasksContainer = document.querySelector("#tasksContainer");
const doneContainer = document.querySelector("#doneContainer");

const formCloseButton = document.querySelector("#close");

createAndAppendOption(select);
let allTasks = {
    isDone: []
};

let taskTime;

select.onchange = function(e) {
    this.setAttribute("selected", "selected");
};

addTask.addEventListener("click", function() {
    if (taskInput.value != "") {
        const calendarItems = [...document.querySelectorAll("#calendarItem")];
        let activeDate;
        calendarItems.forEach(item => {
            if (item.classList.contains("calendar__item-active")) {
                activeDate = item.dataset.date;
            }
        });

        let idFor;
        let forIdFor = JSON.parse(localStorage.getItem(activeDate));
        if (forIdFor) {
            idFor = `check${forIdFor.toDo.length}`;
        } else {
            idFor = "check0";
        }
        let taskObj = {
            taskText: taskInput.value,
            taskTime: select.value,
            title: taskInput.value,
            idFor: idFor
        };
        allTasks.toDo = [];
        allTasks.toDo.push(taskObj);

        [...tasksContainer.children].forEach(child => {
            child.remove();
        });

        setAllTasksToLocalStorage(activeDate, allTasks);
        let AllExistTasks = JSON.parse(localStorage.getItem(activeDate));
        renderAllExistTasks(AllExistTasks);
        if (AllExistTasks && AllExistTasks.toDo) {
            const todoSignal = document.querySelector("#todoSignal");
            todoSignal.innerText = parseInt(AllExistTasks.toDo.length);
        }

        todoSignal.classList.add("signal-animate");
        setTimeout(() => {
            todoSignal.classList.remove("signal-animate");
        }, 800);

        taskInput.value = "";
        closeForm();
    } else {
        taskInput.classList.add("input-alert");
        setTimeout(() => {
            taskInput.classList.remove("input-alert");
        }, 1500);
    }
});

editTask.addEventListener("click", function() {});

formCloseButton.addEventListener("click", function() {
    closeForm();
});

function createAndAppendOption(whereToAppend) {
    for (let i = 0; i < 24; i++) {
        if (i < 10) {
            i = "0" + i;
        }
        let option = document.createElement("option");
        let optionVal = `${i}:00`;
        option.setAttribute("value", optionVal);
        option.innerText = option.getAttribute("value");
        whereToAppend.append(option);
        if (option.getAttribute("value").slice(0, 2) == new Date().getHours()) {
            option.setAttribute("selected", "selected");
        }
    }
}

function renderNewTask(obj) {
    const source = document.getElementById("taskTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const context = {
        taskText: obj.taskText,
        taskTime: obj.taskTime,
        check: obj.idFor,
        title: obj.title
    };
    const html = template(context);
    let newTask = document.createElement("div");
    newTask.classList.add("todos__item");
    newTask.setAttribute("id", "toDoItem");
    newTask.dataset.time = obj.taskTime;
    newTask.innerHTML = html;
    tasksContainer.append(newTask);
}

function renderDoneTask(obj) {
    const source = document.getElementById("doneTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const context = {
        taskText: obj.taskText,
        taskTime: obj.taskTime,
        check: obj.idFor,
        title: obj.title
    };
    const html = template(context);
    let doneTask = document.createElement("div");
    doneTask.classList.add("todos__item");
    doneTask.setAttribute("id", "toDoItem");
    doneTask.dataset.done = "true";
    doneTask.innerHTML = html;
    doneContainer.append(doneTask);
    // const doneCounter = document.querySelector("#doneCounter");
    // doneCounter.innerText = parseInt(doneCounter.innerText) + 1;
    doneSignal.innerText = parseInt(doneSignal.innerText) + 1;
}

function getNowDate() {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const fullDate = `${day}.${month}.${year}`;
    return fullDate;
}

function setAllTasksToLocalStorage(key, valueArray) {
    let existTasks = JSON.parse(localStorage.getItem(key));
    console.log(existTasks);

    if (existTasks && existTasks.toDo) {
        valueArray.toDo.forEach(element => {
            existTasks.toDo.push(element);
        });
        localStorage.setItem(key, JSON.stringify(existTasks));
    } else {
        localStorage.setItem(key, JSON.stringify(valueArray));
    }
}

function closeForm() {
    addForm.setAttribute("style", "display:none");
    overlay.classList.remove("overlay--active");
}

export { getNowDate, renderDoneTask, renderNewTask };
