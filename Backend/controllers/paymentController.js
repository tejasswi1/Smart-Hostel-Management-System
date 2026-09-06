const MessBill = require("../models/MessBill");
const createAuditLog = require("../utils/createAuditLog");

exports.payBill = async (req, res) => {
  try {
    // Update the bill as paid with proof
    const bill = await MessBill.findByIdAndUpdate(
      req.params.id,
      {
        paid: true,
        paymentProof: req.file.filename,
      },
      { new: true }
    );

    // Create audit log after successful payment
    await createAuditLog(
      req.user.id,
      "MESS_BILL_PAID",
      `bill ID: ${bill._id}`
    );

    res.json({ msg: "Payment submitted", bill });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

