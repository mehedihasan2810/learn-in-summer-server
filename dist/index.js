"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get("/", (_req, res) => {
    return res.send("convertinggggggg");
});
app.get("/hello", (_req, res) => {
    return res.send("helloooo");
});
app.get("/checking", (_req, res) => {
    return res.send("checkinggggggg");
});
app.listen(port, () => {
    console.log(`server is runnig at http://localhost:${port}`);
});
// const express = require("express");
// const morgan = require("morgan");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const app = express();
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// const PORT = process.env.PORT || 4000;
// app.use(morgan("dev"));
// app.use(cors());
// app.use(express.json());
// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res
//       .status(401)
//       .send({ error: true, message: "unauthorized access" });
//   }
//   const token = authorization.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res
//         .status(401)
//         .send({ error: true, message: "unauthorized access" });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };
// const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@project1.lispgny.mongodb.net/?retryWrites=true&w=majority`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     client.connect();
//     const classesCollection = client.db("learnInSummer").collection("classes");
//     const usersCollection = client.db("learnInSummer").collection("users");
//     const selectedClassCollection = client
//       .db("learnInSummer")
//       .collection("selectedClass");
//     const paymentsCollection = client
//       .db("learnInSummer")
//       .collection("payments");
//     // jwt
//     app.post("/jwt", (req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "2h",
//       });
//       res.send({ token });
//     });
//     // const verifyAdmin = async (req, res, next) => {
//     //   const email = req.decoded.email;
//     //   const query = { email: email }
//     //   const user = await usersCollection.findOne(query);
//     //   if (user?.role !== 'admin') {
//     //     return res.status(403).send({ error: true, message: 'forbidden message' });
//     //   }
//     //   next();
//     // }
//     // get all classes
//     app.get("/allClasses", async (req, res) => {
//       const result = await classesCollection.find().toArray();
//       res.send(result);
//     });
//     // get a class
//     app.get("/getClass/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await classesCollection.findOne(query);
//       res.send(result);
//     });
//     // add class
//     app.post("/addClass", async (req, res) => {
//       const classInfo = req.body;
//       const result = await classesCollection.insertOne(classInfo);
//       res.send(result);
//     });
//     // update class
//     app.put("/updateClass/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const info = req.body;
//       const updateDoc = {
//         $set: info,
//       };
//       const result = await classesCollection.updateOne(filter, updateDoc);
//       res.send(result);
//     });
//     // delete class
//     app.delete("/deleteClass/:id", verifyJWT, async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await classesCollection.deleteOne(query);
//       res.send(result);
//     });
//     app.post("/addUser", async (req, res) => {
//       const userInfo = req.body;
//       if (!userInfo.email || !userInfo.name) {
//         return;
//       }
//       const getUser = await usersCollection.findOne({ email: userInfo.email });
//       const ids = [];
//       const getUsers = await usersCollection.find().toArray();
//       const filteredUses = getUsers.reduce((acc, user) => {
//         if (!acc.includes(user.email)) {
//           acc.push(user.email);
//           ids.push(user._id);
//         }
//         return acc;
//       }, []);
//       const deletedResult = await usersCollection.deleteMany({
//         _id: { $nin: ids.map((id) => new ObjectId(id)) },
//       });
//       if (!getUser) {
//         const result = await usersCollection.insertOne(userInfo);
//         res.send(result);
//       } else {
//         res.send({ message: "user exist" });
//       }
//     });
//     app.get("/getUsers", async (req, res) => {
//       const getUsers = await usersCollection.find().toArray();
//       res.send(getUsers);
//     });
//     app.get("/getUser", async (req, res) => {
//       const email = req.query.email;
//       if (!email) {
//         res.send({ success: false });
//         return;
//       }
//       const getUser = await usersCollection.findOne({ email: email });
//       if (!getUser) {
//         res.send({ success: false });
//       } else {
//         res.send(getUser);
//       }
//     });
//     app.post("/addSelectedClass", async (req, res) => {
//       const { email, id } = req.body;
//       const result = await selectedClassCollection.updateOne(
//         { email },
//         { $push: { selectedClassIds: id } },
//         { upsert: true }
//       );
//       res.send(result);
//     });
//     app.get("/getSelectedClassIds", async (req, res) => {
//       const email = req.query.email;
//       const result = await selectedClassCollection.findOne({ email: email });
//       if (!result) {
//         res.send({
//           email: email,
//           selectedClassIds: [],
//         });
//       } else {
//         res.send(result);
//       }
//     });
//     app.get("/getSelectedClass", verifyJWT, async (req, res) => {
//       const email = req.query.email;
//       const selectedResult = await selectedClassCollection.findOne({
//         email,
//       });
//       if (!selectedResult) {
//         res.send([]);
//         return;
//       }
//       const objectId = selectedResult?.selectedClassIds.map(
//         (id) => new ObjectId(id)
//       );
//       const result = await classesCollection
//         .find({
//           _id: {
//             $in: objectId,
//           },
//         })
//         .toArray();
//       res.send(result);
//     });
//     // delete class
//     app.delete("/deleteSelectedClass", verifyJWT, async (req, res) => {
//       const email = req.query?.email;
//       const id = req.query?.id;
//       const query = { email };
//       const result = await selectedClassCollection.updateOne(query, {
//         $pull: { selectedClassIds: id },
//       });
//       res.send(result);
//     });
//     app.get("/getSingleClass/:id", async (req, res) => {
//       const id = req.params.id;
//       const singleClass = await classesCollection.findOne({
//         _id: new ObjectId(id),
//       });
//       res.send(singleClass);
//     });
//     // *create payment intent
//     app.post("/create-payment-intent", verifyJWT, async (req, res) => {
//       const { price } = req.body;
//       const amount = price * 100;
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount,
//         currency: "usd",
//         payment_method_types: ["card"],
//       });
//       res.send({
//         clientSecret: paymentIntent.client_secret,
//       });
//     });
//     // saving payment info
//     app.post("/payments", verifyJWT, async (req, res) => {
//       const paymentInfo = req.body;
//       const result = await paymentsCollection.insertOne(paymentInfo);
//       const selectedResult = await selectedClassCollection.updateOne(
//         { email: paymentInfo.student_email },
//         { $pull: { selectedClassIds: paymentInfo.classId } }
//       );
//       const increaseResult = await classesCollection.updateOne(
//         { _id: new ObjectId(paymentInfo.classId) },
//         { $inc: { enrolled: 1, available_seats: -1 } }
//       );
//       res.send(result);
//     });
//     // get enrolled classes
//     app.get("/getEnrolledClasses", verifyJWT, async (req, res) => {
//       const email = req.query.email;
//       const paymentedItems = await paymentsCollection
//         .find({
//           student_email: email,
//         })
//         .toArray();
//       const enrolledClasses = await classesCollection
//         .find({
//           _id: {
//             $in: paymentedItems.map((item) => new ObjectId(item.classId)),
//           },
//         })
//         .toArray();
//       res.send(enrolledClasses);
//     });
//     app.put("/updateApproveStatus/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await classesCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { status: "approved" } }
//       );
//       res.send(result);
//     });
//     app.put("/updateDenyStatus/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await classesCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { status: "denied" } }
//       );
//       res.send(result);
//     });
//     app.put("/updateFeedback/:id", async (req, res) => {
//       const id = req.params.id;
//       const feedback = req.body.message;
//       const result = await classesCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { feedback: feedback } }
//       );
//       res.send(result);
//     });
//     app.put("/updateUserRole/:id", async (req, res) => {
//       const id = req.params.id;
//       const role = req.body.role;
//       const result = await usersCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { role: role } }
//       );
//       res.send(result);
//     });
//     app.get("/getAInstructorClasses", async (req, res) => {
//       const email = req.query.email;
//       const result = await classesCollection.find({ email: email }).toArray();
//       res.send(result);
//     });
//     app.get("/getPaymentDetails", verifyJWT, async (req, res) => {
//       const email = req.query.email;
//       const result = await paymentsCollection
//         .find({
//           student_email: email,
//         })
//         .sort({ date: -1 })
//         .toArray();
//       res.send(result);
//     });
//     // Send a ping to confirm a successful connectio
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);
// app.get("/", (req, res) => {
//   res.send("home api");
// });
// app.listen(PORT, () => {
//   console.log("server is runnig at http://localhost:" + PORT);
// });
//# sourceMappingURL=index.js.map