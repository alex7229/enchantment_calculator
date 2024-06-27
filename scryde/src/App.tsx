import "./App.css";
import Info from "./components/info/Info";
import RegularResults from "./components/regular-results/RegularResults";
import Settings from "./components/settings/Settings";
import SafeResults from "./components/safe-results/SafeResults";

function App() {
  return (
    <div className="app">
      <div className="info-container">
        <div className="block">
          <Settings />
        </div>
        <div className="block">
          <Info />
        </div>
        <div className="block">
          <RegularResults />
        </div>
        <div className="block">
          <SafeResults />
        </div>
      </div>
      <div className="button-container">
        <button id="calculate_button" type="button">
          Calculate
        </button>
      </div>
    </div>
  );
}

export default App;
