import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Signup from './routes/auth/signup';
import JoinRoom from './routes/joinRoom/JoinRoom';
import Room from "./routes/room/Room";
import SocketWrapper from "./components/SocketWrapper";
import Home from './routes/home/Home'
import Login from './routes/auth/login';
import SavedCodes from './routes/savedCodes/savedCodes';

const router = createBrowserRouter([
    {
        path:"/",
        element: <Signup/>
    },
    
    {
        path:"/login",
        element: <Login/>
    },

    {
        path:"/home",
        element: <Home/>
    },
    {
        path: "/joinroom",
        element: <JoinRoom />,
    },
    {
        path: "/room/:roomId",
        element: <SocketWrapper><Room /></SocketWrapper>
    },
    {
        path: "/savedcodes/:userId",
        element: <SavedCodes />,
    },

    // {
    //     path: "/savedcodes",
    //     element: <SavedCodes />,
    // },
    
]);

function App() {
    return <RouterProvider router={router} />
}

export default App
