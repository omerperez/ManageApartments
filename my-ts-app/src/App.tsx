import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import ApartmentDetailsPage from "./Pages/Details";
import SignIn from "./Pages/SignIn";
import AuthPovider from "./Contexts/AuthContext";
import PublicRouter from "./Features/Routers/Public";
import PrivateRouter from "./Features/Routers/Private";
import Apartments from "./Pages/Apartments";
import CreateApartment from "./Pages/Create";
import PrivatePovider from "./Contexts/Private";
import EditApartment from "./Pages/EditApartment";

function App() {
  return (
    <BrowserRouter>
      <AuthPovider>
        <PrivatePovider>
          <Routes>
            <Route
              path="/signin"
              element={<PublicRouter children={<SignIn />} />}
            />
            <Route
              path="/signup"
              element={<PublicRouter children={<SignIn />} />}
            />
            <Route
              path="/"
              element={<PrivateRouter children={<HomePage />} />}
            />
            <Route
              path="/apartments"
              element={<PrivateRouter children={<Apartments />} />}
            />
            <Route
              path="/apartment/*"
              element={<PrivateRouter children={<ApartmentDetailsPage />} />}
            />
            <Route
              path="/create-apartment"
              element={<PrivateRouter children={<CreateApartment />} />}
            />
            <Route
              path="/edit-apartment/*"
              element={<PrivateRouter children={<EditApartment />} />}
            />
          </Routes>
        </PrivatePovider>
      </AuthPovider>
    </BrowserRouter>
  );
}

export default App;
