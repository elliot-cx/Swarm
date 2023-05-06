import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header(){
    const logoClick = () =>{
        window.location.href='./';
    };

    return(
        <header id={styles.headerRoot}>    
            <Link className={styles.logo} to='./'><img alt="Swarm Bot"onClick={logoClick} src ='./assets/images/Logo.png'></img></Link>
            <Link className={styles.navButton} to='./'>Home</Link>
        </header>
    );
}