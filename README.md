# API de categoria de filmes

## Endpoints de categoria
### GET / categories
Esse endpoint é responsável por listar todas as categorias cadastradas no banco de dados
#### Parametros
Nenhum
#### Respostas
##### Status: 200
Caso essa resposta aconteca voçe  recebera a listagem de todas as categorias
Exemplo de resposta:
```
[
    {
        "id": 2,
        "name": "terror"
    },
    {
        "id": 3,
        "name": "ação"
    },
    {
        "id": 4,
        "name": "romance"
    },
    {
        "id": 6,
        "name": "animação"
    },
    {
        "id": 7,
        "name": "ficção científica"
    }
 
]
```
### POST / category
Esse endpoint é responsável por cadastrada uma nova categoria no banco de dados
#### Parametros
name: nome da categoria
#### Respostas
##### Status: 200
Não será possìvel adicionar uma categoria já existente no banco de dados

Exemplo de resposta:
##### status: 406
```
{
    "err": "categoria já existe"
}

```
### GET / category/:id
esse endpoint é responsável por listar uma categoria especificada pelo id
#### Parametros
id: id passado pela rota
#### Respostas
##### Status: 200
```
[
   {
     "id": 2,
     "name": "terror"
   }
]
```
Caso for colocado um id que não exista, ele retorna um erro
Exemplo de resposta:
##### status: 404
```
{
    "err": "categoria não encontrada"
}
```
### DELETE / category/:id 
esse endpoint é responsável por deletar uma categoria
### Parametros
id: id passado pela rota
#### Respostas
##### Status: 200
##### Categoria deletada

### GET / category/:id com Hyperlinks
esse endpoint é responsável por listar uma categoria especificada pelo id junto com um link que lista 
todos os filmes dessa categoria
### Parametros
id: id da categoria passado pela rota
### Respostas
#### Status: 200

```
{
    "Genero": [
        {
            "id": 2,
            "name": "terror"
        }
    ],
    "_Movies": [
        {
            "href": "http://localhost:8686/category/2/movies",
            "method": "GET",
            "rel": "get_games"
        }
    ]
}
```
### GET / category/id/movies
esse endpoint é responsável por listar todos os filmes da categoria com o id especificado na rota
### Parametros
id: id da categoria passado pela rota
### Respostas
#### Status: 200
```
[
    {
        "id": 6,
        "name": "Boneco do mal",
        "id_category": 2,
        "ano": 2015
    },
    {
        "id": 7,
        "name": "Annabele 2",
        "id_category": 2,
        "ano": 2020
    },
    {
        "id": 8,
        "name": "It a coisa",
        "id_category": 2,
        "ano": 2020
    },
    {
        "id": 9,
        "name": "A freira",
        "id_category": 2,
        "ano": 2023
    }
]
```
