var SuperBomberman = SuperBomberman || {};

function EnemiesGenerator(){
    
}

EnemiesGenerator.prototype = {
    
    GenerateRandomPositions : function(){
        var forbiddenPositions = [0,1,13]

        var numberOfUpgrades = Utils.prototype.GenerateRandomNumbersBetween(gameOptions.minNumUpgrades, gameOptions.maxNumUpgrades)

        for(var i = 0; i < gameOptions.numEnemies; i++){
            var generatedNumber;
            
            do{
                generatedNumber = Math.trunc((Math.random() * layoutMap.length))
            }while(Utils.prototype.CheckValueExistsOnArray(forbiddenPositions, generatedNumber) || layoutMap[generatedNumber] != 0)
            
            layoutMap[generatedNumber] = layoutTags.enemie;
        }
    },
    
    InstantiateEnemies: function(){
        
        this.GenerateRandomPositions()
        
        for(var i = 0; i < layoutMap.length; i++)
        {
            if(layoutMap[i] == layoutTags.enemie){
                var posX = ((i % 13))
                var posY = Math.trunc((i/13))
                
                switch(actualLevel){
                    case 1:
                        SuperBomberman.level1.enemies.add(new SuperBomberman.enemy_prefab(posX, posY, 1))
                        break;
                    case 2:
                        SuperBomberman.level1.enemies.add(new SuperBomberman.enemy_prefab(posX, posY, (Math.trunc(Math.random()*2)+1)))
                        break;
                    case 3:
                        SuperBomberman.level1.enemies.add(new SuperBomberman.enemy_prefab(posX, posY, (Math.trunc(Math.random()*3)+1)))
                        break;
                    default:
                        break;
                }
                layoutMap[i] = 0;
            }
        }
    }
    
}
 
