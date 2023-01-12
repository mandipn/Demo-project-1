import { showMeals } from "./meals.js"

$(document).ready(function () {

    //Make sure the all th other section but the welcome section are hidden from view
    showWelcomeSection()

    // Return to home page when logo is clicked
    $(".navbar-brand").click(function (event) {
        event.preventDefault()
        window.location.href = window.location.href
        showWelcomeSection()
    })

    //First click shows the different meals

    $(".flags a").click(function (event) {
        event.preventDefault();

        let nationality = event.target.title;
        // First API call, returns all the meals from the inputted nation
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + nationality,
            method: "GET"
        }).then(showMeals)
    })


    // hides all the other section but the welcome section
    function showWelcomeSection() {
        $(".welcome").show()
        $(".meals").hide()
        $(".nutrition").hide()
    }
})
