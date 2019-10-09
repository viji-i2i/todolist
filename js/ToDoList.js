document.getElementById("add-list").addEventListener("click",addNewList);
document.getElementById("show-text-field").addEventListener("click", showRightSideBar);
document.getElementById("show-right-side-bar").addEventListener("click", showRightSideBar);

var newListInput = document.getElementById('new-list-input');
var toDoLists = []; 
var taskId = 0;

function showRightSideBar() {
  var textField = document.getElementsByClassName("right-side-bar");
  for(let index in textField) {
    if (textField[index].style.display === "block") {
      textField[index].style.display = "none";
    } else {
      textField[index].style.display = "block";
    }
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
  console.log("newList");
  var newList = {
    id:"", 
    name:"", 
    status:"true", 
    task:[]
  };
  newList.id = taskId++;
  var inputValue = document.getElementById("new-list-input").value;
  if (inputValue === "") {
    alert("It seems like List Name is Emplty. Enter Your List name");
  } else {
    newList.name = inputValue;
    console.log(newList);
    toDoLists.push(newList);
    /* To display All the Available List Items */
    var li = document.createElement("li");
    var task = document.createTextNode(inputValue);
    li.addEventListener("click", addNewList);
    li.appendChild(task);
    document.getElementById("list-items").appendChild(li);  
    document.getElementById("new-list-input").value = "";
  }
}


