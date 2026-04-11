var list = [];
var listing = document.getElementById("div2");
var addBtn = document.getElementById("add-btn");
var deleteBtn = document.getElementById("delete-btn");

// 1. Add item function
function completeTask(id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i].isCompleted = !list[i].isCompleted;

      break;
    }
  }
  listItem();
}

// 2. Edit function
function editTask(id) {
  var input = document.getElementById("todo-input");
  var addBtn = document.getElementById("add-btn");

  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      input.value = list[i].text;
      addBtn.innerText = "Update";
      addBtn.onclick = function () {
        saveUpdate(id);
      };
      break;
    }
  }
}

// 3. Update save karne ka function
function saveUpdate(id) {
  var input = document.getElementById("todo-input");
  var addBtn = document.getElementById("add-btn");

  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i].text = input.value;
      break;
    }
  }
  window.localStorage.setItem("list", JSON.stringify(list));
  // Reset input and button
  input.value = "";
  addBtn.innerText = "Add";
  addBtn.onclick = createItem;
  listItem();
}

// 4. Create ID function
function createItem() {
  var input = document.getElementById("todo-input");
  if (input.value.length < 1) {
    alert("Please enter a task.");
    return;
  }

  // Create a new task object and add it to the list
  var saveid = {
    id: new Date().getTime() + Math.floor(Math.random() * 999),
    text: input.value,
    createdAt: new Date(),
    isCompleted: false,
  };

  list.push(saveid);
  var string_data = JSON.stringify(list);
  window.localStorage.setItem("list", string_data);
  input.value = "";
  listItem();
}

// 5. List item function to display tasks
function listItem() {
  listing.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    var deleteBtn = `<button class="material-symbols-outlined" onclick="deleteItem(${list[i].id})">Delete</button>`;
    var editBtn = `<button class="material-symbols-outlined" onclick="editTask(${list[i].id})">Edit</button>`;

    if (list[i].isCompleted === true) {
      listing.innerHTML += `
        <div class='todo'>
        <div class='content'>
        <input type="checkbox" checked onclick="completeTask(${list[i].id})">
              <span class="completed">${list[i].text}</span>
              </div>
                
                    ${deleteBtn}
                </div>`;
    } else {
      listing.innerHTML += `<div class='todo'>
      <div class='content'>
        <input type="checkbox"  onclick="completeTask(${list[i].id})">
              <span >${list[i].text}</span>
              </div>
           
                ${editBtn}
                    ${deleteBtn}
                </div>
           `;
    }
  }
}

// 6. Function to delete a task from the list
function deleteItem(id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      window.localStorage.setItem("list", JSON.stringify(list));
      break;
    }
  }
  listItem();
}

// 7. Function to clear all tasks from the list
function clearAll() {
  var input = document.getElementById("todo-input");
  var addBtn = document.getElementById("add-btn");

  list = [];
  window.localStorage.setItem("list", JSON.stringify(list));

  input.value = "";
  addBtn.innerText = "Add";
  addBtn.onclick = createItem;

  listItem();
}

// 8. Local storage function to save and retrieve tasks
function local_storage_data() {
  var storedList = window.localStorage.getItem("list");
  storedList = JSON.parse(storedList);
  if (storedList !== null) {
    list = storedList;
  }
  listItem();
}
local_storage_data();
