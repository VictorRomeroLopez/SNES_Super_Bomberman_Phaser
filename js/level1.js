var SuperBomberman = SuperBomberman || {}

SuperBomberman.level1 = {
    
    init:function()
    {
        console.log("init")
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    
    preload:function()
    {
        console.log("preload")
        
        //---region LOAD_TILESET_IMAGES---//
        {
        this.load.image('buildings', "assets/levels/Pace_town.png");
        this.load.image('destroyables', "assets/levels/Pace_town_destroyable.png");
        this.load.tilemap('level1','assets/Tiled/level1.json', null, Phaser.Tilemap.TILED_JSON);
        }

	//---region LOAD_SPRITESHEET_IMAGES---//
        {
	this.load.spritesheet('bomberman','assets/Bomberman/white_bomberman.png', 16, 25);
	}
    },
    
    create:function()
    {
        console.log("create")
        
        //---region ADD_IMAGES_TO_TILEMAP---//
        {
        this.map = this.game.add.tilemap('level1')
        
        //agreguem els spritesheets al map
        this.map.addTilesetImage('buildings')
        this.map.addTilesetImage('destroyables')
        
        //creem les layers al map
        this.exteriorWalls  = this.map.createLayer('Exterior_Walls')
        this.interiorWalls  = this.map.createLayer('Interior_Walls')
        this.floor          = this.map.createLayer('Floor')
        
        //Escalat de les diferents layers del map
        this.exteriorWalls.scale    = new PIXI.Point(gameOptions.gameScale,gameOptions.gameScale);
        this.interiorWalls.scale    = new PIXI.Point(gameOptions.gameScale,gameOptions.gameScale);
        this.floor.scale            = new PIXI.Point(gameOptions.gameScale,gameOptions.gameScale);
        
	//Creem Player
	this.player = new SuperBomberman.player_setup(this.game, gameOptions.gameWidth/2, 		gameOptions.gameHeight/2, 1, this);
	
	//Escalem Player
	this.player.scale = new PIXI.Point(gameOptions.gameScale,gameOptions.gameScale);
	}
        
    },
    
    update:function()
    {
        console.log("update")
    }
}