import styles from '../styles/Banner.module.css'

export default function Banner(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Brew</span>
        <span className={styles.title2}>Connisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local breweries!</p>
      <button className={styles.button} onClick={props.handleClick}>
        {props.buttonText}
      </button>
    </div>
  )
}
