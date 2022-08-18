import { useEffect } from "react";
import { useStore } from "./store";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";

const App = observer(() => {
  const store = useStore();

  useEffect(() => {
    if (!store.yields) {
      store.fetchYields();
    }
  }, []);

  return (
    <div className="App">
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    </div>
  );
});

export default App;
