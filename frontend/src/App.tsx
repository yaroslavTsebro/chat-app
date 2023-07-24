import React from "react";
import { ErrorBoundary } from 'react-error-boundary';
import "./App.css";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import Chat from "./component/Chat/Chat";

function App() {
  return (
      <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
          <ErrorPage
              displayRefresh
              message='Failed to render this page at this time'
          />
      )}>
        <Chat />
      </ErrorBoundary>
  );
}

export default App;
