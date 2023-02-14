import CounterStyles from './Counter.module.css'

export function Counter({ count }) {
  return (
    <div className={CounterStyles.container}>
      <div className={CounterStyles.wr}>
        <span className={CounterStyles.counter}>{count}</span>
      </div>
    </div>
  )
}
