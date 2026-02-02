/**
 * ===============================
 * Mock API functions
 * ===============================
 */

/**
 * Оновлення статусу замовлення
 * 90% success / 10% error
 */
export async function updateOrderStatus(orderId, newStatus) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          orderId,
          newStatus,
        });
      } else {
        reject(
          new Error("Не вдалося оновити статус. Спробуйте ще раз.")
        );
      }
    }, 1000);
  });
}

/**
 * Mock sales data
 */
const mockSalesData = {
  week: [
    { label: "Mon", value: 1200 },
    { label: "Tue", value: 1800 },
    { label: "Wed", value: 1500 },
    { label: "Thu", value: 2100 },
    { label: "Fri", value: 2400 },
    { label: "Sat", value: 1900 },
    { label: "Sun", value: 1700 },
  ],
  month: Array.from({ length: 30 }, (_, i) => ({
    label: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 3000 + 1000),
  })),
  year: [
    { label: "Jan", value: 12000 },
    { label: "Feb", value: 14500 },
    { label: "Mar", value: 16000 },
    { label: "Apr", value: 17800 },
    { label: "May", value: 19000 },
    { label: "Jun", value: 21000 },
    { label: "Jul", value: 23000 },
    { label: "Aug", value: 22500 },
    { label: "Sep", value: 20000 },
    { label: "Oct", value: 21500 },
    { label: "Nov", value: 24000 },
    { label: "Dec", value: 26000 },
  ],
};

/**
 * Завантаження даних для графіка
 */
export async function loadChartData(period) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSalesData[period] || []);
    }, 1500);
  });
}

/**
 * Перевірка унікальності email
 */
export async function checkEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenEmails = [
        "admin@example.com",
        "test@example.com",
      ];

      resolve(
        takenEmails.includes(email.toLowerCase())
      );
    }, 500);
  });
}

/**
 * ===== Optional helpers =====
 */

/**
 * Mock notification helpers
 */
export function showErrorNotification(message) {
  console.error("❌", message);
  alert(message);
}

export function showSuccessNotification(message) {
  console.log("✅", message);
}