define(
  ["d3", "game/PhysicsBody"],
  function(d3, PhysicsBody) {
    /**
      Planet
    */
    return class Planet extends PhysicsBody {
      /**
       * constructor()
       * @description constructs the Planet
       * @param position the position of the planet
       */
       constructor(position, radius, mass) {
         super(position, mass)
         this._solarSystem = null; // the solar system this planet is part of
         this._radius = radius; // the radius of the planet

         this._selected = false;

         this._color = "red"

         let svg = d3.select("body").select("svg")

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

          this._svg.circle.attr("r", this._radius)
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
         * set solarSystem
         * @description sets the solarSystem of this planet
         * @param value solarSystem to set to
         */
        set solarSystem(value) {
          this._solarSystem = value;
        }

        /**
         * get solarSystem
         * @description gets the solarSystem of this planet
         */
        get solarSystem() {
          return this._solarSystem;
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
           this.solarSystem.spaceship.travelTo(this)
           this._selected = !this._selected;
         }
    }
  }
)
