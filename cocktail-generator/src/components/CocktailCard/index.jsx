
function CocktailCard({ cocktail, onClick }) {
  return (
    <div className="cocktail-card" onClick={() => onClick(cocktail.idDrink)}>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>{cocktail.strDrink}</h3>
    </div>
  )
}

export default CocktailCard
