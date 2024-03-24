const knex = require('./../database/connection')


class Movie{

      async getAll(){
           try {
               var result =  await knex.select('*').table('movies');
              if(result.length > 0){
                 return result;
              }else{
                 return [];
              }
           } catch (error) {
               console.log(error);
           }   
      } 

      async newMovie(name,ano,id_category){
           
        try {
            await knex.insert({name,ano,id_category}).into('movies');
            return true;    

        }catch(error) {
            console.log(error);
            return false; 
        }
      }

      async findMovie(name){
          
        try {
            var result =  await knex.select('*').where({name:name}).table('movies');
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

         } catch (error) {
            console.log(error);
            return false; 
         }
        
      }

      async findMovieById(id){
          try {
              var result = await knex.select('*').where({ id:id }).table('movies');
              
              if(result.length > 0){
                 return true;
              }else{
                  return false;
              }
              
          } catch (error) {
               console.log(error);
               return false;
          }
      }

      async upadateMovie(id,name,ano,id_category){
            try {
               await knex.update({name,ano,id_category}).where({id:id}).table('movies');     
               return true;

            } catch (error) {
                console.log(error);
                return false;
            }      
      }

      async deleteMovie(id){
          
          try {
              await knex('movies').where({id:id}).del();
              return true;     
          
            } catch (error) {
             console.log(error);
             return false;
          }
      }
      

      async getMoviesBaseOnCategory(id){
          
         try {
             var result = await knex.select('*').where({id_category: id}).table('movies');
             
             if(result.length > 0){
                return result;
             }else{
                return [];
             }
             
         } catch (error) {
             console.log(error);
             return false;
         }
      }
          
}




module.exports = new Movie();