import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MisCursosPage from './pages/MisCursosPage';
import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <MisCursosPage />,
        errorElement: <ErrorPage />,
    },

    {
        path: "/MisCursos",
        element: <MisCursosPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/MisCursos/:id",
                element: <LoginPage />,
            }
        ]

    },
    {
        path: "/Login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },


]);


function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
