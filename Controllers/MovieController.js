const Movie = require('./../Models/Movie');


class MovieController{

       async index(req,res){
           var movies = await Movie.getAll();
           
           if(movies){
               res.status(200);
               res.send(movies);
           }else{
              res.status(404);
              res.send("Não há filmes disponíveis")
           }
                    
       }

       async create(req,res){
            var {name, ano, id_category} = req.body;
         
            if(name == undefined || name == ''){
                 res.status(406);
                 res.json({err: 'O nome esta vazio!'});
                 return;  
            }
            if(ano == undefined || ano == ''){
                 res.status(406);
                 res.json({err: 'O ano esta vazio!'});
                 return;  
            }
            if(id_category == undefined || id_category == ''){
                 res.status(406);
                 res.json({err: 'O campo id_category esta vazio!'});
                 return;  
            }

            var movieAlreadyExis = await Movie.findMovie(name);
            
            if(movieAlreadyExis){
                res.status(406);
                res.json({err: "Filme já existe"});
            }else{
                var result = await Movie.newMovie(name,ano,id_category);
                if(result){
                    res.status(200);
                    res.send("Adicionado com sucesso");
                }else{
                    res.status(406);
                    res.send("Erro ao adicionar");  
                }    
            }

       }

       async edit(req,res){
           var {name,ano,id_category} = req.body;
           var {id} = req.params;
           
         
           if(isNaN(id)){
              res.status(406);
              res.json({err: "O id fornecido não é um número"}); 
              return;
           }

           var MovieExis = await Movie.findMovieById(id);
           if(MovieExis){
               if(name == undefined || name == ''){
                   res.status(406);
                   res.json({err: 'O nome esta vazio!'});
                   return;  
               }
               if(ano == undefined || ano == ''){
                   res.status(406);
                   res.json({err: 'O ano esta vazio!'});
                   return;  
               }
               if(id_category == undefined || id_category == ''){
                   res.status(406);
                   res.json({err: 'O campo id_category esta vazio!'});
                   return;  
               }
    
               var result = await Movie.upadateMovie(id,name,ano,id_category);
               if(result){
                   res.status(200);
                   res.send("Movie Atualizado") 
               }else{
                    res.status(400);
                    res.send("Erro ao atualizar Movie!");
               }  
              
           }else{
               res.status(404);
               res.json({err: "Movie não encontrado"});
           }
     
       }
       
       
       async remove(req,res){
            var {id} = req.params;
            
            if(isNaN(id)){
                res.status(406);
                res.json({err: "O id fornecido não é um número"}); 
                return; 
            }

            var movieExis = await Movie.findMovieById(id);
            if(movieExis){
                var result = await Movie.deleteMovie(id);
                if(result){
                    res.status(200);
                    res.send("Deletado com sucesso");
                } else{
                     res.status(400);
                     res.send("Erro ao deletar Movie");   
                }
            }else{
                res.status(404);
                res.json({err: "Movie não encontrado"});
            }

       }

}


module.exports = new MovieController();