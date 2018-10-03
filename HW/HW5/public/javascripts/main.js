// Tweet forms
var $tweetTemplate = $("#new-tweet");
var $listTweets = $("#show-tweets");
var $newTweetForm = $("#new-tweet-form");

// Login forms
var $loginForm = $("#login-form");
var $loginButton = $("#log-in").find('[name="login"]');


/******* WEIRD ************/
var $twoteTemplate = $('#twote-template');

// When the new tweet form is submitted, we will add a new tweet to the database
$newTweetForm.submit(function(event) {
  event.preventDefault();

  // Extract the tweet information from the user input
  var content = $newTweetForm.find('[name="content"]').val();
  var time = (new Date).getTime();

  // Populate the object with the data we found
  var formData = {
    text: content,
    time: time
  };

  // Send out the post request for this new ingredient
  $.post("addTweet", formData)
    .done(onSuccess)
    .error(onError);
});


// If the form submission was successful, we will show this by adding the new tweet to the list
var onSuccess = function(data, status) {
      // Making a clone of the tweet model
      var $newTweet = $twoteTemplate.clone();
      $newTweet.show();
      $newTweet.attr('id', data.id);
      $newTweet.find('.tweet-content').text(data.content);
      $newTweet.find('.tweet-username').text(data.username);
      $newTweet.find('[name="delete-tweet"]').click(onDeleteTweet);
      $listTweets.prepend($newTweet);
}

// Helper function for onSuccess - deletes the tweet
var onDeleteTweet = function(data) {
  var $target = $(data.target); // the checkbox
  var twoteId = $target.parent().attr('id'); // the div

  var formData = {
    id: twoteId
  };
  $.post('/delete', formData);
  $target.parent().remove();
}


// If there is an error, we will report it to the console
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


// Extract data from the login process
$loginForm.submit(function(event){
  event.preventDefault();
  var username = $loginForm.find('[name="username"]').val();

  // Populate the object with the data we found
  var formData = {
    username: username
  };

  // Attempt to authenticate the user 
  $.post('/login',formData)
	.done(function(data){
		if (typeof data.redirect == "string") {
    			window.location = data.redirect;
  		}
	      })
	.error(onError);
})

$loginButton.click(function(data){
  $.get('/login', function() {
    console.log("log in");
    window.location = '/login';
  });
})


