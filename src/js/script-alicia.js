// ---------------------------- SELECTORS -------------------------------//

const listsContainer = document.getElementById("list-container");
const title = document.getElementById("list-title");

// input field add Task
const inputAddTask = document.getElementById("add-task-input");
// btn add Task
const btnAddTask = document.getElementById("btn-add-task");

// UL Id's for each list tipe: open, done, deleted
const taskUl = document.getElementById("task-list");
const taskUlDone = document.getElementById("task-list-done");
const taskUlDeleted = document.getElementById("task-list-deleted");


// cut string at 2X letters
const cutString = (task) => {
    return task.length > 22 ? `${task.substr(0,22)}...` : task;
}

// static content open tasks
const staticOpenTasks = [
    "This is a super dooper long list with a lot of random content, generate dto see how a longer list would look like",
    "React Native",
    "Css Flexbox",
    "JS OOP Codecademy exercises",
    "Sandbox Exercises",
    "Css z-index",
]

// static content done tasks
const staticDoneTasks = [
    "Html base structure",
    "Bootstrap for beginners course",
    "Flexbox tower exercises",
    "Git base commands",
    "JS Dom Events",
]

// static content deleted tasks
const staticDeletedTasks = [
    "This is another super dooper long list with a lot of random content, generate dto see how a longer list would look like",
    "Tomatos",
    "Jquery",
    "ChoreBot",
]


// ------------------------------- preload static content for tasks DONE
const addTaskStatic = (task) => {
    const listItem = `
        <li class="shadow-sm li-item mb-2">
            <span class="checkbox p-2">
                <input class="form-check-input" type="checkbox" value="">
            </span>
            <span class="content p-2">${task}</span>
            <div class="icons p-2">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash"></i>
            </div>
        </li>
    `;
    taskUl.insertAdjacentHTML('afterbegin', listItem);
};


// ------------------------------- preload static content for tasks DONE
const addTaskStaticDone = (task) => {
    const listItem = `
    <li class="pb-2 m-0 li-item-done">
        <span id="checkbox" class="checkbox">
            <input class="form-check-input" 
            type="checkbox" value="" checked title="undo">
        </span>
        <span class="content">${cutString(task)}</span>
    </li>
      `;
    taskUlDone.insertAdjacentHTML('afterbegin', listItem);
};

// ------------------------------- preload static content for tasks DELETED
const addTaskStaticDeleted = (task) => {
    const listItem = `
    <li class="pb-2 m-0 li-item-deleted">
        <span class="restore">
            <i class="fas fa-trash-restore" title="restore"></i>
        </span>
        <span class="content">${cutString(task)}</span>
    </li>
      `;
    taskUlDeleted.insertAdjacentHTML('afterbegin', listItem);
};

// for each list of tasks, call func to add item to the container
const loadStaticContent = (arr, func) => { arr.forEach((task) => { func(task); }) };

// function call for each list
loadStaticContent(staticOpenTasks, addTaskStatic);
loadStaticContent(staticDoneTasks, addTaskStaticDone);
loadStaticContent(staticDeletedTasks, addTaskStaticDeleted);



const restoreTask = (content) => {
    addTaskStatic(content);
}

const doneTask = (content) => {
    addTaskStaticDone(content);
}

const deleteTask = (content) => {
    addTaskStaticDeleted(content);
}


// move open tasks to either done or deleted tasks onclick
const liOpen = document.querySelectorAll('.li-item');
liOpen.forEach((li) => {
    const checkbox = li.firstElementChild.firstElementChild;
    const content = li.childNodes[3].textContent;
    const trash = li.childNodes[5].childNodes[3];
    // TODO const edit = li.childNodes[?];
    checkbox.addEventListener('change', (event) => {
        doneTask(content);
        li.parentNode.removeChild(li);
    }, false);

    trash.addEventListener('click', (event) => {
        deleteTask(content);
        li.parentNode.removeChild(li);
    }, false);

    // TODO edit.addEventListener('click', (event) => {
    //     editTask(content);
    //     // li.parentNode.removeChild(li);
    // }, false);
})

// restore done tasks back to open tasks onclick
const liDone = document.querySelectorAll('.li-item-done');
liDone.forEach((li) => {
    const checkbox = li.firstElementChild.firstElementChild;
    const content = li.lastElementChild.textContent;

    checkbox.addEventListener('change', (event) => {
        restoreTask(content);
        li.parentNode.removeChild(li);
    }, false);
})

// restore deleted tasks back to open tasks onclick
const liDeleted = document.querySelectorAll('.li-item-deleted');
liDeleted.forEach((li) => {
    const trashIcon = li.firstElementChild.firstElementChild;
    const content = li.lastElementChild.textContent;

    trashIcon.addEventListener('click', (event) => {
        restoreTask(content);
        li.parentNode.removeChild(li);
    }, false);
})


// STATS
const nrOpenTasks = document.getElementById("nr-open-tasks");
const nrDoneTasks = document.getElementById("nr-done-tasks");
const nrDeletedTasks = document.getElementById("nr-deleted-tasks");
// TODO Replace with dynamic lists
nrOpenTasks.textContent = staticOpenTasks.length;
nrDoneTasks.textContent = staticDoneTasks.length;
nrDeletedTasks.textContent = staticDeletedTasks.length;


// ---------------------------- OOP -------------------------------
// todo LIST parent class
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
    deleteTask(task) {
        this.tasks.pop(task);
    }

}

// todo TASK child class
class Task extends ToDoList {
    constructor(task, date = Date.now()) {
        super(listName);
        this._task = task;
        this._date = date;
    }
    get task() {
        return this._task;
    }

    get date() {
        return this._date;
    }

    createTask() {

    }
    editTask() {

    }
    deleteClass() {

    }
}


// create new instance of list
const learningList = new ToDoList("My TuDuList");
const doneList = new ToDoList("Done List");
const deletedList = new ToDoList("Deleted List");
title.textContent = learningList.listName;


staticOpenTasks.forEach((task) => { learningList.tasks = task })


console.log(learningList.tasks);
// Add task with input form
const addTask = () => {

    if (inputAddTask.value) {
        learningList.tasks = inputAddTask.value;

        console.log(learningList.tasks);
        const listItem = `
            <li class="shadow-sm li-item pb-2">
                <span class="checkbox p-2">
                    <input class="form-check-input" type="checkbox" value="">
                </span>
                <span class="content p-2">${inputAddTask.value}</span>
                <span class="icons p-2">
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                </span>
            </li>
        `;

        taskUl.insertAdjacentHTML('afterbegin', listItem);
        inputAddTask.value = "";

    } else {
        console.log("mäh");
    }
};


btnAddTask.addEventListener('click', addTask);