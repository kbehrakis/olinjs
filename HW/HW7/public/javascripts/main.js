var $newTwoteForm = $('#new-twote-form');
var $twoteWall = $('#twote-wall');

var onError = function(data, status) {
	console.log("status", status);
	console.log("error", data);
	console.log('response',data.responseText);
};

var onSuccessNewTweet = function(data, status) {
	// Show the new twote
	var compiledTemplate = Handlebars.templates['twoteTemplate.hbs'];
	$twoteWall.prepend(compiledTemplate(data));
};

var onSuccessDeleteTweet = function(data, status) {
	// Delete the twote from the display
	$('#'+data._id).remove();
};

$newTwoteForm.submit(function(event) {
	event.preventDefault()
	var text = $newTwoteForm.find("[name='text']").val();
	$.post("newTwote", {
		twoteText: text
	})
		.done(onSuccessNewTweet)
		.error(onError);
});

$twoteWall.on('click', '.delete-twote-btn', function() {
	var twoteID = $(this).closest("div").attr('id');
	console.log(twoteID);
	$.post('delTwote', {
		id: twoteID
	})
		.done(onSuccessDeleteTweet)
		.error(onError);
})

$('.user-btn').click(function() {
	var userID = $(this).attr('id');
	var $thisUsersTwotes = $('div.well[data-creator-id="'+userID+'"]');
	if ($(this).siblings().prop('checked')) {
		// Revert back to previous color
		$thisUsersTwotes.css("background-color", "#f5f5f5")
	} else {
		// Highlight this user's twotes
		$thisUsersTwotes.css("background-color", "#d9edf7")
	}
});


$('.button-checkbox').each(function () {

    // Settings
    var $widget = $(this),
        $button = $widget.find('button'),
        $checkbox = $widget.find('input:checkbox'),
        color = $button.data('color'),
        settings = {
            on: {
                icon: 'glyphicon glyphicon-check'
            },
            off: {
                icon: 'glyphicon glyphicon-unchecked'
            }
        };

    // Event Handlers
    $button.on('click', function () {
        $checkbox.prop('checked', !$checkbox.is(':checked'));
        $checkbox.triggerHandler('change');
        updateDisplay();
    });
    $checkbox.on('change', function () {
        updateDisplay();
    });

    // Actions
    function updateDisplay() {
        var isChecked = $checkbox.is(':checked');

        // Set the button's state
        $button.data('state', (isChecked) ? "on" : "off");

        // Set the button's icon
        $button.find('.state-icon')
            .removeClass()
            .addClass('state-icon ' + settings[$button.data('state')].icon);

        // Update the button's color
        if (isChecked) {
            $button
                .removeClass('btn-default')
                .addClass('btn-' + color + ' active');
        }
        else {
            $button
                .removeClass('btn-' + color + ' active')
                .addClass('btn-default');
        }
    }

    // Initialization
    function init() {

        updateDisplay();

        // Inject the icon if applicable
        if ($button.find('.state-icon').length == 0) {
            $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
        }
    }
    init();
});
