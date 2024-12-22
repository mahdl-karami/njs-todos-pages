import TodoUser from "@/models/userModel";

async function GetUserFromDB(email) {
  try {
    const user = await TodoUser.findOne({ email });
    if (!user) return null;
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

export default GetUserFromDB;
