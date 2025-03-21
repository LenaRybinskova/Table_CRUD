import '../app/App.css'
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Auth} from '@/features/auth/ui/Auth.tsx';
import {TablePage} from '@/features/TablePage/ui/TablePage/TablePage.tsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    return (
        <HashRouter basename={import.meta.env.VITE_PUBLIC_URL}>
            <ToastContainer autoClose={3000} position="top-center"/>
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/table-page" element={<TablePage/>}/>
            </Routes>
        </HashRouter>
    )
}

export default App
