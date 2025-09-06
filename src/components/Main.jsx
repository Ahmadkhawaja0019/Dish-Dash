import React from "react"
import IngredientsList from "./IngredientsList"
import LoadingSvg from "/loading.svg"
import DishDashRecipe from "./DishDashRecipe"
import { getRecipeFromMistral } from "/src/ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const recipeSection = React.useRef(null)
    React.useEffect(() => {
        if (loading && recipeSection.current !== null) {
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY;
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            });
        }
    }, [loading]);

    async function getRecipe() {
        setLoading(true)
        setRecipe("")
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
        setLoading(false)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients =>
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        )
    }

    function clearOldRecipe() {
        setIngredients([]);
        setRecipe("");
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>
            <p className="instruction-text">Please add four or more ingredients to get a recipe.</p>
            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeIngredient={removeIngredient}
                    loading={loading}
                    clearOldRecipe={clearOldRecipe}
                    recipe={recipe}
                />
            }
            {loading && (
                <div className="loading-svg-container">
                    <img src={LoadingSvg} alt="Loading recipe..." />
                </div>
            )}
            {recipe && !loading && <DishDashRecipe recipe={recipe} />}
        </main>
    )
}