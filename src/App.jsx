import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharactersList from "./components/CharactersList/CharactersList";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import Favorites from "./components/Favorites/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <main>
          {" "}
          <Routes>
            <Route path="/" element={<CharactersList />} />
            <Route path="/characters/:id" element={<CharacterDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
