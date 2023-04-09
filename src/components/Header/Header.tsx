import { Link } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header(){
    const logoClick = (e:any)=>{
        window.location.href='./'
    }
    const navButtonClick = (e:Event) =>{
        let target = e.target as any;
        if(target) target.classList.add('clicked');
    }

    return(
        <header id={styles.headerRoot}>    
            <Link className={styles.logo} to='./'><img alt="Swarm Bot"onClick={logoClick} src ='./assets/images/Logo.png'></img></Link>
            <Link className={styles.navButton} to='./'>Home</Link>
        </header>
    );
}