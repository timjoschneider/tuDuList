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

    deleteTask(task) {
        // deletes task from list
        let index = this._tasks.indexOf(task);
        this._tasks.splice(index, 1)
        reloadAllLists();
    }

    deleteAllTasks() {
        this._tasks = [];
        reloadAllLists();
    }

    // add new task to one of the three lists: open, done, deleted
    addTask(input, listType) {
        // check which type of list
        switch (listType) {
            // add new task to open list that takes userinput 
            case "withUserInput":
                if (input.value) {
                    this._tasks.push(input.value);
                    reloadAllLists();
                } else {
                    alert("U cannot enter an empty task!")
                }
                break;

            case "withoutUserInput":
                // add new task to done or deleted list that 
                // does not take any user input
                this._tasks.push(input);
                reloadAllLists();
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
                <span id="task-name" class="content p-2">${task}</span>
                <span class="icons p-2">
                    <i id="edit-icon" class="fas fa-edit"></i>
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
            // TODO @Emeline use content to edit task ?

            const trash = li.childNodes[5].childNodes[3];
            //const edit = li.childNodes[5].childNodes[1];
            const edit = document.getElementById("edit-icon");
            const saveEdit = () => {
                alert(window = "Your task has been updated");
            };

            // MOVE open tasks to done tasks onclick
            checkbox.addEventListener('change', () => {
                // add to list doneList and remove from openList
                doneList.addTask(task, "withoutUserInput");
                openList.deleteTask(task);
                // reloadAllLists();
            });
            // MOVE open tasks to deleted tasks onclick
            trash.addEventListener('click', () => {
                // add to list deletedList and remove from openList
                openList.deleteTask(task);
                deletedList.addTask(task, "withoutUserInput");
            });

            edit.addEventListener('click', (e) => {
                console.log("goi");
                //const editInput = e.target.closest("li").children[0];
                e.target.style.transform = "scale(1.5)";
                const editInput = document.getElementById("task-name");
                editInput.contentEditable = true;
                    editInput.onkeydown = (e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            saveEdit();
                            editInput.onblur = () => saveEdit();
                        } 
                        editInput.onblur = () => saveEdit();
                    }   
            });

            
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
            checkbox.addEventListener('change', () => {
                doneList.deleteTask(task);
                openList.addTask(task, "withoutUserInput");
            });
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

            trashIcon.addEventListener('click', () => {
                openList.addTask(task, "withoutUserInput");
                deletedList.deleteTask(task);
            });
        })
    });
    // update STATS
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
});

// delete task forever
btnDeleteAll.addEventListener('click', () => {
    deletedList.deleteAllTasks();
});