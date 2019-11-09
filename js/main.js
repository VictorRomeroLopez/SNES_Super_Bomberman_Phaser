var SuperBomberman = SuperBomberman || {};

var gameOptions = {
  //Add generic variables   
    gameWidth:1000,
    gameHeight:1000
};

SuperBomberman.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, null, this, false, false);

SuperBomberman.game.state.add('main', SuperBomberman.levelProva);
SuperBomberman.game.state.start('main');
