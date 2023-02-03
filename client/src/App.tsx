import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivatePovider from "./Contexts/ApplicationContext";
import AuthPovider from "./Contexts/AuthContext";
import AgreementsPage from "./Pages/Agreements";
import ApartmentDetailsPage from "./Pages/ApartmentView";
import Create from "./Pages/Create";
import EditApartment from "./Pages/EditApartment";
import HomePage from "./Pages/Home";
import {
  default as Apartments,
  default as MyApartments,
} from "./Pages/MyApartments";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import TenantDocument from "./Pages/TenantDocument";
import PrivateRouter from "./Routers/Private";
import PublicRouter from "./Routers/Public";

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
              path="/home"
              element={<PrivateRouter children={<HomePage />} />}
            />
            <Route
              path="/apartments"
              element={<PrivateRouter children={<Apartments />} />}
            />
            <Route
              path="my-apartment"
              element={
                <PrivateRouter>
                  <MyApartments />
                </PrivateRouter>
              }
            />
            <Route
              path="/apartment/*"
              element={<PrivateRouter children={<ApartmentDetailsPage />} />}
            />
            <Route
              path="/create-apartment"
              element={<PrivateRouter children={<Create />} />}
            />
            <Route
              path="/edit-apartment/*"
              element={<PrivateRouter children={<EditApartment />} />}
            />
            <Route
              path="/files"
              element={<PrivateRouter children={<AgreementsPage />} />}
            />
            <Route
              path="/tenant-agreement/*"
              element={<PrivateRouter children={<TenantDocument />} />}
            />
          </Routes>
        </PrivatePovider>
      </AuthPovider>
    </BrowserRouter>
  );
}

export default App;
