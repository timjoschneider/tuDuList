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
    <li class="task col-12 row shadow-sm mb-2 rounded d-flex justify-content-around">
        <div class="col-1">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        </div>
        <div class="col-8">
            <p>${task}</p>
        </div>
        <div class="col-2 icons">
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

//document.getElementById