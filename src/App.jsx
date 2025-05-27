import "./App.css";
import Aurora from "./AuroraBackground.jsx";

function App() {
  return (
    <>
      <Aurora
        colorStops={["#f4f4f4", "#ffffff", "#333333"]}
        blend={0.5}
        amplitude={0.8}
        speed={0.5}
      />
    </>
  );
}

export default App;
