var SuperBomberman = SuperBomberman || {};

SuperBomberman.mainMenu = 
    {
        preload:function()
        {
            var ruta = 'assets/';
            this.load.image('bg1',ruta+'MainMenuNoButtons.png');
            this.load.image('btnSTRT',ruta+'ButtonStart.png');
        },
        create:function()
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//            this.scale.pageAlignHorizontally = true;
            this.bg1 =this.game.add.tileSprite(0,0,256,224,'bg1');
            
            this.button = this.game.add.button(this.game.world.centerX,this.game.world.centerY + 60,'btnSTRT',this.iniciaJuego,this);
            this.button.anchor.setTo(.5);
            this.button.scale.setTo(1.5);


        },
        update:function()
        {

        },
        iniciaJuego:function()
        {
            this.animacionStart =this.game.add.tween(this.button).to({y:this.game.world.centerY +80},2000,Phaser.Easing.Quadratic.Out,true);
            this.animacionStart.onComplete.add(function(){this.state.start('level1');},this);
            //this.state.start('main');
        }
};