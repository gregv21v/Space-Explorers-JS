/**
 * PhysicsBody - a body governed by the laws of Physics.
 */
 define(
   [
     "d3"
   ],
   function(d3) {
     return class PhysicsBody {

       static G = 0.1;
       /**
        * constructor()
        * @description constructs the PhysicsBody
        * @param position the position of the PhysicsBody
        * @param mass the mass of the PhysicsBody
        */
       constructor(position, mass) {
         this._position = position;
         this._mass = mass

         this._velocity = {x: 0, y: 0} // the current velocity of the PhysicsBody
         this._acceleration = {x: 0, y: 0} // the current acceleration

         //// Graphics ////
         this._color = "red"
         this._radius = 5;

         this._svg = {
           group: d3.create("svg:g"),
           circle: null
         }
         this._svg.circle = this._svg.group.append("circle")
       }




       /**
        * applyForce()
        * @description apply a force to the PhysicsBody
        * @param force the force to apply to the PhysicsBody
        */
       applyForce(force) {
         this._acceleration.x = force.x / this.mass
         this._acceleration.y = force.y / this.mass
       }

       /**
        * distanceBetween()
        * @description get the distance between this body and another
        * @param body the other body
        */
       getDistanceBetween(body) {
         return (
           Math.sqrt(
             Math.pow(this.position.x - body.position.x, 2) +
             Math.pow(this.position.y - body.position.y, 2)
           )
         )
       }

       /**
        * getForceBetween()
        * @description get the force between this PhysicsBody and another
        * @param body the other PhysicsBody
        */
        getForceBetween(body) {
          let distance = this.getDistanceBetween(body)
          let dx = body.position.x - this.position.x
          let dy = body.position.y - this.position.y
          let forceMagnitude = 0;
          if(distance != 0) {
            forceMagnitude = (PhysicsBody.G * this.mass * body.mass) / (distance * distance)
          }

          // find the forces angle
          let angle = Math.atan2(dy, dx)

          return {
            x: forceMagnitude * Math.cos(angle),
            y: forceMagnitude * Math.sin(angle)
          }
        }

        /**
         * update()
         * @description update the PhysicsBody every tick
         * @param speed speed of planets movement
         */
         update(speed) {
           this._velocity.x += this._acceleration.x * speed
           this._velocity.y += this._acceleration.y * speed

           this.position = {
             x: this.position.x + this._velocity.x * speed,
             y: this.position.y + this._velocity.y * speed
           }

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
        * get velocity
        * @description gets the velocity of the PhysicsBody
        */
        get velocity() {
          return this._velocity;
        }

      /**
       * set velocity
       * @description sets the velocity of the PhysicsBody
       * @param value the value to set the velocity to
       */
       set velocity(value) {
         this._velocity = value;
       }

       /**
        * get acceleration
        * @description gets the acceleration of the PhysicsBody
        */
        get acceleration() {
          return this._acceleration;
        }

      /**
       * set acceleration
       * @description sets the acceleration of the PhysicsBody
       * @param value the value to set the acceleration to
       */
       set acceleration(value) {
         this._acceleration = value;
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


     }
   }
 )
