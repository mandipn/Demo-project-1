import { deleteNutritionData, storeNutritionData } from "./storage.js";

function populateNutritionSection(nutritionInfo) {
    let card = createNutritionInfoCard(nutritionInfo)
    $("#nav-table").append(card)
}

function createTableRow(label, data) {
    let rowData;
    if (Array.isArray(data)) {
        rowData = "<th>" + label + "</th>" + "<td>" + Number(data[0]).toFixed(1) + data[1] + "</td>"
    } else {
        // This handles the calories information because "data" is not array in that case
        rowData = "<th>" + label + "</th>" + "<td>" + data + "</td>"
    }
    return $("<tr>").append(rowData)
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


export function showNutritionInfo(recipe) {

    //Once response meal data is returned
    let nutrionURL = "https://api.edamam.com/api/nutrition-details?app_id=f3b7b416&app_key=358ad720d1d46c08d10a824014ddeba0"
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
            FAT: [nutrients.FAT.quantity, nutrients.FAT.unit],
            Protein: [nutrients.PROCNT.quantity, nutrients.PROCNT.unit],
            Carbohydrates: [nutrients.CHOCDF.quantity, nutrients.CHOCDF.unit]
        }

        storeNutritionData(nutritionInfo)
        populateNutritionSection(nutritionInfo)

    }).catch(function (error) {
        deleteNutritionData()
        $("#nav-table").append("<p> Failed to retrieve nutrition data </p>")
    })

}
