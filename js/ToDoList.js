//document.getElementById('add-list').addEventListener('click',addNewTask);
document.getElementById("show-text-field").addEventListener("click", showTextField);
var newListInput = document.getElementById('new-list-input');
var toDoLists = []; 
var taskId = 0;

function showTextField() {
  var textField = document.getElementById("text-field");
  if (textField.style.display === "block") {
    textField.style.display = "none";
  } else {
    textField.style.display = "block";
  }
}
/* This Method addNewList is used to store new List items in Array */
function addNewList() {
  console.log("newList");
  var newList = {
    id:"", 
    name:"", 
    status:"true", 
    task:[]
  };
  newList.id = taskId++;
  var inputValue = document.getElementById("new-list-input").value;
  if(inputValue === "") {
    alert("Enter Your List name");
  } else {
  newList.name = inputValue;
  console.log(newList);
  toDoLists.push(newList);
  /* To display All the Available List Items */
  var li = document.createElement("li");
  var task = document.createTextNode(inputValue);
  li.appendChild(task);
  document.getElementById("list-items").appendChild(li);  
  document.getElementById("new-list-input").value = "";
  }
}


