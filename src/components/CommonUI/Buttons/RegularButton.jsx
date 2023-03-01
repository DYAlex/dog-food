import ButtonStyles from './Button.module.scss'

export function RegularButton({ btnName, clickHandler, disabled }) {
  const isDisabled = disabled || false
  // console.log({
  //   isDisabled, disabled, btnName, clickHandler,
  // })
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={ButtonStyles.btn}
      disabled={isDisabled}
    >
      {btnName}
    </button>
  )
}
