export const validateDataFromLS = (initState, stateFromLS) => {
  if (typeof stateFromLS === 'object') {
    const initStateKeys = Object.keys(initState)
    const dataFromLSKeys = Object.keys(stateFromLS)
    return dataFromLSKeys.every((key) => (initStateKeys.includes(key)))
  }
  return false
}
