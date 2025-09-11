import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Dashboard } from './pages/dashboard';
import { Test } from "./pages/test";
import LoginPage from "./pages/login";
import BlocksDashboard from "./pages/displayBlocks";
import { addToast } from "@heroui/toast";
import { UseAuthStore, UseDashboardStore } from "./stores";
import React from "react";
import AddBlockPage from "./pages/addBlock";
import EditBlockPage from "./pages/editBlock";
import { NotFound } from "./components";
import { ProtectRoute } from "./protectedRoutes/protectRoute";
import "./api/interceptors/request.js";
import './api/interceptors/response.js';
const App = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    return (
        <Routes>
            <Route path={`/${BASE_URL}/login`} element={<LoginPage />} />
            <Route element={<ProtectRoute />}>
                <Route path="/test" element={<Test />} />
                <Route path={`/${BASE_URL}`} element={<MainLayout />} >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="addBlock" element={<AddBlockPage />} />
                    <Route path="displayBlocks" element={<BlocksDashboard />} />
                    <Route path="editBlock/:id" element={<EditBlockPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
