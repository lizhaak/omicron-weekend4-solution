myApp.controller("taskController", ["$scope", "$http", function($scope, $http) {
  console.log("task controller working!");
  $scope.taskContent = "";
  $scope.tasks = [];
  getTasks();

  // Send task object to the server
  $scope.saveTask = function() {
    console.log($scope.taskContent);

    $http.post('/tasks', {content: $scope.taskContent})
      .then(function(response) {
        console.log("post response: ", response);
        if(response.status == 201) {
          $scope.taskContent = "";
          getTasks();
        } else {
          console.log("error posting new task");
        }
      });
  }

  // retrieve tasks from the server
  function getTasks() {
    $http.get('/tasks').then(function(response) {
      console.log('data', response.data);
      $scope.tasks = response.data;
    });

  }

  // send update request to server for this task
  $scope.completeTask = function(id) {
    console.log('this task id ', id);

    $http.put('/tasks/' + id, {taskID: id})
      .then(function(response) {
        if(response.status == 200) {
          getTasks();
        } else {
          console.log('error updating task');
        }
      });
  }

  // delete this task from the server
  $scope.deleteTask = function(id) {
    if(confirm("Delete this task??!")) {
      console.log('delete task id ', id);
      $http.delete('/tasks/' + id).then(function(response) {
        if(response.status == 202) {
          getTasks();
        } else {
          console.log('error deleting task');
        }
      });
    };
}

}]);
