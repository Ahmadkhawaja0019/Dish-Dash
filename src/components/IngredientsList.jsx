export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>
            {ingredient}
            <button
                className="remove-btn"
                aria-label={`Remove ${ingredient}`}
                onClick={() => props.removeIngredient(ingredient)}>
                    <i className="fa-solid fa-circle-minus"></i>
                    Remove
            </button>
        </li>
    ))
    return (
        <section className="get-recipe-container-wrapper">
            <h2>Ingredients on hand: </h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && 
                <div className="get-recipe-container">
                    <div ref = {props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <div className="recipe-buttons-container">
                        <button
                            id="get-recipe-btn"
                            onClick={props.getRecipe}
                            style={{display: props.recipe ? 'none' : 'inline-block'}}
                        >
                            Get a recipe
                        </button>
                        <button
                            id="get-new-recipe-btn"
                            onClick={props.clearOldRecipe}
                            style={{display: props.recipe ? 'inline-block' : 'none'}}
                        >
                            Get new recipe
                        </button>
                    </div>
                </div>
            }
        </section>
    )
}