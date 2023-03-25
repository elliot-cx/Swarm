import { BrowserRouter, Route } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../Pages/HomePage";
import RoomPage from "../Pages/RoomPage";

export default function Router(){
    return(
        <BrowserRouter>
            <Header></Header>
            <Route path='./' element={<HomePage></HomePage>}></Route>
            <Route path='./rooms' element = {<RoomPage></RoomPage>}></Route>
        </BrowserRouter>
    );
}