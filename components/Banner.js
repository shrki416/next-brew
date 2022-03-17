import styles from '../styles/Banner.module.css'

export default function Banner({ handleClick, buttonText }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>🍺 Brew</span>
        <span className={styles.title2}>Master</span>
      </h1>
      <p className={styles.subTitle}>Discover your local breweries!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}
