# Utiliser l'image officielle de Node.js version 20.10.0
FROM node:20.10.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposer le port utilisé par votre application
EXPOSE 6969

# Définir les variables d'environnement
ENV PORT=6969 \
    PROXY="" \
    WEBHOOK=""

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]