import { getNutritionData } from "./storage.js"

$("#nav-chart-tab").click(function () {
	let nutritionData = getNutritionData()

	if (!nutritionData) {
		$("#nav-chart").empty()
		$("#nav-chart").append("<p> No data to plot</p>")
		return
	}

	let { Calories, FAT, Protein, Carbs } = computePercentage(nutritionData)

	var options = {
		title: {
			text: "Calories - " + Calories,
			fontWeight: "lighter",
			margin: 2,
		},
		width: 350,
		height: 250,
		animationEnabled: true,
		willReadFrequently: true,
		data: [{
			type: "pie",
			startAngle: 40,
			toolTipContent: "<b>{label}</b>: {y}%",
			showInLegend: "true",
			legendText: "{label}",
			indexLabelFontSize: 15,
			indexLabel: "{label} - {y}%",
			dataPoints: [
				{ y: FAT, label: "FAT" },
				{ y: Carbs, label: "Carbs" },
				{ y: Protein, label: "Protein" },
			]
		}]
	};

	$("#nav-chart").CanvasJSChart(options);
})


function computePercentage({ Calories, FAT, Protein, Carbs }) {
	let totalNutrients = FAT + Protein + Carbs

	return {
		Calories: Calories,
		FAT: Number((FAT / totalNutrients) * 100).toFixed(1),
		Protein: Number((Protein / totalNutrients) * 100).toFixed(1),
		Carbs: Number((Carbs / totalNutrients) * 100).toFixed(1)
	}
}
