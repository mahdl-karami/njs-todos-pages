//? database imports
import TodoUser from "@/models/userModel";
import { verifyPassword } from "@/utils/BcriptJS";
import ConnectToDB from "@/utils/ConnectToDB";

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(405).json({ message: "Method not allowed" });

  //! Data validation
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).json({ status: "failed", error: !email && !password ? "invalidData" : !email ? "invalidEmail" : "invalidPassword", message: "please enter valid data!" });

  //! Database connection
  try {
    await ConnectToDB();
  } catch (error) {
    console.log("Can't Connect to database! error : %s", error);
    return res.status(500).json({ status: "failed", error: "database", message: "can't connect to database!" });
  }

  //! Check user exist
  const user = await TodoUser.findOne({ email });
  if (!user) return res.status(404).json({ status: "failed", error: "userNotExist", message: "Please signup first!" });

  //! Check password
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return res.status(401).json({ status: "failed", error: "passwordIncorrect", message: "email or password is incorrect!" });

  //! Login
  res.status(200).json({ status: "success", error: false, message: "Logged in;" });
}
