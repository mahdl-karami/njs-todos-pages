//? import next-auth modules
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export function Index() {
  return <div>welcome</div>;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  //! authentication
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
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

export default Index;