// ---------------------------- CLASSES ------------------------------- //
// todo LIST class
class ToDoList {
    constructor(listName = "") {
        this._listName = listName;
        this._tasks = [];
    }
    get listName() {
        return this._listName;
    }
    get getTasks() {
        return this._tasks;
    }

    editTask(task, editedTask) {
        let index = this._tasks.indexOf(task);
        this._tasks[index] = editedTask;
    }

    // delete single task from list x
    deleteTask(task) {
        // deletes task from list
        let index = this._tasks.indexOf(task);
        this._tasks.splice(index, 1)
    }

    // delete all tasks from deleted list
    deleteAllTasks() {
        this._tasks = [];
    }

    // add new task to one of the three lists: open, done, deleted
    addTask(input, listType) {
        // check which type of list
        switch (listType) {
            // add new task to open list that takes userinput 
            case "withUserInput":
                if (input.value) {
                    this._tasks.push(input.value);
                } else {
                    alert("U cannot enter an empty task!")
                }
                break;

            case "withoutUserInput":
                // add new task to done or deleted list that does not take any user input
                this._tasks.push(input);
                break;

            default:
                console.log("addTask called without or with invalid listtype");
        }
    }
}

// ---------------------------- SELECTORS ------------------------------- //
const listsContainer = document.getElementById("list-container");
// List Title
const title = document.getElementById("list-title");
// input field add Task
const inputAddTask = document.getElementById("add-task-input");
// btn add Task
const btnAddTask = document.getElementById("btn-add-task");
// btn delete all tasks forever
const btnDeleteAll = document.getElementById("delete-all-tasks");
// UL Id's for each list tipe: open, done, deleted
const taskUl = document.getElementById("task-list");
const taskUlDone = document.getElementById("task-list-done");
const taskUlDeleted = document.getElementById("task-list-deleted");
// STATS vars
const nrOpenTasks = document.getElementById("nr-open-tasks");
const nrDoneTasks = document.getElementById("nr-done-tasks");
const nrDeletedTasks = document.getElementById("nr-deleted-tasks");
// create new instances of lists: open, done, deleted
const openList = new ToDoList("My TuDuList");
const doneList = new ToDoList("Done List");
const deletedList = new ToDoList("Deleted List");
title.textContent = openList.listName;

// ------------------------ FUNCS & EVENTLISTENERS ------------------------- //
// cut string at 2X letters
const cutString = (task) => {
    return task.length > 20 ? `${task.substr(0,20)}...` : task;
}

//  --------------------- RELOAD OPEN TASKS LIST ------------------------ //
const reloadOpenList = () => {
    // clear list
    taskUl.textContent = "";
    // iterate over open tasks array and insert a li for each element 
    let index = 0;
    openList.getTasks.forEach((task) => {
        // create list item
        const listItemOpen = `
            <li id="list-item-${index}" class="shadow-sm li-item pb-2">
                <span class="checkbox p-2">
                    <input class="form-check-input" type="checkbox" value="">
                </span>
                <span id="task-name-${index}" class="content p-2">${task}</span>
                <span class="icons p-2">
                    <i id="edit-icon" class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                </span>
            </li>
        `;
        // insert list item
        taskUl.insertAdjacentHTML('afterbegin', listItemOpen);
        // clear input field
        inputAddTask.value = "";
        // load icons eventlisteners
        // move open tasks to either done or deleted tasks onclick
        const li = document.getElementById(`list-item-${index}`);
        const checkbox = li.childNodes[1]; // select checkbox
        const content = li.childNodes[3]; // select content

        // select trash icon
        const trash = li.childNodes[5].childNodes[3];
        // select edit icon
        const edit = li.childNodes[5].childNodes[1];

        // MOVE open tasks to done tasks onclick
        checkbox.addEventListener('change', () => {
            // add to list doneList and remove from openList
            doneList.addTask(task, "withoutUserInput");
            openList.deleteTask(task);
            reloadOpenList();
            reloadDoneList();
            reloadStatistics();
        });

        // MOVE done tasks to deleted tasks onclick
        trash.addEventListener('click', () => {
            // add to list deletedList and remove from openList
            openList.deleteTask(task);
            deletedList.addTask(task, "withoutUserInput");
            reloadOpenList();
            reloadDeletedList();
            reloadStatistics();
        });

        edit.addEventListener('click', (e) => {
            e.target.style.transform = "scale(1.5)";
            content.contentEditable = true;
            content.style.border = "solid 1px #868686";
            content.style.borderRadius = "5px";

            content.onkeydown = (e) => {
                if (e.key === "Enter") {
                    openList.editTask(task, content.textContent);
                    reloadOpenList();
                }
                if (e.key === "Escape") {
                    reloadOpenList();
                }

            }
        });
        index++;
    });
}

//  ----------------------- RELOAD DONE TASKS LIST --------------------- //
const reloadDoneList = () => {
    let index = 0;
    // clear list
    taskUlDone.textContent = "";
    // populate list with array elements
    doneList.getTasks.forEach((task) => {
        // create list item
        const listItemDone = `
        <li id="list-item-done-${index}" class="pb-2 m-0">
            <span id="checkbox" class="checkbox">
                <input class="form-check-input" 
                type="checkbox" value="" checked title="undo">
            </span>
            <span class="content-done">${cutString(task)}</span>
            <span class="p-2">
                <i class="fas fa-trash"></i>
            </span>
        </li>
        `;
        // insert list item
        taskUlDone.insertAdjacentHTML('afterbegin', listItemDone);
        // select created listItemDone li item
        const li = document.getElementById(`list-item-done-${index}`);
        const checkbox = li.childNodes[1];
        checkbox.addEventListener('change', () => {
            doneList.deleteTask(task);
            openList.addTask(task, "withoutUserInput");
            reloadOpenList();
            reloadDoneList();
            reloadStatistics();
        });

        const trash = li.childNodes[5];
        console.log(trash);
        trash.addEventListener('click', () => {
            // add to list deletedList and remove from openList
            doneList.deleteTask(task);
            deletedList.addTask(task, "withoutUserInput");
            reloadDoneList();
            reloadDeletedList();
            reloadStatistics();
        });

        index++;
    });
}

//  ----------------- RELOAD DELETED TASKS LIST ------------------------ //
const reloadDeletedList = () => {
    let index = 0;
    taskUlDeleted.textContent = "";
    deletedList.getTasks.forEach((task) => {
        const listItemDeleted = `
        <li id="list-item-deleted-${index}" class="pb-2 m-0 li-item-deleted">
            <span class="restore">
                <i class="fas fa-trash-restore" title="restore"></i>
            </span>
            <span class="content">${cutString(task)}</span>
        </li>
        `;
        taskUlDeleted.insertAdjacentHTML('afterbegin', listItemDeleted);
        const li = document.getElementById(`list-item-deleted-${index}`);
        const trashIcon = li.childNodes[1];

        trashIcon.addEventListener('click', () => {
            openList.addTask(task, "withoutUserInput");
            deletedList.deleteTask(task);
            reloadOpenList();
            reloadDeletedList();
            reloadStatistics();
        });
        index++;
    });
}

const reloadStatistics = () => {
    // --- update STATS ---
    nrOpenTasks.textContent = openList.getTasks.length;
    nrDoneTasks.textContent = doneList.getTasks.length;
    nrDeletedTasks.textContent = deletedList.getTasks.length;
    if (deletedList.getTasks.length > 0) {
        btnDeleteAll.hidden = false;
    } else {
        btnDeleteAll.hidden = true;
    }
}

// add new task btn
btnAddTask.addEventListener('click', () => {
    openList.addTask(inputAddTask, "withUserInput");
    reloadOpenList();
    reloadStatistics();
});

// delete tasks permanently
btnDeleteAll.addEventListener('click', () => {
    deletedList.deleteAllTasks();
    reloadDeletedList();
    reloadStatistics();
});