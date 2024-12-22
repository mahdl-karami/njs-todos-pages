//? import next-auth
import { signIn } from "next-auth/react";

function GithubP({ action /* Login/Signup */ }) {
  return (
    <button type="button" className="btn btn-github" onClick={() => signIn("github")}>
      {action} With GitHub
    </button>
  );
}

export default GithubP;
