import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { InitialFallback } from "./components/Fallback/InitialFallback";
import { ErrorBoundary } from "./routes/ErrorBoundary";
import * as Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    loader: Root.loader,
    Component: Root.Component,
    ErrorBoundary: ErrorBoundary,
  },
]);

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<InitialFallback />}
      future={{ v7_startTransition: true }}
    />
  );
}

export default App;
