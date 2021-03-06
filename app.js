
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var index1=require('./routes/index');
var category = require('./routes/category');
var http = require('http');
var path = require('path');
var category = require('./routes/category');
var offerService = require('./routes/offerService');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/addproduct',index1.index1);
app.get('/test' , category.postComment);
app.post('/category/:categoryId/product/:productId/offer/:offerId/comment' , category.postComment); 
app.post('/user', user.createUser)

app.get('/category/:categoryId/product/:productId', category.getProductDetails);
app.delete('/category/:categoryId/product/:productId', category.deleteProduct);
app.put('/category/:categoryId/product/:productId', category.updateProduct);
app.get('/category/:categoryId/product', category.getProducts);
app.post('/category/:categoryId/product', category.createProducts);
app.put('/category/:categoryId/product/:productId/offer/:offerId', offerService.updateOffer);
app.delete('/category/:categoryId/product/:productId/offer/:offerId', offerService.deleteOffer);

///nirav
app.get('/category',category.getCategories);
app.post('/category',category.addCategories);

app.post('/category/:categoryId/product/:productId/offer',offerService.addOffer);
app.get('/category/:categoryId/product/:productId/offer',offerService.getoffers);
///

//Get Offer History
app.get('/category/:categoryId/product/:productId/offer/:offerId/history',category.getOfferHistory);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
