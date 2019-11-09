var SuperBomberman = SuperBomberman || {};

SuperBomberman.levelProva = {
    
    init:function()
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(gameOptions.gameWidth/2,gameOptions.gameHeight/2);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.renderer.renderSession.roundPixels = true;
        this.game.world.setBounds(0,0, gameOptions.gameWidth, gameOptions.gameWidth);
    },
    preload:function()
    {
        this.load.spritesheet('tomatoe','src/Enemies/World_1/Helicopter/helicopter.png', 16, 24);
        this.load.spritesheet('wall', 'src/Levels/Pace_town_destroyable.png', 16, 16);
    },
    create:function()
    {
        this.wall = this.game.add.sprite(gameOptions.gameWidth/4- 50,gameOptions.gameHeight/4,'wall', 0);
        this.wall2 = this.game.add.sprite(gameOptions.gameWidth/4+ 50,gameOptions.gameHeight/4,'wall', 0);
        this.game.physics.arcade.enable(this.wall);
        this.game.physics.arcade.enable(this.wall2);
        this.wall.body.immovable = true;
        this.wall2.body.immovable = true;
        
        this.enemyTomatoe = new SuperBomberman.enemy_prefab(this.game, gameOptions.gameWidth/4, gameOptions.gameHeight/4, 1, this);
    },
    update:function()
    {
        
    }
}