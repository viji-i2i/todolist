"use strict";
addEventListeners();
function addEventListeners() {
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
var taskFieldClass = document.getElementsByClassName('task-field-class'); 
var stepsFieldClass = document.getElementsByClassName('steps-field-class'); 
var deleteStep =  newListInput = document.getElementById('delete-step');


var toDoList = [];
var listInfo = "";
var taskInfo = "";
var taskCount = "";

function showRightSideBar() {
  var textFields = document.getElementsByClassName("right-side-nav-bar");
  for (let textField of textFields) {
    textField.classList.toggle("block")
  }
}

/* To Trigger add-list button While Entering Enter Key */
document.getElementById("new-list-input")
  .addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      document.getElementById("add-list").click();
    }
  });

/* To Trigger add-list button While Entering Enter Key */
document.getElementById("new-task-input")
  .addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      addNewTask();
    }
  });

/* To Trigger add-list button While Entering Enter Key */
document.getElementById("step-input")
  .addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      addStepsToTask();
    }
  });

  document.getElementById("list-heading")
     .addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      updateListName();
    }
  });

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
    taskItems.innerHTML = "";
    // To display All the Available List Items 
    var listItem = document.createElement("li");
    var listName = document.createTextNode(newList.name);
    listItem.addEventListener("click", assignListInfo.bind(newList));
    listItem.addEventListener("contextmenu", function(event) {
      if (event.button == 2) { 
        deleteList(newList); 
      } 
      event.preventDefault();
      return false;
    });
    listItem.appendChild(listName);
    listItems.appendChild(listItem);
    taskFieldClass[0].style.width = "900px";
    document.getElementById("list-heading").value = newList.name;
    document.getElementById("new-list-input").value = "";
    //To Display List Heading in right Side bar
  }
}

function deleteList(newList) {
  var userChoice = confirm("Are you sure to delete selected List?");
  if(userChoice){
    let index = toDoList.indexOf(newList);
    toDoList.splice(index,1);
    reloadList();
  }
}

function deleteTask(listInfo,newTask) {
  var userChoice = confirm("Are you sure to delete selected Task?");
  if(userChoice){
    let index = listInfo.tasks.indexOf(newTask);
    listInfo.tasks.splice(index,1);
    displayTasks();
    reloadList();
  }
}

function updateListName() {
  console.log(listInfo);
  listInfo.name = document.getElementById("list-heading").value;
  reloadList();
}

function reloadList() {
  listItems.innerHTML = "";
  for (let index = 0; index < toDoList.length; index++) {
    var listItem = document.createElement("li");
    var listName = document.createTextNode(toDoList[index].name);
    taskCount = toDoList[index].tasks.length; 
    listItem.addEventListener("click", assignListInfo.bind(toDoList[index]));
    listItem.addEventListener("contextmenu", function(event) {
      if (event.button == 2) { 
        deleteList(toDoList[index]); 
      } 
      event.preventDefault();
      return false;
    });
    listItem.appendChild(listName);
    if (1 <= taskCount) {
      listItem.appendChild(document.createTextNode(taskCount));
    }
    listItems.appendChild(listItem);
    document.getElementById("list-heading").value = toDoList[index].name;
    //document.getElementById("list-heading").addEventListener("change", updateListName(toDoList[index]));
  }
}

function assignListInfo() {
  document.getElementById("list-heading").value = this.name;
  listInfo = this;
  displayTasks();
}
function assignTaskInfo() {
  stepsFieldClass[0].style.width = "auto";
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
    taskItem.style.textDecoration = (allTasks[index].status === "complete") ? "line-through": "none";
    var checkbox = document.createElement('input'); 
    checkbox.type = "checkbox"; 
    checkbox.id = "task-checkbox";
    checkbox.addEventListener("click", changeTaskStatus.bind(allTasks[index]));          
    taskItem.appendChild(checkbox);
    taskItem.addEventListener("click", assignTaskInfo.bind(allTasks[index]));
    taskItem.addEventListener("contextmenu", function(event) {
      if (event.button == 2) { 
        deleteTask(listInfo, allTasks[index]); 
      } 
      event.preventDefault();
      return false;  
    });
    taskItem.appendChild(task);
    taskItems.appendChild(taskItem);
  }
}

function displaySteps() {
  stepItems.innerHTML = "";
  let allSteps = taskInfo.steps;
  for (let index in allSteps) {
    let deleteStep = document.createElement("button");
    deleteStep.id = "delete-btn";
    deleteStep.addEventListener("click", deleteStep.bind(allSteps[index]));
    document.getElementById("delete-step").appendChild(deleteStep);
    let stepItem = document.createElement("li");
    let step = document.createTextNode(allSteps[index].name);
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
  stepItems.innerHTML = "";
  // To display All the Available Tasks 
  var taskItem = document.createElement("li");
  var task = document.createTextNode(newTask.name);
  //var checkMark = document.createTextNode("\u2713");
  var checkbox = document.createElement('input');           
  checkbox.type = "checkbox"; 
  checkbox.id = "task-checkbox";
  checkbox.addEventListener("click", changeTaskStatus.bind(newTask));          
  taskItem.appendChild(checkbox);
  taskItem.addEventListener("click", assignTaskInfo.bind(newTask));
  taskItem.addEventListener("contextmenu", function(event) {
    if (event.button == 2) { 
      deleteTask(listInfo,newTask); 
    } 
    event.preventDefault();
    return false;
  });
  taskItem.appendChild(task);
  taskItems.appendChild(taskItem);
  document.getElementById("new-task-input").value = "";
  listInfo.tasks.push(newTask);
  reloadList();
}

function changeTaskStatus() {
  this.status = (this.status === "incomplete") ? "complete" : "incomplete" ;
  displayTasks();
  console.log(this.status);
}

/**
 * Method to add Multiple Steps for a Particular task
 */
function addStepsToTask() {
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
}

function a(element, event, listener, bindElement = "") {
  element.addEventListener(event, listener.bind(bindElement));
}

function generateId() {
  return (Math.random().toString(20).substring(3, 18)
    + Math.random().toString(20).substring(3, 18));
}


