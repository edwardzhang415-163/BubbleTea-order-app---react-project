import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from  'express-oauth2-jwt-bearer'

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: 'RS256'
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  res.send("pong");
});

// requireAuth middleware will validate the access token sent by the client and will return the user information within req.auth
app.get("/orders", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
  });

  res.json(orders);
});



// Get all teas
app.get('/tea', async (req, res) => {
  const teas = await prisma.tea.findMany();
  res.json(teas);
});

// deletes a tea by id
app.delete("/tea/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const deletedItem = await prisma.teas.delete({
    where: {
      id:parseInt(id),
    },
  });
  res.json(deletedItem);
});

// get a tea by id
app.get("/tea/:id", async (req, res) => {
  const id = req.params.id;
  const tea = await prisma.tea.findUnique({
    where: {
      id:parseInt(id),
    },
  });
  res.json(tea);
});


// get Profile information of authenticated user
app.post("/me", async (req, res) => {
  const auth0Id = req.body.auth0Id;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  res.json(user);
});

app.post("/order", async (req, res) => {

  const { name, price, intro, amount,auth0Id } = req.body;

  const newOrder = await prisma.order.create({
    data: {
      name, 
      price, 
      intro,
      amount,
      user: { connect: { auth0Id } },
    },
  });
  res.status(201).json(newOrder);
}); 

app.post("/orders", async (req, res) => {
  const auth0Id = req.body.auth0Id;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
  });

  res.json(orders);
});
// Get all teas
app.get('/tea', async (req, res) => {
  const teas = await prisma.tea.findMany();
  res.json(teas);
});
// Update tel of authenticated user
app.put("/me", async (req, res) => {
  const email = req.body.email;
  const tel = req.body.tel;

  const updateTel = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tel,
    },
  });

  res.json(updateTel);
});
// this endpoint is used by the client to verify the user status and to make sure the user is registered in our database once they signup with Auth0
// if not registered in our database we will create it.
// if the user is already registered we will return the user information
app.post("/verify-user", async (req, res) => {
  const auth0Id = req.body.auth0Id;
  const email = req.body.email;
  const name = req.body.name;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });

    res.json(newUser);
  }
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
