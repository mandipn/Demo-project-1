import { drawChart } from "./chart.js";
import { deleteDataFromLocalStorage, getDataFromLocalStorage } from "./storage.js";

$("document").ready(function () {
    // hide element that displays error message
    $("#no-data").addClass("d-none")

    let recipeData = getDataFromLocalStorage("recipe")

    showIngredientsAndImage(recipeData)
    showNutritionInfo(recipeData.recipe)


    function showIngredientsAndImage({ mealName, mealThumbUrl, recipe }) {
        $("#meal-title").text(mealName)

        for (let ingr of recipe) {
            let elem = $("<p>").addClass("p-2 ml-2").text((ingr))
            $("#ingredients").append(elem)
        }

        let image = $("<img/>").addClass("img-fluid").attr({ src: mealThumbUrl, width: "100%" })
        $("#meal-image").append(image)
    }


    
    function showNutritionInfo(recipe) {
        
        //Once response meal data is returned
        let nutrionURL = "https://api.edamam.com/api/nutrition-details?app_id=00b98447&app_key=a1e10979029b93cd4d943e72454c337f"
        $.ajax({
            url: nutrionURL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ ingr: recipe }),
            dataType: "json"
        }).then(function (response) {
            let nutrients = response.totalNutrients

            let nutritionInfo = {
                Calories: response.calories,
                Fat: [nutrients.FAT.quantity, nutrients.FAT.unit],
                Protein: [nutrients.PROCNT.quantity, nutrients.PROCNT.unit],
                Carbohydrates: [nutrients.CHOCDF.quantity, nutrients.CHOCDF.unit]
            }

            populateNutritients(nutritionInfo)
            drawChart(nutritionInfo)

        }).catch(function (error) {
            deleteDataFromLocalStorage("recipe")
            // hide nutrients title
            $("#nutrients-title").addClass("d-none")
            // show error message
            $("#no-data").removeClass("d-none")
            $("#no-data").text("No nutrition data found! Some ingredients not in database.")
        })
    }
    
    function populateNutritients(nutritionInfo) {
        let card = createNutritionInfoCard(nutritionInfo)
        $(".nutrients-table").append(card)
    }
    
    
    function createNutritionInfoCard(nutritionInfo) {
        let card = $("<div>").addClass("card ").css({ "width": "18rem" })
        let table = $("<table>").addClass("table")
        let tableBody = $("<tbody>")
        
        for (let [label, data] of Object.entries(nutritionInfo)) {
            tableBody.append(createTableRow(label, data))
        }
        
        return card.append(table.append(tableBody))
    }
    
    function createTableRow(label, data) {
        console.log(data)
        let rowData;
        if (Array.isArray(data)) {
            rowData = "<th>" + label + "</th>" + "<td>" + Number(data[0]).toFixed(1) + data[1] + "</td>"
        } else {
            // This handles the calories information because "data" is not array in that case
            rowData = "<th>" + label + "</th>" + "<td>" + data + "</td>"
        }
        return $("<tr>").append(rowData)
    }
})


