var SuperBomberman = SuperBomberman || {};

SuperBomberman.game_over = 
{
    init:function()
    {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
    },
    preload:function()
    {
        this.load.image('gameOver', '/assets/HUD/Game_over_screen.png');
        this.load.image('yesGO', '/assets/HUD/yes.png');
        this.load.image('noGO', '/assets/HUD/no.png');
        this.load.image('continueGO', '/assets/HUD/continue_questionmark.png');
        this.load.image('arrowGO', '/assets/HUD/arrow.png');
        this.load.image('backgroundGO', '/assets/HUD/tile_background.png');
    },
    create:function()
    {
        this.bg = this.game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight,'backgroundGO');
        this.posX = gameOptions.gameWidth/2;
        this.posY = gameOptions.gameHeight - gameOptions.gameHeight/3;
        
        this.gameOverText = this.game.add.image(this.posX, this.posY-40,'gameOver');
        this.gameOverText.anchor.setTo(.5);
        
        this.continue = this.game.add.image(this.posX, this.posY - 50, 'continueGO');
        this.continue.anchor.setTo(.5);
        
        this.yes = this.game.add.image(this.posX -30, this.posY - 10, 'yesGO');
        this.yes.anchor.setTo(.5);
        
        this.no = this.game.add.image(this.posX +40, this.posY - 10, 'noGO');
        this.no.anchor.setTo(.5);
        
        this.arrow = this.game.add.image(this.posX - 55, this.posY - 10, 'arrowGO');
        this.arrow.anchor.setTo(.5);
        
        cursors = this.game.input.keyboard.createCursorKeys();
        enterK = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.leftPos = true;
        this.rightPos = false;
    },
    update:function()
    {
        //this.bg.tilePosition.x+=1;
        //this.bg.tilePosition.y+=1;

        if (cursors.left.isDown )
            {
                if(this.arrow.position.x > this.posX)
                {
                    this.arrow.position.x = this.posX - 55;
                    this.leftPos = true;
                    this.rightPos = false;
                }
            } 
        else if (cursors.right.isDown )
            {
                if(this.arrow.position.x < this.posX){
                    this.arrow.position.x = this.posX + 20;
                    this.leftPos = false;
                    this.rightPos = true;
                }
            }
        else if(enterK.isDown)
            {
                if(this.leftPos)
                    {
                        SuperBomberman.game.state.start('level1');
                        this.resetLayout();
                    }
                else
                    SuperBomberman.game.state.start('main', true, true);
            }
    },
    resetLayout:function()
    {
        layoutMap = [];
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
}