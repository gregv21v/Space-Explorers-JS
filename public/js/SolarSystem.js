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

         this._spaceships = []
         this._planets = []

         let mercury = new Planet({x: position.x, y: position.y}, 10, 0.005)

         let venus = new Planet({x: position.x, y: position.y}, 10, 0.005)
         venus.color = "lightblue"

         let earth = new Planet({x: position.x, y: position.y}, 10, 0.002)
         earth.color = "green"

         let jupiter = new Planet({x: position.x, y: position.y}, 20, 0.003)
         jupiter.color = "orange"

         let saturn = new Planet({x: position.x, y: position.y}, 20, 0.005)
         saturn.color = "blue"

         let uranus = new Planet({x: position.x, y: position.y}, 10, 0.006)
         uranus.color = "blue"

         let neptune = new Planet({x: position.x, y: position.y}, 10, 0.0001)
         neptune.color = "blue"


         let starterShip = new SpaceShip(
           earth,
           {x: window.innerWidth / 2, y: window.innerHeight / 2},
           20,
           0.000001 // the mass of the spaceship is really small compared to that of the planets
         )

         this.addPlanet(mercury)
         this.addPlanet(venus)
         this.addPlanet(earth)
         this.addPlanet(jupiter)
         this.addPlanet(saturn)
         this.addPlanet(uranus)
         this.addPlanet(neptune)

         for (var i = 0; i < this._planets.length; i++) {
           this._planets[i].position.x += i * 80;
           this._planets[i].velocity.y = Math.random() * (1.0 - 0.5) + 0.5;
         }

         starterShip.position.x = starterShip.planet.position.x + 2

         this.addPlanet(this._sun)
         this.addSpaceShip(starterShip)


       }


       /**
        * addSpaceShip()
        * @description add a space ship to the solar system
        * @param spaceship the spaceship to add
        */
       addSpaceShip(spaceship) {
         this._spaceships.push(spaceship);

         spaceship.initSVG();
         spaceship.addGraphicsTo(this._svg.group)
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
        * @description simulate the physics of the solar system
        * @param speed the speed of the Physics simulation
        */
       update(speed) {
         // for each planet in the solar system, calculate the forces on
         // it and update its position
         for (var i = 0; i < this._planets.length; i++) {
           // sum the forces on an body
           var forcesSum = {x: 0, y: 0}
           for (var j = 0; j < this._planets.length; j++) {
             if(i != j) {
               var force = this._planets[i].getForceBetween(this._planets[j])
               forcesSum.x += force.x
               forcesSum.y += force.y
             }
           }
           this._planets[i].applyForce(forcesSum)
           this._planets[i].update(speed)
         }

         //this._spaceships[0].travelTo(this._planets[2])
       }
     }
  }
)
