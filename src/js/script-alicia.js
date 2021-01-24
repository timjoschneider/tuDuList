// // placeholder tasks
const staticTasks = [
    "This is a super dooper long list with a lot of random content, This is a super dooper long list with a lot of random content",
    "Bananas",
    "Kiwi",
    "Avocado",
    "Berries",
    "Spinach",
]



// cut string at 20 letters
const stripString = (task) => {
    console.log(task.length);
    if (task.length > 30) {
        return `${task.substr(0,30)}...`;
    }
    return task;
}


// container for tasks
const taskUl = document.getElementById("task-list");
const addTaskStatic = (task) => {
    const listItem = `
    <li class="shadow-sm li-item pb-2">
    <span class="checkbox p-2">
        <input class="form-check-input" type="checkbox" value="">
    </span>
    <span class="content p-2">${task}</span>
    <span class="icons p-2">
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
    </span>
</li>
  `;
    taskUl.insertAdjacentHTML("beforeend", listItem);
};

staticTasks.forEach((task) => {
    addTaskStatic(task);
});



// ------------------------------- container for tasks DONE
const taskUlDone = document.getElementById("task-list-done");
const addTaskStaticDone = (task) => {
    const listItem = `
    <li class="pb-2 m-0 li-item-done">
        <span class="checkbox">
            <input class="form-check-input" 
            type="checkbox" value="" checked title="undo">
        </span>
        <span class="content">${stripString(task)}</span>
    </li>
      `;
    taskUlDone.insertAdjacentHTML("beforeend", listItem);
};

staticTasks.forEach((task) => {
    addTaskStaticDone(task);
});

// ------------------------------- container for tasks DELETED
const taskUlDeleted = document.getElementById("task-list-deleted");
const addTaskStaticDeleted = (task) => {
    const listItem = `
    <li class="pb-2 m-0 li-item-deleted">
        <span class="restore">
            <i class="fas fa-trash-restore" title="restore"></i>
        </span>
        <span class="content">${stripString(task)}</span>
    </li>
      `;
    taskUlDeleted.insertAdjacentHTML("beforeend", listItem);
};

staticTasks.forEach((task) => {
    addTaskStaticDeleted(task);
});

// PLACEHOLDER


// ---------------------------------------------------------------------



const listsContainer = document.getElementById("list-container");
const title = document.getElementById("list-title");

// input field add list
const inputAddList = document.getElementById("add-list-input");
// btn add list
const btnAddList = document.getElementById("btn-add-list");

// input field add Task
const inputAddTask = document.getElementById("add-task-input");
// btn add Task
const btnAddTask = document.getElementById("btn-add-task");

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
    get tasks() {
        return this._tasks;
    }
    set tasks(task) {
        this._tasks.push(task);
    }

}

class ToDo extends ToDoList {
    constructor() {
        super();
    }
}

const listGroceries = new ToDoList("Aufgabenliste");
title.textContent = listGroceries.listName;

const addList = () => {
    alert(inputAddList.value);
}
btnAddList.addEventListener("click", addList);

inputAddList.addEventListener("keyup", function() {
    console.log(inputAddList.value);
});

const lists = ["List I", "List II", listGroceries.listName];


const displayToDoLists = (listElement) => {
    const listItem = `
        <div class = "card">
            <div class = "card-body">
                ${listElement}
            </div>
        </div>
      `;
    listsContainer.insertAdjacentHTML("beforeend", listItem);
};

lists.forEach((list) => {
    displayToDoLists(list);
});

// const newTasks = listGroceries.tasks.forEach((task) => { listGroceries.tasks.push(task) });

// const newTasks = [];
// staticTasks.forEach(task => newTasks.push(task));

const addTask = () => {
    if (inputAddTask.value) {
        listGroceries.tasks = inputAddTask.value;

        const listItem = `
            <li class="shadow-sm li-item">
                <span class="checkbox p-1">
                    <input class="form-check-input" type="checkbox" value="" checked>
                </span>
                <span class="content p-1">${inputAddTask.value}</span>
                <span class="icons p-1">
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                </span>
            </li>
        `;
        container.insertAdjacentHTML("afterbegin", listItem);
        inputAddTask.value = "";
    } else {
        console.log("mäh");
    }
};


// newTasks.forEach((task) => {
//     addTaskStatic(task);
//     console.log(task);
// });

// console.log(`starts here: ${newTasks}`);

btnAddTask.addEventListener("click", addTask);