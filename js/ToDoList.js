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
 * @return  {Object} Element is returned
 */
function getElementsById(id) {
  return document.getElementById(id);
}

/**
 * This Generic method is used to get Elements By using given Class Name
 * @param {string} className which is used to get Elements 
 * @return {Object} created Element will be returned
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
 * @return  {Object} Created Element will be returned
 */
function createElementByName(element) {
   return document.createElement(element);
}

/**
 * This Generic Function is used to create Text Node by using given  name
 * @param {Object} element which is to be created
 * @return  {Object} Created Text Node will be returned
 */
function createTextNodeByName(element) {
  return document.createTextNode(element);
}

/**
 * Method is used to create checkbox dinamically 
 */
function createCheckBox() {
  var checkboxImg = document.createElement('IMG');
  checkboxImg.setAttribute('class', 'checkbox');
  checkboxImg.setAttribute('src', 'images/uncheck.png'); 
  return checkboxImg;
}

/**
 * Method is used to create close button 
 * @param {string} id  id of button
 */
function  createCloseButton(id){ 
  var closeButton = createElementByName('button');
  closeButton.appendChild(createTextNodeByName("\u00D7"));
  closeButton.id = id;
  return closeButton;
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
    let listItem = createElementByName("li");
    let listName = createTextNodeByName(newList.name);
    addEventListeners(listItem, "click", assignListInfo, newList);
    addEventListeners(listItem, "contextmenu", deleteList, newList);
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
    let taskItem = createElementByName("li");
    var checkboxImg = createCheckBox();
    taskItem.appendChild(checkboxImg);
    addEventListeners(checkboxImg, "click", changeTaskStatus, newTask);  
    addEventListeners(taskItem, "click", assignTaskInfo, newTask);
    taskItem.addEventListener("contextmenu", function(event) {
      if (2 === event.button) { 
        deleteTask(listInfo, newTask); 
      } 
      event.preventDefault();
      return false;  
    });   
    taskItem.appendChild(createTextNodeByName(newTask.name));
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
    let stepItem = createElementByName("li");
    let stepsDisplay = createElementByName("input");
    stepsDisplay.className = "steps-display";
    stepsDisplay.setAttribute('type', 'text');
    stepsDisplay.setAttribute('value', stepName);
    let closeBtn = createCloseButton("close-btn");
    addEventListeners(closeBtn, "click", deleteStep, stepName);
    var checkboxImg = createCheckBox();
    addEventListeners(checkboxImg, "click", changeStepStatus, newStep);  
    stepItem.appendChild(checkboxImg);
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
    let listItem = createElementByName("li");
    let listName = createTextNodeByName(currentList.name);
    taskCount = toDoList[index].tasks.length; 
    addEventListeners(listItem, "click", assignListInfo, currentList);
    addEventListeners(listItem, "contextmenu", deleteList, currentList);
    listItem.appendChild(listName);
    let taskCountSpan = createElementByName("span");
    taskCountSpan.setAttribute("class", "task-count");
    let noOfTask = createTextNodeByName(taskCount);
    if (1 <= taskCount) {
      taskCountSpan.appendChild(noOfTask);
      listItem.appendChild(taskCountSpan);
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
    let taskItem = createElementByName("li");
    let task = createTextNodeByName(currentTask.name);
    taskItem.style.textDecoration = (currentTask.status === "complete") ? "line-through": "none";
    var checkboxImg = createCheckBox();
    if (currentTask.status === "complete") {
      checkboxImg.setAttribute('src', 'images/check.png'); 
    } 
    addEventListeners(checkboxImg, "click", changeTaskStatus, currentTask);
    taskItem.appendChild(checkboxImg);
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
    let stepItem = createElementByName("li");
    let stepsDisplay = createElementByName("input");
    stepsDisplay.className = "steps-display";
    stepsDisplay.setAttribute('type', 'text');
    stepsDisplay.setAttribute('value', allSteps[index].name);
    addEventListeners(stepsDisplay, "keyup", updateStepName, currentStep);
    let closeBtn = createCloseButton("close-btn");
    var checkboxImg = createCheckBox();
    if (currentStep.status === "complete") {
      checkboxImg.setAttribute('src', 'images/check.png'); 
    } 
    addEventListeners(checkboxImg, "click", changeStepStatus, currentStep);  
    stepItem.appendChild(checkboxImg);
    stepsDisplay.style.textDecoration = (currentStep.status === "complete") ? "line-through": "none";
    closeBtn.id = "close-btn"
    addEventListeners(closeBtn, "click", deleteStep, currentStep);
    addEventListeners(stepItem, "click", assignStepInfo, currentStep);
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
    this.name = getElementByClassName("steps-display")[index].value;
    displaySteps();
  }
}

/**
 * This method is used to delete List Object from the toDoList Array
 * @param {Object} newList List object which is deleted from the toDoList Array
 */
function deleteList() {
  let newList = this;
  if (2 === event.button) { 
    event.preventDefault();
    let userChoice = confirm('"'+ newList.name +'"' + " will be permanrently deleted.");
    if(userChoice){
      let index = toDoList.indexOf(newList);
      toDoList.splice(index,1);
      displayList();
    }
  }
}

/**
 * Method is used to delete particular task from Array
 * @param {Object} listInfo which is to be deleted
 * @param {Object} newTask which is to be deleted
 */
function deleteTask(listInfo, newTask) {
  if (2 === event.button) {
    event.preventDefault();
    let userChoice = confirm("Are you sure to delete selected Task?");
    if(userChoice){
      let index = listInfo.tasks.indexOf(newTask);
      listInfo.tasks.splice(index,1);
      displayTasks();
      displayList();
    } 
  }
}

/**
 * This method is used to delete steps from the toDoList Object
 */
function deleteStep() {
  stepInfo = this;
  let userChoice = confirm("Are you sure to delete selected Step?");
  if(userChoice){
    let index = taskInfo.steps.indexOf(stepInfo);
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

