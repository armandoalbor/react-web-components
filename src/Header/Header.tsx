import styles from "./Header.module.css";

export interface HeaderProps {
  text: string;
  image: string;
}

export const Header = ({ text, image }: HeaderProps) => (
  <header>
    <div className={styles.wrapper}>
      <div>
        <img width={150} height={150} className={styles.logo} src={image} />
      </div>
      <h1 className={styles.title}>{text}</h1>
    </div>
  </header>
);
