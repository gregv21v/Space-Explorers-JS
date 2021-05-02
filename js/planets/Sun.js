define(
  ["d3"],
  function(d3) {
    /**
      Sun
    */
    return class Sun {
      /**
       * constructor()
       * @description constructs the Sun
       * @param position the position of the planet
       */
       constructor(position, radius, mass) {
         this._position = position; // the position of the sun
         this._radius = radius; // the radius of the sun
         this._mass = mass; // mass of the sun

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
            .style("fill", "yellow")
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
        * @description gets the radius of the sun
        */
       get radius() {
         return this._radius
       }

       /**
        * set radius
        * @description sets the radius of the sun
        * @param value the value to set the radius to
        */
       set radius(value) {
         this._radius = value
       }

       /**
        * get position
        * @description gets the position of the sun
        */
       get position() {
         return this._position
       }

       /**
        * set position
        * @description sets the position of the sun
        * @param value the value to set the position to
        */
       set position(value) {
         this._position = value
       }

       /**
        * get mass
        * @description gets the mass of the sun
        */
       get mass() {
         return this._mass
       }

       /**
        * set mass
        * @description sets the mass of the sun
        * @param value the value to set the mass to
        */
       set mass(value) {
         this._mass = value
       }
    }
  }
)
