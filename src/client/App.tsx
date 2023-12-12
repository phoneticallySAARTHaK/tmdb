import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
} from "react-router-dom";
import { api } from "./api";
import { InitialFallback } from "./components/Fallback/InitialFallback";
import { ErrorBoundary } from "./routes/ErrorBoundary";
import * as Root from "./routes/Root";
import * as Search from "./routes/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: Root.Component,
      },
      {
        path: "/search",
        loader: Search.loader,
        Component: Search.Component,
      },
      {
        path: "/movie/:id",
        loader: ({ params }) => api.movie(params.id ?? ""),
        Component: () => {
          const data = useLoaderData();
          console.log(data);
          return (
            <pre
              style={{
                overflow: "auto",
                maxWidth: "100vw",
                padding: "1rem",
                backgroundColor: "#FFF",
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          );
        },
      },
    ],
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
