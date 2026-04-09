import { useEffect } from 'react'

function RecipeModal({ cocktail, gif, loading, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const getIngredients = (cocktail) => {
    const ingredients = []
    for (let i = 1; i <= 15; i++) {
      const name = cocktail[`strIngredient${i}`]
      const measure = cocktail[`strMeasure${i}`]
      if (name) {
        ingredients.push({ name, measure: measure?.trim() || 'To taste' })
      }
    }
    return ingredients
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
            <p>Loading recipe...</p>
          </div>
        ) : cocktail ? (
          <div className="modal-layout">
            <div className="modal-details">
              <h1>{cocktail.strDrink}</h1>

              <div className="recipe-meta">
                <span className="tag">{cocktail.strCategory}</span>
                <span className="tag">{cocktail.strAlcoholic}</span>
                <span className="tag">{cocktail.strGlass}</span>
              </div>

              <div className="recipe-img-wrap">
                <img
                  src={`${cocktail.strDrinkThumb}/medium`}
                  alt={cocktail.strDrink}
                />
              </div>

              <h2>Ingredients</h2>
              <ul className="ingredient-list">
                {getIngredients(cocktail).map((ing, i) => (
                  <li key={i}>
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ing.name)}-small.png`}
                      alt={ing.name}
                    />
                    <span>
                      <strong>{ing.measure}</strong> {ing.name}
                    </span>
                  </li>
                ))}
              </ul>

              <h2>Instructions</h2>
              <p className="instructions">{cocktail.strInstructions}</p>

              {gif && (
                <div className="gif-section">
                  <h2>Vibes ✨</h2>
                  <img src={gif} alt={`${cocktail.strDrink} vibe`} className="gif-img" />
                  <p className="gif-credit">Powered by GIPHY</p>
                </div>
              )}

            </div>
          </div>

):null}
      </div>
    </div>
  )
}

export default RecipeModal
