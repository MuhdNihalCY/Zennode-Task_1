// initialised an empty list variable
const list = [];

// store new task
function addTaskToList(task) {
    const newTask = {
        task: task,
        Status: false // by default set the status to be not completed
    }

    // push this task to list
    list.push(newTask)

    // add new list
    addNewList(newTask)
}


$(document).ready(() => {
    // jQuery for add new task button click 
    $("#addTaskBtn").click(() => {
        const task = document.getElementById('newTaskInp').value.trim();

        if (task !== "") {
            // function called to store the task
            addTaskToList(task)

            // cleared task input tag
            document.getElementById('newTaskInp').value = "";
        }
    });

    // side nav open
    $("#menuBarContainer").click(() => {
        $("#sideNav").toggleClass("sideNavActive");
    });

    // side nav close
    $("#menuCloseContainer").click(() => {
        $("#sideNav").toggleClass("sideNavActive");
    });

    // quote generator  using ajax get method, using a third party api for quote generation.
    $("#generatorBtn").click(() => {
        $.get("https://api.quotable.io/quotes/random", (data, status) => {
            // alert(status);
            if (data[0].content) {
                // add quote content to p tag
                $("#quoteContent").text(`" ${data[0].content}"`);
                $("#quoteAuthor").text(`~ ${data[0].author}`);
            }
        }).fail((error) => {
            console.error('Error fetching quote:', error);
        });
    })

})

// function to add new task to to-do list
function addNewList(newTask) {
    var taskParent = document.getElementById('taskListParent');

    // create a new li element
    let li = document.createElement('li');
    li.classList.add('taskList');

    // create a new input checkbox element
    let doneBtn = document.createElement('button');
    doneBtn.textContent = "done";
    doneBtn.classList.add('doneBtn');
    // attach onclick event listener on it
    $(doneBtn).click(() => {
        taskDone(doneBtn.parentNode);
    })

    // create a new p tag
    let taskTag = document.createElement('p');
    taskTag.textContent = newTask.task;
    taskTag.classList.add('taskTitle');
    newTask.Status ? taskTag.style.textDecoration = "line-through" : null;

    // create a new button element
    let delBtn = document.createElement('button');
    delBtn.classList.add('deleteBtn');
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
    var taskTitleTag = listTag.querySelector('.taskTitle');
    let taskTitle = taskTitleTag.textContent;
    let doneBtn = listTag.querySelector('.doneBtn');

    let foundTask = list.find((eachList) => eachList.task === taskTitle);

    // completed tasks is stiked
    taskTitleTag.style.textDecoration = "line-through";
    taskTitleTag.style.color = "gray";
    foundTask.Status = true;
    doneBtn.disabled = true; // done button for this task is  disabled 
    foundTask.Status = true; // updated the status of task
    doneBtn.classList.add('doneBtnActive'); // add active class for done button
}

function deleteTask(listTag) {
    var taskTitleTag = listTag.querySelector('.taskTitle');
    let taskTitle = taskTitleTag.textContent;

    // remove the task from List
    var taskIndex = list.findIndex((eachList) => eachList.task === taskTitle);

    if (taskIndex !== -1) {
        // Remove the element at the found index
        list.splice(taskIndex, 1);
    }

    // Remove the parent <li> element from the DOM
    listTag.remove();
}