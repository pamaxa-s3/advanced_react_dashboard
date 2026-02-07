import mockSalesData from '@data/mockSalesData';

export async function updateOrderStatus(orderId, newStatus) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({ success: true, orderId, newStatus });
      } else {
        reject(
          new Error("Не вдалося оновити статус. Спробуйте ще раз.")
        );
      }
    }, 1000);
  });
}

export async function loadChartData(period) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSalesData[period] || []);
    }, 1500);
  });
}

export async function checkEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenEmails = ["admin@example.com", "test@example.com"];
      resolve(takenEmails.includes(email));
    }, 500);
  });
}
