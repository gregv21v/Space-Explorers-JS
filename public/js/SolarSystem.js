define(
  ["d3", "celestialBodies/Planet", "celestialBodies/Sun", "spaceships/SpaceShip"],
  function(d3, Planet, Sun, SpaceShip) {
    /**
      World - contains all the game objects
    */
    return class SolarSystem {
      /**
       * constructor()
       * @description constructs the world
       * @param player the player in the world
       */
       constructor(position, player) {
         this._player = player;


         this._svg = {
           group: d3.create("svg:g")
         }
         this._sun = new Sun(position, 40, 80);
         this._sun.addGraphicsTo(this._svg.group)
         this._sun.initSVG()

         this._spaceships = []
         this._planets = []




         let mercury = new Planet({x: position.x, y: position.y}, 10, 80)
         mercury.aOrbitRadius = 60

         let venus = new Planet({x: position.x, y: position.y}, 10, 80)
         venus.aOrbitRadius = 80
         venus.color = "lightblue"

         let earth = new Planet({x: position.x, y: position.y}, 10, 80)
         earth.aOrbitRadius = 100
         earth.color = "green"

         let jupiter = new Planet({x: position.x, y: position.y}, 20, 80)
         jupiter.aOrbitRadius = 130
         jupiter.color = "orange"

         let saturn = new Planet({x: position.x, y: position.y}, 20, 80)
         saturn.aOrbitRadius = 180
         saturn.color = "blue"

         let uranus = new Planet({x: position.x, y: position.y}, 10, 80)
         uranus.aOrbitRadius = 210
         uranus.color = "blue"

         let neptune = new Planet({x: position.x, y: position.y}, 10, 80)
         neptune.aOrbitRadius = 230
         neptune.color = "blue"

         let starterShip = new SpaceShip(
           earth,
           {x: window.innerWidth / 2, y: window.innerHeight / 2},
           5,
           10
         )

         this.addPlanet(mercury)
         this.addPlanet(venus)
         this.addPlanet(earth)
         this.addPlanet(jupiter)
         this.addPlanet(saturn)
         this.addPlanet(uranus)
         this.addPlanet(neptune)
         this.addSpaceShip(starterShip)
       }


       /**
        * addSpaceShip()
        * @description add a space ship to the solar system
        * @param spaceship the spaceship to add
        */
       addSpaceShip(spaceship) {
         this._spaceships.push(spaceship);

         spaceship.addGraphicsTo(this._svg.group)
         spaceship.initSVG();
       }

       /**
        * addPlanet()
        * @description adds a planet to the solarSystem
        * @param planet the planet to add to the solarSystem
        */
       addPlanet(planet) {
         this._planets.push(planet)

         planet.solarSystem = this;
         planet.addGraphicsTo(this._svg.group)
         planet.initSVG();
       }


       /**
        * zoom()
        * @description zooms in or out of on the solar system scaling by a factor
        *  of scale. Zoom in by giving a number above 1, and Zoom out by giving
        *  a number between 0 and 1
        * @param scale the factor to scale by zoom or out by
        */
       zoom(scale) {
         for (let spaceship of this._spaceships) {
           spaceship.scale(scale)
         }
         this._sun.radius *= scale;
         for (let planet of this._planets) {
           planet.aOrbitRadius *= scale;
           planet.radius *= scale;
         }
       }

       /********************************************************
                         Getters and Setters
       *********************************************************/


       /**
        * get sun
        * @description get the sun
        */
       get sun() {
         return this._sun;
       }

       /**
        * set sun
        * @description set the sun
        */
       set sun(value) {
         this._sun = value;
       }


       /**
        * update()
        * @description updates the graphics of the solarSystem
        */


       /**
        * initSVG()
        * @description initializes the svgs of the solarSystem
        */
        initSVG() {

        }

      /**
       * addGraphicsTo()
       * @description adds the graphics of this solarSystem to
       *  the given svg group
       * @param group the svg group to add the graphics to
       */
       addGraphicsTo(group) {
         group.append(() => this._svg.group.node())
       }


       /**
        * update
        * @description update the graphics of the solar system
        */
       update(time) {
         // for each planet in the solar system, update its position
         for (var i = 0; i < this._planets.length; i++) {
           this._planets[i].update(time, this);
         }

         for (var i = 0; i < this._spaceships.length; i++) {
           //this._spaceships[i].update()

           //this._spaceships[i].travelTo(this._planets[0])
           this._spaceships[i].orbit(time)
         }
       }
     }
  }
)
