define(
  ["d3"],
  function(d3) {
    /**
      Planet
    */
    return class SpaceShip {
      /**
       * constructor()
       * @description constructs the Planet
       * @param planet the planet this SpaceShip is orbiting
       * @param position the position of the planet
       * @param size the size dimension of this SpaceShip
       * @param mass the mass of this space ship
       */
       constructor(planet, position, size, mass) {
         this._planet = planet;
         this._position = position; // the position of the SpaceShip
         this._size = size; // the size of the SpaceShip
         this._mass = mass; // mass of the SpaceShip
         this._velocity = {x: 0.1, y: 0.1} // directional velocity
         this._speed = 0.5;
         this._acceleration = {x: 0, y: 0}
         this._angle = 45;

         this._color = "red"

         this._svg = {
           group: d3.create("svg:g"),
           triangle: null
         }
         this._svg.triangle = this._svg.group.append("path")
       }


       /**
        * initSVG()
        * @description initializes the svgs of the world
        */
        initSVG() {
          let path = d3.path();

          path.moveTo(0, 0)
          path.lineTo(0 + this._size, 0 + this._size * 2)
          path.lineTo(0 - this._size, 0 + this._size * 2)
          path.lineTo(0, 0)

          this._svg.triangle
            .attr("d", path)
            .attr(
              "transform",
              "translate(" + this._position.x + ", " + this._position.y + ") rotate(" + this._angle + ")")
            .style("fill", this._color)
        }

        /**
         * scale()
         * @description scale the size of the spaceship by a factor of scale
         * @param amount the factor to scale the ship by
         */
        scale(amount) {
          this._size *= amount;
          let path = d3.path();

          path.moveTo(0, 0)
          path.lineTo(0 + this._size, 0 + this._size * 2)
          path.lineTo(0 - this._size, 0 + this._size * 2)
          path.lineTo(0, 0)

          this._svg.triangle
            .attr("d", path)
            .attr(
              "transform",
              "translate(" + this._position.x + ", " + this._position.y + ") rotate(" + this._angle + ")")
        }

        /**
         * addGraphicsTo()
         * @description adds the graphics of this universe to
         *  the given svg group
         * @param group the svg group to add the graphics to
         */
         addGraphicsTo(group) {
           group.append(() => this._svg.group.node())
         }

         /**
          * update()
          * @description updates the spaceship
          */
         update() {
           this.position = {
             x: this.position.x + this._velocity.x,
             y: this.position.y + this._velocity.y
           }

           this._velocity.x += this._acceleration.x
           this._velocity.y += this._acceleration.y
         }


         /**
          * orbit()
          * @description orbits a particular planet
          * @param time the current tick
          */
         orbit(time) {
           // original code from here:
           //   https://nbodyphysics.com/blog/2016/05/29/planetary-orbits-in-javascript/

           var m = this._planet.mass + this.mass // combined mass of sun and planet
           var e = 0.0; // effects the shape of the
           let aOrbitRadius = this._planet.radius + this.size;

           var LOOP_LIMIT = 10;

           var orbitPeriod = 2.0 * Math.PI * Math.sqrt(Math.pow(aOrbitRadius, 3)/(m*m)); // G=1

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
            var r = aOrbitRadius * (1 - e*e)/(1 + e * cos_f);

            // animate
            //console.log(self._planets[0].position);
            this.position = {
              x: this._planet.position.x + r * cos_f,
              y: this._planet.position.y + r * sin_f
            }
         }




         /**
          * travelTo()
          * @description travel to a given planet
          * @param planet the planet to travel to
          */
         travelTo(planet) {
           let dx = planet.position.x - this.position.x
           let dy = planet.position.y - this.position.y
           this._angle = Math.atan(dy, dx) * 180 / Math.PI
           console.log(this._angle);

           this._velocity.x = this._speed * Math.cos(this._angle)
           this._velocity.y = this._speed * Math.sin(this._angle)
         }

         /**
          * displayPaths
          * @description display the paths to the other planets in
          *  the solar solar system.
          * @param solarSystem the solar system this spaceship is in
          */

        /********************************************************
                          Getters and Setters
        *********************************************************/

        /**
         * get planet
         * @description gets the current planet that this spaceship is orbiting
         */
        get planet() {
          return this._planet;
        }

        /**
         * set planet
         * @description sets the current planet that this spaceship is orbiting
         * @param value the planet to set the planet to
         */
        set planet(value) {
          this._planet = value
        }

        /**
         * get size
         * @description gets the size of the planet
         */
        get size() {
          return this._size
        }

        /**
         * set size
         * @description sets the size of the planet
         * @param value the value to set the size to
         */
        set size(value) {
          this._size = value
        }

        /**
         * get position
         * @description gets the position of the planet
         */
        get position() {
          return this._position
        }

        /**
         * set position
         * @description sets the position of the planet
         * @param value the value to set the position to
         */
        set position(value) {
          this._position = value

          let path = d3.path();

          path.moveTo(0, 0)
          path.lineTo(0 + this._size, 0 + this._size * 2)
          path.lineTo(0 - this._size, 0 + this._size * 2)
          path.lineTo(0, 0)

          this._svg.triangle
            .attr("d", path)
            .attr(
              "transform",
              "translate(" + this._position.x + ", " + this._position.y + ") rotate(" + this._angle + ")")
        }

        /**
         * get mass
         * @description gets the mass of the planet
         */
        get mass() {
          return this._mass
        }

        /**
         * set mass
         * @description sets the mass of the planet
         * @param value the value to set the mass to
         */
        set mass(value) {
          this._mass = value
        }

        /**
         * get color
         * @description gets the color of the planet
         */
        get color() {
          return this._color
        }

        /**
         * set color
         * @description sets the color of the planet
         * @param value the value to set the color to
         */
        set color(value) {
          this._color = value

          this._svg.circle.style("fill", value);
        }


    }
  }
)
