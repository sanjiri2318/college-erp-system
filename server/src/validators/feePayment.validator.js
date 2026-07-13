const validateCreateFeePayment = (req, res, next) => {
  const {
    studentFeeId,
    amount,
    paymentMode,
    transactionId,
  } = req.body;

  if (
    !studentFeeId ||
    amount === undefined ||
    !paymentMode
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Student fee, amount and payment mode are required.",
    });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero.",
    });
  }

  const validPaymentModes = [
    "CASH",
    "UPI",
    "CARD",
    "NET_BANKING",
  ];

  if (!validPaymentModes.includes(paymentMode)) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment mode.",
    });
  }

  if (
    ["UPI", "CARD", "NET_BANKING"].includes(paymentMode) &&
    !transactionId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Transaction ID is required for online payments.",
    });
  }

  next();
};

module.exports = {
  validateCreateFeePayment,
};