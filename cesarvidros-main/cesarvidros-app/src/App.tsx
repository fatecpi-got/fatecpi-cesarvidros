import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./component/Loading/Loading";
import { UserRoutes } from "./routes/userRoutes";

import "./styles/StyleForAll.css";

const LoginSignPage = lazy(() => import("./Page/LoginSignPage"));

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<LoginSignPage />} />
            {UserRoutes()}
          </Routes>
        </Suspense>
      </Router>
    </LoadingProvider>
  );
}

export default App;
