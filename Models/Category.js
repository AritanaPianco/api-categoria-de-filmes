const knex = require("./../database/connection");


class Category{
     
    async create(name){
         
        try {
            await knex.insert({name: name}).into('categories');
            return true   
        } catch (error) {
            console.log(error)
            return false
        }
        
    }

    async findName(name){

        try {
            var result = await knex.select("*").where({name:name}).table('categories');
            if(result.length > 0){
                return true;   
            }else{
                return false; 
            }  
            
        } catch(error) {
            console.log(error);
            return false;
        }

    }

    async getAll(){
        try {
          var result = await knex.select('*').table('categories');
      
          if(result.length > 0){
             return result; 
          }else{
             return [];
          } 

        } catch (error) {
             console.log(error);             
        }  
                
    } 

    async getOneCategory(id){
          
        try {
           var result = await knex.select('*').where({ id:id }).table('categories')  
           return result;  

        } catch (error) {
            console.log(error);
            return false;  
        }
    }


    async delete(id){
       
        try {
            await knex('categories').where({ id:id }).del()  
            return true; 

        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async findCategoryById(id){
       
        try {
            var result = await knex.select('*').where({id:id}).table('categories');
            
            if(result.length > 0){
                return true;   
            }else{
                return false;
            }

        } catch (error) {
            console.log(error)
            return false;
        }  

    }

    async update(name,id){
        
        try {
            await knex('categories').where({id:id}).update({name:name});
             return true;  
        } catch (error) {
             console.log(error);
             return false;        
        }                
    
   }

}



module.exports = new Category();