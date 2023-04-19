const jwt = require("jsonwebtoken");
const {config} = require("../config/secret");

exports.auth = (req,res,next) => {
  // בודק בכלל שטוקן נשלח בהדר
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You must send token to this endpoint "});
  }
  try{
    // מנסה לפענח את הטוקן ולקבל את המטען שלו, שכרגע הוא איי די
    let decodeToken = jwt.verify(token, config.tokenSecret);
    
    // req -> פרמטר של אובייקט שמשותף לכל הפונקציות בשרשור של הרואטר
    req.tokenData = decodeToken;
    // נרצה להמשיך לפונקציה הבאה בשרשור של הראורט
    // next() -> קורא לפונקציה הבאה בשרשור של הראוטר
    next();
  }
  catch(err){
    res.status(401).json({err:"Token invalid or expired "})
  }
}

// אימות לאדמין
exports.authAdmin = (req,res,next) => {
  // בודק בכלל שטוקן נשלח בהדר
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You must send token to this endpoint "});
  }
  try{
    
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // בודק שהמשתמש הוא מסוג אדמין
    if(decodeToken.role != "admin"){
      return res.status(401).json({err:"You must send admin token to this endpoint"});
    }
    // req -> פרמטר של אובייקט שמשותף לכל הפונקציות בשרשור של הרואטר
    req.tokenData = decodeToken;
    // נרצה להמשיך לפונקציה הבאה בשרשור של הראורט
    // next() -> קורא לפונקציה הבאה בשרשור של הראוטר
    next();
  }
  catch(err){
    res.status(401).json({err:"Token invalid or expired "})
  }
}