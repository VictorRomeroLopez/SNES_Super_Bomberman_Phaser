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
            this.load.image('bg1',ruta+'MainMenuNoButtons.png');
            this.load.image('btnSTRT',ruta+'ButtonStart.png');
            this.load.image('btnRanking', '/assets/HUD/rankingButton.png');
            
        },
        create:function()
        {
            this.backgroundMusic = this.game.add.audio('mainMenuMusic');
            this.startMusic = this.game.add.audio('start');
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.bg1 =this.game.add.tileSprite(0,0,256,224,'bg1');
            this.backgroundMusic.play();
            this.backgroundMusic.loop = (true);
            this.button = this.game.add.button(this.game.world.centerX,this.game.world.centerY + 60,'btnSTRT',this.iniciaJuego,this);
            this.button.anchor.setTo(.5);
            this.button.scale.setTo(1.5);
            this.rankingButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 80, 'btnRanking', this.showRanking, this);
            this.rankingButton.anchor.setTo(.5);
            this.rankingButton.scale.setTo(1.5);
            

        },
        update:function()
        {

        },
        iniciaJuego:function()
        {
            this.gameStarted = true;
            this.backgroundMusic.stop();
            this.startMusic.play();
            this.animacionStart =this.game.add.tween(this.button).to({y:this.game.world.centerY +80},2000,Phaser.Easing.Quadratic.Out,true);
            this.animacionStart.onComplete.add(function(){  this.state.start('level1');},this);
            //this.state.start('main');
        },
        showRanking:function()
        {
            if(!this.gameStarted)
            {
                this.backgroundMusic.stop();
                SuperBomberman.game.state.start('rankingMenu');
            }
        }
};