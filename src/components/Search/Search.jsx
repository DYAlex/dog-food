import SearchStyles from './Search.module.css'

function Search() {
  return (
    <div className={SearchStyles.Search}>
      <input type="search" name="q" placeholder="Искать..." className={SearchStyles.Search_Field} />
    </div>
  )
}

export default Search
