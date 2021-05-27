define(
  ["d3", "game/PhysicsBody"],
  function(d3, PhysicsBody) {
    /**
      Planet
    */
    return class SpaceShip extends PhysicsBody {
      /**
       * constructor()
       * @description constructs the Planet
       * @param planet the planet this SpaceShip is orbiting
       * @param position the position of the planet
       * @param size the size dimension of this SpaceShip
       * @param mass the mass of this space ship
       */
       constructor(planet, position, size, mass) {
         super(position, mass)
         this._planet = planet;
         this._size = size; // the size of the SpaceShip
         this._velocity = {x: 0.0, y: 0.0} // directional velocity
         this._acceleration = {x: 0, y: 0}
         this._speed = 0.5;
         this._angle = 0;

         this._color = "blue"

         this._svg = {
           group: d3.create("svg:g"),
           hull: null,
           backRocket1: null,
           backRocket2: null,
           leftRocket: null,
           rightRocket: null
         }
         this._svg.hull = this._svg.group.append("path")
         this._svg.backRocket1 = this._svg.group.append("path")
         this._svg.backRocket2 = this._svg.group.append("path")
         this._svg.leftRocket = this._svg.group.append("path")
         this._svg.rightRocket = this._svg.group.append("path")
       }


       /**
        * initSVG()
        * @description initializes the svgs of the world
        */
        initSVG() {
          let triangleHeight = this._size * Math.cos(30 * (Math.PI / 180))

          let hull = d3.path();

          hull.moveTo(0, 0)
          hull.lineTo(
            this._size,
            triangleHeight
          )
          hull.lineTo(
            -this._size,
            triangleHeight
          )
          hull.lineTo(0, 0)

          this._svg.hull
            .attr("d", hull)
            .attr(
              "transform",
              "translate(" + this._position.x + ", " + this._position.y + ") rotate(" + this._angle + ")")
            .style("fill", this._color)

          let backRocket1 = d3.path()

          backRocket1.moveTo(
            -this._size / 4,
            triangleHeight + triangleHeight/2
          )
          backRocket1.lineTo(
            
          )

          this._svg.backRocket1
            .attr("d", backRocket1)
            .attr(
              "transform",
              "translate(" + this._position.x + ", " + this._position.y + ") rotate(" + this._angle + ")")
            .style("fill", "red")
        }



        /**
         * scale()
         * @description scale the size of the spaceship by a factor of scale
         * @param amount the factor to scale the ship by
         */
        scale(amount) {
          this._size *= amount;

          this._svg.hull
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
         * applyBackwardThrust()
         * @description apply a rocket thrust out the front of this spaceship
         * @param amount the amount of thrust to apply
         */
         applyBackwardThrust(amount) {

         }

       /**
        * applyLeftThrust()
        * @description apply a rocket thrust out the left of this spaceship
        * @param amount the amount of thrust to apply
        */
        applyLeftThrust(amount) {

        }

        /**
         * applyRightThrust()
         * @description apply a rocket thrust out the right of this spaceship
         * @param amount the amount of thrust to apply
         */
         applyRightThrust(amount) {

         }

       /**
        * applyForwardThrust()
        * @description apply a rocket thrust out the back of this spaceship
        * @param amount the amount of thrust to apply
        */
        applyForwardThrust(amount) {

        }



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

          this._svg.hull
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
