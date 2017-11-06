/**
 * Created by nicolasdeciancio on 30/03/17.
 */
var environment;

Environment = function () {
    
};

Environment.setEnvironment = function (env) {
  environment = env;  
};

Environment.isProd = function () {
    return environment;
};