export const validateDataFromLS = (initState, stateFromLS) => {
  const initStateKeys = Object.keys(initState)
  const dataFromLSKeys = Object.keys(stateFromLS)
  return dataFromLSKeys.every((key) => (initStateKeys.includes(key)))
}
