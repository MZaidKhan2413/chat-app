import {createBrowserRouter} from 'react-router-dom';
import Register from '../Pages/Register/Register';
import Chat from '../Pages/Chat/Chat';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Chat />
    },
    {
        path: "/register",
        element: <Register />
    }
])