var HelloWorld = React.createClass({
  // Start state, no tasks added and state is to show all the tasks
  getInitialState: function() {
    return {
      h1Text: 'To Do List',
      tasks: [],
      view: 'All'
    };
  },

  // Update the view state
  displaySubset: function(event) {
    this.setState({
      view: event.target.value
    })
  },

  // Find the index of the task we are editing (tasks are stored in a list)
  findIndexById: function(list, obj) {
    for (var i = 0; i < list.length; i++) {
      if (list[i]._id ==  obj._id) {
        return i
      }
    }
    return -1;
  },


 // Toggle the status of the task
  changeStatusHandler: function(data) {
    var temp = this.state.tasks;
    var newView;
    
    var i = this.findIndexById(temp, data);
    if (temp[i].view == "Active") {
      newView = "Completed";
    } else {
      newView = "Active";
    }
    temp[i].view = newView;

    this.setState({
      tasks: temp
    });
  },

  // Add the new task to the task list
  newTaskHandler: function(data) {
    var temp = this.state.tasks;

    // Add the new task to the front of the array of tasks
    temp.unshift(data.data);

    // Update the task list
    this.setState({
      tasks: temp
    });
  },

  // Remove the desired task
  deleteTaskHandler: function(data) {
    var temp = this.state.tasks;
    var i = this.findIndexById(temp, data.data);
    temp.splice(i, 1);
    this.setState({
      tasks: temp
    });
  },

  // Edit an existing task
  editTextHandler: function(data) {
    var temp = this.state.tasks;
    var newStatus;
    var i = this.findIndexById(temp, data);
    temp[i] = data;

    this.setState({
      tasks: temp
    });

    console.log(this.state.tasks)
   },


  componentDidMount: function() {
    $.ajax({
              url: '/home',
              dataType: 'json',
              cache: false,
              type: 'GET',
              success: function(data) {
                  this.setState({
                      tasks: data.todos
                  });
              }.bind(this),
              failure: function(xhr, status, err) {
                  console.error('GET /home', status, err.toString());
              }.bind(this)
          });
  },

  render: function() {
    return (
     <div>
        <h1> {this.state.h1Text}: Showing {this.state.view} Tasks </h1>

        <input type="button" value="All" onClick={this.displaySubset}/>
        <input type="button" value="Active" onClick={this.displaySubset}/>
        <input type="button" value="Completed" onClick={this.displaySubset}/>

        <ListOfTasks tasks={this.state.tasks} 
		     view={this.state.view} 
		     delete={this.deleteTaskHandler}
         	     update={this.changeStatusHandler} 
		     edit={this.editTextHandler}
	/>

        <AddTask add={this.newTaskHandler}/>
      </div>
    );
  }
});


// List out and edit the tasks
var ListOfTasks = React.createClass({
   getInitialState: function() {
    return {
      newTask: ''
    };
  },

 // Update the state of the task
  updateView: function(event) {
    event.preventDefault();
    var updatedView;

    // If the state is currently acitve, change it to completed
    if (event.target.value == "Active") {
      updatedView = "Completed";
    } 
    // If the state was not active, then it was completed so change to active
    else {
      updatedView = "Active";
    }

    event.target.value = updatedView

    // Encapsulate the info inside of form data
    var formData = {
      id: (event.target.id).slice(1),
      view: updatedView
    }
    $.post('/status', formData).done(this.props.update);
  },

  // Edit the task
  editTask: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    $target.parent().find('form').show();
  },

  // Submit the edit to the task
  submitEdit: function(event) {
    event.preventDefault();
    var $target = $(event.target);

    var formData = {
      id: $target.parent().attr('id').slice(1),
      task: $target.find('[name=edit-text]').val()
    };

    $target.hide();
    $.post('/edit', formData)
      .done(this.props.edit)
  },

  // Remove the task
  removeTask: function(event) {
    event.preventDefault();
    var formData = {
      id: (event.target.id).slice(1)
    }

    $.post('/remove', formData)
      .done(this.props.delete)
  },

  // Final render function
  render: function() {
    var changeView = this.updateView;
    var removeTask = this.removeTask;
    var editTask = this.editTask;
    var submitEdit = this.submitEdit;
    var updateTextField = this.updateTextField;
    var view = this.props.view;

    // For every list item, show the task (and editing buttons) if it passes the current filter
    var listItems = this.props.tasks.map(function(task) {
      if (view == 'All') {
        return (
	  <li key={task._id} id={'t' + task._id}>
              <input type="button" className="status-button" value={task.view} id={'s' + task._id} onClick={changeView}/>
              <div onDoubleClick={editTask}>{task.task}</div>
                  <form onSubmit={submitEdit} className="edit" style={{display:'none'}}>
                      <input type="text" name="edit-text"/>
                      <input type="submit" value="edit"/>'
                  </form>
              <input type="button" className="delete-button" value="delete" id={'d' + task._id} onClick={removeTask}/>
          </li>
         )
      } else {
        if (view == task.view) {
          return (
	    <li key={task._id} id={'t' + task._id}>
               <input type="button" className="status-button" value={task.view} id={'s' + task._id} onClick={changeView}/>
               <div onDoubleClick={editTask}>{task.task}</div>
                   <form onSubmit={submitEdit} className="edit" style={{display:'none'}}>
                      <input type="text" name="edit-text"/>
                      <input type="submit" value="edit"/>'
                   </form>
               <input type="button" className="delete-button" value="delete" id={'d' + task._id} onClick={removeTask} />
            </li>
          )
        }
      }
    });

    return (
	<div>
            <ul>
              {listItems}
            </ul>
	</div>
    );
  }
});

// Add a new task to the list
var AddTask = React.createClass({
  // Start state, no task defined
  getInitialState: function() {
    return {
      newTask: ''
    };
  },

  // Update the state of the task
  updateNewTask: function(event){
    this.setState({
      newTask: event.target.value
    });
  },

  // Create the new task
  newTask: function(event) {
    event.preventDefault();

    // Time in which the task was created
    var time = new Date();

    // Encapsulate the information
    var formData = {
      task: this.state.newTask,
      time: time.getTime()
    }

    // New task does not have information yet
    this.setState({
      newTask: ''
    })

    $.post("/add", formData).done(this.props.add);
  }, 


  render: function(){
    // Form to collect info for the new task
    return (
      <div>
        <form onSubmit={this.newTask}>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.updateNewTask}
          />
          <input
            type="submit"
            name="new-task-submit"
          />
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
