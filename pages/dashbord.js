import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import DashbordPage from "@/templates/DashbordPage";
import ConnectToDB from "@/utils/ConnectToDB";
import GetUserFromDB from "@/utils/GetUserFromDB";

function Dashbord({ user, error }) {
  return <DashbordPage user={user} error={error} />;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  const email = session.user.email;
  //! Authentication
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  //! Database connection
  try {
    await ConnectToDB();
  } catch (error) {
    console.log("Can't Connect to database! error : %s", error);
    return {
      props: {
        user: undefined,
        error: "database",
      },
    };
  }
  //! Get Uer
  const user = await GetUserFromDB(email);
  return {
    props: {
      user: user ? JSON.stringify(user) : undefined,
      error: user ? false : "userNotFound",
    },
  };
}

export default Dashbord;
