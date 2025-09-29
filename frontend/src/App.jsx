import React from "react";
import "./api/interceptors/request.js";
import './api/interceptors/response.js';
import { NotFound } from "./components";
import { MainLayout } from "./layout/mainLayout";
import { Route, Routes } from "react-router-dom";
import { ProtectRoute, Auth } from "./protectedRoutes";
import { mqttConnect, mqttDisconnect } from "./services/mqttConnect.js";
import { AddBlockPage, Dashboard, BlocksDashboard, EditBlockPage, LoginPage, DisplayBlockId } from './pages';
import { lastWill, lastWillDisconnect } from "./services/lwt.js";
import { UseDashboardStore } from "./stores/dashboard.js";
import { NetworkError } from "./pages/networkError.jsx";

// REMOVE BACKEND DELAY

const App = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const handleOnline = UseDashboardStore(state => state.handleOnline);
    const handleOffline = UseDashboardStore(state => state.handleOffline);

    React.useEffect(() => {
        mqttConnect();
        lastWill();
        return () => {
            mqttDisconnect();
            lastWillDisconnect();   
        }
    }, []);

    React.useEffect(() => {
        if (navigator.onLine) {
            handleOnline();
        } else {
            handleOffline();
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <Routes>
            <Route element={<Auth />}>
                <Route path="/networkError" element={<NetworkError/>} />
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
