import FormChanger from "@/utils/FormChanger";
import { useEffect, useState } from "react";

function DashbordPage({ user, error }) {
  const { email, firstName, lastName } = JSON.parse(user);
  const [form, setForm] = useState({
    email: email,
    firstName: firstName,
    lastName: lastName,
  });

  return (
    <form onChange={(ev) => FormChanger(ev, setForm)}>
      <h2 className="title">User Information</h2>
      <input name="email" placeholder="Email" value={form.email} type="email" />
      <input name="firstName" placeholder="FirstName" value={form.firstName} />
      <input name="lastName" placeholder="LastName" value={form.lastName} />
      <button className="btn btn-primary btn-sub">Edit</button>
    </form>
  );
}

export default DashbordPage;
