var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    replacer    = require('metalsmith-replace'),
    permalinks  = require('metalsmith-permalinks'),
    more        = require('metalsmith-more'),
    collection  = require('metalsmith-collections'),
    paginate    = require('metalsmith-paginate'),
    moment      = require('moment');

var config = {
    paths:{
        root:__dirname,
        photoblog:{
            templates: 'src/photoblog',
            files:'src/photoblog/posts',
            dest: 'dist/photoblog'
        },
        status:{
            templates: 'src/templates',
            files:'src/status',
            dest: 'build/status'
        }
    },
    metadata:{
        site_name:'Juan Orozco Photoblog'
    }
};

console.log(config.paths.root);
//Metalsmith.destination(config.paths.root + config.paths.build);
var ms = new Metalsmith(config.paths.root);

//sets photoblog as current folder
ms.source('src')
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
        //return excerpt.trim();
        return excerpt;
    }
}))
//collections
.use(collection({
    posts: {
        pattern:'photoblog/posts/*.md',
        sortBy: 'date',
        reverse: true
}}))
.use(debugUse({}))
//process markdown files
.use(markdown())
.use(paginate({
    perPage: 25,
    path: "page"
}))
//format files into a pretty permalink structure
.use(permalinks({
    pattern:'photoblog/:date/:title',
    date:'YYYY/MM'
}))
//process data through templates
.use(templates({
    engine:'mustache',
    directory:config.paths.photoblog.templates
}))
//set the destination
.destination(config.paths.photoblog.dest)
//build it
.build(function(err){
    if (err){
      console.log("ERROR");
      console.log(err);
    }
    else{
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

    Object.keys(opts).forEach(function(attr){
        var dupper = opts[attr];
    });
    return function(files, metalsmith, done){
        var md = metalsmith.metadata(),
            posts = md.collections.posts;
        console.log( posts.length);
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            console.log(post.date);
        }
        done();
    }

}
