"use strict";
addEvents();
function addEvents(){

  document.getElementById("add-list").addEventListener("click",addNewList);
  document.getElementById("show-text-field").addEventListener("click", showRightSideBar);
  document.getElementById("show-right-side-bar").addEventListener("click", showRightSideBar);
}
var listItems = document.getElementById('list-items');

var newListInput = document.getElementById('new-list-input');
var toDoList = []; 
var taskId = 0;

function showRightSideBar() {
  var textFields = document.getElementsByClassName("right-side-bar");
  for(let textField of textFields) {
    textField.classList.toggle("none")
  }
}
/* To Trigger add-list button While Entering Enter Key */
document.getElementById("new-list-input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("add-list").click();
    }
});

/* This Method addNewList is used to store new List items in Array */
function addNewList() {
  var newList = {
    id:"", 
    name:"", 
    status:"incomplete", 
    tasks:[]
  };
  var listId = taskId++;
  newList.id = listId
  var inputValue = document.getElementById("new-list-input").value;
  if ("" === inputValue) {
    alert("It seems like List Name is Empty. Enter Your List name");
  } else {
    newList.name = inputValue;
    toDoList.push(newList);
    /* To display All the Available List Items */
    var listItem = document.createElement("li");
    var task = document.createTextNode(newList.name);
    listItem.addEventListener("click", displayTasks.bind(newList));
    listItem.appendChild(task);
    listItems.appendChild(listItem);  
    document.getElementById("new-list-input").value = "";
  }
}

function displayTasks() {
  document.getElementById()
  console.log(this)
}

function addNewTask () {
  var newTask = {
    id:"", 
    name:"", 
    status:"incomplete", 
    step:[],
    note:""
  };
}




function a(element, event, listener, bindElement="") {
  element.addEventListener(event, listener.bind(bindElement));
}



