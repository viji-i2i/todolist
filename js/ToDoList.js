"use strict";
init();
function init() {
  addEventListeners(getElementsById("add-list"),"click", addNewList);
  addEventListeners(getElementsById("new-task-input"),"keyup",addTask);
  addEventListeners(getElementsById("task-heading"),"keyup",editTaskName);
  addEventListeners(getElementsById("list-heading"),"keyup",editListName);
  addEventListeners(getElementsById("step-input"),"keyup",addSteps);
  addEventListeners(getElementsById("show-text-field"),"click",showTaskField);
}

/**
 * 
 * @param {id} id which is used to get Elements 
 * @return Element is returned
 * This Generic method is used to get Elements By using given Id
 */
function getElementsById(id) {
  return (document.getElementById(id));
}

/**
 * 
 * @param {class} className which is used to get Elements 
 * @return Element is returned
 * This Generic method is used to get Elements By using given Class Name
 */
function getElementByClassName(className) {
  return (document.getElementsByClassName(className));
}

/**
 * 
 * @param {Element} element to which event to be added
 * @param {Event} event kind of element to be added
 * @param {Function} functionName function to be trigger which occurrence of event
 * @param {Object} bindElement Element to be bind
 * This Generic Function is used to Add Event listeners to particular element
 */
function addEventListeners(element, event, functionName, bindElement = "") {
  element.addEventListener(event, functionName.bind(bindElement));
}

// toDoList is a Array used to store All the List objects
let toDoList = [];
let listInfo = {};
let taskInfo = {};
let stepInfo = {};

/**
 * This Method addNewList is used to store new List items in toDoList Array
 */
function addNewList() {
  let newList = {
    id: "",
    name: "",
    status: "incomplete",
    tasks: []
  };
  newList.id = generateId();
  let listItems = getElementsById("list-items");
  let taskItems = getElementsById("task-items");
  let inputValue = getElementsById("new-list-input");
  if ("" === inputValue.value) {
    alert("It seems like List Name is Empty. Enter Your List name");
  } else {
    newList.name = inputValue.value;
    toDoList.push(newList);
    listInfo = newList;
    taskItems.innerHTML = "";
    // To display All the Available List Items 
    let listItem = document.createElement("li");
    let listName = document.createTextNode(newList.name);
    addEventListeners(listItem,"click",assignListInfo,newList);
    // To call deleteList Method while Right Click on the List Item 
    listItem.addEventListener("contextmenu", function(event) {
    if (2 === event.button) { 
      deleteList(newList); 
    } 
    event.preventDefault();
    return false;
    });
    listItem.appendChild(listName);
    listItems.appendChild(listItem);
    getElementByClassName("task-field-class")[0].style.width = "900px";
    getElementsById("list-heading").value = newList.name;
    inputValue.value = "";
  }
}

/**
 * Method to add tasks with Particular List 
 */
function addNewTask() {
  let newTask = {
    id: "",
    name: "",
    status: "incomplete",
    steps: []
  };
  newTask.id = generateId();
  let taskItems = getElementsById("task-items");
  let stepItems = getElementsById("step-items");
  let taskName = getElementsById("new-task-input");
  newTask.name = taskName.value;
  taskInfo = newTask;
  stepItems.innerHTML = "";
  // To display All the Available Tasks 
  let taskItem = document.createElement("li");
  let task = document.createTextNode(newTask.name);
  //let checkMark = document.createTextNode("\u2713");
  let checkbox = document.createElement('input');           
  checkbox.type = "checkbox"; 
  checkbox.id = "task-checkbox";
  addEventListeners(checkbox, "click", changeTaskStatus, newTask);  
  taskItem.appendChild(checkbox);
  addEventListeners(taskItem, "click", assignTaskInfo, newTask);
  taskItem.addEventListener("contextmenu", function(event) {
  if (2 === event.button) { 
    deleteTask(listInfo,newTask); 
  } 
  event.preventDefault();
  return false;
  });
  taskItem.appendChild(task);
  taskItems.appendChild(taskItem);
  
  taskName.value = "";
  listInfo.tasks.push(newTask);
  displayList();
}

/**
 * Method to add Multiple Steps for a Particular task
 */
function addStepsToTask() {
  let newStep = {
    id: "",
    name: "",
    status: "incomplete"
  };
  let stepItems = getElementsById('step-items');
  newStep.id = generateId();
  let stepName = document.getElementById("step-input").value;
  newStep.name = stepName;
  // To display All the Available Tasks 
  let stepItem = document.createElement("li");
  let step = document.createTextNode(newStep.name);
  addEventListeners(stepItem, "click", assignStepInfo, newStep);
  stepItem.appendChild(step);
  stepItems.appendChild(stepItem);
  document.getElementById("step-input").value = "";
  taskInfo.steps.push(newStep);
}

/**
 * Method reload is used to Load the List after any change is made on List item
 */
function displayList() {
  let taskCount = "";
  let listItems = getElementsById("list-items");
  listItems.innerHTML = "";
  for (let index = 0; index < toDoList.length; index++) {
    let currentList = toDoList[index];
    let listItem = document.createElement("li");
    let listName = document.createTextNode(currentList.name);
    taskCount = toDoList[index].tasks.length; 
    addEventListeners(listItem,"click",assignListInfo,currentList);
    listItem.addEventListener("contextmenu", function(event) {
      if (2 === event.button) { 
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
  }
}

/**
 * This method is used to display all the tasks while clicking on the list items
 */
function displayTasks() {
  let taskItems = getElementsById("task-items");
  taskItems.innerHTML = "";
  let allTasks = listInfo.tasks;
  for (let index in allTasks) {
    let currentTask = allTasks[index];
    let taskItem = document.createElement("li");
    let task = document.createTextNode(currentTask.name);
    taskItem.style.textDecoration = (currentTask.status === "complete") ? "line-through": "none";
    let checkbox = document.createElement('input'); 
    checkbox.type = "checkbox"; 
    checkbox.id = "task-checkbox";
    addEventListeners(checkbox, "click", changeTaskStatus, currentTask);
    taskItem.appendChild(checkbox);
    addEventListeners(taskItem, "click", assignTaskInfo, currentTask);
    taskItem.addEventListener("contextmenu", function(event) {
    if (2 === event.button) { 
      deleteTask(listInfo, currentTask); 
    } 
    event.preventDefault();
      return false;  
    });
    taskItem.appendChild(task);
    taskItems.appendChild(taskItem);
  }
}

/**
 * This method is used to display all the Steps while clicking on the Task items
 */
function displaySteps() {
  let stepItems = getElementsById('step-items');
  stepItems.innerHTML = "";
  let allSteps = taskInfo.steps;
  for (let index in allSteps) {
    let currentStep = allSteps[index];
    let stepItem = document.createElement("li");
    let step = document.createTextNode(allSteps[index].name);
    let close = document.createTextNode("\u00D7");
    addEventListeners(close, "click", deleteStep, currentStep);
    addEventListeners(stepItem, "click", assignStepInfo, currentStep);
    stepItem.appendChild(step);
    stepItem.appendChild(close);
    stepItems.appendChild(stepItem);
  }
}

/**
 * This method is used to Edit List Name
 */
function updateListName() {
  listInfo.name = document.getElementById("list-heading").value;
  displayList();
}

/**
 * This method is used to Edit Task Name
 */
function updateTaskName() {
  taskInfo.name = document.getElementById("task-heading").value;
  displayTasks();
}

/**
 * 
 * @param {Object} newList List object which is deleted from the toDoList Array
 * This method is used to delete List Object from the toDoList Array
 */
function deleteList(newList) {
  let userChoice = confirm("Are you sure to delete selected List?");
  if(userChoice){
    let index = toDoList.indexOf(newList);
    toDoList.splice(index,1);
    displayList();
  }
}

/**
 * 
 * @param {Object} listInfo which is to be deleted
 * @param {Object} newTask which is to be deleted
 * Method is used to delete particular task from Array
 */
function deleteTask(listInfo,newTask) {
  let userChoice = confirm("Are you sure to delete selected Task?");
  if(userChoice){
    let index = listInfo.tasks.indexOf(newTask);
    listInfo.tasks.splice(index,1);
    displayTasks();
    displayList();
  }
}

/**
 * This method is used to delete steps from the toDoList Object
 */
function deleteStep() {
  stepInfo = this;
}

/**
 * This method is used to change task status(complete to incomplete and Vice versa) 
 * while clicking on the check box
 */
function changeTaskStatus() {
  this.status = ("incomplete" === this.status) ? "complete" : "incomplete" ;
  displayTasks();
}

/**
 * assignListInfo is used to assign current List Object to listInfo (global object) for 
 * further updates like Name Edit, to add New task with List Objects 
 */
function assignListInfo() {
  document.getElementById("list-heading").value = this.name;
  listInfo = this;
  displayTasks();
}

/**
 * This method is used to assign current Task Object to taskInfo (global object) for 
 * further updates like Name Edit, to add New Steps with task Objects 
 */
function assignTaskInfo() {
  getElementByClassName('steps-field-class')[0].style.width = "auto";
  let taskHeading = getElementsById("task-heading");
  taskHeading.value = this.name;
  taskHeading.style.textDecoration  = (this.status === "complete") ? "line-through": "none";
  taskInfo = this;
  displaySteps();
}

/**
 * This method is used to assign current Step Object to stepInfo (global object) 
 */
function assignStepInfo() {
  stepInfo = this;
}

/**
 * This method is used to generate random id for list,task,step
 */
function generateId() {
  return (Math.random().toString(20).substring(3, 18)
    + Math.random().toString(20).substring(3, 18));
}

/**
 * This method showTaskField used to toggle Task field 
 */
function showTaskField() {
  let textFields = getElementByClassName("right-side-nav-bar");
  for (let textField of textFields) {
    textField.classList.toggle("block")
  }
}

/**
 * 
 * @param {Event} event to ckech keyCode
 * addSteps method checks keyCode and call the addStepsToTask method to add new steps 
 * for particular task
 */
function addSteps (event) {
  if (13 === event.keyCode) {
    addStepsToTask();
  }
}

/**
 * 
 * @param {Event} event to ckech keyCode
 * editListName method checks keyCode and call the updateListName method to Edit List Name
 */
function editListName (event) {
  if (13 === event.keyCode) {
    updateListName();
  }
}

/**
 * 
 * @param {Event} event to ckech keyCode
 * editTaskName method checks keyCode and call the updateTaskName method to Edit Task Name
 */
function editTaskName (event) {
  if (13 === event.keyCode) {
    updateTaskName();
  }
}

/**
 * 
 * @param {Event} event to ckech keyCode
 * addTask method checks keyCode and call the addNewTask method to Add new Task with 
 * particular list
 */
function addTask (event) {
  if (13 === event.keyCode) {
    addNewTask();
  }
}

/** 
 * To Trigger add-list button While Entering Enter Key 
 */
document.getElementById("new-list-input")
  .addEventListener("keyup", function (event) {
    if (13 === event.keyCode) {
      document.getElementById("add-list").click();
      getElementsById("new-task-input").focus();
    }
  });

