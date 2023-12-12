<p align="center">
    <img src="./assets/hornet.svg" height="200px">
    <h1 align="center">Swarm</h1>
</p>

<p align="center">
    <a href="">
        <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
    </a>
    <a href="">
        <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    </a>
    <a href="">
        <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white">
    </a>
    <a href="">
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    </a>
</p>
**Swarm** est une application développée en **[TypeScript](https://www.typescriptlang.org/)** qui facilite l'instanciation et la gestion de bots sur la plateforme **[JKLM.FUN](jklm.fun)**. Avec une interface graphique en **[React](https://legacy.reactjs.org/)** et une API robuste, **Swarm** offre la possibilité aux développeurs de créer et de contrôler facilement leurs propres bots.

## 🎯 Features

* **Gestion Multi-Salons :** Swarm permet la gestion simultanée de plusieurs salons.
* **Ajout de Bots Variés :** Intégrez différents types de bots, tels que Spam Bot, Responder Bot, Osint Bot, et Command Bot.
* **Authentification [Discord](https://en.wikipedia.org/wiki/Discord) :** Système d'authentification [Discord](https://en.wikipedia.org/wiki/Discord) pour les bots.
* **Bypass [ReCaptcha](https://wikipedia.org/wiki/ReCAPTCHA) :** Intégration d'un système de contournement [ReCaptcha](https://fr.wikipedia.org/wiki/ReCAPTCHA).
* **Reconnexion Automatique :** Les bots se reconnectent automatiquement en cas de déconnexion.
* **Prise en Charge de [Proxy](https://en.wikipedia.org/wiki/Proxy_server) :** Swarm gère la prise en charge de [proxy](https://en.wikipedia.org/wiki/Proxy_server), permettant l’invocation de plus de **100** bots simultanément avec un [proxy](https://en.wikipedia.org/wiki/Proxy_server).
* **Système Anti-Ban :** Intégration d'un système anti-ban avec l'utilisation de [proxy](https://en.wikipedia.org/wiki/Proxy_server).
* **Hébergement sur Serveur :** Peut être facilement hébergé sur un serveur avec une configuration de [proxy](https://en.wikipedia.org/wiki/Proxy_server).

## 🤖 Types de Bots

* **Spam Bot :** Bot simple spécialisé dans le spam rapide du chat.
* **Responder Bot :** Répond automatiquement à tous les joueurs dans le chat avec un message prédéfini après un certain délai.
* **Osint Bot :** Enregistre les messages envoyés par un utilisateur spécifié pour une analyse ultérieure.
* **Command Bot :** Permet d'exécuter des commandes à l'aide de la syntaxe `/nom_de_la_commande` dans les salons où il est modérateur.

## ⚡️Installation

Tout d’abord il faut cloner le projet

```bash
git clone https://github.com/elliot-cx/Swarm.git
```

Ensuite, une fois dans le dossier du projet il n’y a plus qu’à installer les dépendances et lancer le projet :

```bash
npm i
npm run start
```