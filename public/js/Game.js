define(
  [
    "d3", "game/SolarSystem", "game/HUD", "game/Player",
    "game/PhysicsBody"
  ],
  function(
    d3, SolarSystem, HUD, Player, PhysicsBody) {
    /**
      Game - the main entry point
    */
    return class Game {
      /**
       * constructor()
       * @description constructs the game
       *
       */
       constructor() {
         this._player = new Player()
         this._solarSystem = new SolarSystem({x: window.innerWidth/2, y: window.innerHeight/2}, this._player)
         this._hud = new HUD(this._player)
         this._bodies = [
           new PhysicsBody(
             {
               x: window.innerWidth / 2,
               y: window.innerHeight / 2
             },
             1600
           ),
           new PhysicsBody(
             {
               x: window.innerWidth / 2 - 330,
               y: window.innerHeight / 2
             },
             0.005
           ),
           new PhysicsBody(
             {
               x: window.innerWidth / 2 + 220,
               y: window.innerHeight / 2
             },
             0.002
           ),
           new PhysicsBody(
             {
               x: window.innerWidth / 2 - 100,
               y: window.innerHeight / 2
             },
             0.0005
           )
         ]

         this._bodies[1].velocity.y = 0.64;
	       this._bodies[2].velocity.y = 0.8;
	       this._bodies[3].velocity.y = 1.2;
         this._time = 0;

         this._svgMain = d3.select("body")
            .select("svg")
            .attr("width", this.width)
            .attr("height", this.height)

         var self = this;

         this._svgMain.on("click", function(event) {
           var newBody = new PhysicsBody(
             {x: event.x, y: event.y},
             0.003
           )
           newBody.initSVG()
           newBody.addGraphicsTo(self._svgMain)
           self._bodies.push(newBody);
         })

         window.addEventListener("resize", function() {
            self._svgMain
              .attr("width", self.width)
              .attr("height", self.height)

            //self.hud.resize()
          })

          window.addEventListener("wheel", function(event) {
            console.log(event.deltaY);

            if(event.deltaY < 0) {
              self._solarSystem.zoom(2)
            } else {
              self._solarSystem.zoom(0.5)
            }
          })
        }

      /**
        get height
        @description gets the height of the game window
      */
      get height() {
        //console.log("Height: " + window.innerHeight);
        return window.innerHeight
      }

      /**
        get width
        @description gets the width of the game window
      */
      get width() {
        //console.log("Width: " + window.innerWidth);
        return window.innerWidth;
      }


       /**
        * initSVG()
        * @description initializes the svgs of the game
        */
        initSVG() {
          //this._solarSystem.initSVG();
          //this._solarSystem.addGraphicsTo(this._svgMain)

          for (var body of this._bodies) {
            body.initSVG()
            body.addGraphicsTo(this._svgMain)
          }

          //this._hud.initSVG();
          //this._hud.addGraphicsTo(main)
        }

        /**
         * update()
         * @description updates the game
         */
        update() {
          var self = this;
          var time = 0;
          var tickSpeed = 0.1



          setInterval(
            function() {
              self._solarSystem.update(time)
              for (var i = 0; i < self._bodies.length; i++) {
                // sum the forces on an body
                var forcesSum = {x: 0, y: 0}
                for (var j = 0; j < self._bodies.length; j++) {
                  if(i != j) {
                    var force = self._bodies[i].getForceBetween(self._bodies[j])
                    forcesSum.x += force.x
                    forcesSum.y += force.y
                  }
                }
                self._bodies[i].applyForce(forcesSum)
                self._bodies[i].update(3)
              }
              time += tickSpeed
            },
            60 // fps
          )
        }
    }
  }
)
