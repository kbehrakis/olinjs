// The form names corresponda to the id given inside of home.handlebars
var $form = $("#new-ingredient-form");


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
