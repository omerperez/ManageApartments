import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPovider from "./Contexts/AuthContext";
import PrivatePovider from "./Contexts/Private";
import PrivateRouter from "./Features/Routers/Private";
import PublicRouter from "./Features/Routers/Public";
import ApartmentDetailsPage from "./Pages/ApartmentView";
import CreateApartment from "./Pages/Create";
import EditApartment from "./Pages/EditApartment";
import HomePage from "./Pages/Home";
import Apartments from "./Pages/MyApartments";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

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
              element={<PublicRouter children={<SignUp />} />}
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