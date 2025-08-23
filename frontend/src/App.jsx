import { Route, Routes } from "react-router-dom";
import{ MainLayout} from "./layout/mainLayout";
import { Dashboard } from './pages/dashboard';

const App = () => {
    return (
        <Routes>
            <Route element={<MainLayout />} >
            <Route path="/dashboard" element={<Dashboard/>} />
            </Route>
           
        </Routes>
    );
}

export default App
