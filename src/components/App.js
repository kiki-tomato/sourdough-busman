import Header from "./Header";
import SideBar from "./SideBar";
import PlaceList from "./PlaceList";
import MapContainer from "./MapContainer";

import { useBrowserTabTitle } from "../hooks/useBrowserTabTitle";
import { PositionProvider } from "../contexts/PositionContext";
import { BookmarksProvider } from "../contexts/BookmarksContext";
import { ResizeProvider } from "../contexts/ResizeContext";

import "../assets/App.css";

function App() {
  useBrowserTabTitle();

  return (
    <BookmarksProvider>
      <PositionProvider>
        <ResizeProvider>
          <div className="container">
            <Header />
            <SideBar>
              <PlaceList />
            </SideBar>
            <MapContainer />
          </div>
        </ResizeProvider>
      </PositionProvider>
    </BookmarksProvider>
  );
}

export default App;
