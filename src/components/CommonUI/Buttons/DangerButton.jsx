import classNames from 'classnames'
import ButtonStyles from './Button.module.scss'

export function DangerButton({ btnName, clickHandler, disabled }) {
  const isDisabled = disabled || false
  // console.log({
  //   isDisabled, disabled, btnName, clickHandler,
  // })
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={classNames(ButtonStyles.btn, ButtonStyles.btnDanger)}
      disabled={isDisabled}
    >
      {btnName}
    </button>
  )
}
