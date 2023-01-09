$(document).ready(function () {
    var ingredients = [];
    var recipeStr;
    var mealImage;
    var recipeArray;


    $(".flags a").on("click", function (event) {
        event.preventDefault();

        // Hides flag section after click
        $(".flags").addClass("d-none");

        let nationality = "Japanese";
        // First API call, returns all the meals from the inputted nation
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + nationality,
            method: "GET"
        }).then(function (response) {
            return response.meals[0].idMeal

        }).then(function (idMeal) {

            $.ajax({
                url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal,
                method: "GET"
            }).then(function (response) {
                let meal = response.meals[0]
                mealImage = meal.strMealThumb

                // unhide meal card container
                $(".meals").removeClass("d-none");

                // populating meal card
                $(".card-img-top").attr("src", mealImage)
                $(".card-title").text(meal.strMeal)

                //
                for (let i = 0; i < 20; i++) {
                    ingredients.push("<p>" + meal["strMeasure" + String(i + 1)] + "-" + meal["strIngredient" + String(i + 1)] + "</p>")
                }


                // Adding all meal ingredients with their amounts to recipe array
                let recipe = []
                for (let i = 0; i < 20; i++) {
                    let ingr = meal["strMeasure" + String(i + 1)].trim() + " " + meal["strIngredient" + String(i + 1)]
                    recipe.push(ingr)
                }

                recipeArray = recipe
                recipeStr = recipe.toString()
            })

        })

    })

    $(".card").click(e => {
        e.preventDefault()

        $(".meals").addClass("d-none");

        let nutrionURL = "https://api.edamam.com/api/nutrition-details?app_id=00b98447&app_key=a1e10979029b93cd4d943e72454c337f&nutrition-type=cooking&"
        let ingr = recipeStr
        $.ajax({
            url: nutrionURL,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({title, ingr})
           
        }).then(response => {
            $(".nutrition").removeClass("d-none");
            $(".nutrition img").attr("src", mealImage)
            ingredients.forEach(elem => $("#ingredients").append(elem))
            $("#nutrition-facts").append("<p> Amount: " + response.calories + " calories</p>")
            $("#nutrition-facts").append("<p> Amount: " + response.calories + " Carb</p>")

            console.log(response);
            //
        });

    })



})


