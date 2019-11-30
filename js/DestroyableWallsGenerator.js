var SuperBomberman = SuperBomberman || {};

var forbiddenPositions = [0,1,13]
var initialPosX = 32
var initialPosY = 16

function DestroyableWallsGenerator(){
    
}

DestroyableWallsGenerator.prototype = {
    
    GenerateRandomPositions : function(){
        
        for(var i = 0; i < gameOptions.numDestroyableWalls; i++){
            var generatedNumber;
            do{
                generatedNumber = Math.trunc((Math.random() * layoutMap.length))
            }while(Utils.prototype.CheckValueExistsOnArray(forbiddenPositions, generatedNumber) || layoutMap[generatedNumber] != 0)
            layoutMap[generatedNumber] = 2
        }
    },
    
    InstantiateDestroyableWalls : function(){
        
        this.GenerateRandomPositions();
        
        for(var i = 0; i < layoutMap.length; i++)
            {
                if(layoutMap[i] == gameTags.destroyableWalls)
                {
                    if(layoutMap[i-13] == 1 || i < 13)
                    {
                        SuperBomberman.level1.destroyableWallsGroup.add(
                            new SuperBomberman.destroyableWall(
                                initialPosX + ((i % 13) * 16), 
                                initialPosY + (Math.trunc((i/13)) * 16), 
                                true, 
                                false));
                    }
                    else
                    {
                        SuperBomberman.level1.destroyableWallsGroup.add(
                            new SuperBomberman.destroyableWall(
                                initialPosX + ((i % 13) * 16), 
                                initialPosY + (Math.trunc((i/13)) * 16), 
                                false, 
                                false));
                    }
                }
            }
    }
    
}