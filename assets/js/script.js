import { storeDataToLocalStorage } from "./storage.js";

$(document).ready(function () {

    //First click shows the different meals

    $(".flags a").click(function (event) {
        event.preventDefault();

        let nationality = event.target.title;
        // First API call, returns all the meals from the selected nation
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + nationality,
            method: "GET"
        }).then(function (response) {
            let data = {
                nationality: nationality,
                data: response.meals
            }

            //store meals data to be accessed later on another page
            storeDataToLocalStorage("meals", data)
            //open meals page
            window.location.href = "../../meals.html"

        })

    })

})
