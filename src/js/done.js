require("./_scripts");
require("./form");

// const Handlebars = require("handlebars");

// const doneBody = document.querySelector("#doneBody");
// const doneList = document.querySelector(".done__items");

// function renderDoneTask(obj) {
//     const source = document.getElementById("doneTemplate").innerHTML;
//     const template = Handlebars.compile(source);
//     const context = { taskText: obj.taskText, taskTime: obj.taskTime, check: obj.idFor };
//     const html = template(context);
//     let doneTask = document.createElement("div");
//     doneTask.classList.add("todos__item");
//     doneTask.setAttribute("id", "toDoItem");
//     doneTask.innerHTML = html;
//     doneBody.append(doneTask);
//     const taskCounter = document.querySelector("#doneCounter");
//     taskCounter.innerText = parseInt(taskCounter.innerText) + 1;
// }

// export { renderDoneTask };
