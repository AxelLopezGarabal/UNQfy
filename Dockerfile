FROM node:8
# Utiliza la imagen de node 8 como base.
# A partir de esta imagen se ejecutarán los comandos de abajo creando una nueva imagen.

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/UNQfy

# Copia el package.json package-lock.json en /home/node/my_node_app
COPY package.json .
COPY package-lock.json .

ADD . / /home/node/UNQfy/

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 5000 donde corre la aplicación
EXPOSE 5000

# Copia los fuentes dentro del container
#COPY server.js /home/node/my_node_app/


# Le da permisos al usuario node para escribir en /home/node/my_node_app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
#RUN chown -R node:users /home/node/UNQfy
#RUN chmod -R 777 /home/node/UNQfy
# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER root

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "node", "server" ]

# LISTO!


# Para construir la imagen
# docker build -t <nombre_de_la_imagen> .

# Para correr el container
# docker run -p 5000:5000 --name <nombre_container> --user node <nombre_de_la_imagen>
