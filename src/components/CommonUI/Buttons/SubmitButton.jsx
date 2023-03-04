import classNames from 'classnames'
import ButtonStyles from './Button.module.scss'

export function SubmitButton({ btnName, clickHandler, disabled }) {
  const isDisabled = disabled || false
  // console.log({
  //   isDisabled, disabled, btnName, clickHandler,
  // })
  return (
    <button
      type="submit"
      onClick={clickHandler}
      className={classNames(ButtonStyles.btn, ButtonStyles.btnAction)}
      disabled={isDisabled}
    >
      {btnName}
    </button>
  )
}
