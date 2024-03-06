// initialised an empty list variable
let list = [];

// store new task
function addTaskToList(task) {
    let newTask = {
        task: task,
        Status: false // by default set the status to be not completed
    }

    // push this task to list
    list.push(newTask)

    // add new list
    addNewList(newTask)
}


// jQuery for add new task button click 
$("#add-task-btn").click(() => {
    let task = document.getElementById('new-task-inp').value.trim();

    if (task !== "") {
        // function called to store the task
        addTaskToList(task)

        // cleared task input tag
        document.getElementById('new-task-inp').value = "";
    }
})

// function to add new task to to-do list
function addNewList(newTask) {
    var taskParent = document.getElementById('task-list-parent');

    // create a new li element
    let li = document.createElement('li');
    li.classList.add('task-list');

    // create a new input checkbox element
    let doneBtn = document.createElement('button');
    doneBtn.textContent = "done";
    doneBtn.classList.add('done-btn');
    // attach onclick event listener on it
    $(doneBtn).click(() => {
        taskDone(doneBtn.parentNode);
    })

    // create a new p tag
    let taskTag = document.createElement('p');
    taskTag.textContent = newTask.task;
    taskTag.classList.add('task-title');
    newTask.Status ? taskTag.style.textDecoration = "line-through" : null;

    // create a new button element
    let delBtn = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.textContent = "delete";
    // attach onclick event listener on it
    $(delBtn).click(() => {
        deleteTask(delBtn.parentNode);
    })

    // append all created elements
    li.appendChild(doneBtn);
    li.appendChild(taskTag);
    li.appendChild(delBtn);
    taskParent.appendChild(li);
}

function taskDone(listTag) {
    var taskTitleTag = listTag.querySelector('.task-title');
    let taskTitle = taskTitleTag.textContent;
    let doneBtn = listTag.querySelector('.done-btn');

    let foundTask = list.find((eachList) => eachList.task === taskTitle);

    // completed tasks is stiked
    taskTitleTag.style.textDecoration = "line-through";
    taskTitleTag.style.color = "gray";
    foundTask.Status = true;
    doneBtn.disabled = true; // done button for this task is  disabled 
    foundTask.Status = true; // updated the status of task
    doneBtn.classList.add('done-btn-active'); // add active class for done button
}

function deleteTask(listTag) {
    var taskTitleTag = listTag.querySelector('.task-title');
    let taskTitle = taskTitleTag.textContent;

    // remove the task from List
    var taskIndex = list.findIndex((eachList) => eachList.task === taskTitle);

    if (taskIndex !== -1) {
        // Remove the element at the found index
        list.splice(taskIndex, 1);
    }
    console.log(list);

    // Remove the parent <li> element from the DOM
    listTag.remove();
}







