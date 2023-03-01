import { useSearchParams } from 'react-router-dom'
import { DangerButton } from '../CommonUI/Buttons/DangerButton'
import { RegularButton } from '../CommonUI/Buttons/RegularButton'
import { FILTERS, FILTER_QUERY_NAME } from './constants'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterType, isActive) => {
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

  if (filterType === currentFilterNameFromQuery) {
    return (
      <DangerButton
        btnName={filterName}
        clickHandler={() => clickFilterHandler(filterType, !isActive)}
      />
    )
  }
  return (
    <RegularButton
      btnName={filterName}
      clickHandler={() => clickFilterHandler(filterType, !isActive)}
    />
  )
}
