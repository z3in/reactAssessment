export default class Bem {

    block(block){
        this._block = block
        return this
    }

    element(elem){
        this._elem = `__${elem}`
        return this
    }

    modifier(mod){
        this._mod = `--${mod}`
        return this
    }

    build(){
        try{
            if(!Object(this).hasOwnProperty("_block") ) throw "Block not set"
            let result = Object.values(Object.fromEntries(Object.entries(this).sort())).join("")
            this.#clear()
            return result
        }
        catch(err){
            this.#clear()
            return new Error(err);
        }
    }

    #clear(){
        Object.keys(this).forEach(key => delete this[key])
    }
}