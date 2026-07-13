const prisma = require("../../config/prisma");

const generateReceiptNumber = async () => {
  const count = await prisma.feePayment.count();

  const today = new Date();

  const date =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  return `RCPT-${date}-${String(count + 1).padStart(4, "0")}`;
};

const createFeePayment = async (data) => {
  const {
    studentFeeId,
    amount,
    paymentMode,
    transactionId,
    remarks,
  } = data;

  const studentFee = await prisma.studentFee.findUnique({
    where: {
      id: Number(studentFeeId),
    },
  });

  if (!studentFee) {
    throw new Error("Student fee not found.");
  }

  if (Number(amount) > studentFee.dueAmount) {
    throw new Error("Payment exceeds due amount.");
  }

  const receiptNo = await generateReceiptNumber();

  const payment = await prisma.feePayment.create({
    data: {
      receiptNo,
      studentFeeId: Number(studentFeeId),
      amount: Number(amount),
      paymentMode,
      transactionId,
      remarks,
    },
  });

  const paidAmount =
    studentFee.paidAmount + Number(amount);

  const dueAmount =
    studentFee.totalAmount - paidAmount;

  let status = "PARTIAL";

  if (paidAmount === 0) {
    status = "PENDING";
  }

  if (dueAmount === 0) {
    status = "PAID";
  }

  await prisma.studentFee.update({
    where: {
      id: Number(studentFeeId),
    },
    data: {
      paidAmount,
      dueAmount,
      status,
    },
  });

  return payment;
};

const getAllPayments = async () => {
  return prisma.feePayment.findMany({
    include: {
      studentFee: {
        include: {
          student: true,
          feeStructure: {
            include: {
              department: true,
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      paidAt: "desc",
    },
  });
};

const getPaymentById = async (id) => {
  const payment = await prisma.feePayment.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      studentFee: {
        include: {
          student: true,
          feeStructure: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return payment;
};

const deletePayment = async (id) => {
  const payment = await prisma.feePayment.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      studentFee: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  const paidAmount =
    payment.studentFee.paidAmount - payment.amount;

  const dueAmount =
    payment.studentFee.totalAmount - paidAmount;

  let status = "PARTIAL";

  if (paidAmount === 0) {
    status = "PENDING";
  }

  if (dueAmount === 0) {
    status = "PAID";
  }

  await prisma.studentFee.update({
    where: {
      id: payment.studentFeeId,
    },
    data: {
      paidAmount,
      dueAmount,
      status,
    },
  });

  await prisma.feePayment.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Payment deleted successfully.",
  };
};

module.exports = {
  createFeePayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
};