import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Dashboard } from './pages/dashboard';
import BlocksDashboard from "./pages/displayBlocks";
import React from "react";
import AddBlockPage from "./pages/addBlock";
import EditBlockPage from "./pages/editBlock";
import { NotFound } from "./components";
import "./api/interceptors/request.js";
import './api/interceptors/response.js';
import LoginPage from "./pages/login.jsx";
import { ProtectRoute } from "./protectedRoutes/protectRoute.jsx";
import { Auth } from "./protectedRoutes/auth.jsx";

const App = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    return (
        <Routes>
            <Route element={<Auth />}>
            <Route path={`/${BASE_URL}/login`} element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route element={<ProtectRoute />}>
                <Route path={`/${BASE_URL}`} element={<MainLayout />} >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="addBlock" element={<AddBlockPage />} />
                    <Route path="displayBlocks" element={<BlocksDashboard />} />
                    <Route path="editBlock/:id" element={<EditBlockPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
            </Route>
        </Routes>
    );
}

export default App;
