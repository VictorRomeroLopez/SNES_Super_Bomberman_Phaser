var SuperBomberman = SuperBomberman || {};

function DestroyableWallsGenerator(){
    
}

DestroyableWallsGenerator.prototype = {
    
    GenerateRandomPositions : function(){
        
        var forbiddenPositions = [0,1,13]
        
        var numberOfUpgrades = Utils.prototype.GenerateRandomNumbersBetween(gameOptions.minNumUpgrades, gameOptions.maxNumUpgrades)
        
        for(var i = 0; i < gameOptions.numDestroyableWalls; i++){
            var generatedNumber;
            do{
                generatedNumber = Math.trunc((Math.random() * layoutMap.length))
            }while(Utils.prototype.CheckValueExistsOnArray(forbiddenPositions, generatedNumber) || layoutMap[generatedNumber] != 0)
            
            if(i == 0){
                layoutMap[generatedNumber] = layoutTags.goalDestroyableWall;
            }
            else if (i <= numberOfUpgrades){
                layoutMap[generatedNumber] = layoutTags.upgradeDestroyableWall;
            }
            else{
                layoutMap[generatedNumber] = layoutTags.emptyDestroyableWall;
            }
        }
    },
    
    IsDestroyableWall : function(_idLayout){
        return  layoutMap[_idLayout] == layoutTags.emptyDestroyableWall || 
                layoutMap[_idLayout] == layoutTags.goalDestroyableWall || 
                layoutMap[_idLayout] == layoutTags.upgradeDestroyableWall
    },
    
    InstantiateDestroyableWalls : function(){

        var initialPosX = 32
        var initialPosY = 16 * 3
        
        this.GenerateRandomPositions();
        
        for(var i = 0; i < layoutMap.length; i++)
        {
            if(this.IsDestroyableWall(i))
            {
                var posX = initialPosX + ((i % 13) * 16)
                var posY = initialPosY + (Math.trunc((i/13)) * 16)
                
                if(layoutMap[i-13] == 1 || i < 13)
                {
                    switch(layoutMap[i]){
                        case layoutTags.emptyDestroyableWall:
                            SuperBomberman.level1.destroyableWallsGroup.add( new SuperBomberman.destroyableWall(posX, posY, false, false, true, false));
                            break;
                            
                        case layoutTags.goalDestroyableWall:
                            SuperBomberman.level1.destroyableWallsGroup.add( new SuperBomberman.destroyableWall(posX, posY, false, true, true, false));
                            break;
                            
                        case layoutTags.upgradeDestroyableWall:
                            SuperBomberman.level1.destroyableWallsGroup.add( new SuperBomberman.destroyableWall( posX, posY, true, false, true, false));
                            break;
                    }
                }
                else
                {
                    switch(layoutMap[i]){
                        case layoutTags.emptyDestroyableWall:
                            SuperBomberman.level1.destroyableWallsGroup.add( new SuperBomberman.destroyableWall( posX, posY, false, false, false, false));
                            break;
                            
                        case layoutTags.goalDestroyableWall:
                            SuperBomberman.level1.destroyableWallsGroup.add( new SuperBomberman.destroyableWall( posX, posY, false, true, false, false));
                            break;
                            
                        case layoutTags.upgradeDestroyableWall:
                            SuperBomberman.level1.destroyableWallsGroup.add( new SuperBomberman.destroyableWall( posX, posY, true, false, false, false));
                            break;
                    }
                }
            }
        }
    }
}