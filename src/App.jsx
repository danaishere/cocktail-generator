import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import CocktailGrid from './components/CocktailGrid'
import RecipeModal from './components/RecipeModal'
import Footer from './components/Footer'

// API keys 
const DB_KEY = import.meta.env.VITE_COCKTAILDB_KEY || '1'
const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY

function App() {

  const [cocktails, setCocktails] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [selectedCocktail, setSelectedCocktail] = useState(null)

  const [gif, setGif] = useState(null)

  const [loading, setLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Runs when clicks "Generate"
  async function handleSearch(query) {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)
    setIngredient(query)
    setCocktails([])

    //Allow to search multiple keywords separated by commas
    const keywords = query.split(',')

    try {
      const allDrinks = []
      const seen = new Set()

      // Fetch results for each keyword one by one
      for (const keyword of keywords) {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/${DB_KEY}/filter.php?i=${encodeURIComponent(keyword)}`
        )
        const data = await res.json()

        // Add drinks to the list, skipping any dupes
        if (Array.isArray(data.drinks)) {
          for (const drink of data.drinks) {
            if (!seen.has(drink.idDrink)) {
              seen.add(drink.idDrink)
              allDrinks.push(drink)
            }
          }
        }
      }

      // Show an error message if no results were found
      if (allDrinks.length === 0) {
        setError(`No cocktails found with "${query}". Try something else!`)
      } else {
        setCocktails(allDrinks)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }


  async function handleCardClick(id) {
    setModalLoading(true)
    setSelectedCocktail(null)
    setGif(null)

    try {
      // Fetch full recipe details from CocktailDB
      const cocktailRes = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/${DB_KEY}/lookup.php?i=${id}`
      )
      const cocktailData = await cocktailRes.json()
      const cocktail = cocktailData.drinks?.[0]

      if (!cocktail) return

      // Fetch a related GIF from GIPHY using the cocktail name
      const giphyRes = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(cocktail.strDrink)}&limit=1&rating=g`
      )
      const giphyData = await giphyRes.json()
      const gifUrl = giphyData.data?.[0]?.images?.original?.url || null

      setSelectedCocktail(cocktail)
      setGif(gifUrl)
    } catch (err) {
      setError('Could not load recipe. Please try again.')
      console.error(err)
    } finally {
      setModalLoading(false)
    }
  }


  function handleCloseModal() {
    setSelectedCocktail(null)
    setGif(null)
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SearchBar onSearch={handleSearch} loading={loading} />
        { }
        {hasSearched && (
          <CocktailGrid
            cocktails={cocktails}
            ingredient={ingredient}
            error={error}
            loading={loading}
            onCardClick={handleCardClick}
          />
        )}
      </main>
      <Footer />

      { }
      {(selectedCocktail || modalLoading) && (
        <RecipeModal
          cocktail={selectedCocktail}
          gif={gif}
          loading={modalLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}




export default App
