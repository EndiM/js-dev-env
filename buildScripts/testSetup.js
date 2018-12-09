//transpile the tests before mocha runs them
require("@babel/register")();

//ignore files that mocha doesn't understand
require.extensions[".css"] = function () { }
