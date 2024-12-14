import Link from "next/link";
import styles from "./Layout.module.css";
import { RiShareBoxFill } from "react-icons/ri";
function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <h1 className={styles.logo}>
            <Link href="/">Todo Manager</Link>
          </h1>
          <div className={styles.buttons}>
            <button className="btn btn-primary">Signup</button>
            <button className="btn btn-secondary">Signin</button>
          </div>
        </nav>
      </header>
      <aside></aside>
      <section>{children}</section>
      <footer className={styles.footer}>
        <p>
          Developer :
          <a href="#" target="_Blank">
            mahdl-karami <RiShareBoxFill />
          </a>
        </p>
        <p>
          Database :
          <a href="#" target="_Blank">
            Mongodb <RiShareBoxFill />
          </a>
        </p>
      </footer>
    </>
  );
}

export default Layout;
