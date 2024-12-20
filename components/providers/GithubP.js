import { signIn } from "next-auth/react";
import React from "react";

function GithubP({ action }) {
  function githublogin() {
    signIn("github");
  }
  return (
    <button type="button" className="btn btn-github" onClick={githublogin}>
      {action} With Github
    </button>
  );
}

export default GithubP;
