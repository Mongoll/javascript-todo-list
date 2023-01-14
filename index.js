const todos = [];
const modal = document.getElementById("myModal")
let addbtn = document.getElementById("addTask");
let cancelBtn = document.getElementsByClassName("cancelBtn")[0]
let submitBtn = document.getElementsByClassName("submitBtn")[0]
let span = document.getElementsByClassName("close")[0];
let titleInput = document.getElementById("taskTitle")
let deadlineInput = document.getElementById("deadline")
let statusInput = document.getElementById("status")
let listBox = document.getElementsByClassName("taskList")[0]
let historyBox = document.getElementsByClassName("history")[0]
let saveIndex = document.getElementsByClassName("indexInp")[0]
let saveBtn = document.getElementsByClassName("saveBtn")[0]
let modalTitle = document.getElementsByClassName("modalTitle")[0]
let valid = true
modal.style.visibility = "hidden"
let dtToday = new Date();
let month = dtToday.getMonth() + 1; 
let day = dtToday.getDate();
let year = dtToday.getFullYear();
if(month < 10)
   month = '0' + month.toString();
if(day < 10)
   day = '0' + day.toString();

let minDate = year + '-' + month + '-' + day;
deadlineInput.setAttribute('min', minDate);
    
function setModal(setMod){
     modal.style.visibility = setMod;
}

function addNewItem() {
    let tempTodoList = {}
    todos.forEach((element) => {
        if (titleInput.value === element.title){
            valid = false
            alert("You already have a task with this name")
        }
        else{valid = true}
    })
    if(titleInput.value != '' & deadlineInput.value != '' & statusInput.value != '' & valid === true){
        tempTodoList.title = titleInput.value
        tempTodoList.deadline = deadlineInput.value
        tempTodoList.status = statusInput.value
        todos.push(tempTodoList)
        cancelModal()
        displayTodo()
        history();
    }else{}
  
}
function cancelModal(){
    setModal('hidden')
    titleInput.value = "";
    deadlineInput.value = "";
    statusInput.value = "todo"
}

function displayTodo() {
    let htmlCode = "";
    todos.forEach((element, index) => {
      htmlCode += `<div class='items ${element.status}' onclick='edit(${index})'>
      <div class='textBlock'>
      <p class='itemTitle'>${element.title}</p>
      <p class='itemDeadline'>Deadline: ${element.deadline}</p>
      </div>
      <button onclick='deleteTodo(${index})' class='delBtn'>Delete</button>
   </div>`;
    });
    listBox.innerHTML = htmlCode;
   }

function edit(index){
    modalTitle.innerHTML = "Edit todo"
    saveIndex.value = index
    titleInput.value = todos[index].title
    deadlineInput.value = todos[index].deadline
    statusInput.value = todos[index].status
    setModal('visible')
    saveBtn.style.display = 'block'
    submitBtn.style.display = 'none'
}

function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodo();
    cancelModal();
    history();
   }

saveBtn.addEventListener("click", () => {
    let id = saveIndex.value;
    if (todos[id].title != titleInput.value){
        todos.forEach((element) => {
            if (titleInput.value === element.title){
                valid = false
                alert("You already have a task with this name")
            }
            else{valid = true}
        })
    }
    if(titleInput.value != '' & deadlineInput.value != '' & statusInput.value != '' & valid === true){
        todos[id].title = titleInput.value;
        todos[id].deadline = deadlineInput.value;
        todos[id].status = statusInput.value;
        submitBtn.style.display = "block";
        saveBtn.style.display = "none";
        titleInput.value = "";
        deadlineInput.value = "";
        statusInput.value = "";
        modalTitle.innerHTML = "Add new todo"
        displayTodo();
        cancelModal();
        history();
    }
});

function history(){
    let todoCount = 0
    let progressCount = 0
    let doneCount = 0
    let htmlCode = "";
    todos.forEach((element) => {
        if (element.status == 'todo'){
            todoCount++
        }
        else if (element.status === 'progress'){
            progressCount++
        }
        else{
            doneCount++
        }
   })
   document.getElementsByClassName('historyItem')[0].innerHTML = 'Not started: '+ todoCount
   document.getElementsByClassName('historyItem')[1].innerHTML = 'In progress: ' + progressCount
   document.getElementsByClassName('historyItem')[2].innerHTML = 'Done: ' + doneCount
}
history()
