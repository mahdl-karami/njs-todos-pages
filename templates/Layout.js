import Link from "next/link";
import styles from "./Layout.module.css";
import { RiShareBoxFill } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { GrAddCircle } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
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
            <button className="btn btn-primary">Signin</button>
          </div>
        </nav>
      </header>
      <aside className={styles.sidebar}>
        <h4>Welcome 👋</h4>
        <ul>
          <li>
            <Link href="/">
              <FaListCheck />
              Todos
            </Link>
          </li>
          <li>
            <Link href="/">
              <GrAddCircle />
              Add Todo
            </Link>
          </li>
          <li>
            <Link href="/">
              <CgProfile />
              Profile
            </Link>
          </li>
        </ul>
      </aside>
      <section className={styles.section}>{children}</section>
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
