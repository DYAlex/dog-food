import SearchStyles from './Search.module.css'

function Search() {
  return (
    <input type="search" name="q" placeholder="Искать..." className={SearchStyles.Search_Field} />
  )
}

export default Search
