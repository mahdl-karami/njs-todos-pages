//? database imports
import TodoUser from "@/models/userModel";
import { hashPassword } from "@/utils/BcriptJS";
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
  if (user) return res.status(422).json({ status: "failed", error: "userExist", message: "this email already exist, please login." });

  //! Create User
  const hashedPass = await hashPassword(password);
  try {
    await TodoUser.create({ email, password: hashedPass });
    return res.status(201).json({ status: "success", error: false, message: "user successfully created.", data: { email } });
  } catch (error) {
    console.log("can't create user! error : %s", error);
    return res.status(500).json({ status: "failed", error: "cantCreateUser", message: "can't create user!" });
  }
}
