// קובץ שמכיל את כל המשתנים הסודיים
// dotEnv -> ספרייה שיודעת לקרוא משתנים מקובץ ENV
// ENV
require("dotenv").config();
// console.log(process.env.DBUSER)

exports.config = {
  mongoUser:process.env.DBUSER,
  mongoPass:process.env.DBPASS,
  tokenSecret:process.env.TOKENSECRET
  
}