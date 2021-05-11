define(
  ["d3", "planets/Planet", "planets/Sun", "spaceships/SpaceShip"],
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

         this.addSpaceShip(
           new SpaceShip(
             {x: window.innerWidth / 2, y: window.innerHeight / 2},
             5,
             100
           )
        )

         let planet1 = new Planet({x: position.x + 40, y: position.y + 40}, 16, 80)
         planet1.color = "blue"
         planet1.aOrbitRadius = 40 + 80
         this.addPlanet(planet1)
         this.addPlanet(new Planet({x: position.x + 40, y: position.y + 40}, 20, 100))
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

         planet.addGraphicsTo(this._svg.group)
         planet.initSVG();
       }


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
       update() {
         // for each planet in the solar system, update its position
         var self = this;
         setInterval(
           function() {
             for (var i = 0; i < self._planets.length; i++) {
               self._planets[i].update(self);
             }

             for (var i = 0; i < self._spaceships.length; i++) {
               self._spaceships[i].update()

               self._spaceships[i].moveTowards(self._planets[0])
             }
           },
           60
         )
       }
     }
  }
)
