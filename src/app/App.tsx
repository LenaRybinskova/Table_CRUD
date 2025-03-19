import '../app/App.css'
import {HashRouter} from 'react-router-dom';


function App() {

    return (
        <HashRouter basename={import.meta.env.VITE_PUBLIC_URL}>
           <div>LENA TEST</div>
        </HashRouter>
    )
}

export default App
