const express = require("express");
const mongoose = require("mongoose");
const connect = ()=> {
return mongoose.connect("mongodb://127.0.0.1:27017/test");
};

//creating schemas & models
//userschema
const userSchema = new mongoose.Schema(
{
  first_name : { type: String, required: true },
  last_name : { type: String, required: false },
  email : { type: String, required: true, unique: true},
},
{
  versionKey :false,
  timestamps: true,
}
);
const User = mongoose.model("user",userSchema);

//sectionschema
const sectionSchema = new mongoose.Schema(
{
  section_name : { type: String, required: true },
  user_id :{
     type : mongoose.Schema.Types.ObjectId,
     ref : "user",
     required : true,
  },
  book_ids :[
   {
    type : mongoose.Schema.Types.ObjectId,
    ref : "book",
    required : true,
   },
  ],
},
{
  versionKey :false,
  timestamps: true,
}
);
const Section = mongoose.model("section",sectionSchema);

//bookschema
const bookSchema = new mongoose.Schema(
{
  book_name : { type: String, required: true },
  book_body : { type: String, required: true },
  user_id :{
     type : mongoose.Schema.Types.ObjectId,
     ref : "user",
     required : true,
  },
  section_id :{
     type : mongoose.Schema.Types.ObjectId,
     ref : "section",
     required : false,
  },
  author_ids :[
   {
    type : mongoose.Schema.Types.ObjectId,
    ref : "author",
    required : true,
   },
  ],
},
{
  versionKey :false,
  timestamps: true,
}
);
const Book = mongoose.model("book",bookSchema);

//authorschema
const authorSchema = new mongoose.Schema(
{
  first_name : { type: String, required: true },
  last_name : { type: String, required: false },
},
{
  versionKey :false,
  timestamps: true,
}
);
const Author = mongoose.model("author",authorSchema);

//checkoutschema
const checkOutSchema = new mongoose.Schema(
{
  user_id :{
     type : mongoose.Schema.Types.ObjectId,
     ref : "user",
     required : true,
  },
  book_id :{
     type : mongoose.Schema.Types.ObjectId,
     ref : "book",
     required : true,
  },
},
{
  versionKey :false,
  timestamps: true,
}
);
const CheckOut = mongoose.model("checkOut",checkOutSchema);

const app = express();

app.use(express.json());

// USERS CRUD
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// AUTHOR CRUD
app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();

    return res.send({ authors });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();

    return res.send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// SECTION CRUD
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();

    return res.send({ sections });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();

    return res.send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// BOOK CRUD
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();

    return res.send({ books });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();

    return res.send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// CheckOut CRUD
app.post("/checkOuts", async (req, res) => {
  try {
    const checkOut = await CheckOut.create(req.body);

    return res.status(201).send(checkOut);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkOuts", async (req, res) => {
  try {
    const checkOuts = await CheckOut.find().lean().exec();

    return res.send({ checkOuts });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkOuts/:id", async (req, res) => {
  try {
    const checkOut = await CheckOut.findById(req.params.id).lean().exec();

    return res.send(checkOut);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/checkOuts/:id", async (req, res) => {
  try {
    const checkOut = await CheckOut.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(checkOut);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.listen(2345, async function(){
    await connect();
    console.log("listening on port 2345");
    });