import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from '../Pages/HomePage/HomePage';
import RoomsPage from '../Pages/RoomPage/RoomPage';

export default function Router(){
    return(
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/' element={<HomePage></HomePage>}></Route>
                <Route path='/room' element = {<RoomsPage></RoomsPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
}