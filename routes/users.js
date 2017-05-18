var express = require('express');
var router = express.Router();
var db = require('../models')
const bodyParser = require('body-parser');
let parseUrlEncoded = bodyParser.urlencoded({extended : false})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user');
  // res.render('./partials/menu');
});


router.get('/data-foodcourt', function(req, res, next) {
  db.Foodcourt.findAll()
  .then(foodcourts => {
    res.render('dataFoodcourt',{ foodcourt : foodcourts});
    //next();
  })
  .catch(err => {
    res.send(err);
  })
});

router.get('/data-resto', function(req, res, next) {
  db.Resto.findAll({
    include: [
      db.Foodcourt
    ],
    order: 'id DESC'
  })
  .then(restos => {
    res.render('dataResto', { resto : restos});
    //next()
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});


router.get('/data-menu', function(req, res, next) {
  db.Menu.findAll({
    include:[
      db.Resto
    ],
    order: 'id DESC'
  })
  .then(menus => {

     res.render('dataMenu', { menu : menus});
  })
  .catch(err => {
    res.send(err);
  })
});

/*----------------------------------------------------------------------------*/

router.get('/input-foodcourt', function(req, res, next) {
  db.Foodcourt.findAll()
  .then(foodcourts => {
    res.render('addFoodcourt', { data : foodcourts});
  })
  .catch(err => {
    res.send(err);
  })
});



router.post('/createFoodcourt', function(req, res, next) {
  let name     = req.body.name
  let address  = req.body.address
  let city     = req.body.city
  let picture  = req.body.picture || ''
  db.Foodcourt.create(req.body)
  .then(() => {
    res.redirect('addFoodcourt')
  })
  .catch((err) => {
    res.redirect(err)
  })
})
// -------------------------- untuk ambil data dari foodcourt --------------------------------------- //
router.get('/input-resto', function(req, res, next) {
  db.Foodcourt.findAll()
  .then(foodcourts => {
    res.render('addResto', { foodcourt : foodcourts});
  })
  .catch(err => {
    res.send(err);
  })
});
//

router.post('/createResto', function(req, res, next) {
  let name     = req.body.name
  let category  = req.body.category
  let picture     = req.body.picture
  let id_foodcourt  = req.body.id_foodcourt || ''
  db.Resto.create(req.body)
  .then(() => {
    res.redirect('addFoodcourt')
  })
  .catch((err) => {
    res.redirect(err)
  })
})
//-----------------untuk get data dari tabel resto ----------------------
router.get('/input-menu', function(req, res, next) {
  db.Resto.findAll()
  .then(restos => {
    res.render('addMenu', { resto : restos});
  })
  .catch(err => {
    res.send(err);
  })
});


//

router.post('/createMenu', function(req, res, next) {
  let name        = req.body.name
  let price       = req.body.price
  let tag         = req.body.tag
  let picture     = req.body.picture
  let id_resto    = req.body.id_resto
  db.Menu.create(req.body)
  .then(() => {
    res.redirect('addMenu')
  })
  .catch((err) => {
    res.redirect(err)
  })
})



module.exports = router;
