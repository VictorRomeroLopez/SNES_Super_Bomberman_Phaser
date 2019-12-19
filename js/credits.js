var SuperBomberman = SuperBomberman || {};

SuperBomberman.creditsScene =
{
init:function()
    {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
    },
    preload:function()
    {
        this.load.image('title', '/assets/HUD/Credits.png');
        this.load.image('back', '/assets/HUD/backButton.png');
        this.load.image('andreu', '/assets/HUD/AndreuMargarit.png');
        this.load.image('victor', '/assets/HUD/VictorRomero.png');
        this.load.image('aleix', '/assets/HUD/AleixAzuela.png');
    },
    create:function()
    {
        enterK = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.titleCredits = this.game.add.image(gameOptions.gameWidth/3- 20, 30,'title');
        this.titleCredits.scale.setTo(1.5);
       
        this.andreu = this.game.add.image(gameOptions.gameHeight/2 + 35, 90, 'andreu');
        this.andreu.anchor.setTo(.5);
        
        this.victor = this.game.add.image(gameOptions.gameHeight/2 + 25, 120, 'victor');
        this.victor.anchor.setTo(.5);
        
        this.aleix = this.game.add.image(gameOptions.gameHeight/2 + 20, 150, 'aleix');
        this.aleix.anchor.setTo(.5);
        
        this.backButton = this.game.add.image(gameOptions.gameWidth-65, 180, 'back');
        this.backButton.scale.setTo(0.75);
        
        
    },
    update:function()
    {
        if(enterK.isDown)
        {
            this.back();
        }
    },
    back:function()
    {
        SuperBomberman.game.state.start('main');
    }

}