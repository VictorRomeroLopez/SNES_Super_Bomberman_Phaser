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
        console.log("preload");
        
        //---region FOLDERS_SPRITES---//
        {
            var levelsFolder = "assets/Levels/";
            var bombermanFolder = "assets/Bomberman/";
            var bombsFolder = bombermanFolder + "Bombs/";
        }
        
        //---region LOAD_TILESET_IMAGES---//
        {
            this.load.image('buildings', levelsFolder + "Pace_town.png");
            this.load.image('destroyables', levelsFolder + "Pace_town_destroyable.png");
            this.load.tilemap('level1','assets/Tiled/level1.json', null, Phaser.Tilemap.TILED_JSON);
        }
        
        //---region LOAD_SPRITES_BOMBS---//
        {
            this.load.spritesheet('blue_bomb', bombsFolder + "blue_bomb.png",16,16);
            this.load.spritesheet('explosions', bombsFolder + "Explosions.png",16,16);
        }

        //---region LOAD_SPRITESHEET_IMAGES---//
        {
	       this.load.spritesheet('bomberman','assets/Bomberman/white_bomberman.png', 16, 25);
        }
        
        this.load.spritesheet('tomatoe','assets/Enemies/World_1/Helicopter/helicopter.png', 16, 24);
        this.load.spritesheet('nuez', 'assets/Enemies/World_1/Bunny/bunny.png', 16, 24);
        this.load.spritesheet('ufo', 'assets/Enemies/World_1/UFO/UFO.png', 16, 24);
    },
    
    create:function()
    {
        console.log("create");
        
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

            //setejem les colisions entre les layers
            this.map.setCollisionBetween(1,8,true,'Exterior_Walls');
            this.map.setCollisionBetween(11,13,true,'Exterior_Walls');
            this.map.setCollisionBetween(1,8,true,'Interior_Walls');
            this.map.setCollisionBetween(11,13,true,'Interior_Walls');
	   }
        
        //--region CREATE_PLAYER--//
        {
            this.player = new SuperBomberman.player_setup(this.game, 40, 25, 1, this);
        }
        
        
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        this.game.physics.arcade.enable(this.enemies);
        //this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.add(new SuperBomberman.enemy_prefab(this.game, 10, 10, 1, this));
        this.enemies.add(new SuperBomberman.enemy_prefab(this.game, 6, 6, 2, this));
        this.enemies.add(new SuperBomberman.enemy_prefab(this.game, 3, 3, 3, this));
        for(var i =0; i<this.enemies.length;i++)
            {
                this.enemies.getChildAt(i).body.setSize(16,16,0,10);
                console.log(this.enemies.getChildAt(i).health);
            }
        
        
        //this.bomb = new SuperBomberman.bombPrefab(this.game, 2, 2, 7, this);
        
        //this.printLayoutNumbers()
    },
    
    update:function()
    {
        this.game.physics.arcade.collide(this.enemies);
        this.game.debug.body(this.player);
        for(var i=0;i<this.enemies.length;i++)
            {
                this.game.debug.body(this.enemies.getChildAt(i));
            }
        
    },

    printLayoutNumbers:function()
    {
        if(printLayoutNumbers)
        {
            for(var i = 0; i < 11; i++)
            {
                for(var j = 0; j < 13; j++)
                {
                    this.text = this.game.add.text( 16 * j + 16 * 3, 16 * i + 16 * 2, layoutMap[(i) * 13 + (j)], {font: "bold 10px Arial", fill: "#f0f"})
                    this.text.anchor.setTo(1)
                }
            }
        }    
    }
   }