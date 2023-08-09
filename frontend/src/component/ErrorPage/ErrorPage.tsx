import React from "react";
import "./ErrorPage.scss";
import FullPageContainer from "../common/FullPageContainer/FullPageContainer";

interface ErrorPageProps {
  title?: string;
  message?: string;
  displayRefresh?: boolean;
}

function ErrorPage({
  title = "Oh no!",
  message = "Something went wrong",
  displayRefresh,
}: ErrorPageProps) {
  return (
    <FullPageContainer className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="errorTitle" data-text={title}>
        {title}
      </h1>
      <span className="mt-2">{message}</span>
      {/* {displayRefresh ? (
        <a
          href="#"
          className="link-secondary"
        >
          Refresh
        </a>
      ) : (
        <a href="#" className="link-secondary">
          Go Back
        </a>
      )} */} 
    </FullPageContainer>
  );
}

export default ErrorPage;
