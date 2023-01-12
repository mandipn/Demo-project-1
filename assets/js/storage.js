export function getNutritionData() {
    let data = localStorage.getItem("nutritionData")
    if (!data) {
        return null
    }

    let parsedData = JSON.parse(data)
    return {
        Calories: parsedData.Calories,
        FAT: parsedData.FAT[0],
        Protein: parsedData.Protein[0],
        Carbs: parsedData.Carbohydrates[0]
    }
}

export function storeNutritionData(data) {
    localStorage.setItem("nutritionData", JSON.stringify(data))
}

export function deleteNutritionData() {
    localStorage.removeItem("nutritionData")
}