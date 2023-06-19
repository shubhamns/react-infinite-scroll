import { useState } from "react";
import Example1 from "./components/Example1";
import Example2 from "./components/Example2";
import Example3 from "./components/Example3";
import "./App.css";

function App() {
  const [tab, setTab] = useState(1);
  const getTabContent = () => {
    switch (tab) {
      case 2:
        return <Example2 />;
      case 3:
        return <Example3 />;
      default:
        return <Example1 />;
    }
  };
  return (
    <div>
      <div className="tabs">
        <button className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>
          Tab 1
        </button>
        <button className={tab === 2 ? "active" : ""} onClick={() => setTab(2)}>
          Tab 2
        </button>
        <button className={tab === 3 ? "active" : ""} onClick={() => setTab(3)}>
          Tab 3
        </button>
      </div>
      <div className="tab-content">{getTabContent()}</div>
    </div>
  );
}

export default App;
