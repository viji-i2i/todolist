"use strict";
addEvents();
function addEvents() {

  document.getElementById("add-list").addEventListener("click", addNewList);
  document.getElementById("show-text-field").addEventListener("click", showRightSideBar);
  document.getElementById("show-right-side-bar").addEventListener("click", showRightSideBar);
}
var listItems = document.getElementById('list-items');
var taskItems = document.getElementById('task-items');
var stepItems = document.getElementById('step-items');
var listHeading = document.getElementById('list-heading-input');
var listHeadingInput = document.getElementById('list-heading');
var newListInput = document.getElementById('new-list-input');
var toDoList = [];
var listInfo = "";
var taskInfo = "";


function showRightSideBar() {
  var textFields = document.getElementsByClassName("right-side-nav-bar");
  for (let textField of textFields) {
    textField.classList.toggle("block")
  }
}

/* To Trigger add-list button While Entering Enter Key */
document.getElementById("new-list-input")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("add-list").click();
    }
  });

/* To Trigger add-list button While Entering Enter Key */
document.getElementById("new-task-input")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      addNewTask();
    }
  });

/* To Trigger add-list button While Entering Enter Key */
document.getElementById("step-input")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      addStepsToTask();
    }
  });
/* To Trigger add-list button While Entering Enter Key
document.getElementById("list-heading")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      updateListName();
    }
  }); */

/* This Method addNewList is used to store new List items in Array */
function addNewList() {
  var newList = {
    id: "",
    name: "",
    status: "incomplete",
    tasks: []
  };
  newList.id = generateId();
  var inputValue = document.getElementById("new-list-input").value;
  if ("" === inputValue) {
    alert("It seems like List Name is Empty. Enter Your List name");
  } else {
    newList.name = inputValue;
    toDoList.push(newList);
    listInfo = newList;
    // To display All the Available List Items 
    var listItem = document.createElement("li");
    var listName = document.createTextNode(newList.name);
    listItem.addEventListener("click", assignListInfo.bind(newList));
    listItem.appendChild(listName);
    listItems.appendChild(listItem);

    document.getElementById("list-heading").value = newList.name;

    document.getElementById("list-heading").addEventListener("change", updateListName.bind(newList));
    document.getElementById("new-list-input").value = "";
    //To Display List Heading in right Side bar


  }
}
function updateListName() {
  console.log(this);
  /*for(let index = 0; index<toDoList.length; index++) {
    if(this.id == toDoList[index].id) {
      toDoList[index].name = document.getElementById("list-heading").value;
    }
  } */
  this.name = document.getElementById("list-heading").value;

  reloadList();
}

function reloadList() {
  listItems.innerHTML = "";
  for (let index = 0; index < toDoList.length; index++) {
    var listItem = document.createElement("li");
    var listName = document.createTextNode(toDoList[index].name);
    listItem.addEventListener("click", assignListInfo.bind(toDoList[index]));
    listItem.appendChild(listName);
    listItems.appendChild(listItem);

    document.getElementById("list-heading").value = toDoList[index].name;

    document.getElementById("list-heading").addEventListener("change", updateListName.bind(toDoList[index]))
  }
}

function assignListInfo() {
  document.getElementById("list-heading").value = this.name;
  listInfo = this;
  displayTasks();
}
function assignTaskInfo() {
  document.getElementById("task-heading").value = this.name;
  taskInfo = this;
  displaySteps();
}
function assignStepInfo() {
  stepInfo = this;
}

function displayTasks() {
  taskItems.innerHTML = "";
  let allTasks = listInfo.tasks;
  for (let index in allTasks) {
    var taskItem = document.createElement("li");
    var task = document.createTextNode(allTasks[index].name);
    // console.log(allTasks[index]);

    taskItem.addEventListener("click", assignTaskInfo.bind(allTasks[index]));
    taskItem.appendChild(task);
    taskItems.appendChild(taskItem);
  }
}

function displaySteps() {
  stepItems.innerHTML = "";
  let allSteps = taskInfo.steps;
  for (let index in allSteps) {
    let stepItem = document.createElement("li");
    let step = document.createTextNode(allSteps[index].name);
    // console.log(allSteps[index]);

    stepItem.addEventListener("click", assignListInfo.bind(allSteps[index]));
    stepItem.appendChild(step);
    stepItems.appendChild(stepItem);
  }
}

/**
 * Method to add tasks with Particular List 
 */
function addNewTask() {
  var newTask = {
    id: "",
    name: "",
    status: "incomplete",
    steps: []
  };
  newTask.id = generateId();
  let taskName = document.getElementById("new-task-input").value;
  newTask.name = taskName;
  taskInfo = newTask;
  // To display All the Available Tasks 
  var taskItem = document.createElement("li");
  var task = document.createTextNode(newTask.name);
  taskItem.addEventListener("click", assignTaskInfo.bind(newTask));
  taskItem.appendChild(task);
  taskItems.appendChild(taskItem);
  document.getElementById("new-task-input").value = "";
  listInfo.tasks.push(newTask);

  //console.log(newTask.name)
  document.getElementById("task-heading").value = newTask.name;

}



/**
 * Method to add Multiple Steps for a Particular task
 */
function addStepsToTask() {
  // console.log(taskInfo)
  var newStep = {
    id: "",
    name: "",
    status: "incomplete"
  };
  newStep.id = generateId();
  let stepName = document.getElementById("step-input").value;
  newStep.name = stepName;
  // To display All the Available Tasks 
  var stepItem = document.createElement("li");
  var step = document.createTextNode(newStep.name);
  stepItem.addEventListener("click", assignStepInfo.bind(newStep));
  stepItem.appendChild(step);
  stepItems.appendChild(stepItem);
  document.getElementById("step-input").value = "";
  taskInfo.steps.push(newStep);
  // console.log(stepInfo);

}


function a(element, event, listener, bindElement = "") {
  element.addEventListener(event, listener.bind(bindElement));
}
function generateId() {
  return (Math.random().toString(20).substring(3, 18)
    + Math.random().toString(20).substring(3, 18));
}


