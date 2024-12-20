//? import next-auth modules
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
//? import hooks
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Index() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") router.push("/signin");
  }, [status]);

  if (status == "loading") {
    return <div>loading ...</div>;
  }
  if (status == "authenticated") {
    return <div>welcome</div>;
  }
  return <></>;
}

export default Index;

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
    props: {
      data: "",
    },
  };
}
