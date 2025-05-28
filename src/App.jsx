import Aurora from "./AuroraBackground.jsx";
import Header from "./Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Aurora
        colorStops={["#f4f4f4", "#ffffff", "#333333"]}
        blend={0.5}
        amplitude={0.4}
        speed={0.5}
      />
    </>
  );
}

export default App;
