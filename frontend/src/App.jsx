import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Dashboard } from './pages/dashboard';
import { Test } from "./pages/test";
import LoginPage from "./pages/login";
import BlocksDashboard from "./pages/displayBlocks";
import { addToast } from "@heroui/toast";
import { UseDashboardStore } from "./stores";
import React from "react";
import AddBlockPage from "./pages/addBlock";

const App = () => {
    const getBlocks = UseDashboardStore(e => e.getBlocks);
    const blocks = UseDashboardStore(e => e.blocks);
    function toast(title, description, color) {
        addToast({
            title,
            description,
            variant: "flat",
            color
        })
    }

    

    React.useEffect(() => {
        async function getData() {
            const response = await getBlocks();
            if (!response.state) {
                toast('Some Error Occured', response.message, 'danger');
                return;
            }
            if (response.data) {
                if (response.data.length === 0) {
                    toast(
                        'No Data Found',
                        'No blocks available. Please refresh the page to try again.',
                        'warning'
                    );
                }
            }
        }
        if (!blocks.length) {
            getData();
        }
    }, []);

    return (
        <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<MainLayout />} >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addBlock" element={<AddBlockPage />} />
                <Route path="/displayBlocks" element={<BlocksDashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
