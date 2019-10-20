const Handlebars = require("handlebars");

const addForm = document.querySelector("#addForm");
const select = document.querySelector("#select");
const taskInput = document.querySelector("#task");
const addTask = document.querySelector("#addTask");
const tasksList = document.querySelector("#todos__items");
const formCloseButton = document.querySelector("#close");

createAndAppendOption(select);
let allTasks = {
    isDone: []
};
addTask.addEventListener("click", function() {
    let taskTime;
    for (const option of [...select.children]) {
        if (option.hasAttribute("selected")) {
            taskTime = option.value;
        }
    }
    let idFor = `check${tasksList.children.length}`;
    let taskObj = {
        taskText: taskInput.value,
        taskTime: taskTime,
        idFor: idFor
    };
    allTasks.toDo = [];
    allTasks.toDo.push(taskObj);
    renderNewTask(taskObj);
    taskInput.value = "";
    closeForm();
    setAllTasksToLocalStorage(getNowDate(), allTasks);
    console.log(allTasks);
});

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
    const context = { taskText: obj.taskText, taskTime: obj.taskTime, check: obj.idFor };
    const html = template(context);
    let newTask = document.createElement("div");
    newTask.classList.add("todos__item");
    newTask.setAttribute("id", "toDoItem");
    newTask.innerHTML = html;
    tasksList.append(newTask);
    const taskCounter = document.querySelector("#taskCounter");
    taskCounter.innerText = parseInt(taskCounter.innerText) + 1;
}

function renderDoneTask(obj) {
    const source = document.getElementById("doneTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const context = { taskText: obj.taskText, taskTime: obj.taskTime, check: obj.idFor };
    const html = template(context);
    let doneTask = document.createElement("div");
    doneTask.classList.add("todos__item");
    doneTask.setAttribute("id", "toDoItem");
    doneTask.innerHTML = html;
    doneBody.append(doneTask);
    const doneCounter = document.querySelector("#doneCounter");
    doneCounter.innerText = parseInt(doneCounter.innerText) + 1;
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
    let existTasks = JSON.parse(localStorage.getItem(getNowDate()));
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
