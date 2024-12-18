import SignupPage from "@/templates/SignupPage";
//? import hooks
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Signup() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") router.push("/");
  }, [status]);

  if (status == "unauthenticated") return <SignupPage />;
}

export default Signup;
