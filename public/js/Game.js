define(
  [
    "d3", "game/SolarSystem", "game/HUD", "game/Player",
    "celestialBodies/Planet"
  ],
  function(
    d3, SolarSystem, HUD, Player, Planet) {
    /**
      Game - the main entry point
    */
    return class Game {
      /**
       * constructor()
       * @description constructs the game
       */
       constructor() {


         this._svgMain = d3.select("body")
            .select("svg")

         this._width = window.innerWidth //this._svgMain.node().parentNode.clientWidth
         this._height = window.innerHeight //this._svgMain.node().parentNode.clientHeight

         this._player = new Player()
         this._solarSystem = new SolarSystem(
           {x: this.width/2, y: this.height/2}, this._player)
         this._hud = new HUD(this._player)
         this._time = 0;
         this._newPlanet = null;

         this._svgMain
            .attr("width", this.width)
            .attr("height", this.height)


         var self = this;

         var dragHandler = d3.drag()
          .on("start", function(event) {
           self.onDragStart(event)
          })
          .on("drag", function(event) {
           self.onDrag(event)
          })
          .on("end", function(event) {
           self.onDragEnd(event)
          })

        dragHandler(this._svgMain)

         window.addEventListener("resize", function() {
            self._svgMain
              .attr("width", self.width)
              .attr("height", self.height)

            //self.hud.resize()
          })

          window.addEventListener("wheel", function(event) {
            //console.log(event.deltaY);

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


      /********************************************************
                       Mouse Interactions
      *********************************************************/

      /**
       * onDrag()
       * @description the function that is called when you are dragging a
       *  unit
       */
       onDragStart(event) {
         this._newPlanet = new Planet(
           {x: event.x, y: event.y},
           3,
           0.003
         )

         this._newPlanet.initSVG()
         this._newPlanet.addGraphicsTo(this._svgMain)
         this._start = {x: event.x, y: event.y}
         this._velocityLine = this._svgMain
          .append("line")
            .attr("x1", event.x)
            .attr("y1", event.y)
            .attr("x2", event.x)
            .attr("y2", event.y)
            .style("stroke", "red")
       }


      /**
        onDrag()
        @description the function that is called when you are dragging a
          unit
      */
      onDrag(event) {
        // determine the velocity of the planet
        this._velocityLine
           .attr("x2", event.x)
           .attr("y2", event.y)

        this._newPlanet.velocity.x = (event.x - this._start.x) / 35
        this._newPlanet.velocity.y = (event.y - this._start.y) / 35
      }

      /**
        onDragEnd()
        @description the function that is called when you end dragging a
          unit
      */
      onDragEnd(event) {
        this._solarSystem.addPlanet(this._newPlanet)

        this._velocityLine.remove()
        this._newPlanet = null;
      }



       /**
        * initSVG()
        * @description initializes the svgs of the game
        */
        initSVG() {
          this._solarSystem.initSVG();
          this._solarSystem.addGraphicsTo(this._svgMain)

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
              self._solarSystem.update(3)

              time += tickSpeed
            },
            60 // fps
          )
        }
    }
  }
)
