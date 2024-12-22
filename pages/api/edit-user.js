import TodoUser from "@/models/userModel";
import ConnectToDB from "@/utils/ConnectToDB";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });

  //! Data validation
  const { email, newEmail, firstName, lastName } = req.body;
  if (!email) {
    return res.status(400).json({ status: "failed", error: "invalidEmail", message: "Invalid email!" });
  }

  //! Check new email
  const oldUser = await TodoUser.findOne({ email: newEmail });
  if (oldUser && email !== newEmail) {
    return res.status(400).json({ status: "failed", error: "duplicateEmail", message: "This email already exist!" });
  }

  //! Database connection
  try {
    await ConnectToDB();
  } catch (error) {
    console.log("Can't Connect to database! error : %s", error);
    return res.status(500).json({ status: "failed", error: "database", message: "can't connect to database!" });
  }

  //! Edit User
  const user = await TodoUser.findOne({ email });
  try {
    if (newEmail) user.email = newEmail;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    user.save();
    res.status(200).json({ status: "success", error: false, message: "User updated." });
  } catch (error) {
    console.log(error);
  }
  res.status(400).json({ status: "failed", error: "userEdit", message: "Can't edit user." });
}
