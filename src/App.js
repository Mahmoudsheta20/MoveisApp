import { Route, Routes } from "react-router-dom";
import { Details, MainContainer, Navbar } from "./components";
import "./App.css";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/*" element={<MainContainer />} />
        <Route path="/details/:category/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
