var $form = $("#new-ingredient-form");

/******************************************************************************* INGREDIENT *********************************************************************/
/************************ ADDING A NEW INGREDIENT ****************************/
// When the new ingredient form is submitted, we will add a new ingredient to the database
$form.submit(function(event) {
  event.preventDefault();

  // Extract the ingredient information from the user input
  var name = $form.find("[name='name']").val();
  var price = $form.find("[price='price']").val();

  // Populate the object with the data we found
  var formData = {
    name: name,
    price: price
  };

  // Send out the post request for this new ingredient
  $.post("addIngredient", formData)
    .done(onSuccess)
    .error(onError);
});


// If the form submission was successful, we will show this by adding the new ingredient to the list
var onSuccess = function(data, status) {
      // Making a clone of the ingredient model
      var div = $('div').first().clone();
      div.attr('id',data._id);
      div.children()[0].value = data.name;
      div.children()[1].value = data.price.toString();
      div.children()[2].id = data._id;
      div.children()[4].id = data._id;
   
      // Add the data to the inventory list
      $('#ingredient-list').append(div);
}

// If there is an error, we will report it to the console
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};



/************************ MARKING AS OUT OF STOCK ****************************/
// When the out of stock button is pressed, we will update the ingredient in the  database
$(".form-stock").submit(function(event){
  event.preventDefault();
  var div = $(this).parent();

  // Populate the object with the data we found
  var formData = {
    id: div.attr('id'),
  };

  // No longer show the ingredient on the ingredients list
  div.hide();  

  $.post('outOfStock',formData)
	.done(function(data){})
	.error(onError);
})


/************************ EDITING AN EXISTING INGREDIENT ****************************/
$(".form-edit").submit(function(event){
  event.preventDefault();
  var div = $(this).parent();
  var newName = div.children()[0].value;
  var newPrice = parseInt(div.children()[1].value);
  var id = div.attr('id');

  // Populate the object with the data we found
  var formData = {
    name: newName,
    price: newPrice,
    id: id
  };

  $.post('editIngredient',formData)
	.done(onSuccessEdit)
	.error(onError);
})

// If the form submission was successful, we will show this by editing the ingredient in the database
var onSuccessEdit = function(data, status) {
      var div = $(this).parent();
      div.children()[0].value = data.name;
      div.children()[1].value = data.price.toString();
}




/******************************************************************************* ORDER *********************************************************************/
// If the checkbox is checked, the total will be updated to include the cost of the ingredient 
$(".checkbox").change(function(event){
  event.preventDefault();
  
  // Want to see if the ingredient has been checked off or not
  var id = $(this).attr('id');
  var check = this.checked;

  // Toggling the checkbox means the ingredient has been selected, so add price to the total
  $.post('checkbox',{
    id:id,
    state:check
  }).done(function(ingredient){
    $('#total').text('Total: $' + ingredient.total)
  })
})


// When the order form is submitted, add the order to the database
$('#addOrder').submit(function(event){
  event.preventDefault();

  // $('.checkbox') will extract all checkboxes
  var check = $('.checkbox');
  var checkedIngredients = '';

  // For each ingredient, we need to see if it was checked off in the form
  for (i=0;i<check.length;i++){
    if (check[i].checked){
      // If it was checked off, add the ingredient to the order
      checkedIngredients = checkedIngredients+check[i].name+ ' ';
    }
  }

  // Now that we have the ingredients, we will add the new order to the server page
  // Call the addNewOrder function in getOrder.js with the desired ingredients
  $.post('addNewOrder',{ingredients:checkedIngredients})
   .done(function(){
		// Confirmation message for the user
    		$('#submitMessage').text('Order submitted.')

		// Uncheck the ingredients on the form (reset)
    		for (i=0;i<checkedIngredients.length;i++){
      			checkedIngredients[i].checked = false;
    		}
  	})
})


// Removing a completed order from the database (and list)
$('.completeOrderForm').submit(function(event){
  event.preventDefault();

  // Find the id of the button that was pressed
  var button = $(this).attr('id');

  // Get the order out of the div
  var div = $(this).parent();

  // Hide the order from the page
  div.hide();

  // Remove the order from the database via the completeOrder function
  $.post('completeOrder', {
    id: button
  });
})
