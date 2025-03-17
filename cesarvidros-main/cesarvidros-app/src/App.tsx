import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./component/Loading/Loading";
import { UserRoutes } from "./routes/userRoutes";
import { AdminRoutes } from "./routes/adminRoutes";

import "./styles/StyleForAll.css";

const LoginSignPage = lazy(() => import("./Page/LoginSignPage"));

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/login" element={<LoginSignPage />} />
            {UserRoutes()}
            {AdminRoutes()}
          </Routes>
        </Suspense>
      </Router>
    </LoadingProvider>
  );
}

export default App;
