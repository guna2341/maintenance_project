import React from "react";
import "./api/interceptors/request.js";
import './api/interceptors/response.js';
import { NotFound } from "./components";
import { MainLayout } from "./layout/mainLayout";
import { Route, Routes } from "react-router-dom";
import { ProtectRoute, Auth } from "./protectedRoutes";
import { mqttConnect, mqttDisconnect } from "./services/mqttConnect.js";
import { AddBlockPage, Dashboard, BlocksDashboard, EditBlockPage, LoginPage, DisplayBlockId } from './pages';

// REMOVE BACKEND DELAY

const App = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    React.useEffect(() => {
        mqttConnect();
        return () => {
            mqttDisconnect();
        }
    }, []);

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
                        <Route path="displayId" element={<DisplayBlockId />} />
                        <Route path="editBlock/:id" element={<EditBlockPage />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
