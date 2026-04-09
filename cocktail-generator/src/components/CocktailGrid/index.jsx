import CocktailCard from '../CocktailCard'


function CocktailGrid({ cocktails, ingredient, error, loading, onCardClick }) {

  if (loading) {
    return <p className="status-message">Loading cocktails...</p>
  }

  if (error) {
    return <p className="status-message">{error}</p>
  }

  return (
    <section className="cocktail-grid-section">
      <h2>Cocktails with <span>{ingredient}</span></h2>
      {}
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <CocktailCard
            key={cocktail.idDrink}
            cocktail={cocktail}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  )
}

export default CocktailGrid
