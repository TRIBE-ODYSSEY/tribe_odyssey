import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";
import Layout from "./components/Layout";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Layout />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
