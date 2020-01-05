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
                case 3:
                    level = "Ice_town"
                    break;
                case 4:
                    level = "Ice_town"
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
            this.load.spritesheet('boss','assets/Enemies/World_1/BOSS/boss1.png', 75, 152);
            this.load.spritesheet('tomatoe','assets/Enemies/World_1/Helicopter/helicopter.png', 16, 24);
            this.load.spritesheet('nuez', 'assets/Enemies/World_1/Bunny/bunny.png', 16, 24);
            this.load.spritesheet('ufo', 'assets/Enemies/World_1/UFO/UFO.png', 16, 24);
        }
        
        //---region HUD---//
        {
            this.load.image('hudBG', 'assets/HUD/background.png');
            this.load.spritesheet('hudClock', '/assets/HUD/clock.png', 15, 22);
            this.load.spritesheet('hudNumbers', '/assets/HUD/numbers.png', 8, 12);
            this.load.image('score100', 'assets/HUD/100Score.png', 24,16);
            this.load.image('score200', 'assets/HUD/200Score.png', 27,16);
            this.load.image('score400', 'assets/HUD/400Score.png', 27,16);
        }
        //---region ANIMATION START LEVEL---//
        {
            this.load.image('bg', 'assets/MainMenuNoButtons.png');
            this.load.image('level1Start', levelsFolder + 'Level1-1START.png');
            this.load.image('level2Start', levelsFolder + 'Level1-2START.png');
            this.load.image('level3Start', levelsFolder + 'Level1-3START.png');
            this.load.image('level4Start', levelsFolder + 'Level1-4START.png');
        }
        
        //---region AUDIO---//
        {
            this.load.audio('mainMenuMusic','/assets/Music/MainMenuMusic.mp3');
            this.load.audio('level1Music', 'assets/Music/Level1Music.mp3');
            this.load.audio('explosion', 'assets/Music/ExplosionSound.mp3');
            this.load.audio('playerDeath', 'assets/Music/PlayerDeath.mp3');
            this.load.audio('gameOver', 'assets/Music/GameOver.mp3');
            this.load.audio('enemyDeath', 'assets/Music/EnemyDeath.wav');
            this.load.audio('powerUp', 'assets/Music/PosiblePowerUp.wav');
            this.load.audio('startLevel', 'assets/Music/Start.mp3');
            this.load.audio('dropBomb', 'assets/Music/SFX_drop_bomb.wav')
            this.load.audio('walk', 'assets/Music/SFX_walk.wav')
            this.load.audio('stageComplete', 'assets/Music/StageComplete.mp3')
        }
    },
    
    create:function()
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        console.log("create");

        //this.animationSprite = this.game.add.image(this.game.world.centerX,this.game.world.centerY,'hudBG');

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
            if(actualLevel != 4){
                this.destroyableWallsGroup = this.add.group();
                this.destroyableWallsGroup.enableBody = true;

                //Randomize destroyable walls positions and instantaite them
                DestroyableWallsGenerator.prototype.InstantiateDestroyableWalls()
            }
        }

        //--refion HUD--//
        {
            
            this.hudBG = this.game.add.image(0,0,'hudBG');
            this.hudClock = this.game.add.sprite(gameOptions.gameWidth/2 -7 ,16,'hudClock');
            this.hudClock.animations.add('tictac', [0,1,2,3,4,5,6,7], 10, true);
            this.hudClock.animations.play('tictac');
            this.hpNumber = this.game.add.sprite(32, 18, 'hudNumbers');
            this.hudScore = this.add.group();
            
            for(var i = 0; i < 8; i++)
            {
                this.hudScore.add(this.game.add.sprite(112 - i*8, 18, 'hudNumbers'));
                this.hudScore.getChildAt(i).frame = i;
                this.hudScore.getChildAt(i).alpha = 0;
            }
            
            this.hudScore.getChildAt(0).alpha = 1;
            this.graphics = this.game.add.graphics(100, 100);

        }
        
        this.bganimationSprite = this.game.add.tileSprite(0,0,276,256,'bg');
         switch(actualLevel){
                case 1:
                    this.animationSprite = this.game.add.image(0 - 125,this.game.world.centerY -125,'level1Start');
                    break;
                case 2:
                    this.animationSprite = this.game.add.image(0 - 125,this.game.world.centerY -125,'level2Start');
                    break;
                case 3:
                    this.animationSprite = this.game.add.image(0 - 125,this.game.world.centerY -125,'level3Start');
                    break;
                case 4:
                    this.animationSprite = this.game.add.image(0 - 125,this.game.world.centerY -125,'level4Start');
                    break;
            }
        
        
        this.bganimationSprite.tint = 0x000000;
            
        this.goalPosition = new Phaser.Point(0,0);
        Utils.prototype.PrintLayoutNumbers()
        
        this.powerUpsGroup = this.add.group();
        this.gameOverBool = false;
        this.gameOverCalled = false;
        
        this.levelMusic = this.game.add.audio('level1Music');
        this.levelMusic.loop = true;
        this.startLevelMusic = this.game.add.audio('startLevel');
        this.startLevelMusic.play();
        this.gameOverSound = this.game.add.audio('gameOver');
        this.playerDeathSound = this.game.add.audio('playerDeath');
        this.levelStarted = false;
        this.levelMusic.play()
        
        
   },
    update:function()
    {
        this.game.debug.body(this.animationSprite);
        if(!this.levelStarted)
        {
            this.animationStart = this.game.add.tween(this.animationSprite).to({x:this.game.world.centerX - 125}, 1000, Phaser.Easing.Quadratic.Out,true);
            this.animationStart.onComplete.add(
            function()
            {
                this.animationStart = this.game.add.tween(this.animationSprite).to({alpha:0}, 2500, 
                Phaser.Easing.Quadratic.Out,true);
                this.bganimationStart = this.game.add.tween(this.bganimationSprite).to({alpha:0}, 2500, Phaser.Easing.Quadratic.Out,true);
                this.bganimationStart.onComplete.add(
                    
                function()
                {
                    if(actualLevel == 4)
                    {
                        this.player = new SuperBomberman.player_setup(this.game, 16*3-8, 16*14-8, 1, this);
                        this.boss = new SuperBomberman.boss_prefab(this.game, 16*8-8, 16*4-8, this.player);
                    }
                    else
                    {
                        this.player = new SuperBomberman.player_setup(this.game, 16*3-8, 16*4-8, 1, this);
                    }

                    this.hpNumber.frame = this.player.health;
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
                    this.playerScore = this.player.score;
                    this.animationSprite.destroy();
                    this.bganimationSprite.destroy();
                    this.levelStarted = true;
                },this);
            },this);
        }
        
        if(this.gameOverBool && !this.gameOverCalled) {
            this.levelMusic.stop();
            this.gameOverSound.play();
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
            
            SuperBomberman.game.state.start('gameOver');
            
            this.hudClock.animations.stop('tictac', this.hudClock.frame);
            
            this.gameOverCalled = true;
        }
        
        if(this.game.time.elapsedSecondsSince(this.currentTime) >=10 && this.levelStarted) this.updateHUDTimer();
        
        
        
        if(this.levelStarted)
        {
            this.game.physics.arcade.collide(this.enemies);
            if(this.playerScore != this.player.score) this.updateHUDScore();
        }
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