
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
    , mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect('mongodb://localhost/todo_development',function(err){

    if(!err){

        console.log('MongoDB connected successfully');

    } else{

        throw err;
    }
});

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Task = new Schema({

    task : String

});

var Task = mongoose.model('Task',Task);


app.get('/', routes.index);
app.get('/users', user.list);

app.get('/tasks',function(req,res){
      Task.find({},function(err,docs){
          res.render('tasks/index',{
              title: 'Todos index view',
              docs : docs
          });
      });
});

app.get('/tasks/new',function(req,res){
           res.render('tasks/new.jade',{
               title: 'New Task'
           });
});

app.post('/tasks',function(req,res){

    var task = new Task(req.body.task);
    console.log(req.body.task.task);
    console.log(req.body.task);

    task.save(function(err){

        if(!err){
            res.redirect('/tasks');
        }else{
            res.redirect('/tasks/new');
        }

    });

});

app.get('/tasks/:id/edit',function(req,res){

    Task.findById(req.params.id,function(err, doc){

        res.render('tasks/edit',{

            title : 'Edit task view',
            task : doc
        });
    });

});

app.put('/tasks/:id',function(req,res){

    //Find the existing document with the id where the post was done
    Task.findById(req.params.id,function(err,doc){

         //Set new/updated task to the found document
         doc.task = req.body.task.task;

         //Save the document
         doc.save(function(){

             if(!err){

                 res.redirect('/tasks');

             }else{

                 //error handling
             }

         });

    });

});

app.del('/tasks/:id',function(req,res){

    Task.findById(req.params.id,function(err,doc){

        if(!doc) return new (new NotFound('Document not found'));

        doc.remove(function(){

            res.redirect('/tasks');

        });

    });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
