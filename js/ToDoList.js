"use strict";
init();
function init() {
  addEventListeners(getElementsById("add-list"), "click", addNewList);
  addEventListeners(getElementsById("new-task-input"), "keyup", addNewTask);
  addEventListeners(getElementsById("task-heading"), "keyup", updateTaskName);
  addEventListeners(getElementsById("list-heading"), "keyup", updateListName);
  addEventListeners(getElementsById("step-input"), "keyup", addStepsToTask);
  addEventListeners(getElementsById("show-text-field"), "click", showTaskField);
}

/**
 * 
 * This Generic method is used to get Elements By using given Id
 * @param {string} id which is used to get Elements 
 * @return Element is returned
 */
function getElementsById(id) {
  return document.getElementById(id);
}

/**
 * This Generic method is used to get Elements By using given Class Name
 * @param {string} className which is used to get Elements 
 * @return created Element will be returned
 */
function getElementByClassName(className) {
  return document.getElementsByClassName(className);
}

/** 
 * This Generic Function is used to Add Event listeners to particular element
 * @param {Object} element to which event to be added
 * @param {Event} event kind of element to be added
 * @param {Function} functionName function to be trigger which occurrence of event
 * @param {Object} bindElement Element to be bind
 */
function addEventListeners(element, event, functionName, bindElement = "") {
  element.addEventListener(event, functionName.bind(bindElement));
}

/**
 * This Generic Function is used to create elements by using given element name
 * @param {Object} element which is to be created
 * @return Created Element will be returned
 */
function createElements(element) {
   return document.createElement(element);
}

// toDoList is a Array used to store All the List objects
let toDoList = [];
let listInfo = {};
let taskInfo = {};
let stepInfo = {};

/**
 * This method is used to generate random id for list,task,step
 */
function generateId() {
  return (Math.random().toString(20).substring(3, 18)
    + Math.random().toString(20).substring(3, 18));
}

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
    let listItem = createElements("li");
    let listName = document.createTextNode(newList.name);
    addEventListeners(listItem, "click", assignListInfo, newList);
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
  if (13 == event.keyCode) {
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
    let checkbox = document.createElement("input");           
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
}

/**
 * Method to add Multiple Steps for a Particular task
 */
function addStepsToTask() {
  if (13 == event.keyCode) {
    let newStep = {
      id: "",
      name: "",
      status: "incomplete"
    };
    let stepItems = getElementsById("step-items");
    newStep.id = generateId();
    let stepName = getElementsById("step-input").value;
    newStep.name = stepName;
    let stepItem = createElements("li");
    let stepsDisplay = createElements("input");
    stepsDisplay.className = "steps-display";
    stepsDisplay.setAttribute('type', 'text');
    stepsDisplay.setAttribute('value', stepName);
    let closeBtn = createElements('button');
    closeBtn.id = "close-btn";
    closeBtn.appendChild(document.createTextNode("\u00D7"));
    addEventListeners(closeBtn, "click", deleteStep, stepName);
    let checkbox = createElements("input");           
    checkbox.type = "checkbox"; 
    checkbox.id = "step-checkbox";
    addEventListeners(checkbox, "click", changeStepStatus, newStep);  
    stepItem.appendChild(checkbox);
    addEventListeners(stepsDisplay, "keyup", updateStepName, newStep);
    stepItem.appendChild(stepsDisplay);
    stepItem.appendChild(closeBtn);
    stepItems.appendChild(stepItem);
    document.getElementById("step-input").value = "";
    taskInfo.steps.push(newStep);
  }
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
    let listItem = createElements("li");
    let listName = document.createTextNode(currentList.name);
    taskCount = toDoList[index].tasks.length; 
    addEventListeners(listItem, "click", assignListInfo, currentList);
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
    let taskItem = createElements("li");
    let task = document.createTextNode(currentTask.name);
    taskItem.style.textDecoration = (currentTask.status === "complete") ? "line-through": "none";
    let checkbox = createElements("input"); 
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
  let stepItems = getElementsById("step-items");
  stepItems.innerHTML = "";
  let allSteps = taskInfo.steps;
  for (let index in allSteps) {
    let currentStep = allSteps[index];
    let stepItem = createElements("li");
    let stepsDisplay = createElements("input");
    stepsDisplay.className = "steps-display";
    stepsDisplay.setAttribute('type', 'text');
    stepsDisplay.setAttribute('value', allSteps[index].name);
    addEventListeners(stepsDisplay, "keyup", updateStepName, currentStep);
    let closeBtn = createElements('button');
    closeBtn.appendChild(document.createTextNode("\u00D7"));
    let checkbox = createElements("input");           
    checkbox.type = "checkbox"; 
    checkbox.id = "step-checkbox";
    addEventListeners(checkbox, "click", changeStepStatus, currentStep);  
    stepItem.appendChild(checkbox);
    stepsDisplay.style.textDecoration = (currentStep.status === "complete") ? "line-through": "none";
    closeBtn.id = "close-btn"
    addEventListeners(closeBtn, "click", deleteStep, currentStep);
    addEventListeners(stepItem, "click", assignStepInfo, currentStep);
    //addEventListeners(getElementsById("steps-display"), "keyup", updateStepName, currentStep);
    stepItem.appendChild(stepsDisplay);
    stepItem.appendChild(closeBtn);
    stepItems.appendChild(stepItem);
  }
}

/**
 * This method is used to Edit List Name
 */
function updateListName() {
  if (13 == event.keyCode) {
    listInfo.name = getElementsById("list-heading").value;
    displayList();
  }
}

/**
 * This method is used to Edit Task Name
 */
function updateTaskName() {
  if (13 == event.keyCode) {
    taskInfo.name = getElementsById("task-heading").value;
    displayTasks();
  }
}

/**
 * This method is used to Edit or Update Step Name
 */
function updateStepName() {
  if (13 == event.keyCode) {
    let index = taskInfo.steps.indexOf(this);
    console.log(index);

    this.name = getElementByClassName("steps-display")[index].value;
    displaySteps();
  }
}

/**
 * This method is used to delete List Object from the toDoList Array
 * @param {Object} newList List object which is deleted from the toDoList Array
 */
function deleteList(newList) {
  let userChoice = confirm('"'+newList.name+'"' + " will be permanrently deleted.");
  if(userChoice){
    let index = toDoList.indexOf(newList);
    toDoList.splice(index,1);
    displayList();
  }
}

/**
 * Method is used to delete particular task from Array
 * @param {Object} listInfo which is to be deleted
 * @param {Object} newTask which is to be deleted
 */
function deleteTask(listInfo, newTask) {
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
  console.log(this);
  let userChoice = confirm("Are you sure to delete selected Step?");
  if(userChoice){
    let index = taskInfo.steps.indexOf(stepInfo);
    console.log(index)
    taskInfo.steps.splice(index,1);
    displaySteps();
  }
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
 * This method is used to change step status(complete to incomplete and Vice versa) 
 * while clicking on the steps check box
 */
function changeStepStatus() {
  this.status = ("incomplete" === this.status) ? "complete" : "incomplete" ;
  displaySteps();
}

/**
 * assignListInfo is used to assign current List Object to listInfo (global object) for 
 * further updates like Name Edit, to add New task with List Objects 
 */
function assignListInfo() {
  getElementsById("list-heading").value = this.name;
  listInfo = this;
  displayTasks();
}

/**
 * This method is used to assign current Task Object to taskInfo (global object) for 
 * further updates like Name Edit, to add New Steps with task Objects 
 */
function assignTaskInfo() {
  getElementByClassName("steps-field-class")[0].style.width = "auto";
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
 * This method showTaskField used to toggle Task field 
 */
function showTaskField() {
  let textFields = getElementByClassName("right-side-nav-bar");
  for (let textField of textFields) {
    textField.classList.toggle("block")
  }
}

/** 
 * checks keyCode and call the addNewList method to Add new List 
 */
document.getElementById("new-list-input")
  .addEventListener("keyup", function (event) {
    if (13 == event.keyCode) {
      addNewList();
      getElementsById("new-task-input").focus();
    }
  });

