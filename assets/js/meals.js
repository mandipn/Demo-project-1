import { showNutritionInfo } from "./nutrition.js"


function getStartString(item) {
    let startStrings = {
        measures: "strMeasure",
        ingredients: "strIngredient"
    }

    return startStrings[item]
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

// cleaning data
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

export function showMeals(response) {
    // hides flag section after click
    $(".welcome").hide();
    // unhide meal card container
    $(".meals").show();

    // populating meal cards
    populateMealsSection(response.meals)
}

function populateMealsSection(meals) {
    for (let meal of meals) {
        let card = createMealCard(meal)
        $("#meals").append(card)
    }
}

function createMealCard(meal) {
    let card = $("<div>").addClass("card h-100").css({ "width": "15rem" })
    let cardImg = $("<img/>").addClass("card-img-top").attr("src", meal.strMealThumb)
    let cardBody = $("<div>").addClass("card-body")
    let cardTitle = $("<h5>").addClass("card-title h-50").text(meal.strMeal)
    let button = createButton(meal)

    cardBody.append(cardTitle, button)
    card.append(cardImg, cardBody)

    return $("<div>").addClass("col-auto mb-3").append(card)
}

function createButton(meal) {
    let button = $("<button>").attr("type", "button").addClass("btn btn-primary")
    button.text("See details").val(meal.idMeal)

    button.click(function (event) {
        event.preventDefault()

        let idMeal = event.target.value
        let mealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal

        $.ajax({
            url: mealUrl,
            type: "GET"
        }).then(showIngredients)
            .then(showNutritionInfo)
    })

    return button
}

function showIngredients(response) {
    // hide meals section
    $(".meals").hide()
    // unhide nutrition page
    $(".nutrition").show()

    let meal = response.meals[0]

    let measures = extractMealData(meal, "measures")
    let ingredients = extractMealData(meal, "ingredients")

    let cleanMeasures = cleanData(measures)
    let cleanIngredients = cleanData(ingredients)

    populateMealIngredients(meal, cleanMeasures, cleanIngredients)

    return makeRecipe(cleanMeasures, cleanIngredients)
}


function populateMealIngredients(meal, measures, ingredients) {
    $("#meal-title").text(meal.strMeal)
    $(".nutrition img").attr("src", meal.strMealThumb)

    let listContainer = $("<ul>")
    for (let i = 0; i < measures.length; i++) {
        listContainer.append("<li>" + measures[i] + " " + ingredients[i] + "</li>")
    }

    $("#ingredients").append(listContainer)
}