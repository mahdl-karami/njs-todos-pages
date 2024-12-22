import FormChanger from "@/utils/FormChanger";
import { useEffect, useState } from "react";

function DashbordPage({ user, error }) {
  const { email, firstName, lastName } = JSON.parse(user);
  const [form, setForm] = useState({
    email: email,
    firstName: firstName,
    lastName: lastName,
  });

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
      .then((json) => console.log(json));
  }

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