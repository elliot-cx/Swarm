import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import HomePage from "../Pages/HomePage/HomePage";
import RoomsPage from "../Pages/RoomsPage/RoomsPage";

export default function Router(){
    return(
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/' element={<HomePage></HomePage>}></Route>
                <Route path='/rooms' element = {<RoomsPage></RoomsPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
}