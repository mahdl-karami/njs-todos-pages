import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function index() {
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

export default index;
