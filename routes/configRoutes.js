const indexR = require("./index");
const usersR = require("./users");
const categoriesR = require("./categories");
const videosR = require("./videos");





exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/categories",categoriesR);
  app.use("/videos",videosR);



  //show 404 routes
  app.use("/*",(req,res) =>{
    res.status(404).json({msg:"Endpoint/page not found, 404"})
  })
}