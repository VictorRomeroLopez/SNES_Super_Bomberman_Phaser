var SuperBomberman = SuperBomberman || {};

SuperBomberman.rankingMenu =
{
    init:function()
    {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
    },
    preload:function()
    {
        this.load.spritesheet('numbers', '/assets/HUD/numbers.png', 8, 12);
        this.load.image('title', '/assets/HUD/rankingTitle.png');
        this.load.image('back', '/assets/HUD/backButton.png');
    },
    create:function()
    {
        this.initX = 30;
        this.initY = 50;
        this.scorePosX = 180;
        this.scorePosY = 50;
        
        this.titleRanking = this.game.add.image(gameOptions.gameWidth/3+10, 20,'title');
        
        this.rankingPos = this.add.group();
        this.scores = this.add.group();
        
        this.backButton = this.game.add.button(gameOptions.gameWidth-65, 180, 'back', this.back, this);
        
        for(var i = 0; i<5; i++)
            {
                this.rankingPos.add(this.game.add.sprite(this.initX, this.initY + 25 * i, 'numbers'));
                this.rankingPos.getChildAt(i).frame = i+1;
                
                var actualScore = localStorage.getItem("score"+i);
                if(actualScore != null && actualScore != "null")
                    {
                        for(var j=0; j<actualScore.length;j++)
                        {

                            this.scores.add(this.game.add.sprite(this.scorePosX+ 10 * j, this.scorePosY + 25 * i, 'numbers'));
                            this.scores.getChildAt(j).frame = parseInt(actualScore[j]);

                        }
                    }
                else
                    {
                            this.scores.add(this.game.add.sprite(this.scorePosX, this.scorePosY + 25 * i, 'numbers'));
                    }
            }
       
    },
    back:function()
    {
        SuperBomberman.game.state.start('main');
    }

}
    