
const Fighter = (() => {
    const _private = new WeakMap();
     
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    
    return class Fighter {
        constructor(name,str,agi,vit) {
            internal(this).name = name
            internal(this).strength = str
            internal(this).agility = agi
            internal(this).vitality = vit
            internal(this).hp = this.buildHP()
            internal(this).current_hp = internal(this).hp
            internal(this).damage = this.buildDamage()
            internal(this).defense = this.buildDefense()
            
        }
    
        getName(){
            return internal(this).name;
        }
    
        getHp(){
            return internal(this).current_hp
        }

        getTotalHp(){
            return internal(this).hp
        }
        
        buildDamage(){
            let str_dmg = internal(this).strength * 5, agi_reduc = internal(this).agility *  3
            let result = (10 + str_dmg) - agi_reduc //10 base damage
            if(result < 1){
                result = 1
            }
            return result

            //set base damage to 1 if falls negative due to agility stats effect
        }
    
        buildDefense(){
            let vit_def = internal(this).vitality * 1, str_def = internal(this).strength * 3, agi_def = internal(this).agility * 5
            let defense = vit_def + str_def + agi_def + 10 //50 base def
            return defense
            // computation in the task for the defense is not included so i added defense as hp;
        }

        buildHP(){
            let vit_hp = internal(this).vitality * 10, str_hp = internal(this).strength * 5, agi_hp = internal(this).agility * 3
            let hp = vit_hp + str_hp + agi_hp + 50 //50 base hp
            return hp
        }
    
        takeDamage(dmg){
            internal(this).current_hp = internal(this).current_hp - dmg
            if(internal(this).current_hp < 0){
                internal(this).current_hp = 0
            }
        }
    
        dealDamage(){
            return internal(this).damage
        }
    }
})()


export default Fighter