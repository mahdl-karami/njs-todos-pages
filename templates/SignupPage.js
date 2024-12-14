//? import utils
import FormChanger from "@/utils/FormChanger";
//? import hooks
import { useState } from "react";
//? import icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
//? import styles
import styles from "./SignupPage.module.css";

function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passVisibility: false,
  });

  async function FormSubmiter(ev) {
    ev.preventDefault();
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

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
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
