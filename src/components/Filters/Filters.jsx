import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { FILTERS, FILTER_QUERY_NAME } from './constants'
import FiltersStyles from './Filters.module.css'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterType, isActive) => {
    // console.log({ filterType, isActive })
    if (!isActive) searchParams.delete(FILTER_QUERY_NAME)
    else searchParams.set(FILTER_QUERY_NAME, filterType)
    setSearchParams(searchParams)
  }

  return (
    <>
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.type}
          clickFilterHandler={clickFilterHandler}
          filterName={filter.name}
          filterType={filter.type}
        />
      ))}
    </>
  )
}

export function FilterItem({ filterName, filterType, clickFilterHandler }) {
  const [searchParams] = useSearchParams()

  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)
  const isActive = currentFilterNameFromQuery === filterType

  return (
    <button
      type="button"
      className={filterType === currentFilterNameFromQuery
        ? classNames(FiltersStyles.active, 'btn')
        : 'btn'}
      onClick={() => clickFilterHandler(filterType, !isActive)}
    >
      {filterName}
    </button>
  )
}
