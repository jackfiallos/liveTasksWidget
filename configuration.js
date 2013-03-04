/**
 * Middleware allowCrossDomain
 **/
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('http-equiv="Pragma"', 'content="no-cache"');
    res.header('http-equiv="Expires"', 'content="-1"');
    res.header('Expires', 'Mon, 26 Jul 1997 05:00:00 GMT');
    next();
}

module.exports = function(app, express, path){
    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.methodOverride());
        app.use(allowCrossDomain);
        app.use(app.router);
        //app.use('/static', express.static(__dirname + '/static'));
        app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
    });
    
    app.configure('production', function() {
      app.use(express.errorHandler()); 
    });
};