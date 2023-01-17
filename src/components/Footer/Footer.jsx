import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faVk, faTelegram, faWhatsapp, faInstagram, faViber,
} from '@fortawesome/free-brands-svg-icons'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import logoWithLetters from '../../images/logo-with-letters-black.svg'
import FooterStyles from './Footer.module.css'

function Footer() {
  return (
    <div className={FooterStyles.Footer}>
      <div className={FooterStyles.wr}>
        <div className={FooterStyles.column}>
          <div className={FooterStyles.Logo}>
            <Link
              to="/"
              className={FooterStyles.Link}
            >
              <img
                src={logoWithLetters}
                alt=""
              />
            </Link>
          </div>
          <div className={classNames(FooterStyles.Secondary, FooterStyles.smaller)}>
            &copy; &laquo;Интернет-магазин DogFood.ru&raquo;
          </div>
        </div>
        <div className={FooterStyles.column}>
          <Link
            to="./products"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Каталог
          </Link>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Акции
          </Link>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Новости
          </Link>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Отзывы
          </Link>
        </div>
        <div className={FooterStyles.column}>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Оплата и доставка
          </Link>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Часто спрашивают
          </Link>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Обратная связь
          </Link>
          <Link
            to="/"
            className={classNames(FooterStyles.Link, FooterStyles.smaller)}
          >
            Контакты
          </Link>
        </div>
        <div className={FooterStyles.column}>
          <h4>Мы на связи</h4>
          <div className={FooterStyles.ContactsWr}>
            <h5>8(999)000-00-00</h5>
            <p className={classNames(FooterStyles.smaller)}>
              <FontAwesomeIcon icon={faEnvelope} className={classNames(FooterStyles.icon)} />
              <a
                href="mailto:dogfood.ru@gmail.com"
                className={classNames(FooterStyles.Link)}
              >
                dogfood.ru@gmail.com
              </a>
            </p>
          </div>
          <div className={FooterStyles.BtnWr}>
            <Link
              to="/"
              className={classNames(FooterStyles.Link)}
            >
              <FontAwesomeIcon icon={faTelegram} />
            </Link>
            <Link
              to="/"
              className={classNames(FooterStyles.Link)}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </Link>
            <Link
              to="/"
              className={classNames(FooterStyles.Link)}
            >
              <FontAwesomeIcon icon={faViber} />
            </Link>
            <Link
              to="/"
              className={classNames(FooterStyles.Link)}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              to="/"
              className={classNames(FooterStyles.Link)}
            >
              <FontAwesomeIcon icon={faVk} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
