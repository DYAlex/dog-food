/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { changeSearchFilter } from '../../redux/slices/filterSlice'
import SearchStyles from './Search.module.scss'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q')
    return searchValueFromQuery ?? ''
  })
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search, 750)

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <div className={SearchStyles.Search}>
      <input
        type="search"
        name="q"
        value={search}
        onChange={changeSearchHandler}
        placeholder="Искать..."
        className={SearchStyles.Search_Field}
      />
      <span className={SearchStyles.Search_FieldIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </span>
    </div>
  )
}

export default Search
