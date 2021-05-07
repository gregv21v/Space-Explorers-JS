define(
  ["d3", "game/SolarSystem", "game/HUD", "game/Player"],
  function(d3, SolarSystem, HUD, Player) {
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

         this._svgMain = d3.select("body")
            .select("svg")
            .attr("width", this.width)
            .attr("height", this.height)

         var self = this;

         window.addEventListener("resize", function() {
            self._svgMain
              .attr("width", self.width)
              .attr("height", self.height)

            //self.hud.resize()
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
          this._solarSystem.initSVG();
          this._solarSystem.addGraphicsTo(this._svgMain)
          this._solarSystem.update()

          this._hud.initSVG();
          //this._hud.addGraphicsTo(main)
        }
    }
  }
)
