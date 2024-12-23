const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Welcome To My Website");
});

//GET BRANCH
app.get("/branchs", async (req, res) => {
  const branch = await prisma.branch.findMany();
  res.send(branch);
});

//GET TREATMENT
app.get("/treatments", async (req, res) => {
  const treatment = await prisma.treatment.findMany();
  res.send(treatment);
});

//GET TERAPIST BOOKING
app.get("/terapist/booking", async (req, res) => {
  const terapist = await prisma.terapist.findMany();
  res.send(terapist);
});

//CREATE TERAPIST
app.post("/terapist", async (req, res) => {
  const newTerapistData = req.body;
  const terapist = await prisma.terapist.create({
    data: {
      name: newTerapistData.name,
      service: newTerapistData.service,
      rating: newTerapistData.rating,
    },
  });

  res.send({
    data: terapist,
    message: "create user success",
  });
});

//CREATE TERAPIST WITH BOOKING ID
app.post("/terapist/booking", async (req, res) => {
  const { branchId, date, start_time, treatmentId } = req.body;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        branchId: branchId,
        date: date,
        start_time: start_time,
        treatmentId: treatmentId,
      },
      select: {
        terapistId: true,
      },
    });

    const bookedTerapistIds = bookings.map((booking) => booking.terapistId);

    const availableTerapists = await prisma.terapist.findMany({
      where: {
        branchId: branchId,
        date: date,
        start_time: start_time,
        treatmentId: treatmentId,
        id: {
          not: {
            in: bookedTerapistIds,
          },
        },
      },
    });

    const result = {
      bookedTerapists: bookedTerapistIds,
      availableTerapists: availableTerapists,
    };

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET BOOKING
app.get("/review", async (req, res) => {
  const booking = await prisma.booking.findMany();
  res.send(booking);
});

//CREATE BOOKING
app.post("/booking", async (req, res) => {
  const newBookingData = req.body;
  const booking = await prisma.booking.create({
    data: {
      name: newBookingData.name,
      phone: newBookingData.phone,
      branchName: newBookingData.branchName,
      date: newBookingData.date,
      start_time: newBookingData.start_time,
      treatmentName: newBookingData.treatmentName,
      terapistName: newBookingData.terapistName,
      price:newBookingData.price,
      service:newBookingData.service,
      total: newBookingData.total,
    },
  });

  res.send({
    data: booking,
    message: "create order booking success",
  });
});

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
