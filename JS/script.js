var ingredientList = $("#ingredientList");
var nation = "japanese";
var nationInput = $("#submit > img");
var submit = $("#submit");

// This is the event listener for the flags - it's currently using the id of the submit button and logging the title attribute of the flag image

submit.on("click", function (event) {
  event.preventDefault();
  nation = nationInput.attr("title");
  console.log(nation);

  // First API call, returns all the meals from the inputted nation which is currently taken from the title attribute of the flag image

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + nation,
    method: "GET",
    success: mealId, // success calls the mealId function so we can use the data outside of the function
  });

  function mealId(data) {
    console.log(data);
    const idMeals = data.meals.map((meal) => meal.idMeal); // this pushes all the mealIds from the response into an array

    console.log(idMeals);
  }
});



//     // second ajax call takes the result variable and uses it to find the ingredients of the dish then logs the result
//     // I've concatenated the ingredient measures and the ingredients and logged the result

//     $.ajax({
//       method: "GET",
//       url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + result,
//     }).then(function (response) {
//       console.log(response);

//       // Billy's loops

//       let ingredients = [];
//       let measures = [];

//       for (let [key, value] of Object.entries(response.meals[0])) {
//         if (key.startsWith("strIngredient") && value !== "") {
//           ingredients.push(value);
//         }
//         if (key.startsWith("strMeasure") && value !== "") {
//           measures.push(value);
//         }
//       }

//       console.log(ingredients);
//       console.log(measures);

//       let recipes = [];

//       let size = measures.length;

//       for (let i = 0; i < size; i++) {
//         let recipe = measures[i].trim() + " " + ingredients[i];
//         recipes.push(recipe);
//       }

//       console.log(recipes);

//   });
// }
