import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./ui/ErrorPage";
import PlaceDetails from "./features/list-view/PlaceDetails";
import "./locales/i18n";

import { BookmarksProvider } from "./contexts/BookmarksContext";
import { ResizeProvider } from "./contexts/ResizeContext";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ path: "details/:bakeryId", element: <PlaceDetails /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BookmarksProvider>
      <ResizeProvider>
        <RouterProvider router={router} />
      </ResizeProvider>
    </BookmarksProvider>
  </React.StrictMode>
);
