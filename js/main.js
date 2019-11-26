var SuperBomberman = SuperBomberman || {};

var gameOptions = {
    
    //Add generic variables
    gameOffsetLeft:3,
    gameOffsetTop:2,
    gameWidth:17*16,
    gameHeight:13*16
};

//--LAYOUT_NUMBERS--//
{
    //si volem que es puguin veure els numeros posem aquesta variable a true
    var printLayoutNumbers = true;

    var layoutMap = [];
    for(var i = 0; i < 11; i++){
        for(var j = 0; j < 13; j++){
            if(i%2 == 0)
                layoutMap.push(0)
            else if(j % 2 == 0)
                layoutMap.push(0)
            else 
                layoutMap.push(1)
        }
    }
}

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
SuperBomberman.game.state.start(scenes[0]);