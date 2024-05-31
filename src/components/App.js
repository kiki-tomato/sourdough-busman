import Header from "./Header";
import Map from "./Map";
import SideBar from "./SideBar";
import PlaceList from "./PlaceList";

import { useBrowserTabTitle } from "../hooks/useBrowserTabTitle";
import { BakeriesProvider } from "../contexts/BakeriesContext";
import { TodayProvider } from "../contexts/TodayContext";

import "../assets/App.css";
import { BookmarksProvider } from "../contexts/BookmarksContext";

function App() {
  useBrowserTabTitle();

  return (
    <BookmarksProvider>
      <BakeriesProvider>
        <TodayProvider>
          <div className="container">
            <Header />
            <SideBar>
              <PlaceList />
            </SideBar>
            <Map />
          </div>
        </TodayProvider>
      </BakeriesProvider>
    </BookmarksProvider>
  );
}

export default App;
