$(document).ready(function() {

  $('#task-form').on('click', '#task-submit', createTask);

  $('#task-container').on('click', '.complete-button', completeTask);

  $('#task-container').on('click', '.delete-button', deleteTask);

  getTasks();
});

function createTask(event) {
  event.preventDefault();
  var task = {
    content : $('#task-content').val()
  };
  $.post('/tasks', task, getTasks);
}

function completeTask() {
  console.log('completing task');
  var taskID = $(this).parent().data('id');
  $.ajax( {
    type: 'PUT',
    url: '/tasks/' + taskID,
    data: {},
    success: getTasks
  });
}

function deleteTask() {
  var confirmation = confirm('Are you sure you want to delete this Task?');
  if(confirmation) {
    console.log('deleting task');
    var taskID = $(this).parent().data('id');
    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + taskID,
      success: getTasks
    });
  }

}

function getTasks() {
  $.get('/tasks', function(data) {
    $('#task-container').empty();
    data.forEach(function(task) {
      console.log(task);
      appendTask(task);
    });
  });
}

function appendTask(task) {
    $('#task-container').append('<div class="task-listing"></div>');
    $el = $('#task-container').children().last();
    $el.data('id',  task.id);
    $el.append('<h2>' + task.task_content + '</h2>');

    if(task.completed_date) {
        $el.toggleClass('complete');
    } else {
        $el.toggleClass('incomplete');
        $el.append('<button class="complete-button">Complete</button>');
    }

    $el.append('<button class="delete-button">Delete</button>');
}
