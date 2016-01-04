var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-layouts');
var replacer    = require('metalsmith-replace');
var permalinks  = require('metalsmith-permalinks');
var more        = require('metalsmith-more');
var collection  = require('metalsmith-collections');
var paginate    = require('metalsmith-paginate');
var moment      = require('moment');


var rootPath = __dirname;
var config = {
  paths:{
    root: rootPath,
    photoblog:{
      root: rootPath,
      src: 'src/photoblog/src',
      templates: 'src/photoblog/templates',
      files: 'src/photoblog/src/posts',
      dest: 'dist/photoblog'
    }
  },
  metadata:{
    site_name:'Juan Orozco Photoblog'
  }
};

console.log(config.paths.photoblog.root);
//var ms = new Metalsmith(__dirname);
var ms = new Metalsmith(config.paths.photoblog.root);
//sets photoblog as current folder
ms
  .source(config.paths.photoblog.src)
  .ignore('**/.DS_Store')
  //sets the config metadata
  .metadata(config.metadata)
  //creates duplicates of metadata to process later
  .use(duplicator({
    prettyDate:'date',
    excerpt:'contents'
  }))
  //check for MORE in markdown files
  .use(more({
    ext:'md'
  }))
  //process some metadata
  .use(replacer({
    prettyDate:function(date){
      var newDate = moment( date.setUTCHours(8) );
      return newDate.format('MMMM D, YYYY');
    },
    excerpt: function(content){
      var excerpt = content;
      if (!content.substr){
        excerpt = content.toString();
      }
      excerpt.substr(0, 100);
      return excerpt;
    }
  }))

  //collections
  .use(collection({
    posts: {
      pattern:'posts/*.md',
      sortBy: 'date',
      reverse: true
  }}))

  .use(paginate({
    perPage: 25,
    path: 'archive'
  }))
  .use(debugUse({}))
  //process markdown files
  .use(markdown())
  //format files into a pretty permalink structure
  .use(permalinks({
    pattern: ':date/:title',
    date:'YYYY/MM'
  }))
  //process data through templates
  .use(templates({
    engine: 'mustache',
    //pattern: 'templates/*.mustache'
    directory: config.paths.photoblog.templates
  }))

  //set the destination
  .destination(config.paths.photoblog.dest)
  // build it
  .build(function(err){
    if (err){
      console.log("ERROR");
      console.log(err);
    } else {
      console.log("Success");
    }
  });

//my duplicator plugin
function duplicator(opts){
    Object.keys(opts).forEach(function(attr){
        var dupper = opts[attr];
    });
    return function(files, metalsmith, done){
        Object.keys(files).forEach(function(key){
            var file = files[key];
            Object.keys(opts).forEach(function(attr){
                if(file.hasOwnProperty(opts[attr])){
                    file[attr] = file[opts[attr]];
                }
            });
        });
        done();
    }
}

function debugUse(opts) {
  var options = opts || false;
    Object.keys(opts).forEach(function(attr){
        var dupper = opts[attr];
    });
    return function(files, metalsmith, done){

      console.log('file keys', Object.keys(files) );
        var md = metalsmith.metadata();
        var posts = md.collections && md.collections.posts ? md.collections.posts: [];
        console.log( 'posts', posts.length);
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            console.log(post.date);
        }
        done();
    }

}
