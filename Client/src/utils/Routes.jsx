import {createBrowserRouter} from 'react-router-dom';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import Chat from '../Pages/Chat/Chat';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Chat />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "*",
        element: <div>Page not found</div>
    }
])