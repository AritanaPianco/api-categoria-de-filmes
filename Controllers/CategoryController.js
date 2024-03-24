const Category = require('../Models/Category');
const Movie = require('./../Models/Movie')


class CategoryController{

      async index(req,res){
           var {name} = req.body;
           
           if(name == undefined || name == ""){
               res.status(406);
               res.json({ err: "Não pode enviar com nome vazio!" })
               return;
           }

           const nameAlreadyExis = await Category.findName(name);

           if(nameAlreadyExis){
              res.status(406);
              res.json({err: 'categoria já existe'})
              return;
           }

           const result = await Category.create(name);  
           if(result){
              res.status(200)
              res.json({status: "adicionado"})
           }else{
              res.status(406);
              res.json({status: 'erro ao adicionar'})
           }

      }  
      
      
      async show(req,res){
           var result = await Category.getAll();
           
           if(result){
               res.status(200);
               res.send(result); 
           }else{
               res.status(404);
               res.send(result);
           }   
      }


      async getOne(req,res){
         var {id} = req.params;
         
         if(isNaN(id)){
            res.status(406);
            res.json({err: "só é aceitável números para ID"});
            return;   
         }

         var categoryAlreadyExis = await Category.findCategoryById(id);

         if(categoryAlreadyExis){

            var HATEOAS = [
                  {
                     href: `http://localhost:8686/category/${id}/movies`,
                     method: "GET",
                     rel: "get_games"
                  }
            ]  

             var result = await Category.getOneCategory(id);
             res.status(200);
             res.json({Genero: result, _Movies: HATEOAS}); 
         }else{
             res.status(404);
             res.json({err: "categoria não encontrada"});   
         }
      }


      async remove(req,res){
         var { id } = req.params;
         
         if(isNaN(id)){
             res.status(406);
             res.json({err: "só é aceitável números para ID"});
             return;   
         }

         var categoryAlreadyExis = await Category.findCategoryById(id); 

         if(!categoryAlreadyExis){
            res.status(406);
            res.json({err: "essa categoria não existe!"});
            return;  
         }
         
         var result = await Category.delete(id);
         if(result){
             res.status(200);
             res.send("categoria deletada")
         }else{
             res.status(406);
             res.send("erro ao deletar")
         }  

         
     }

     async edit(req,res){
          var {name} = req.body;
          var {id} = req.params;

         if(isNaN(id)){
            res.status(406);
            res.json({err: "só é aceitável números para ID"});
            return;      
         }
         
         var categoryAlreadyExis = await Category.findCategoryById(id); 

         if(categoryAlreadyExis){
            var result = await Category.update(name,id);
            
            if(result){
                 res.status(200);
                 res.send("Categoria atualizada");
            } else{
                  res.status(406);
                  res.json({err: "Erro ao atualizar"})
            } 
         }else {
             res.status(400);
             res.json({err: "Essa categoria não existe"}); 
         }

     }


     async moviesBaseOnCategory(req,res){
          var  {id} = req.params;
          
           if(isNaN(id)){
               res.status(406);
               res.json({err: "só é aceitável números para ID"});
               return;       
           }

           var categoryExist = await Category.findCategoryById(id);
           if(categoryExist){
                var movies = await Movie.getMoviesBaseOnCategory(id);
                res.status(200);
                res.send(movies);   
           }else{
                res.status(404);
                res.json({err: "Categoria não existe"});
           }   

            

     }


}

module.exports = new CategoryController();