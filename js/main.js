var SuperBomberman = SuperBomberman || {};

var gameScale = 4

var gameOptions = {
    //Add generic variables
    gameScale:this.gameScale,
    gameWidth:17*16*this.gameScale,
    gameHeight:13*16*this.gameScale
};

SuperBomberman.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, null, this, false, false);

//Aqui posem les diferents escenes que volem tenir
SuperBomberman.game.state.add('main', SuperBomberman.mainMenu);
SuperBomberman.game.state.add('level1', SuperBomberman.level1);
SuperBomberman.game.state.add('levelProba', SuperBomberman.levelProva);

//Array de escenes per no tenir que anar posant en nom a l'escena que volem testejar
//Posem el comentari al cosat per saber rapidament quin és l'id de l'escena volem carregar
var scenes = ['main'/*0*/, 
              'level1'/*1*/, 
              'levelProba'/*2*/
             ]

//Aquesta es la escena amb la que inicia el joc
SuperBomberman.game.state.start(scenes[1]);