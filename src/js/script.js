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

    updateTasks(task) {
        // pushes new element into list
        this._tasks.push(task);
    }

    deleteTask(task) {
        // deletes task from list
        let index = this._tasks.indexOf(task);
        this._tasks.splice(index, 1)
        reloadAllLists();
    }

    addTask(input, listType) {
        // check which type of list
        switch (listType) {
            case "open":
                if (input.value) {
                    this.updateTasks(input.value);
                    reloadAllLists();
                    break;
                } else {
                    console.log("mäh");
                }

            case "done":
                // add new done task
                this.updateTasks(input);
                reloadAllLists();
                break;

            case "deleted":
                this.updateTasks(input);
                reloadAllLists();
                break;
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
    return task.length > 22 ? `${task.substr(0,22)}...` : task;
}

// clear the lists and reload content
const reloadAllLists = () => {
    //  --------------------- RELOAD OPEN TASKS LIST ------------------------ //
    // clear list
    taskUl.textContent = "";
    // iterate over open tasks array and insert a li for each element  
    openList.getTasks.forEach((task) => {
        const listItemOpen = `
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
        taskUl.insertAdjacentHTML('afterbegin', listItemOpen);
        inputAddTask.value = ""; // clear input field

        // move open tasks to either done or deleted tasks onclick
        const liOpen = document.querySelectorAll('.li-item');
        liOpen.forEach((li) => {
            const checkbox = li.firstElementChild.firstElementChild;
            const content = li.childNodes[3].textContent;
            // use content to edit task ?
            const trash = li.childNodes[5].childNodes[3];
            const edit = li.childNodes[5].childNodes[1];
            // MOVE open tasks to done tasks onclick
            checkbox.addEventListener('change', (event) => {
                // add to list doneList and remove from openList
                doneList.addTask(task, "done");
                openList.deleteTask(task);
                // reloadAllLists();
            }, false);
            // MOVE open tasks to deleted tasks onclick
            trash.addEventListener('click', (event) => {
                // add to list deletedList and remove from openList
                openList.deleteTask(task);
                deletedList.addTask(task, "deleted");
            }, false);

            edit.addEventListener('click', (event) => {
                console.log("arrived at edit entry click")
                    // li.parentNode.removeChild(li);
            }, false);
        });
    });
    //  ----------------------- RELOAD DONE TASKS LIST --------------------- //
    // clear list
    taskUlDone.textContent = "";
    // populate list with array elements
    doneList.getTasks.forEach((task) => {
        const listItemDone = `
            <li class="pb-2 m-0 li-item-done">
                <span id="checkbox" class="checkbox">
                    <input class="form-check-input" 
                    type="checkbox" value="" checked title="undo">
                </span>
                <span class="content">${cutString(task)}</span>
            </li>
            `;
        taskUlDone.insertAdjacentHTML('afterbegin', listItemDone);
        // RESTORE done tasks back to open tasks onclick
        const liDone = document.querySelectorAll('.li-item-done');
        liDone.forEach((li) => {
            const checkbox = li.firstElementChild.firstElementChild;
            checkbox.addEventListener('change', (event) => {
                doneList.deleteTask(task);
                openList.addTask(task, "open");
            }, false);
        })

    });
    //  ----------------- RELOAD DELETED TASKS LIST ------------------------ //
    taskUlDeleted.textContent = "";
    deletedList.getTasks.forEach((task) => {
        const listItemDeleted = `
        <li class="pb-2 m-0 li-item-deleted">
            <span class="restore">
                <i class="fas fa-trash-restore" title="restore"></i>
            </span>
            <span class="content">${cutString(task)}</span>
        </li>
        `;
        taskUlDeleted.insertAdjacentHTML('afterbegin', listItemDeleted);

        // RESTORE deleted tasks back to open tasks onclick
        const liDeleted = document.querySelectorAll('.li-item-deleted');
        liDeleted.forEach((li) => {
            const trashIcon = li.firstElementChild.firstElementChild;
            const content = li.lastElementChild.textContent;

            trashIcon.addEventListener('click', (event) => {
                openList.addTask(task, "done");
                deletedList.deleteTask(task);
            }, false);
        })
    });
    // update STATS
    nrOpenTasks.textContent = openList.getTasks.length;
    nrDoneTasks.textContent = doneList.getTasks.length;
    nrDeletedTasks.textContent = deletedList.getTasks.length;
    if (deletedList.getTasks.length > 0) {
        btnDeleteAll.hidden = false;
    }
}

// add new task btn
btnAddTask.addEventListener('click', (event) => {
    openList.addTask(inputAddTask, "open");
}, false);