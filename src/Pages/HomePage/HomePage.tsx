import { useState } from 'react';
import ActiveRooms from '../../components/Room/ActiveRooms/ActiveRooms';
import NewRoom from '../../components/Room/NewRoom/NewRoom';
import Section from '../../components/Section/Section';
import styles from './HomePage.module.css';

export default function HomePage(){

    const [newRoomCode, setNewRoomCode] = useState<string>('');

    const tutorial = () => {
        return(
            <div className={styles.tutorial}>
                <h2>Pour commencer</h2>
                <p>Depuis la section de droite ou depuis la page rooms, <b>ajouter des rooms</b> en renseignant un nom et le code fourni par JKLM</p>
                <p>Attention, cette application de crée pas de parties sur JKLM. Par rooms, nous entendons <b>les parties gérées par Swarm</b>.</p>
                <h3>Ajouter des bots</h3>
                <p>Après avoir créé une room, vous pourrez la <b>selectionner et l&apos;administrer</b>.</p>
                <p>Ajoutez jusqu&apos;à 16 bots (par room) du type de votre choix et <b>envoyez la sauce</b> !</p>
                <h4>Etat des bots et contrôle de leurs actions</h4>
                <p>Swarm affiche en temps réel <b>l&apos;état de chaque bot</b> (connecté, banni, déconnecté etc..)</p>
            </div>
        );
    };
    return(
        <main id={styles.homeRoot}>
            <Section 
                title1= {<>Bienvenue sur <b>SwarmBot</b></>}  
                title2= {<h2>Votre outil de <b>spam, troll et cheat</b> sur JKLM</h2>} 
                classNames={[styles.homeSection]}
                text='Cette application vous permet de contrôler jusqu&apos;à 16 bots de différents types : spam, cheat et bientôt tracker.'
                contentChildrenNodes={tutorial()}></Section>
            <Section title1='Rooms actives' contentChildrenNodes = {
                <><NewRoom setNewRoomCode={setNewRoomCode}></NewRoom><ActiveRooms newRoomCode={newRoomCode}></ActiveRooms></>
            }></Section>
        </main>
    );
}