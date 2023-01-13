export function drawChart(nutritionData) {
	let { Calories, Fat, Protein, Carbs } = computePercentages(nutritionData)

	var options = {
		title: {
			text: "Calories - " + Calories,
			fontWeight: "lighter",
			margin: 2,
		},
		// width: 600,
		height: 400,
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
				{ y: Fat, label: "Fat" },
				{ y: Carbs, label: "Carbohydrates" },
				{ y: Protein, label: "Protein" },
			]
		}]
	};

	$(".chart").CanvasJSChart(options);

}

function computePercentages({ Calories, Fat, Protein, Carbohydrates }) {
	let fatValue = Fat[0]
	let proteinValue = Protein[0]
	let carbsValue = Carbohydrates[0]
	let totalNutrients = fatValue + proteinValue + carbsValue

	return {
		Calories: Calories,
		Fat: Number((fatValue / totalNutrients) * 100).toFixed(1),
		Protein: Number((proteinValue / totalNutrients) * 100).toFixed(1),
		Carbs: Number((carbsValue / totalNutrients) * 100).toFixed(1)
	}
}
