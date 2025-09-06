import ReactMarkdown from "react-markdown"

export default function DishDashRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Dish Dash Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}