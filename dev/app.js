var koa = require('koa');  
var app = koa();  
  
app.use(function *(){  
	this.body = 'Hello word';  
});  

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  this.body = 'Hello World';

  this; // is the Context
  this.request; // is a koa Request
  this.response; // is a koa Response
});

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});
  
app.listen(3001);  

console.log(4);