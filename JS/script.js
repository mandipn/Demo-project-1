var ingredientList = $("#ingredientList");
var nation;
var nationInput = $("img");
var dishes = $("#dishes");

// This is the event listener for the flags
// It's storing the title attribute of the flag in a variable to be used in the first API call
// and logging the title attribute of the flag image

nationInput.on("click", function () {
  var flag = $(this);
  nation = flag.attr("title");
  console.log(flag);

  // First API call, returns all the meals from the clicked nation
  // Success property calls the mealId function so we can use the data in the second API call
  // test comment

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + nation,
    method: "GET",
    success: mealId,
  });

  // This function pushes all the mealIds from the response into an array

  function mealId(data) {
    console.log(data);
    var idMeals = data.meals.map((meal) => meal.idMeal);

    console.log(idMeals);

    // This clears the html section before displaying the dishes

    dishes.empty();

    // This appends a card for each dish from the nation
    // I limited the amount of dishes displayed with the slice method to 12 dishes

    for (var meal of data.meals.slice(0, 12)) {
      dishes.append(
        `<section class="meals">` +
          `<div class="card meal1" style="width: 18rem" data-id="${meal.idMeal}">` +
          `<img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap" />` +
          `<div class="card-body">` +
          ` <h5 class="card-title">${meal.strMeal}</h5>` +
          ` </div>` +
          ` </div>` +
          `</section>`
      );
    }

    // This event listener uses the find method to give us the id data attribute of the clicked card
    // which is the meal id of the dish which we'll use in the second API call

    dishes.find(".card").click(function () {
      var id = $(this).data("id");

      // second API call takes the meal id variable and uses it to find the ingredients of the dish then logs the result

      $.ajax({
        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id,
      }).then(function (response) {
        console.log(response);

        // Billy's loops
        // This for-of loop iterates through the meals in the returned object from the last call
        // It finds all the ingredients and measures and pushes them to new arrays

        let ingredients = [];
        let measures = [];

        for (let [key, value] of Object.entries(response.meals[0])) {
          if (key.startsWith("strIngredient") && value !== "") {
            ingredients.push(value);
          }
          if (key.startsWith("strMeasure") && value !== "") {
            measures.push(value);
          }
        }

        console.log(ingredients);
        console.log(measures);

        // The for loop iterates through the two new arrays,
        // concantenates the results and pushes them to a new array
        // giving us the list of ingredients and measures to be used in the call to the second API

        let recipes = [];

        let size = measures.length;

        for (let i = 0; i < size; i++) {
          let recipe = measures[i].trim() + " " + ingredients[i];
          recipes.push(recipe);
        }

        console.log(recipes);
      });
    });
  }
});
