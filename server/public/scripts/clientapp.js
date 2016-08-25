var myApp = angular.module("myApp", []);  //dependencies injection in the array




// $(document).ready(function() {
//   console.log("Let's get started, yo!");
//   getTasks();
//
//   // Event listeners
//   $("#taskForm").on("submit", saveTask);
//   $("#task-container").on("click", ".completeTask", completeTask);
//   $("#task-container").on("click", ".deleteTask", deleteTask);
//
// });

// Send task object to the server
function saveTask() {
  event.preventDefault();

  var task = {
    content: $("#taskContent").val()
  };

  console.log(task);

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: task,
    success: getTasks,
    error: function() {
      console.log('could not create new task');
    }
  });
}

// retrieve tasks from the server
function getTasks() {
  $.get('/tasks', appendTasks)
    .fail(function() {
      console.log('error!');
    });
}

// send update request to server for this task
function completeTask() {
  var id = $(this).parent().data('id');
  console.log('this task id ', id);

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + id,
    data: {taskID: id},
    success: getTasks,
    error: function() {
      console.log("unable to complete task");
    }
  });
}

// delete this task from the server
function deleteTask() {
  // use the built-in browser confirm dialog
  if(confirm("Are you sure you wanna delete this?")) {
    var id = $(this).parent().data('id');
    console.log('delete task id ', id);

    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + id,
      success: getTasks,
      error: function() {
        console.log("unable to delete task");
      }
    });
  }
}

/***
* @params tasks - an array of task items, probably from the DB
**/
function appendTasks(tasks) {
  console.log('appendin: ', tasks);
  $("#task-container").empty();

  tasks.forEach(function(task) {
    $("#task-container").append('<div class="task-listing"></div>');
    $el = $("#task-container").children().last();
    $el.data('id', task.id);
    $el.append('<h2>' + task.task_content + '</h2>');

    // completed logic
    if(task.completed_date != null) {
      $el.addClass("completed");
    } else {
      $el.append('<button class="completeTask">Complete</button>');
    }

    $el.append('<button class="deleteTask">Delete</button>');

  });

}
