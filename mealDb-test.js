var ingredients = $("#ingredientList");
var nation = "japanese";
var nationInput = $("#nationality");
var submit = $("#submit");
var space = "%20";

submit.on("click", function (event) {
  event.preventDefault();
  nation = nationInput.val();
  console.log(nation);

  // First API call, returns all the meals from the inputted nation

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + nation,
    method: "GET",
    success: mealId, // success calls the mealId function so we can use the data outside of the function
  });

  // Function first logs the list of dishes then makes a second ajax call

  function mealId(data) {
    console.log(data);
    result = data.meals[0].idMeal; // sets the variable containg the meal Id

    // second ajax call takes the result variable and uses it to find the ingredients of the dish then logs the result
    // I've concatenated the ingredient measures and the ingredients and logged the result

    $.ajax({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + result,
    }).then(function (response) {
      console.log(response);
      console.log(
        response.meals[0].strMeasure1 + " " + response.meals[0].strIngredient1
      );
      console.log(
        response.meals[0].strMeasure2 + " " + response.meals[0].strIngredient2
      );
      console.log(
        response.meals[0].strMeasure3 + " " + response.meals[0].strIngredient3
      );
      console.log(
        response.meals[0].strMeasure4 + " " + response.meals[0].strIngredient4
      );
      console.log(
        response.meals[0].strMeasure5 + " " + response.meals[0].strIngredient5
      );
      console.log(
        response.meals[0].strMeasure6 + " " + response.meals[0].strIngredient6
      );
      console.log(
        response.meals[0].strMeasure7 + " " + response.meals[0].strIngredient7
      );
      console.log(
        response.meals[0].strMeasure8 + " " + response.meals[0].strIngredient8
      );
      console.log(
        response.meals[0].strMeasure9 + " " + response.meals[0].strIngredient9
      );
      console.log(
        response.meals[0].strMeasure10 + " " + response.meals[0].strIngredient10
      );
      console.log(
        response.meals[0].strMeasure11 + " " + response.meals[0].strIngredient11
      );
      console.log(
        response.meals[0].strMeasure12 + " " + response.meals[0].strIngredient12
      );
      console.log(
        response.meals[0].strMeasure13 + " " + response.meals[0].strIngredient13
      );
      console.log(
        response.meals[0].strMeasure14 + " " + response.meals[0].strIngredient14
      );
      console.log(
        response.meals[0].strMeasure15 + " " + response.meals[0].strIngredient15
      );
      console.log(
        response.meals[0].strMeasure16 + " " + response.meals[0].strIngredient16
      );
      console.log(
        response.meals[0].strMeasure17 + " " + response.meals[0].strIngredient17
      );

      // Appending data to the document

      ingredients.empty();

      ingredients.append("<h2>" + response.meals[0].strMeal + "</h2>");
      ingredients.append(
        $("<img>", {
          id: "foodImg",
          src: response.meals[0].strMealThumb,
          width: "50%",
        })
      );
      ingredients.append(
        "<h3>" +
          "Ingredients: " +
          "</h3>" +
          "<p>" +
          response.meals[0].strMeasure1 +
          " - " +
          response.meals[0].strIngredient1 +
          "<br>" +
          response.meals[0].strMeasure2 +
          " - " +
          response.meals[0].strIngredient2 +
          "<br>" +
          response.meals[0].strMeasure3 +
          " - " +
          response.meals[0].strIngredient3 +
          "<br>" +
          response.meals[0].strMeasure4 +
          " - " +
          response.meals[0].strIngredient4 +
          "<br>" +
          response.meals[0].strMeasure5 +
          " - " +
          response.meals[0].strIngredient5 +
          "<br>" +
          response.meals[0].strMeasure6 +
          " - " +
          response.meals[0].strIngredient6 +
          "<br>" +
          response.meals[0].strMeasure7 +
          " - " +
          response.meals[0].strIngredient7 +
          "<br>" +
          response.meals[0].strMeasure8 +
          " - " +
          response.meals[0].strIngredient8 +
          "<br>" +
          response.meals[0].strMeasure9 +
          " - " +
          response.meals[0].strIngredient9 +
          "<br>" +
          response.meals[0].strMeasure10 +
          " - " +
          response.meals[0].strIngredient10 +
          "<br>" +
          response.meals[0].strMeasure11 +
          " - " +
          response.meals[0].strIngredient11 +
          "<br>" +
          response.meals[0].strMeasure12 +
          " - " +
          response.meals[0].strIngredient12 +
          "<br>" +
          response.meals[0].strMeasure13 +
          " - " +
          response.meals[0].strIngredient13 +
          "<br>" +
          response.meals[0].strMeasure14 +
          " - " +
          response.meals[0].strIngredient14 +
          "<br>" +
          response.meals[0].strMeasure15 +
          " - " +
          response.meals[0].strIngredient15 +
          "<br>" +
          response.meals[0].strMeasure16 +
          " - " +
          response.meals[0].strIngredient16 +
          "<br>" +
          response.meals[0].strMeasure17 +
          " - " +
          response.meals[0].strIngredient17 +
          "<br>" +
          response.meals[0].strMeasure18 +
          " - " +
          response.meals[0].strIngredient18 +
          "<br>" +
          response.meals[0].strMeasure19 +
          " - " +
          response.meals[0].strIngredient19 +
          "<br>" +
          response.meals[0].strMeasure20 +
          " - " +
          response.meals[0].strIngredient20 +
          "</p>"
      );

      // turning the ingredients into a string with %20 and %2c for spaces
      var urlString =
        response.meals[0].strMeasure1.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient1.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure2.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient2.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure3.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient3.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure4.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient4.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure5.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient5.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure6.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient6.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure7.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient7.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure8.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient8.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure9.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient9.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure10.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient10.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure11.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient11.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure12.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient12.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure13.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient13.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure14.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient14.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure15.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient15.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure16.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient16.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure17.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient17.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure18.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient18.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure19.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient19.replace(/\s/g, space) +
        space +
        response.meals[0].strMeasure20.replace(/\s/g, space) +
        space +
        response.meals[0].strIngredient20.replace(/\s/g, space);

      console.log(urlString);

      $.ajax({
        url:
          "https://api.edamam.com/api/nutrition-data?app_id=00b98447&app_key=a1e10979029b93cd4d943e72454c337f&nutrition-type=cooking&ingr=" +
          urlString,
        method: "GET",
      }).then(function (response) {
        console.log(response);
      });
    });
  }
});
