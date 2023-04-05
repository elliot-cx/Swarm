import ActiveRooms from '../../components/Room/ActiveRooms/ActiveRooms';
import NewRoom from '../../components/Room/NewRoom/NewRoom';
import Room from '../../components/Room/Room/RoomComponent';
import Section from '../../components/Section/Section';
import styles from './HomePage.module.css'

export default function HomePage(){
    const tutorial = () => {
        return(
            <div className={styles.tutorial}>
                <h2>Pour <b>commencer</b></h2>
                <p>Depuis la section de droite ou depuis la page rooms, <b>ajouter des rooms</b> en renseignant un nom et le code fourni par JKLM</p>
                <p>Attention, cette application de crée pas de parties sur JKLM. Par rooms, nous entendons les parties gérées par Swarm.</p>
                <h3>Ajouter des bots</h3>
                <p>Après avoir créé une room, vous pourrez la selectionner et l'administrer.</p>
                <p>Ajoutez jusqu'à 16 bots du type de votre choix et <b>envoyez la sauce</b> !</p>
                <h4>Etat des bots et contrôle de leurs actions</h4>
                <p>Swarm affiche en temps réel <b>l'état de chaque bot</b> (connecte, banni, déconnecté etc..)</p>
            </div>
        )
    }
    return(
    <main id={styles.homeRoot}>
        <Section 
            title1='Bienvenue sur SwarmBot'
            title2= {<h2>Votre outil de <b>spam, troll et cheat</b> sur JKLM</h2>} 
            text="Cette application vous permet de contrôler jusqu'à 16 bots de différents types : spam, cheat et bientôt tracker."
            contentChildrenNodes={[
                tutorial()
            ]}></Section>
        <Section title1="Rooms actives" contentChildrenNodes={[<ActiveRooms></ActiveRooms>,<NewRoom></NewRoom>]}></Section>
    </main>
    );
}