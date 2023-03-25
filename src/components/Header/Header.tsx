import { NavLink } from 'react-router-dom';
import './Header.css'
export default function Header(){
    const logoClick = (e:any)=>{
        window.location.href='./'
    }
    return(
        <header id='headerRoot'>    
            <NavLink to='./'><img onClick={logoClick} src ='./assets/images/Logo.png' className='logo'></img></NavLink>
            <NavLink to='./rooms'>Rooms</NavLink>
        </header>
    );
}