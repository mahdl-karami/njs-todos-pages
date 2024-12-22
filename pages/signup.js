import SignupPage from "@/templates/SignupPage";
//? next-auth imports
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function Signup() {
  return <SignupPage />;
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

export default Signup;
