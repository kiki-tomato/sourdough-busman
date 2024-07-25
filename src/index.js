import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./ui/ErrorPage";
import PlaceDetails from "./features/list-view/PlaceDetails";
import InfoWindow from "./features/map-view/InfoWindow";
import "./locales/i18n";

import { BookmarksProvider } from "./contexts/BookmarksContext";
import { PositionProvider } from "./contexts/PositionContext";
import { ResizeProvider } from "./contexts/ResizeContext";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/:bakeryId", element: <InfoWindow /> },
      { path: "details/:bakeryId", element: <PlaceDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BookmarksProvider>
      <PositionProvider>
        <ResizeProvider>
          <RouterProvider router={router} />
        </ResizeProvider>
      </PositionProvider>
    </BookmarksProvider>
  </React.StrictMode>
);
