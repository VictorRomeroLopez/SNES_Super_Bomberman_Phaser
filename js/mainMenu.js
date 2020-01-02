var SuperBomberman = SuperBomberman || {};

SuperBomberman.mainMenu = 
    {
        init:function()
        {
            this.gameStarted = false;
        },
        preload:function()
        {
            var ruta = 'assets/';
           this.load.audio('mainMenuMusic','/assets/Music/MainMenuMusic.mp3'); 
            this.load.audio('start','/assets/Music/ButtonStart.wav');
            this.load.video('startAnim','/assets/Video/animStartMainMenu.webm');
            this.load.image('bg1',ruta+'MainMenuNoButtons.png');
            this.load.image('btnSTRT',ruta+'ButtonStart.png');
            this.load.image('btnRanking', '/assets/HUD/rankingButton.png');
            this.load.image('arrow', '/assets/HUD/arrow.png');
            this.load.image('creditsScene', '/assets/HUD/Credits.png');
            
        },
        create:function()
        {
            this.animationNotEnded = true;
            this.animStart = this.game.add.video('startAnim');
            this.backgroundMusic = this.game.add.audio('mainMenuMusic');
            this.startMusic = this.game.add.audio('start');
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.backgroundMusic.play();
            this.backgroundMusic.loop = true;
            this.animStart.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.3, 0.3);
            this.animStart.mute = true; this.animStart.onComplete.add(this.animationComplete, this);
           
            cursors = this.game.input.keyboard.createCursorKeys();
            enterK = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

            this.upPos = false;
            this.downPos = false;
            this.middlePos = true;
                        
        },
        update:function()
        {
            if(this.animationNotEnded)
            {
                this.animStart.play(true);
                
                this.animStart.loop = false;
            }
            else
            {
                if (cursors.up.isDown && cursors.up.downDuration(1))
                {
                    if(this.arrow.position.y == this.posY)
                    {
                        console.log("UP-UPPOS");
                        this.arrow.position.x = this.game.world.centerX + 30;
                        this.arrow.position.y = this.game.world.centerY - 80;
                        this.upPos = true;
                        this.middlePos = false;
                        this.downPos = false;
                    }
                    else if(this.arrow.position.y > this.posY)
                    {
                        console.log("UP-MIDPOS");
                        this.arrow.position.x = this.game.world.centerX - 100;
                        this.arrow.position.y = this.posY;
                        this.middlePos = true;
                        this.downPos = false;
                        this.upPos = false;
                    }
                } 
            else if (cursors.down.isDown && cursors.down.downDuration(1))
                {
                    if(this.arrow.position.y == this.posY){
                        console.log("DOWN-DOWNPOS");
                        this.arrow.position.x = this.game.world.centerX - 70;
                        this.arrow.position.y = this.posY + 20;
                        this.upPos = false;
                        this.middlePos = false;
                        this.downPos = true;
                    }
                    else if(this.arrow.position.y < this.posY)
                    {
                        console.log("DOWN-MIDPOS");
                        this.arrow.position.x = this.game.world.centerX - 100;
                        this.arrow.position.y = this.posY;
                        this.middlePos = true;
                        this.downPos = false;
                        this.upPos = false;
                    }
                }
            else if(enterK.isDown)
                {
                    if(this.middlePos)
                        {
                            this.iniciaJuego();
                            actualLevel = 1;
                            playerStatistics.maxBombs = 1;
                            playerStatistics.power = 1;
                            playerStatistics.speed = 50;
                            playerStatistics.lifes = 5;
                        }
                    else if( this.downPos)
                        this.showRanking();
                    else
                        this.showCredits();
                }
            }
        },
        iniciaJuego:function()
        {
            this.rankingButton.kill();
            this.arrow.kill();
            this.gameStarted = true;
            this.backgroundMusic.stop();
            this.startMusic.play();
            this.state.start('level1');
        },
        showRanking:function()
        {
            if(!this.gameStarted)
            {
                this.backgroundMusic.stop();
                this.state.start('rankingMenu');
            }
        },
        showCredits:function()
        {
            if(!this.gameStarted)
            {
                this.backgroundMusic.stop();
                this.state.start('credits');
            }
        },
        animationComplete:function(_video)
        {
            this.animationNotEnded = false;
            this.game.camera.flash(0xffffff, 500);
            this.bg1 =this.game.add.tileSprite(0,0,276,256,'bg1');
            this.button = this.game.add.image(this.game.world.centerX,this.game.world.centerY + 60,'btnSTRT');
            this.button.anchor.setTo(.5);
            this.button.scale.setTo(1.5);
            this.rankingButton = this.game.add.image(this.game.world.centerX, this.game.world.centerY + 80, 'btnRanking');
            this.rankingButton.anchor.setTo(.5);
            this.rankingButton.scale.setTo(1.5);
            
            this.creditsButton = this.game.add.image(this.game.world.centerX + 80, this.game.world.centerY - 80, 'creditsScene');
            this.creditsButton.anchor.setTo(.5);
            
            this.posX = gameOptions.gameWidth/2;
            this.posY = this.game.world.centerY + 60;
            
            this.arrow = this.game.add.image(this.game.world.centerX - 100, this.game.world.centerY + 60, 'arrow');
            this.arrow.anchor.setTo(.5);
            
        }
};