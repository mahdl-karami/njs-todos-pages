import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function Dashbord() {
  return <div>Dashbord</div>;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Dashbord;
