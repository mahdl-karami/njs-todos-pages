import SigninPage from "@/templates/SigninPage";
//? next-auth imports
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function Signin() {
  return <SigninPage />;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  //! authentication
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "",
    },
  };
}

export default Signin;
