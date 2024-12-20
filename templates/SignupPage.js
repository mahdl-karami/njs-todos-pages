//? import utils
import FormChanger from "@/utils/FormChanger";
//? import hooks
import { useEffect, useState } from "react";
//? import icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
//? import styles
import styles from "./SignupPage.module.css";
//? import modules
import { signIn } from "next-auth/react";
import GithubP from "@/components/providers/GithubP";

function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passVisibility: false,
  });
  const [error, setError] = useState(0);
  const [res, setRes] = useState(null);

  async function FormSubmiter(ev) {
    ev.preventDefault();
    //! Form value check
    if (!form.email || !form.password) {
      setError(!form.email && !form.password ? "please enter valid data!" : !form.email ? "please enter valid email!" : "please enter valid password!");
      return;
    }
    //! Send form to backend
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setRes(json));
  }

  useEffect(() => {
    //! Reset Error
    setError(false);
  }, [form.email, form.password]);

  useEffect(() => {
    //! Response checker
    if (res?.status == "success") {
      signIn("credentials", { email: form.email });
      return;
    }
    setError(res?.message);
  }, [res]);

  return (
    <div className={styles.box}>
      <form onChange={(ev) => FormChanger(ev, setForm)} onSubmit={(ev) => FormSubmiter(ev)}>
        <h3 className="title">Create new Account</h3>
        <input placeholder="Email" type="email" name="email" value={form.email} />
        <div className={styles.visibilityEye}>
          <input placeholder="Password" type={form.passVisibility ? "text" : "password"} name="password" value={form.password} />
          <button className="btn" type="button" onClick={() => setForm((prevS) => ({ ...prevS, ["passVisibility"]: !prevS.passVisibility }))}>
            {form.passVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
        {error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : null}
        <button className="btn btn-primary" type="submit">
          Signup With Email
        </button>
        <GithubP action="Signup" />
      </form>
    </div>
  );
}

export default SignupPage;
