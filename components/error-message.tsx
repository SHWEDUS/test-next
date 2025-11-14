import styles from "./error-message.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
