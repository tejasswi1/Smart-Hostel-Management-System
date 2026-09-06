const User = require("../models/User");
const MessTransaction = require("../models/MessTransaction");
const createAuditLog = require("../utils/createAuditLog");
const createNotification = require("../utils/createNotification");

const MESS_AMOUNT = 36000;
const MEAL_AMOUNT = 100;

/* ===========================================================
   STUDENT
   Submit ₹36,000 Mess Payment Screenshot
=========================================================== */

exports.uploadMessPayment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        msg: "Payment screenshot is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    if (user.messPaymentStatus === "PENDING") {
      return res.status(400).json({
        msg: "Previous payment is still waiting for approval",
      });
    }
   if (user.messPaymentStatus === "APPROVED") {
  return res.status(400).json({
    msg: "Your ₹36,000 mess payment is already approved.",
  });
} 

    user.messInitialAmount = MESS_AMOUNT;
    user.messPaymentScreenshot = req.file.path;
    user.messPaymentStatus = "PENDING";

    await user.save();

    await createAuditLog(
      req.user.id,
      "MESS_PAYMENT_SUBMITTED",
      `Mess payment proof submitted for ₹${MESS_AMOUNT}`
    );

    res.status(200).json({
      msg: "₹36,000 payment proof submitted successfully. Waiting for warden approval.",
    });
  } catch (err) {
    console.error("UPLOAD MESS PAYMENT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   WARDEN
   Approve ₹36,000 Mess Payment
=========================================================== */

exports.approveMessPayment = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    if (student.messPaymentStatus !== "PENDING") {
      return res.status(400).json({
        msg: "No pending mess payment",
      });
    }

    student.messInitialAmount = MESS_AMOUNT;

    // Start student's mess balance at ₹36,000
    student.messBalance = MESS_AMOUNT;

    student.messUsedAmount = 0;

    student.messPaymentStatus = "APPROVED";

    await student.save();

    await createNotification(
      student._id,
      "Your ₹36,000 mess payment has been approved."
    );

    await createAuditLog(
      req.user.id,
      "MESS_PAYMENT_APPROVED",
      `Student ${student._id} mess payment approved for ₹${MESS_AMOUNT}`
    );

    res.json({
      msg: "Mess payment approved successfully",
      balance: student.messBalance,
    });
  } catch (err) {
    console.error("APPROVE MESS PAYMENT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   WARDEN
   Reject Mess Payment
=========================================================== */

exports.rejectMessPayment = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    if (student.messPaymentStatus !== "PENDING") {
      return res.status(400).json({
        msg: "No pending mess payment",
      });
    }

    student.messPaymentStatus = "REJECTED";
    student.messPaymentScreenshot = "";

    await student.save();

    await createNotification(
      student._id,
      "Your mess payment proof was rejected. Please upload it again."
    );

    await createAuditLog(
      req.user.id,
      "MESS_PAYMENT_REJECTED",
      `Student ${student._id} mess payment rejected`
    );

    res.json({
      msg: "Mess payment rejected",
    });
  } catch (err) {
    console.error("REJECT MESS PAYMENT ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   STUDENT
   Get Mess Balance
=========================================================== */

exports.myMess = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    const currentMonth = new Date().toISOString().slice(0, 7);

    const transactions = await MessTransaction.find({
      student: req.user.id,
      month: currentMonth,
    }).sort({ createdAt: -1 });

    res.json({
      initialAmount: student.messInitialAmount,
      usedAmount: student.messUsedAmount,
      balance: student.messBalance,
      paymentStatus: student.messPaymentStatus,
      mealsThisMonth: transactions.length,
      transactions,
    });
  } catch (err) {
    console.error("MY MESS ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   STUDENT
   Scan Mess QR = Meal Attendance
=========================================================== */

exports.scanQR = async (req, res) => {
  try {
    const { qrData } = req.body;

if (qrData !== "MMUT_HOSTEL_MESS") {
  return res.status(400).json({
    msg: "Invalid mess QR",
  });
}
    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    // Payment must be approved first
    if (student.messPaymentStatus !== "APPROVED") {
      return res.status(400).json({
        msg: "Your ₹36,000 mess payment has not been approved yet.",
      });
    }

    // Enough balance?
    if (student.messBalance < MEAL_AMOUNT) {
      return res.status(400).json({
        msg: "Insufficient mess balance.",
      });
    }

    const now = new Date();

    const mealDate = now.toISOString().slice(0, 10);
    const month = now.toISOString().slice(0, 7);

    // Check whether student already ate today
    const alreadyScanned = await MessTransaction.findOne({
      student: req.user.id,
      mealDate,
    });

    if (alreadyScanned) {
      return res.status(400).json({
        msg: "Today's meal has already been recorded.",
      });
    }

    // Deduct ₹100
    student.messBalance -= MEAL_AMOUNT;

    student.messUsedAmount += MEAL_AMOUNT;

    await student.save();

    let transaction;

    try {
      transaction = await MessTransaction.create({
        student: student._id,
        amount: MEAL_AMOUNT,
        mealDate,
        month,
        balanceAfter: student.messBalance,
      });
    } catch (err) {
      // If duplicate QR scan happens simultaneously,
      // restore balance.
      student.messBalance += MEAL_AMOUNT;
      student.messUsedAmount -= MEAL_AMOUNT;

      await student.save();

      if (err.code === 11000) {
        return res.status(400).json({
          msg: "Today's meal has already been recorded.",
        });
      }

      throw err;
    }

    await createAuditLog(
      req.user.id,
      "MESS_MEAL_RECORDED",
      `Meal recorded for ${mealDate}, ₹${MEAL_AMOUNT} deducted`
    );

    res.json({
      msg: "Meal attendance recorded successfully.",
      amountDeducted: MEAL_AMOUNT,
      balance: student.messBalance,
      transaction,
    });
  } catch (err) {
    console.error("SCAN QR ERROR:", err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   STUDENT
   Transaction History
=========================================================== */

exports.myTransactions = async (req, res) => {
  try {
    const transactions = await MessTransaction.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   WARDEN
   Pending Mess Payments
=========================================================== */

exports.pendingMessPayments = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
      messPaymentStatus: "PENDING",
    }).select(
      "_id name email messInitialAmount messPaymentScreenshot messPaymentStatus"
    );

    res.json(students);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};


/* ===========================================================
   WARDEN
   All Student Mess Records
=========================================================== */

exports.allMessRecords = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
    }).select(
      "_id name email messInitialAmount messUsedAmount messBalance messPaymentStatus"
    );

    res.json(students);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};