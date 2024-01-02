import "./App.css";
import Header from "./components/Header";
import Map from "./components/Map";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="container">
      <Header />
      <SideBar />
      <Map />
    </div>
  );
}

export default App;
