
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); 
const pool = require("./db")
const app = express();
const port = 5000;
const axios = require('axios')
const nodemailer = require('nodemailer');
const secretKey = 'a24f41837ef05ad9e52a3794dab8c0055cc7baf383db5d19534454768751a344';

// Test the database connection
pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");

  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

app.use(express.json({ limit: '50mb' }));
app.use(cors()); // Enable CORS for all routes

app.post('/Register', async (req, res) => {
  const { username, email, password, domain, address, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(req.body)
  try {
    const checkEmailSql = 'SELECT * FROM users WHERE email = $1';
    const checkEmailValues = [email];
    const checkEmailResult = await pool.query(checkEmailSql, checkEmailValues);
    ////عشان يتاكد ازا الايميل موجود ولا لا
    //الريسبونس يلي بترجع بتتخزن بالروز
    if (checkEmailResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    //ازا الشرط يلي فوق ما تنفذت بكمل هون
    ///بضيف يوزر جديد
    const sql = 'INSERT INTO users (username, email, password, domain, address, role) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *';
    const values = [username, email, hashedPassword, domain, address, role];
    const insertResult = await pool.query(sql, values);
    //خزنت فيها معلومات اليوزر يلي ضفته
    const insertedUserId = insertResult.rows[0].id; // Assuming the 'id' is generated by the database during insertion
    //هون بدي اعمل توكن جديد
    //يلي بين{} بتخزنوا جوا التوكن يلي رح ينعمل وبس افك تشفيره بظهرولي
    //secretKey بكتب يلي بدي ياه فيه 
    ///التوكن برجعه عشان اخزنه باللوكل ستوىيج عشان لما يعمل لوج ان يتاكد الايميل موجود او لا
    const token = jwt.sign({ id: insertedUserId, username, email, role, domain, address }, secretKey);
    res.json({ token, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});









///////////////////////google


// Define your Google OAuth credentials
const googleClientId = '868843873472-44sieqa82g9hh89ukghga5fmeur8fo03.apps.googleusercontent.com';
// 459405896077-vgoropc9ufu6d9fkctim1ib1574cm910.apps.googleusercontent.com
const googleClientSecret = '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';

app.post('/GoogleLogin',async (req, res) => {
  const { name, email, id } = req.body;
  
  try {
    // Check if the user already exists in the database
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log(userExist)
    if (userExist.rows==0) {
      console.log('tttttttttttttttttttttttttttt')
      // If the user doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(id, 10);
      await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
      
      // Generate a token for the new user
      const token = jwt.sign({ firstName: name, email }, secretKey);
      
      res.json({ message: 'Success adding new user', Tok: token });
    } else {
      console.log('tttttttttttttttttttttttttttt')

      // If the user exists, compare the password
      const validPassword = await bcrypt.compare(id, userExist.password);

      if (!validPassword) {
        return res.json({ error: 'Invalid password' });
      }

      // If the password is valid, generate a token
      const token = jwt.sign({ email: userExist.email }, secretKey);

      res.json({ message: 'Success Login user', Tok: token });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


////////////////////////////////////////
app.post('/Login', (req, res) => {
  const { email, password } = req.body; // Assuming the email and password are provided in the request body

  const sql = 'SELECT * FROM users WHERE email = $1';

  pool.query(
    sql, [email],
    async (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
//ازا مافي ايرور بخزن المعلومات يلي رح ترجع من الكويري من الداتا بيس باليورز
      const user = results.rows[0];
//بتقارن الباااسوورد الي كتبه الكلاينت بالباسوورد المشفر المخزن بالداتا بيس

      if (!user || !(await bcrypt.compare(password, user.password))) {

        return res.status(401).send("incorrect email or password");
      }
      else {
        //بعمل توكن جديد
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role, email: user.email }, secretKey);
        res.json({ token: token, message: 'User registered successfully' });
      }
    }
  );

});

///authenticateToken === مدل وير
///بتفك تشفير التوكن عشان ترجع الرول تبعه
app.get("/checkToken", authenticateToken, (req, res) => {
  res.send(req.user);
});
///هاي المدل وير واستخدمتها فووووق
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization.trim()
  console.log(authHeader)
  const token = authHeader

  if (!token) {
    return res.status(401).json({ error: "Not found" });
  }
//بتفك التوكن وبتعمله ديكووودverify
  jwt.verify(token, secretKey, (err, decoded) => {
    console.log(secretKey)
    if (err) {
      return res.status(403).json({ error: "Invalid" });
    }
    console.log(decoded)
    req.user = decoded;
    next();
  });
}
///////////////////////////////////////request of user
app.post("/request", (req, res) => {
  const { user_id, mkhiata_id, description, phone, chestcircumference, waistline, hiphircumference, photo } = req.body;
  console.log(user_id, mkhiata_id, description, phone, chestcircumference, waistline, hiphircumference, photo);
  pool.query(
    "INSERT INTO request(user_id, mkhiata_id,description , phone,chestcircumference,waistline,hiphircumference ,photo) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*",
    [user_id, mkhiata_id, description, phone, chestcircumference, waistline, hiphircumference, photo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {

        res.status(201).send(result.rows);
      }
    }
  );
});
app.post("/requistProduct", (req, res) => {
  const { user_id, mkhiata_id, description, phone, photo } = req.body;
  console.log(user_id, mkhiata_id, description, phone, photo);
  pool.query(
    "INSERT INTO request(user_id, mkhiata_id,description , phone,photo) VALUES($1,$2,$3,$4,$5) RETURNING*",
    [user_id, mkhiata_id, description, phone, photo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {

        res.status(201).send(result.rows);
      }
    }
  );
});
///////////////////////////////////////Product of makhiata 


app.post("/product", (req, res) => {
  // const { name, description, price, product_id, photo } = req.body;
  const { name, description, price, user_id, photo } = req.body;

  pool.query(
    "INSERT INTO products(name, description, price, user_id,photo) VALUES($1, $2, $3, $4, $5) RETURNING *",

    // [name, description, price, product_id, photo],
    [name, description, price, user_id, photo],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(result.rows);
      }
    }
  );
});
//////////////////forgetpassword
app.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  try {
    const client = await pool.connect();

    const userQuery = `SELECT * FROM users WHERE email = $1`;
    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      client.release();
      return res.send({ Status: 'User not existed' });
    }

    const user = userResult.rows[0];
    const token = jwt.sign({ id: user.id }, 'jwt_secret_key', { expiresIn: '1d' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tbanighanem@gmail.com',
        pass: 'aueazwpdwarqcmwb',
      },
    });
// محتوى الايميل يلي بده يوصل اليوزر
    const mailOptions = {
      from: 'tbanighanem@gmail.com',
      to: user.email,
      subject: 'Reset Password Link',
      //لينك الصفحة يلي رح يعمل فيها ابديت للباسوورد يلي بدي ابعتها ع الايميل
      text: `http://localhost:3000/reset_password/${user.id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      client.release();
      if (error) {
        console.log(error);
        return res.send({ Status: 'Error sending email' });
      } else {
        return res.send({ Status: 'Success' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 'Server error' });
  }
});

///////////////////reset
app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const client = await pool.connect();

    // Verify the JWT token
    jwt.verify(token, 'jwt_secret_key', async (err, decoded) => {
      if (err) {
        client.release();
        return res.json({ Status: 'Error with token' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password in the database
      const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
      await client.query(updateQuery, [hashedPassword, id]);

      client.release();
      return res.send({ Status: 'Success' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 'Server error' });
  }
});


app.get('/profileProvider/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});




app.get('/profileUser/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});

app.get('/dataUser/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log(user.rows);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.rows[0]); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
//////////////////////commmmmment
app.post("/comment", (req, res) => {
  // const { name, description, price, product_id, photo } = req.body;
  const { user_id, product_id, name, body } = req.body;

  pool.query(
    "INSERT INTO comments(user_id,product_id,name,body) VALUES($1, $2, $3,$4) RETURNING *",

    // [name, description, price, product_id, photo],
    [user_id, product_id, name, body],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(result.rows);
      }
    }
  );
});

app.put('/reportComment/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure that the ID is a valid integer
    const commentId = parseInt(id);

    // Check if the comment exists
    const existingComment = await pool.query('SELECT * FROM comments WHERE id = $1', [commentId]);

    if (existingComment.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Update the "reported" field for the comment
    await pool.query('UPDATE comments SET reported = true WHERE id = $1', [commentId]);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Can't update data" });
  }
});

//////////////////////all Product for mkhiata in profile غير مبيوعة

app.get('/productOfMakhiata/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);


    const user = await pool.query("SELECT * FROM products WHERE user_id = $1 AND active = true AND deleted = false ", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
//////////////////////all Product for mkhiata in profile  مبيوعة

app.get('/productdeletedOfMakhiata/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);


    const user = await pool.query("SELECT * FROM products WHERE user_id = $1 AND active = true AND deleted = true ", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
//////////////////////all request for mkhiata in profile

app.get('/ApprovedrequestOfMakhiata/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);


    const user = await pool.query("SELECT * FROM request WHERE mkhiata_id = $1 AND aproved= true AND statuse=false AND approveduser=true", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
app.post("/ApprovedrequestOfMakhiata/:id", async (req, res) => {
  const { price } = req.body;

  try {
    // Use a semicolon to separate the SET clauses in the UPDATE statement
    const data = await pool.query(
      `UPDATE request SET aproved = true, price = $2 WHERE id = $1;`,
      [req.params.id, price]
    );

    // Select only the updated row, assuming id is unique
    const updatedResort = await pool.query(
      `SELECT * FROM request WHERE id = $1;`,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        "resort-updated": updatedResort.rows[0], // Assuming id is unique
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
////aproved of request after see price
app.post("/ApprovedrequestComefromUser/:id", async (req, res) => {


  try {
    // Use a semicolon to separate the SET clauses in the UPDATE statement
    const data = await pool.query(
      `UPDATE request SET approveduser = true WHERE id = $1;`,
      [req.params.id]
    );

    // Select only the updated row, assuming id is unique
    const updatedResort = await pool.query(
      `SELECT * FROM request WHERE id = $1;`,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        "resort": updatedResort.rows[0], // Assuming id is unique
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



app.get('/requestOfMakhiata/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);


    const user = await pool.query("SELECT * FROM request WHERE mkhiata_id = $1 AND aproved=false AND statuse=false AND approveduser=false", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given IDstOfMakhiata
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
app.get('/requestOfMakhiatainuserprofile/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);


    const user = await pool.query("SELECT * FROM request WHERE user_id = $1 AND aproved=false AND statuse=false", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given IDstOfMakhiata
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
app.put('/finishrequestOfMakhiata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // const { description,phone, photo } = req.body;
    // console.log(description, phone ,photo);

    const updated = await pool.query(
      'UPDATE request SET statuse = true WHERE id = $1',
      [id]
    );

    console.log(updated);

    res.json(updated.rows);
  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});

app.get('/finishrequestOfMakhiata/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);


    const user = await pool.query("SELECT * FROM request WHERE mkhiata_id = $1 AND statuse=true", [id]);
    console.log(user)
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
/////////give all makhaiet
app.get('/stitched', async function (req, res) {
  try {
    // const { id } = req.params;
    // console.log(id);
    const user = await pool.query("SELECT * FROM users where role= 'مخيطة'");
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});


///////////////////////تصاميم كل مخيطة

app.get('/productCollection/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query('SELECT * FROM products WHERE user_id = $1 AND active = true AND deleted = false', [id]);
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
//////جلب عروض المخايط في الهوم بيج
app.get('/offersOfMakhiata', async function (req, res) {
  try {
    const offers = await pool.query('SELECT * FROM products WHERE offers=true')
    res.json(offers.rows)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: 'An error occurred while fetching offers data' })
  }
})
//////تحويل المنتج لقسم العروض
app.put('/offersOfMakhiata/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Update the 'offers' status to true and return the updated product
    const updated = await pool.query(
      'UPDATE products SET offers = true WHERE id = $1 RETURNING *',
      [id]
    );

    res.json(updated.rows[0]); // Return the updated product as JSON
  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});

////////////////////////////تفاصيل كل قطعه
app.get('/eachproduct/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
//////////////////////comment each product
app.get('/commentEachProduct/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(id);
    const user = await pool.query('SELECT * FROM comments WHERE product_id = $1 AND active = true ', [id]);
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
// app.get("/resort", (req, res) => {
//   const q = "SELECT * FROM resort where active = true "
//   pool.query(q, (err, data) => {
//     if (err) return res.json(err)
//     return res.json(data.rows)
//   })
// })

/////////////////////editprofileprovider

app.put(`/editprofileProvirer/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, address, domain,about } = req.body;
    console.log(username, address, domain);


    const updated = await pool.query(
      'UPDATE users SET username = $1, address = $2, domain = $3,about=$4 WHERE id = $5',
      [username, address, domain, about, id]
    );

    console.log(updated);

    res.json(updated.rows);

  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});
app.put(`/editprofileuser/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, domain} = req.body;
    console.log(username, email, domain);


    const updated = await pool.query(
      'UPDATE users SET username = $1, email = $2, domain = $3 WHERE id = $4',
      [username, email, domain, id]
    );

    console.log(updated);

    res.json(updated.rows);

  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});

/////////////////////editproduct
app.put(`/editproduct/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price,discountedprice, photo } = req.body;
    console.log(name, description, price,discountedprice, photo);

    const updated = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, discountedprice = $4 ,photo=$5 WHERE id = $6',
      [name, description, price, discountedprice, photo,id]
    );

    console.log(updated);

    res.json(updated.rows);

  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});
////////////////////////productDetails

app.get('/productDetails/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(product.rows[0]); // Assuming there is only one product with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching product data' });
  }
});


////////////////////////////طلب كل مستخدم
app.get('/requestOfeachuser/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query('SELECT * FROM request WHERE user_id = $1', [id]);
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
////////////////////طلبات المستخدمين لكل مخيطة
app.get('/allrequestforEachMakhiata/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await pool.query('SELECT * FROM request WHERE statuse = true AND aproved = true AND approveduser = true AND mkhiata_id = $1', [id]);
    res.json(user.rows); // Assuming there is only one user with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
//////////delete request from user profile
app.delete("/request/:id", (req, res) => {
  const resortid = req.params.id;
  const q = "DELETE FROM request WHERE id = $1"
  pool.query(q, [resortid], (err, data) => {
    if (err) return res.json(err)
    return res.json("resort has been deleted successfully")
  })
})

///////////////////////////////////////Product of makhiata 


app.post("/payment", (req, res) => {
  const { card_number, cvv, cardholder, product_id, user_id, provider_id, expiration_date } = req.body;

  pool.query(
    "INSERT INTO payment(card_number,cvv,cardholder,product_id,user_id,provider_id, expiration_date) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *",
    [card_number, cvv, cardholder, product_id, user_id, provider_id, expiration_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(result.rows);
      }
    }
  );
});
app.put('/prouctAvailable/:id', async (req, res) => {
  try {
    const { id } = req.params;
    

    const updated = await pool.query(
      'UPDATE products SET deleted = true WHERE id = $1',
      [id]
    );

    console.log(updated);

    res.json(updated.rows);
  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});

/////////////////////editrequest
app.put('/editrequest/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, phone, photo } = req.body;
    console.log(description, phone, photo);

    const updated = await pool.query(
      'UPDATE request SET description = $1, phone = $2, photo = $3 WHERE id = $4',
      [description, phone, photo, id]
    );

    console.log(updated);

    res.json(updated.rows);
  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});

///////////////////requestDetails
app.get('/requestDetails/:id', async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await pool.query('SELECT * FROM request WHERE id = $1', [id]);
    res.json(product.rows[0]); // Assuming there is only one product with the given ID
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching product data' });
  }
});
///////////////////////////dasssshhhpooooordddddddddd

app.get("/allusers", async (req, res) => {
  const data = await pool.query("SELECT * FROM users;");

  try {
    res.status(200).json({
      status: "success",
      data: {
        "users-count": data.rows.length,
        users: data.rows,
      },
    });
    console.log(data);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
});


// Delete a user from the "users" table
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM users WHERE id = $1";
    await pool.query(query, [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred while deleting the user" });
  }
});



////////////////tesssstresort
app.get("/pending-product", async (req, res) => {
  const data = await pool.query("SELECT * FROM products WHERE active = false;");
  try {
    res.status(200).json({
      status: "success",
      data: {
        "resorts-count": data.rows.length,
        resorts: data.rows,
      },
    });
    console.log(data);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
});
///////////////get all comment
app.get('/allcomment', async function (req, res) {
  try {
    // const { id } = req.params;
    // console.log(id);
    const comment = await pool.query("SELECT * FROM comments WHERE reported = true AND active= true ");
    res.json(comment.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});
////////////delete comment
app.put(`/deleteComment/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    // const { username, address, domain } = req.body;
    // console.log(username, address, domain);


    const updated = await pool.query(
      'UPDATE comments SET active = false WHERE id = $1',
      [id]
    );

    console.log(updated);

    res.json(updated.rows);

  } catch (error) {
    res.status(500).json({ error: "Can't edit data" });
  }
});
// app.get('/allcomment',async function(req,res){
//   try{
//     const comment=await pool.query('select 8 from comment')
//     res.json(comment.rows)}
//     catch(err){
//       console.log(err.message)
//       res.status(500).json({error:'an error'})
//     }
//   }
// )


app.delete("/resorts/:id", async (req, res) => {
  const data = await pool.query(`DELETE FROM products WHERE id = $1;`, [
    req.params.id,
  ]);

  const resorts = await pool.query(
    `SELECT * FROM products WHERE active = false;`
  );

  try {
    res.status(200).json({
      status: "success",
      data: {
        "users-count": resorts.rows.length,
        resorts: resorts.rows,
      },
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});





app.post("/resorts/:id", async (req, res) => {
  const data = await pool.query(
    `UPDATE products SET active = true WHERE id = $1;`,
    [req.params.id]
  );

  const resorts = await pool.query(
    `SELECT * FROM products WHERE active = false;`
  );
  try {
    res.status(200).json({
      status: "success",
      data: {
        "resorts-count": resorts.rows.length,
        resorts: resorts.rows,
      },
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});
//////////////delete from profile provider
// delete aresort
app.delete("/product/:id", (req, res) => {
  const resortid = req.params.id;
  const q = "DELETE FROM products WHERE id = $1"
  pool.query(q, [resortid], (err, data) => {
    if (err) return res.json(err)
    return res.json("resort has been deleted successfully")
  })
})
////delete request from profile provider
app.delete('/requestOfMakhiataDelete/:id', (req, res) => {
  const reqId = req.params.id
  const q = 'DELETE FROM request WHERE id = $1'
  pool.query(q, [reqId], (err, data) => {
    if (err) return res.json(err)
    return res.json("request has been deleted successfully")
  })
})
////payment
app.get("/api/payments", async (req, res) => {
  const data = await pool.query("SELECT * FROM payments ");
  try {
    res.status(200).json({
      status: "success",
      data: {
        "resorts-count": data.rows.length,
        resorts: data.rows,
      },
    });
    console.log(data);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






