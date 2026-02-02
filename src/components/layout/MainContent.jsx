export default function MainContent({ children }) {
  return (
    <main style={{ flex: 1, padding: 16, overflowY: "auto" }}>
      {children}
    </main>
  );
}