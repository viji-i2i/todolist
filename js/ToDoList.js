"use strict";
init();
function init() {
  addEventListeners("add-list", "click", addNewList);
  addEventListeners("new-list-input", "keyup", addNewList);
  addEventListeners("new-task-input", "keyup", addNewTask);
  addEventListeners("task-heading", "keyup", updateTaskName);
  addEventListeners("list-heading", "keyup", updateListName);
  addEventListeners("step-input", "keyup", addStepsToTask);
  addEventListeners("show-text-field", "click", showTaskField);
}

function addEventListeners(element, event, functionName) {
  $("#"+element).bind(event, functionName);
}
/** 
 * This Generic Function is used to Add Event listeners to particular element
 * @param {Object} element to which event to be added
 * @param {Event} event kind of element to be added
 * @param {Function} functionName function to be trigger which occurrence of event
 * @param {Object} bindElement Element to be bind
 */
function bindObject(element, event, functionName, bindElement = "") {
  $(element).bind(event, functionName.bind(bindElement));
}

/**
 * This Generic Function is used to create elements by using given element name
 * @param {Object} element which is to be created
 * @return  {Object} Created Element will be returned
 */
function createElementByName(element) {
   return $(document.createElement(element));
}

/**
 * This Generic Function is used to create Text Node by using given  name
 * @param {Object} element which is to be created
 * @return  {Object} Created Text Node will be returned
 */
function createTextNodeByName(element) {
  return $(document.createTextNode(element));
}

/**
 * Method is used to create checkbox dinamically 
 */
function createCheckBox() {
  var checkboxImg = $(document.createElement('IMG'));
  checkboxImg.addClass("checkbox");
  checkboxImg.attr('src', 'images/uncheck.png'); 
  return checkboxImg;
}

/**
 * Method is used to create close button 
 * @param {string} id  id of button
 */
function  createCloseButton(id){ 
  var closeButton = $(createElementByName('button'));
  closeButton.append(createTextNodeByName("\u00D7"));
  closeButton.attr('id',id);
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
  if (13 == event.keyCode) {
  let newList = {
    id: "",
    name: "",
    status: "incomplete",
    tasks: []
  };
  newList.id = generateId();
  let listItems = $("#list-items");
  let taskItems = $("#task-items");
  let inputValue = $("#new-list-input");
  if ("" === inputValue.val()) {
    alert("It seems like List Name is Empty. Enter Your List name");
  } else {
    newList.name = inputValue.val();
    toDoList.push(newList);
    listInfo = newList;
    console.log(inputValue.val()+"  hello");
    taskItems.html("");
    let listItem = createElementByName("li");
    let listName = createElementByName("span");
    listName.addClass("list-name");
    listName.text(newList.name);
    bindObject(listItem, "click", assignListInfo, newList);
    bindObject(listItem, "contextmenu", deleteList, newList);
    listItem.append(listName);
    listItems.append(listItem);
    $(".task-field-class")[0].style.width = "850px";
    $("#list-heading").val(newList.name);
    inputValue.val("");
    $("#new-task-input").focus();
  }
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
    let taskItems = $("#task-items");
    let stepItems = $("#step-items");
    let taskName = $("#new-task-input");
    newTask.name = taskName.val();
    taskInfo = newTask;
    stepItems.innerHTML = "";
    let taskItem = createElementByName("li");
    var checkboxImg = createCheckBox();
    taskItem.append(checkboxImg);
    bindObject(checkboxImg, "click", changeTaskStatus, newTask);  
    bindObject(taskItem, "click", assignTaskInfo, newTask);
    taskItem.bind("contextmenu", function(event) {
      if (2 === event.button) { 
        deleteTask(listInfo, newTask); 
      } 
      event.preventDefault();
      return false;  
    });   
    taskItem.append(createTextNodeByName(newTask.name));
    taskItems.append(taskItem);
    taskName.val("");
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
    let stepItems = $("#step-items");
    newStep.id = generateId();
    let stepName = $("#step-input").val();
    newStep.name = stepName;
    let stepItem = createElementByName("li");
    let stepsDisplay = createElementByName("input");
    stepsDisplay.addClass("steps-display");
    stepsDisplay.attr('type', 'text');
    stepsDisplay.val(stepName);
    let closeBtn = createCloseButton("close-btn");
    bindObject(closeBtn, "click", deleteStep, stepName);
    var checkboxImg = createCheckBox();
    bindObject(checkboxImg, "click", changeStepStatus, newStep);  
    stepItem.append(checkboxImg);
    bindObject(stepsDisplay, "keyup", updateStepName, newStep);
    stepItem.append(stepsDisplay);
    stepItem.append(closeBtn);
    stepItems.append(stepItem);
    $("#step-input").val("");
    taskInfo.steps.push(newStep);
  }
}

/**
 * Method reload is used to Load the List after any change is made on List item
 */
function displayList() {
  let taskCount = "";
  let listItems = $("#list-items");
  listItems.html("");
  for (let index = 0; index < toDoList.length; index++) {
    let currentList = toDoList[index];
    let listItem = createElementByName("li");
    let listName = createElementByName("span");
    listName.addClass("list-name");
    listName.text(currentList.name);
    taskCount = toDoList[index].tasks.length; 
    bindObject(listItem, "click", assignListInfo, currentList);
    bindObject(listItem, "contextmenu", deleteList, currentList);
    listItem.append(listName);
    let taskCountSpan = createElementByName("span");
    taskCountSpan.addClass("task-count");
    let noOfTask = createTextNodeByName(taskCount);
    if (1 <= taskCount) {
      taskCountSpan.append(noOfTask);
      listItem.append(taskCountSpan);
    }
    listItems.append(listItem);
  }
}

/**
 * This method is used to display all the tasks while clicking on the list items
 */
function displayTasks() {
  let taskItems = $("#task-items");
  taskItems.html("");
  let allTasks = listInfo.tasks;
  for (let index in allTasks) {
    let currentTask = allTasks[index];
    let taskItem = createElementByName("li");
    let task = createTextNodeByName(currentTask.name);
    taskItem.css('text-decoration', (currentTask.status === "complete") ? "line-through": "none");
    var checkboxImg = createCheckBox();
    if (currentTask.status === "complete") {
      checkboxImg.attr('src', 'images/check.png'); 
    } 
    bindObject(checkboxImg, "click", changeTaskStatus, currentTask);
    taskItem.append(checkboxImg);
    bindObject(taskItem, "click", assignTaskInfo, currentTask);
    taskItem.bind("contextmenu", function(event) {
      if (2 === event.button) { 
        deleteTask(listInfo, currentTask); 
      } 
      event.preventDefault();
      return false;  
    });
    taskItem.append(task);
    taskItems.append(taskItem);
  }
}

/**
 * This method is used to display all the Steps while clicking on the Task items
 */
function displaySteps() {
  let stepItems = $("#step-items");
  stepItems.html("");
  let allSteps = taskInfo.steps;
  for (let index in allSteps) {
    let currentStep = allSteps[index];
    let stepItem = createElementByName("li");
    let stepsDisplay = createElementByName("input");
    stepsDisplay.addClass("steps-display");
    stepsDisplay.attr('type', 'text');
    stepsDisplay.val(allSteps[index].name);
    bindObject(stepsDisplay, "keyup", updateStepName, currentStep);
    let closeBtn = createCloseButton("close-btn");
    var checkboxImg = createCheckBox();
    if (currentStep.status === "complete") {
      checkboxImg.attr('src', 'images/check.png'); 
    } 
    bindObject(checkboxImg, "click", changeStepStatus, currentStep);  
    stepItem.append(checkboxImg);
    stepsDisplay.css('text-decoration', (currentStep.status === "complete") ? "line-through": "none");
    closeBtn.id = "close-btn"
    bindObject(closeBtn, "click", deleteStep, currentStep);
    bindObject(stepItem, "click", assignStepInfo, currentStep);
    stepItem.append(stepsDisplay);
    stepItem.append(closeBtn);
    stepItems.append(stepItem);
  }
}

/**
 * This method is used to Edit List Name
 */
function updateListName() {
  if (13 == event.keyCode) {
    listInfo.name = $("#list-heading").val();
    displayList();
  }
}

/**
 * This method is used to Edit Task Name
 */
function updateTaskName() {
  if (13 == event.keyCode) {
    taskInfo.name = $("#task-heading").val();
    displayTasks();
  }
}

/**
 * This method is used to Edit or Update Step Name
 */
function updateStepName() {
  if (13 == event.keyCode) {
    let index = taskInfo.steps.indexOf(this);
    this.name = $(".steps-display").val(index);
    console.log($(".steps-display").val(index));
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
  $("#list-heading").val(this.name);
  listInfo = this;
  displayTasks();
}

/**
 * This method is used to assign current Task Object to taskInfo (global object) for 
 * further updates like Name Edit, to add New Steps with task Objects 
 */
function assignTaskInfo() {
  $(".steps-field-class")[0].style.width = "auto";
  let taskHeading = $("#task-heading");
  taskHeading.val(this.name);
  taskHeading.css('text-decoration', (this.status === "complete") ? "line-through": "none");
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
  let textFields = $(".right-side-nav-bar");
  for (let textField of textFields) {
    textField.classList.toggle("block");
  }
}

