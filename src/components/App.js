import Header from "./Header";
import SideBar from "./SideBar";
import PlaceList from "./PlaceList";
import MapContainer from "./MapContainer";

import { useBrowserTabTitle } from "../hooks/useBrowserTabTitle";
import { BakeriesProvider } from "../contexts/BakeriesContext";
import { TodayProvider } from "../contexts/TodayContext";
import { BookmarksProvider } from "../contexts/BookmarksContext";
import { ResizeProvider } from "../contexts/ResizeContext";

import "../assets/App.css";

function App() {
  useBrowserTabTitle();

  return (
    <BookmarksProvider>
      <BakeriesProvider>
        <TodayProvider>
          <ResizeProvider>
            <div className="container">
              <Header />
              <SideBar>
                <PlaceList />
              </SideBar>
              <MapContainer />
            </div>
          </ResizeProvider>
        </TodayProvider>
      </BakeriesProvider>
    </BookmarksProvider>
  );
}

export default App;
