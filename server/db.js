//to connect to daatabase
const Pool=require("pg").Pool

const pool=new Pool({
  user:"postgres",
  host: "localhost",
  database:'stitched',
  password:"password",
  port:5432,

})
//تصديره لبره
module.exports = pool