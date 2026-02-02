import { useActionState } from "react";

/**
 * Server Action (імітація)
 * prevState — попередній state
 * formData — дані з форми
 */
async function submitSale(prevState, formData) {
  const customer = formData.get("customer");
  const product = formData.get("product");
  const quantity = Number(formData.get("quantity"));
  const price = Number(formData.get("price"));

  // 1. Валідація
  if (!customer || !product) {
    return { success: false, error: "Customer та Product обовʼязкові" };
  }

  if (quantity <= 0 || price <= 0) {
    return { success: false, error: "Quantity та Price мають бути > 0" };
  }

  // 2. Mock async запит
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 3. Імітація помилки
  if (product.toLowerCase() === "error") {
    return { success: false, error: "Серверна помилка. Спробуй ще раз." };
  }

  // 4. Успіх
  return {
    success: true,
    message: `Продаж для ${customer} успішно додано`,
  };
}

export default function SalesForm() {
  const [state, formAction, isPending] = useActionState(submitSale, null);

  return (
    <div style={styles.card}>
      <h3>🧾 New Sale</h3>

      <form action={formAction} style={styles.form}>
        <input
          name="customer"
          placeholder="Customer"
          required
          style={styles.input}
        />

        <input
          name="product"
          placeholder="Product"
          required
          style={styles.input}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          required
          style={styles.input}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          style={styles.input}
        />

        <button disabled={isPending} style={styles.button}>
          {isPending ? "Додавання..." : "Додати продаж"}
        </button>
      </form>

      {/* Повідомлення */}
      {state?.success && (
        <p style={{ ...styles.message, ...styles.success }}>
          ✅ {state.message}
        </p>
      )}

      {state?.error && (
        <p style={{ ...styles.message, ...styles.error }}>
          ❌ {state.error}
        </p>
      )}
    </div>
  );
}

/**
 * styles
 */
const styles = {
  card: {
    padding: 16,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    maxWidth: 360,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  button: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
  message: {
    marginTop: 10,
    fontSize: 14,
  },
  success: {
    color: "#16a34a",
  },
  error: {
    color: "#dc2626",
  },
};