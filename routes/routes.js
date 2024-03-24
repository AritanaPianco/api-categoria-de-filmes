const express = require("express");
const router = express.Router();
const CategoryController = require('./../Controllers/CategoryController');
const MovieController = require('./../Controllers/MovieController');

router.post('/category',CategoryController.index);
router.get('/categories',CategoryController.show);
router.get('/category/:id',CategoryController.getOne);
router.delete("/category/:id", CategoryController.remove);
router.put("/category/:id", CategoryController.edit);

router.get('/category/:id/movies', CategoryController.moviesBaseOnCategory);


router.get('/movies', MovieController.index);
router.post('/movie', MovieController.create);
router.put('/movie/:id', MovieController.edit);
router.delete('/movie/:id', MovieController.remove);



module.exports = router;