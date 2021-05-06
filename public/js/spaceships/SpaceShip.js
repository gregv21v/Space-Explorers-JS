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
       * @param position the position of the planet
       */
       constructor(position, radius, mass) {
         this._position = position; // the position of the SpaceShip
         this._radius = radius; // the radius of the SpaceShip
         this._mass = mass; // mass of the SpaceShip
         this._velocity = {x: 0.1, y: 0.1} // directional velocity
         this._speed = 0.5;
         this._acceleration = {x: 0, y: 0}

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

          path.moveTo(this._position.x, this._position.y)
          path.lineTo(this._position.x + 10, this._position.y + 20)
          path.lineTo(this._position.x - 10, this._position.y + 20)
          path.lineTo(this._position.x, this._position.y)

          this._svg.triangle
            .attr("d", path)
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
          * moveTowards()
          * @description move towards a given planet
          * @param planet the planet to move towards
          */
         moveTowards(planet) {
           let dx = planet.position.x - this.position.x
           let dy = planet.position.y - this.position.y
           let angle = Math.atan(dy, dx)

           this._velocity.x = this._speed * Math.cos(angle)
           this._velocity.y = this._speed * Math.sin(angle)
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


    }
  }
)
