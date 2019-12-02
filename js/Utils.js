var SuperBomberman = SuperBomberman || {};

function Utils(){
    
}

Utils.prototype = {
    
    CheckValueExistsOnArray : function(arrayToCheck, valueToCheck){
        for(var i = 0; i < arrayToCheck.length; i++){
            if(arrayToCheck[i] == valueToCheck)
                return true;
        }
        return false;
    },
    
    PrintLayoutNumbers : function()
    {
        if(printLayoutNumbers)
        {
            for(var i = 0; i < 11; i++)
            {
                for(var j = 0; j < 13; j++)
                {
                    this.text = SuperBomberman.game.add.text( 16 * j + 16 * 3, 16 * i + 16 * 2, layoutMap[(i) * 13 + (j)], {font: "bold 10px Arial", fill: "#f0f"})
                    this.text.anchor.setTo(1)
                }
            }
        }    
    },
    
    CheckAllEnemiesDied : function(){
        
        for(var i = 0; i < SuperBomberman.level1.enemies.children.length; i++){
            if(SuperBomberman.level1.enemies.children[i].alive){
                return false;
            }
        }
        return true;
    },
    
    GenerateRandomNumbersBetween : function(_minValue, _maxValue){
        return Math.trunc((Math.random() * (_maxValue - _minValue + 1))) + _minValue
    }
}