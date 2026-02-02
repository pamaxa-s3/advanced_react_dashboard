import { useActionState, useRef } from "react";
import { checkEmailExists } from "@utils/api";


/**
 * Server Action (імітація)
 */
async function addUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const role = formData.get("role");

  // 1. Валідація
  if (!name || !email || !role) {
    return { success: false, error: "Всі поля обовʼязкові" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Некоректний email" };
  }

  // 2. Async перевірка унікальності email
  const isEmailTaken = await checkEmailExists(email);
  if (isEmailTaken) {
    return { success: false, error: "Email вже зареєстрований" };
  }

  // 3. Mock async запит
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 4. Успіх
  return {
    success: true,
    message: "Користувача додано",
    user: { name, email, role },
  };
}

export default function UserForm() {
  const formRef = useRef(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await addUser(prevState, formData);

      // ✅ Очищення форми після успіху
      if (result.success) {
        formRef.current?.reset();
      }

      return result;
    },
    null
  );

  return (
    <div style={styles.card}>
      <h3>👤 Add User</h3>

      <form ref={formRef} action={formAction} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          required
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          required
          style={styles.input}
        />

        <select name="role" required style={styles.input}>
          <option value="">Оберіть роль</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button disabled={isPending} style={styles.button}>
          {isPending ? "Додавання..." : "Додати користувача"}
        </button>
      </form>

      {/* ===== Messages ===== */}
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
    background: "#6366f1",
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