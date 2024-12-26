import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./ui/ErrorPage";
import PlaceDetails from "./features/detail-view/PlaceDetails";
import "./locales/i18n";
import "./sass/main.scss";

import { BookmarksProvider } from "./contexts/BookmarksContext";
import { ResizeProvider } from "./contexts/ResizeContext";
import { CurrentLocationProvider } from "./contexts/CurrentLocation";

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
        <CurrentLocationProvider>
          <RouterProvider router={router} />
        </CurrentLocationProvider>
      </ResizeProvider>
    </BookmarksProvider>
  </React.StrictMode>
);
