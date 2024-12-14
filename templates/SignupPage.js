//? import utils
import FormChanger from "@/utils/FormChanger";
//? import hooks
import { useState } from "react";
//? import icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
    <div>
      <form onChange={(ev) => FormChanger(ev, setForm)} onSubmit={(ev) => FormSubmiter(ev)}>
        <input type="email" name="email" value={form.email} />
        <div>
          <input type={form.passVisibility ? "text" : "password"} name="password" value={form.password} />
          <button type="button" onClick={() => setForm((prevS) => ({ ...prevS, ["passVisibility"]: !prevS.passVisibility }))}>
            {form.passVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
