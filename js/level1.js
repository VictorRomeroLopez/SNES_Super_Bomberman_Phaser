var SuperBomberman = SuperBomberman || {}

SuperBomberman.level1 = {
    
    init:function()
    {
        console.log("init")
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight + 2*16);
        this.hudeTimerInitX = -82;
        this.hudeTimerInitY = -66;
        this.currentTime = this.game.time.time;
        this.timerCounter =-1;
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
            var level = "";
            switch(actualLevel){
                case 1:
                    level = "Pace_town"
                    break;
                case 2:
                    level = "Green_village"
                    break;
            }
            this.load.image('buildings', levelsFolder + level + ".png");
            this.load.spritesheet('destroyables', levelsFolder + level + "_destroyable.png",16,16);
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
	       this.load.spritesheet('bombPU','assets/Powerups/Powerups.png', 16, 16);
        }
        //---region ENEMIES---//
        {
            this.load.spritesheet('tomatoe','assets/Enemies/World_1/Helicopter/helicopter.png', 16, 24);
            this.load.spritesheet('nuez', 'assets/Enemies/World_1/Bunny/bunny.png', 16, 24);
            this.load.spritesheet('ufo', 'assets/Enemies/World_1/UFO/UFO.png', 16, 24);
        }
        
        //---region HUD---//
        {
            this.load.image('hudBG', 'assets/HUD/background.png');
            this.load.spritesheet('hudClock', '/assets/HUD/clock.png', 15, 22);
            this.load.spritesheet('hudNumbers', '/assets/HUD/numbers.png', 8, 12);
        }
        
        //---region GAME OVER---//
        {
            this.load.image('gameOver', '/assets/HUD/Game_over_screen.png');
            this.load.image('yesGO', '/assets/HUD/yes.png');
            this.load.image('noGO', '/assets/HUD/no.png');
            this.load.image('continueGO', '/assets/HUD/continue_questionmark.png');
            this.load.image('arrowGO', '/assets/HUD/arrow.png');
            this.load.image('backgroundGO', '/assets/HUD/tile_background.png');
        }
        //---region AUDIO---//
        {
            this.load.audio('mainMenuMusic','/assets/Music/MainMenuMusic.mp3');
        }
    },
    
    create:function()
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        console.log("create");
        //---region ADD_IMAGES_TO_TILEMAP---//
        {
            this.map = this.game.add.tilemap('level1')
            
            //agreguem els spritesheets al map
            this.map.addTilesetImage('buildings')

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
        
        //--region DESTROYABLE_WALLS--//
        {
            this.destroyableWallsGroup = this.add.group();
            this.destroyableWallsGroup.enableBody = true;
            
            //Randomize destroyable walls positions and instantaite them
            DestroyableWallsGenerator.prototype.InstantiateDestroyableWalls()            
        }
        
        //--region CREATE_PLAYER--//
        {
            this.player = new SuperBomberman.player_setup(this.game, 16*3-8, 16*4-8, 1, this);
        }
        
        //--region ENEMIES--//
        {
            this.enemies = this.add.group();
            this.enemies.enableBody = true;
            this.game.physics.arcade.enable(this.enemies);
            
            EnemiesGenerator.prototype.InstantiateEnemies()
                        
            for(var i =0; i < this.enemies.length; i++)
            {
                this.enemies.getChildAt(i).body.setSize(16,16,0,8);
            }
                
        }
        
        //--refion HUD--//
        {
            
            this.hudBG = this.game.add.image(0,0,'hudBG');
            this.hudClock = this.game.add.sprite(gameOptions.gameWidth/2 -7 ,16,'hudClock');
            this.hudClock.animations.add('tictac', [0,1,2,3,4,5,6,7], 10, true);
            this.hudClock.animations.play('tictac');
            this.hpNumber = this.game.add.sprite(32, 18, 'hudNumbers');
            this.hpNumber.frame = this.player.health;
            this.hudScore = this.add.group();
            
            for(var i = 0; i < 8; i++)
            {
                this.hudScore.add(this.game.add.sprite(112 - i*8, 18, 'hudNumbers'));
                this.hudScore.getChildAt(i).frame = i;
                this.hudScore.getChildAt(i).alpha = 0;
            }
            
            this.hudScore.getChildAt(0).alpha = 1;
            this.updateHUDScore();
            this.graphics = this.game.add.graphics(100, 100);

        }
        
        this.goalPosition = new Phaser.Point(0,0);
        Utils.prototype.PrintLayoutNumbers()
        
        this.powerUpsGroup = this.add.group();
        this.gameOverBool = false;
        this.gameOverCalled = false;
        this.playerScore = this.player.score;
        for(var i =0; i<5; i++)
            console.log(localStorage.getItem("score"+i));
   },
    update:function()
    {
        if(this.gameOverBool && !this.gameOverCalled) {
            var scoreSaved = false;
            for(var i =0; i<5 && !scoreSaved; i++)
                {
                    var score = "score"+i;
                    var rankScore = localStorage.getItem(score);
                    if(rankScore != "null")
                        {
                            console.log("distinto a 0")
                            
                            if( rankScore < this.player.score) {
                                for(var j = 4; j>i; j--)
                                    {
                                        localStorage.setItem("score"+j, localStorage.getItem("score"+(j-1)))
                                    }
                                localStorage.setItem(score, this.player.score);
                                scoreSaved = true;
                                console.log("score actual es mayor")
                            }
                            else
                                console.log("score actual es menor")
                        }
                    else
                        {
                            console.log("igual a 0")
                            localStorage.setItem(score, this.player.score);
                            scoreSaved = true;
                        }
                    console.log(localStorage.getItem(score));
                }
            
            this.gameOverPrefab = new SuperBomberman.game_over(this.game, gameOptions.gameWidth/2, gameOptions.gameHeight - gameOptions.gameHeight/3, this);
            
            this.hudClock.animations.stop('tictac', this.hudClock.frame);
            
            this.gameOverCalled = true;
        }
        
        if(this.game.time.elapsedSecondsSince(this.currentTime) >=10) this.updateHUDTimer();
        
        this.game.physics.arcade.collide(this.enemies);
        this.game.debug.body(this.player);
        for(var i=0;i<this.enemies.length;i++)
        {
            this.game.debug.body(this.enemies.getChildAt(i));
        }
        
        if(this.playerScore != this.player.score) this.updateHUDScore();
    },

    updateHUDScore:function()
    {
        var score = this.player.score;
        for(var i=0; score !=0; i++)
        {
            this.hudScore.getChildAt(i).frame = score%10;
            this.hudScore.getChildAt(i).alpha =1;
            score = this.game.math.floorTo(score/10, 0);
        }
        
    },
    updateHUDTimer:function()
    {
        if(this.timerCounter >=29) this.gameOverBool = true;
        
        if(this.timerCounter == 13) this.timerCounter = 15;
        
        this.timerCounter++;
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(this.hudeTimerInitX + this.timerCounter * 8,this.hudeTimerInitY, 4, 3);
        this.graphics.endFill();
        this.currentTime = this.game.time.time;
    }
}