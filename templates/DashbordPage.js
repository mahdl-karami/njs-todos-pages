//? import hooks
import { useEffect, useState } from "react";
//? import functions
import FormChanger from "@/utils/FormChanger";
import { signIn } from "next-auth/react";

function DashbordPage({ user, error }) {
  //! destructure information from database response
  const { email, firstName, lastName } = JSON.parse(user);
  const [form, setForm] = useState({
    email: email,
    firstName: firstName,
    lastName: lastName,
  });
  //! edita api response
  const [res, setRes] = useState(null);

  async function subHandler(ev) {
    ev.preventDefault();
    await fetch("/api/edit-user", {
      method: "PATCH",
      body: JSON.stringify({
        email,
        newEmail: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setRes(json);
      });
  }
  useEffect(() => {
    //! Response checker
    if (res?.status == "success") {
      signIn("credentials", { email: form.email });
      return;
    }
  }, [res]);

  return (
    <form onChange={(ev) => FormChanger(ev, setForm)} onSubmit={(ev) => subHandler(ev)}>
      <h2 className="title">User Information</h2>
      <input name="email" placeholder="Email" value={form.email} type="email" />
      <input name="firstName" placeholder="FirstName" value={form.firstName} />
      <input name="lastName" placeholder="LastName" value={form.lastName} />
      <button className="btn btn-primary btn-sub">Edit</button>
    </form>
  );
}

export default DashbordPage;
