import styles from './loading-spinner.module.css'

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  )
}
