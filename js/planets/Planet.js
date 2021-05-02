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
         this._mass = mass; // mass of the planet
         this._distanceFromSun = 80; // the distance from sun

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
         * get distanceFromSun
         * @description gets the distanceFromSun of the planet
         */
        get distanceFromSun() {
          return this._distanceFromSun
        }

        /**
         * set distanceFromSun
         * @description sets the distanceFromSun of the planet
         * @param value the value to set the distanceFromSun to
         */
        set distanceFromSun(value) {
          this._distanceFromSun = value
        }
    }
  }
)
