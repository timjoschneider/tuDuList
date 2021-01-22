const tasks = [
    "This is a super dooper long list with a lot of random content, This is a super dooper long list with a lot of random content",
    "Tomatos",
    "Bananas",
    "Kiwi",
    "Rice",
    "Avocado",
    "Berries",
    "Spinach",
]

const container = document.getElementById("task-list");

const addTask = (task) => {
    const listItem = `
    <li class="bg-lighter task col-12 row shadow-sm mb-2 rounded d-flex justify-content-around">
        <div class="col-1">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        </div>
        <div class="col-8">
            <p class="list-text">${task}</p>
        </div>
        <div class="col-2 icons mb-0">
            <i class="fas fa-edit task-icon mx-2"></i>
            <i class="fas fa-trash task-icon"></i>
        </div>
    </li>
  `;
    container.insertAdjacentHTML("beforeend", listItem);
};

tasks.forEach((task) => {
    addTask(task);
});
// PLACEHOLDER



//document.getElementById

class ToDoList {
    constructor(listName = "", tasks = []) {
        this._listName = listName;
        this._tasks = tasks;
    }

    get listName() {
        return this._listName;
    }
    set listName(name) {
        this._listName = name;
    }

}

class ToDo extends ToDoList {
    constructor() {
        super();
    }
}

const listeDone = new ToDoList("Dumme Liste");
// const listName = listeDone.listName;
// listeDone.listName = "Test";

listeDone.listName = "Test";

const title = document.getElementById("list-title");
title.textContent = listeDone.listName;


// input field add list
const inputAddList = document.getElementById("add-list-input");
// btn add list
const btnAddList = document.getElementById("btn-add-list");


const addList = () => {
    alert(inputAddList.value);
}

btnAddList.addEventListener("click", addList);


inputAddList.addEventListener("keyup", function() {
    console.log(inputAddList.value);
});