import { Link } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header(){
    const logoClick = (e:any)=>{
        window.location.href='./'
    }
    return(
        <header id={styles.headerRoot}>    
            <Link className={styles.logo} to='./'><img onClick={logoClick} src ='./assets/images/Logo.png'></img></Link>
            <Link to='./rooms'>Rooms</Link>
        </header>
    );
}