import SigninPage from "@/templates/SigninPage";
//? import hooks
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Signin() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") router.push("/");
  }, [status]);

  if (status == "unauthenticated") return <SigninPage />;
}

export default Signin;
