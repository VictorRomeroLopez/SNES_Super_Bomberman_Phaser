var SuperBomberman = SuperBomberman || {}

SuperBomberman.level1 = {
    
    init:function()
    {
        console.log("init")
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
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
	this.load.spritesheet('bomberman','assets/Bomberman/white_bomberman.png', 16, 24);
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
        
        
	this.map.setCollisionBetween(1,8,true,'Exterior_Walls');
	this.map.setCollisionBetween(11,13,true,'Exterior_Walls');
	this.map.setCollisionBetween(1,8,true,'Interior_Walls');
	this.map.setCollisionBetween(11,13,true,'Interior_Walls');

	//Creem Player
	this.player = new SuperBomberman.player_setup(this.game, gameOptions.gameWidth/6, 		gameOptions.gameHeight/6, 1, this);
	this.game.physics.arcade.enable(this.player);


	
	}
        
    },
    
    update:function()
    {
        console.log("update")
	this.physics.arcade.collide(this.player, this.exteriorWalls);
    	this.physics.arcade.collide(this.player, this.interiorWalls);
    }
}