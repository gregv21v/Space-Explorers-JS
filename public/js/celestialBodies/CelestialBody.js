define(
  ["d3"],
  function(d3) {
    /**
      Planet
    */
    return class Planet {
      /**
       * constructor()
       * @description constructs the Planet
       * @param position the position of the planet
       */
       constructor(position, radius, mass) {
         this._position = position; // the position of the planet
         this._radius = radius; // the radius of the planet

         this._color = "red"
         this._svg = {
           group: d3.create("svg:g")
         }
         this._svg["circle"] = this._svg.group.append("circle")
       }


       /**
        * initSVG()
        * @description initializes the svgs of the world
        */
        initSVG() {
          this._svg.circle
            .attr("cx", this._position.x)
            .attr("cy", this._position.y)
            .attr("r", this._radius)
            .style("fill", this._color)
            .style("fill", "url(#planet-gradient)")

          let self = this;
          this._svg.circle.on("click", function() {
            self.onClick()
          })
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
          * orbitAround()
          * @description causes this planet to orbit around another celestial body
          *  in a circular orbit
          * @param celestialBody the celestialBody to orbit around
          * @param radius the radius between the center of the celestialBody, and
          *   and this celestialBody
          */
         orbitAround(celestialBody, radius) {

         }

        /**
         * update()
         * @description updates this planet
         */
        update(solarSystem) {
          // original code from here:
          //   https://nbodyphysics.com/blog/2016/05/29/planetary-orbits-in-javascript/

          var m = solarSystem.sun.mass + this.mass // combined mass of sun and planet
          var e = 0.7; // effects the shape of the
          var tickSpeed = 0.3

          var LOOP_LIMIT = 10;

          var orbitPeriod = 2.0 * Math.PI * Math.sqrt(Math.pow(this.aOrbitRadius, 3)/(m*m)); // G=1

          // 1) find the relative time in the orbit and convert to Radians
          let M = 2.0 * Math.PI * this._time/orbitPeriod;

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
           var r = this.aOrbitRadius * (1 - e*e)/(1 + e * cos_f);

           this._time = this._time + tickSpeed;
           // animate
           //console.log(self._planets[0].position);
           this.position = {
             x: solarSystem.sun.position.x + r * cos_f,
             y: solarSystem.sun.position.y + r * sin_f
           }

        }

        /********************************************************
                          Getters and Setters
        *********************************************************/

        /**
         * get radius
         * @description gets the radius of the planet
         */
        get radius() {
          return this._radius
        }

        /**
         * set radius
         * @description sets the radius of the planet
         * @param value the value to set the radius to
         */
        set radius(value) {
          this._radius = value
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

          this._svg.circle
            .attr("cx", this._position.x)
            .attr("cy", this._position.y)
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

        /**
         * get aOrbitRadius
         * @description gets the aOrbitRadius of the planet
         */
        get aOrbitRadius() {
          return this._aOrbitRadius
        }

        /**
         * set aOrbitRadius
         * @description sets the aOrbitRadius of the planet
         * @param value the value to set the aOrbitRadius to
         */
        set aOrbitRadius(value) {
          this._aOrbitRadius = value
        }

        /**
         * get bOrbitRadius
         * @description gets the bOrbitRadius of the planet
         */
        get bOrbitRadius() {
          return this._bOrbitRadius
        }

        /**
         * set bOrbitRadius
         * @description sets the bOrbitRadius of the planet
         * @param value the value to set the bOrbitRadius to
         */
        set bOrbitRadius(value) {
          this._bOrbitRadius = value
        }

        /**
         * select()
         * @description selects this planet
         */
        select() {
          this._svg.circle
            .style("stroke", "green")
            .style("stroke-width", 3)
        }

        /**
         * deselect()
         * @description deselects this planet
         */
        deselect() {
          this._svg.circle
            .style("stroke-width", 0)
        }


        /**
         * onClick()
         * @description triggered when the planet is clicked
         */
         onClick() {
           if(this._selected) {
             this.deselect()
           } else {
             this.select()
           }
           this._selected = !this._selected;
         }
    }
  }
)
