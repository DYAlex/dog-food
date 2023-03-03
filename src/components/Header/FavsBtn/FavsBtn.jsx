import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons/faHeart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getFavoritesSelector } from '../../../redux/slices/favoritesSlice'
import { Counter } from '../../CommonUI/Counter/Counter'
import FavsBtnStyles from './FavsBtn.module.css'

function FavsBtn() {
  const favs = useSelector(getFavoritesSelector)
  const favsLength = Object.keys(favs).length

  return (
    <div className={FavsBtnStyles.container}>
      {favsLength
        ? (
          <>
            <FontAwesomeIcon icon={faHeart} />
            <Counter count={favsLength} />
          </>
        )
        : <FontAwesomeIcon icon={faHeartEmpty} />}
    </div>
  )
}

export default FavsBtn
