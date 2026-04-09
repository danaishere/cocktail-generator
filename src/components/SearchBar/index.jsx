import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')


  function handleSubmit(e) {
    e.preventDefault()
    onSearch(input)
  }

  return (

    <form className="search-bar" onSubmit={handleSubmit}>
  <label>List your ingredient(s), separating each with a comma</label>
  <div className="search-input-row">
    <input
      type="text"
      placeholder="e.g., Vodka, mint, orange"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <button type="submit" disabled={loading}>
      Generate
    </button>
  </div>
</form>
  )
}

export default SearchBar
