var bird = require("../assets/bird.png");
var pipe = require("../assets/pipe.png");

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.image('bird', bird);
        game.load.image('pipe', pipe);
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#71c5cf';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
    },


    // Make the bird jump
    jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
      // console.log(">> add one pipe");
      var pipe = game.add.sprite(x, y, 'pipe');

      this.pipes.add(pipe);

      game.physics.arcade.enable(pipe);

      pipe.body.velocity.x = -200;

      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {

      var hole = Math.floor(Math.random() * 5) + 1;
      console.log("HOLE", hole);

      for(var i = 0; i < 8; i++)
        if(i != hole && i != hole + 1)
          this.addOnePipe(400, i * 60 + 4);
    }


};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);
