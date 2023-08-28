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

// Client ID
// 1080533007960-knfl2ivujffsunprs5ncte491sac5hlb.apps.googleusercontent.com
//Client secret
//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


// CREATE TABLE comments (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100),
//   body TEXT,
// 	user_id INTEGER NOT NULL,
// 	product_id INTEGER NOT NULL,
//  FOREIGN KEY (user_id) REFERENCES users (id),
// 	 FOREIGN KEY (product_id) REFERENCES products (id)

	
// );

// CREATE TABLE payment (
//   payment_id SERIAL PRIMARY KEY,
//   card_number VARCHAR(16) NOT NULL,
//   cvv VARCHAR(3) NOT NULL,
//   expiration_date DATE NOT NULL,
//   cardholder VARCHAR(255) NOT NULL,
//   product_id INTEGER NOT NULL,
//   user_id INTEGER NOT NULL,
//   provider_id INTEGER NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users (id),
//   FOREIGN KEY (provider_id) REFERENCES users (id),
//   FOREIGN KEY (product_id) REFERENCES products (id)
// );

// CREATE TABLE request (
//   id SERIAL PRIMARY KEY,
//   user_id integer,
//   mkhiata_id integer,
//   description VARCHAR(255),
//   phone text,
//   photo  text,
//   FOREIGN KEY (user_id) REFERENCES users (id),
// 	FOREIGN KEY (mkhiata_id) REFERENCES users (id)

// );


// CREATE TABLE product(
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255),
//   description VARCHAR(255),
//   Price VARCHAR(255),
//   image BYTEA[],
// deleted BOOLEAN DEFAULT false
//   product_id SERIAL,
	
//   FOREIGN KEY (product_id) REFERENCES makhiata(id)
// );