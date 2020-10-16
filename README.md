# Prueba Frontend Global66

## Project setup
```
yarn install
yarn serve
```
## Detalles 
* La aplicacion fue creada utilizando VueJS + Vuex
* Se implementó la pantalla de carga. Debido a que los tiempos de carga son casi imperceptibles, es difícil observarlo en funcionamiento el 100% de las veces.
* Se le agregó un efecto visual a la pantalla de carga
* El botón de compartir, copia los datos solicitados en el portapapeles
* Para la persistencia de datos, se guardó en el lado del cliente (Tienda), también usé Vuex para demostrar mi conocimiento en la sección de majo de estados. Se aplicó la metodología, arquitectura y orden que tienen los proyectos profesionales de gran envergadura.
* El diseño y la organización del proyecto utilizan las mejores prácticas
## Resumen de mis Decisiones
* En la vista P3-EmptyList, omití el botón "back to home" porque hace que la interacción sea confusa.
* Agregue pequeñas  animaciones lo bastante sutiles como para que le den un toque vistoso a la página
* El modal se ejecuta con las mejores practicas utilizando el manejo de estados.
## Detalles para grandes cantidades de datos
1. Primero que nada es bueno conocer el volumen de datos con el que se trebajara, puede que este sea fijo o que vaya creciendo con el tiempo. 
2. Despues se considera el tamaño total o un aproximado
3. Si los volumenes son muy pocos y la interacción no requiere mayor trabajo computacionál , se procede a guardar/trabajar en el lado del cliente, lo que se le conoce como el client-side-rendering
4. En caso sean volumenes grandes de data , se procede a trabajar con el servidor, haciendo que este adminstre toda la data , lo que se conoce como server-side-rendering.
5. Para mejorar la experiencia del usuario se puede idear una forma de utilizar el cache según las necesidades del programa. (cuando se trabaja con server-side-rendering)

Para este caso en particular  (pokedex), suponiendo que los datos son muchos, yo propondria hacer un barrido de todos la data al inicio de nuestra aplicacion para poder almacenarla en nuestra BD (suponiendo  que no crecera mas la cantidad de pokemones). Esto porque al tener nuestro buscador, este deberia poder buscar entre todos los pokemones y no solo en los que estan presentes en la pagina.
Y para mostrarlos, se puede utilizar la paginación y enviarle offsets pequeños (tal vez de 20 pokemones) para mostrarlos al usuario por cada pagina.

## Extras
La aplicación esta desplegada para que puedan probarla en el siguiente link [link](https://pokedex-global66.herokuapp.com)

