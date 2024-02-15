import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Conversion } from "./pages/Convertion/Convertion";
import { Error } from "./Common/Components/Error";
import Home from "./pages/Home/Home";
import { ApiKey } from "./pages/ApiKey/ApiKey";
import { Docs } from "./pages/ApiDocs/Docs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/convert" element={<Conversion />} />
          <Route path="/api-key" element={<ApiKey />} />
          <Route path="/docs" element={<Docs />} />
          <Route
            path="*"
            element={
              <Error message="Something wrong happened. This page doesn't exist." />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
