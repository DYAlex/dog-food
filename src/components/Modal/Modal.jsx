import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

function ModalInner({ closeHandler, children }) {
  const closeModalByEscape = (e) => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const closeModalByClickX = () => closeHandler()

  return (
    <div className={styles.modalInner}>
      <span
        role="button"
        tabIndex={0}
        className={styles.closeBtn}
        onClick={closeModalByClickX}
        onKeyDown={closeModalByEscape}
      >
        <FontAwesomeIcon icon={faXmarkCircle} />
      </span>
      {children}
    </div>
  )
}

export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null

  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div
      onMouseDown={closeModalByClickWrapper}
      className={styles.modalWr}
      role="button"
      tabIndex={0}
    >
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal'),
  )
}
