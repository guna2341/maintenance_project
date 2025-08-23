import { Route, Routes } from "react-router-dom";
import{ MainLayout} from "./layout/mainLayout";
import { Dashboard } from './pages/dashboard';
import { Test } from "./pages/test";

const App = () => {
    return (
        <Routes>
            <Route path="/test" element={<Test />} />
            <Route element={<MainLayout />} >
            <Route path="/dashboard" element={<Dashboard/>} />
            </Route>
           
        </Routes>
    );
}

export default App
