//? import components
import Link from "next/link";
//? import styles
import styles from "./Layout.module.css";
//? import icons
import { RiShareBoxFill } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { GrAddCircle } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
//? import next-auth modules
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function Layout({ children }) {
  const { status } = useSession();
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <h1 className={styles.logo}>
            <Link href="/">Todo Manager</Link>
          </h1>
          {status == "authenticated" ? (
            <button className="btn btn-primary" onClick={signOut}>
              Signout
            </button>
          ) : (
            <div className={styles.buttons}>
              <Link href="/signup">
                <button className="btn btn-primary">Signup</button>
              </Link>
              <Link href="/signin">
                <button className="btn btn-primary">Signin</button>
              </Link>
            </div>
          )}
        </nav>
      </header>
      <aside className={styles.sidebar + " box-shadow"}>
        <h4>Welcome 👋</h4>
        <ul>
          <li>
            <Link href="/">
              <FaListCheck />
              Todos
            </Link>
          </li>
          <li>
            <Link href="/add-todo">
              <GrAddCircle />
              Add Todo
            </Link>
          </li>
          <li>
            <Link href="/dashbord">
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
