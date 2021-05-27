define(
  ["d3", "celestialBodies/Planet"],
  function(d3, Planet) {
    /**
      Sun
    */
    return class Sun extends Planet {
      /**
       * constructor()
       * @description constructs the Sun
       * @param position the position of the planet
       */
       constructor(position, radius) {
         super(position, radius, 1600)

         this._color = "yellow"
       }



    }
  }
)
