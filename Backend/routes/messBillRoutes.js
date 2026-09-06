const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const MessBill = require("../models/MessBill");

/*
===========================================================
WARDEN → Get all mess bills
===========================================================
*/

router.get(
  "/all",
  auth,
  role("warden"),
  async (req, res) => {
    try {
      const bills = await MessBill.find()
        .populate("student", "name email")
        .sort({ createdAt: -1 });

      res.json(bills);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        msg: "Failed to fetch mess bills",
        error: err.message,
      });
    }
  }
);


/*
===========================================================
WARDEN → Create mess bill
===========================================================
*/

router.post(
  "/",
  auth,
  role("warden"),
  async (req, res) => {
    try {
      const {
        studentId,
        month,
        amount,
      } = req.body;

      if (!studentId || !month || !amount) {
        return res.status(400).json({
          msg: "Student, month and amount are required",
        });
      }

      const bill = await MessBill.create({
        student: studentId,
        month,
        amount: Number(amount),
        status: "DEDUCTED",
      });

      const populatedBill = await MessBill.findById(
        bill._id
      ).populate("student", "name email");

      res.status(201).json({
        msg: "Mess bill created successfully",
        bill: populatedBill,
      });
    } catch (err) {
      console.error(err);

      // Duplicate student + month
      if (err.code === 11000) {
        return res.status(400).json({
          msg: "Mess bill already exists for this student and month",
        });
      }

      res.status(500).json({
        msg: "Failed to create mess bill",
        error: err.message,
      });
    }
  }
);


/*
===========================================================
STUDENT → Get own mess bills
===========================================================
*/

router.get(
  "/my",
  auth,
  role("student"),
  async (req, res) => {
    try {
      const bills = await MessBill.find({
        student: req.user.id,
      }).sort({
        month: -1,
      });

      res.json(bills);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        msg: "Failed to fetch your mess bills",
        error: err.message,
      });
    }
  }
);


/*
===========================================================
WARDEN → Get bills of a particular student
===========================================================
*/

router.get(
  "/student/:id",
  auth,
  role("warden"),
  async (req, res) => {
    try {
      const bills = await MessBill.find({
        student: req.params.id,
      })
        .populate("student", "name email")
        .sort({ month: -1 });

      res.json(bills);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        msg: "Failed to fetch student bills",
        error: err.message,
      });
    }
  }
);


/*
===========================================================
WARDEN → Delete a bill
===========================================================
*/

router.delete(
  "/:id",
  auth,
  role("warden"),
  async (req, res) => {
    try {
      const bill = await MessBill.findByIdAndDelete(
        req.params.id
      );

      if (!bill) {
        return res.status(404).json({
          msg: "Mess bill not found",
        });
      }

      res.json({
        msg: "Mess bill deleted successfully",
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        msg: "Failed to delete mess bill",
        error: err.message,
      });
    }
  }
);


module.exports = router;