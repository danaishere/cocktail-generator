import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')


  function handleSubmit(e) {
    e.preventDefault()
    onSearch(input)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="List your ingredient(s), separating each with a comma (e.g., Vodka, mint, orange"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {}
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Generate'}
      </button>
    </form>
  )
}

export default SearchBar
