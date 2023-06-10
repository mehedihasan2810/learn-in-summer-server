const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@project1.lispgny.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const classesCollection = client.db("learnInSummer").collection("classes");
    const usersCollection = client.db("learnInSummer").collection("users");
    const selectedClassCollection = client
      .db("learnInSummer")
      .collection("selectedClass");

    // get all classes
    app.get("/allClasses", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    // get a class
    app.get("/getClass/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await classesCollection.findOne(query);
      res.send(result);
    });

    // add class
    app.post("/addClass", async (req, res) => {
      const classInfo = req.body;
      console.log(classInfo);
      const result = await classesCollection.insertOne(classInfo);
      res.send(result);
    });

    // update class
    app.put("/updateClass/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const info = req.body;

      const updateDoc = {
        $set: info,
      };

      const result = await classesCollection.updateOne(filter, updateDoc);

      res.send(result);
    });

    // delete class
    app.delete("/deleteClass/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await classesCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/addUser", async (req, res) => {
      const userInfo = req.body;
      console.log(userInfo);
      const result = await usersCollection.insertOne(userInfo);
      res.send(result);
    });

    app.post("/addSelectedClass", async (req, res) => {
      const { email, id } = req.body;

      const result = await selectedClassCollection.updateOne(
        { email },
        { $push: { selectedClassIds: id } },
        { upsert: true }
      );

      res.send(result);
    });

    app.get("/getSelectedClassIds", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const result = await selectedClassCollection.findOne({ email });

      res.send(result);
    });
    app.get("/getSelectedClass", async (req, res) => {
      const email = req.query.email;
      const selectedResult = await selectedClassCollection.findOne({
        email,
      });

      if (!selectedResult) {
        res.send([]);
        return;
      }
      const objectId = selectedResult?.selectedClassIds.map(
        (id) => new ObjectId(id)
      );
      const result = await classesCollection
        .find({
          _id: {
            $in: objectId,
          },
        })
        .toArray();

      res.send(result);
    });

    // delete class
    app.delete("/deleteSelectedClass", async (req, res) => {
      const email = req.query?.email;
      const id = req.query?.id;
      console.log(id, email);
      const query = { email };
      const result = await selectedClassCollection.updateOne(query, {
        $pull: { selectedClassIds: id },
      });
      res.send(result);
    });

    // Send a ping to confirm a successful connectio
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("home api");
});

app.listen(PORT, () => {
  console.log("server is runnig at http://localhost:" + PORT);
});
