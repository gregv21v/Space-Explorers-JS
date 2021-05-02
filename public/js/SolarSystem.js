define(
  ["d3", "planets/Planet", "planets/Sun"],
  function(d3, Planet, Sun) {
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
         this._sun = new Sun(position, 10, 40);
         this._sun.addGraphicsTo(this._svg.group)
         this._sun.initSVG()

         this._planets = []
         let planet1 = new Planet({x: position.x + 20, y: position.y + 20}, 4, 40)
         planet1.color = "blue"
         planet1.distanceFromSun = 40
         this.addPlanet(planet1)
         this.addPlanet(new Planet({x: position.x + 30, y: position.y + 20}, 5, 50))
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
         function genOrbitBodyFunc(sun, planet) {
           // original code from here:
           //   https://nbodyphysics.com/blog/2016/05/29/planetary-orbits-in-javascript/


           var m = sun.mass + planet.mass // combined mass of sun and planet
           var x_offset = sun.position.x;
           var y_offset = sun.position.y;
           var b = 100;
           var e = 0.7;
           var time = 0;
           var focus_x = x_offset + planet.distanceFromSun*e;
           var focus_y = y_offset;

           var LOOP_LIMIT = 10;

           var orbitPeriod = 2.0 * Math.PI * Math.sqrt(Math.pow(planet.distanceFromSun, 3)/(m*m)); // G=1

           function orbitBody() {
               // 1) find the relative time in the orbit and convert to Radians
               let M = 2.0 * Math.PI * time/orbitPeriod;

               // 2) Seed with mean anomaly and solve Kepler's eqn for E
               let u = M; // seed with mean anomoly
               let u_next = 0;
               let loopCount = 0;
               // iterate until within 10-6
               while(loopCount++ < LOOP_LIMIT) {
                 // this should always converge in a small number of iterations - but be paranoid
                 u_next = u + (M - (u - e * Math.sin(u)))/(1 - e * Math.cos(u));
                 if (Math.abs(u_next - u) < 1E-6)
                    break;
                 u = u_next;
               }

                // 2) eccentric anomoly is angle from center of ellipse, not focus (where centerObject is). Convert
                // to true anomoly, f - the angle measured from the focus. (see Fig 3.2 in Gravity)
                var cos_f = (Math.cos(u) - e)/(1 - e * Math.cos(u));
                var sin_f = (Math.sqrt(1 - e*e) * Math.sin (u))/(1 - e * Math.cos(u));
                var r = planet.distanceFromSun * (1 - e*e)/(1 + e * cos_f);

                time = time + 1;
                // animate
                //console.log(self._planets[0].position);
                planet.position = {
                  x: sun.position.x + r * cos_f,
                  y: sun.position.y + r * sin_f
                }
                setTimeout(orbitBody, 60);
             }

             return orbitBody;
         }

         // for each planet in the solar system, update its position
         for (var i = 0; i < this._planets.length; i++) {
           genOrbitBodyFunc(this._sun, this._planets[i])()
         }
       }
     }
  }
)
