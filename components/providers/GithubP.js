import React from "react";

function GithubP({ action }) {
  let login;
  return (
    <button type="button" className="btn btn-github">
      {action} With Github
    </button>
  );
}

export default GithubP;
