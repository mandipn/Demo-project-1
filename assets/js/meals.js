import { getDataFromLocalStorage, storeDataToLocalStorage } from "./storage.js"

$("document").ready(function () {

    // Load all the meals once the page is loaded
    // First get them meals that were added from the local storage 
    // and then populate the page

    let mealsData = getDataFromLocalStorage("meals")
    showMeals(mealsData)

    function showMeals({ nationality, data }) {
        $("#meal-origin").text(nationality + " Food")
        populateMeals(data)
    }

    function populateMeals(meals) {

        for (let meal of meals) {
            let card = createMealCard(meal)
            $("#meals").append(card)
        }
    }

    function createMealCard(meal) {
        let card = $("<div>").addClass("card h-100").css({ "width": "15rem" })
        let cardImg = $("<img/>").addClass("card-img-top").attr("src", meal.strMealThumb)
        let cardBody = $("<div>").addClass("card-body d-flex flex-column")
        let cardTitle = $("<h5>").addClass("card-title").text(meal.strMeal)
        let button = createButton(meal)

        cardBody.append(cardTitle, button)
        card.append(cardImg, cardBody)

        return $("<div>").addClass("col-auto mb-3").append(card)
    }

    function createButton(meal) {
        let button = $("<button>").attr("type", "button").addClass("btn btn-meal mt-auto")
        button.text("See details").val(meal.idMeal)

        button.click(function (event) {
            event.preventDefault()

            let idMeal = event.target.value
            let mealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal

            $.ajax({
                url: mealUrl,
                type: "GET"
            }).then(function (response) {
                let meal = response.meals[0]
                let measures = extractMealData(meal, "measures")
                let ingredients = extractMealData(meal, "ingredients")

                return {
                    mealName: meal.strMeal,
                    mealThumbUrl: meal.strMealThumb,
                    recipe: makeRecipe(cleanData(measures), cleanData(ingredients))
                }

            }).then(function (data) {
                // store recipe in local storage to be used in the later on another page
                storeDataToLocalStorage("recipe", data)
                // open nutrition html page
                window.location.href = "../../nutrition.html"
            })
        })

        return button
    }

    // Extract Measures and Ingredients data from meal object
    function extractMealData(meal, item) {
        let data = []
        let startStr = getStartString(item)

        for (let [key, value] of Object.entries(meal)) {
            if (key.startsWith(startStr)) {
                data.push(value)
            }
        }

        return data
    }

    function getStartString(item) {
        let startStrings = {
            measures: "strMeasure",
            ingredients: "strIngredient"
        }

        return startStrings[item]
    }

    // clean extracted data
    function cleanData(data) {
        return data.filter(item => item !== null)
            .filter(item => item !== "")
            .filter(item => item !== " ")
            .map(item => item.trim())
    }

    // making recipe from both ingredients and their measures
    function makeRecipe(measures, ingredients) {
        let recipe = []
        measures.forEach(function (measure, i) {
            recipe.push(measure + " " + ingredients[i])
        });

        return recipe
    }

})
