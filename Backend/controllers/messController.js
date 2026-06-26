const MessBill = require("../models/MessBill");
const User = require("../models/User");

/* ================= STUDENT UPLOAD ADVANCE ================= */
exports.uploadAdvancePayment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Screenshot required" });
    }

    const amount = Number(req.body.amount);
    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: "Valid amount required" });
    }

    const user = await User.findById(req.user.id);

    user.advancePaymentScreenshot = req.file.path;
    user.pendingAdvanceAmount = amount;
    user.advancePaymentStatus = "PENDING";

    await user.save();
    res.json({ msg: "Advance uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= WARDEN APPROVE ADVANCE ================= */
exports.approveAdvancePayment = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.advancePaymentStatus !== "PENDING") {
      return res.status(400).json({ msg: "Invalid request" });
    }

    user.advanceAmount += user.pendingAdvanceAmount;
    user.pendingAdvanceAmount = 0;
    user.advancePaymentStatus = "APPROVED";

    await user.save();
    res.json({ msg: "Advance approved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= WARDEN CREATE BILL ================= */
exports.createMessBill = async (req, res) => {
  const { studentId, month, baseAmount, perDayAmount } = req.body;

  if (!studentId || !month || !baseAmount) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    const bill = await MessBill.create({
      student: studentId,
      month,
      baseAmount,
      perDayAmount: perDayAmount || 100,
      totalCutAmount: 0,
      finalAmount: baseAmount,
    });

    res.status(201).json(bill);
  } catch (err) {
    // 🔥 duplicate month bill
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "Bill already exists for this student & month",
      });
    }

    console.error("CREATE BILL ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

   

/* ================= STUDENT VIEW WALLET + BILLS ================= */
exports.myMessBills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const bills = await MessBill.find({ student: req.user.id });

    res.json({
      advanceAmount: user.advanceAmount,
      usedAmount: user.usedAmount,
      remainingFund: user.advanceAmount - user.usedAmount,
      bills,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= PUBLIC / WARDEN VIEW ALL BILLS ================= */
exports.allMessBills = async (req, res) => {
  try {
    const bills = await MessBill.find().populate("student", "name email");
    res.json(bills);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= STUDENT REQUEST CUT ================= */
exports.requestMessCut = async (req, res) => {
  try {
    const { days, reason } = req.body;
    if (!days || days <= 0 || !reason) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    const bill = await MessBill.findById(req.params.id);
    if (!bill || bill.student.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    bill.messCuts.push({ days, reason });
    await bill.save();

    res.json({ msg: "Cut requested" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= WARDEN APPROVE CUT ================= */
exports.approveMessCut = async (req, res) => {
  try {
    const { cutId } = req.body;
    const bill = await MessBill.findById(req.params.id);

    const cut = bill.messCuts.id(cutId);
    if (!cut) {
      return res.status(404).json({ msg: "Cut not found" });
    }

    cut.status = "APPROVED";

    const cutAmount = cut.days * bill.perDayAmount;
    bill.totalCutAmount += cutAmount;
    bill.finalAmount = bill.baseAmount - bill.totalCutAmount;

    await bill.save();

    const user = await User.findById(bill.student);
    user.usedAmount += bill.finalAmount;
    await user.save();

    res.json({ msg: "Cut approved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= WARDEN REJECT CUT ================= */
exports.rejectMessCut = async (req, res) => {
  try {
    const { cutId } = req.body;
    const bill = await MessBill.findById(req.params.id);

    const cut = bill.messCuts.id(cutId);
    if (!cut) {
      return res.status(404).json({ msg: "Cut not found" });
    }

    cut.status = "REJECTED";
    await bill.save();

    res.json({ msg: "Cut rejected" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};