define(
  ["spaceships/SpaceShip"],
  function(SpaceShip) {
    /**
      Player - the player playing the game
    */
    return class Player {
      /**
       * constructor()
       * @description constructs the player
       *
       */
       constructor() {
         this.spaceship = new SpaceShip(
           {x: window.innerWidth / 2, y: window.innerHeight / 2},
           5,
           100
         )
       }
    }
  }
)
