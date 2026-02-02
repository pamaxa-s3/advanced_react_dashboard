import React from "react";

function ErrorFallback({ onRetry }) {
  return (
    <div role="alert" style={{ padding: 20, border: "1px solid red", borderRadius: 8, backgroundColor: "#ffe5e5", textAlign: "center" }}>
      <p>Щось пішло не так 😢</p>
      <button
        onClick={onRetry}
        style={{ padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#ef4444", color: "#fff", cursor: "pointer" }}
      >
        Спробувати ще раз
      </button>
    </div>
  );
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) return <ErrorFallback onRetry={this.handleRetry} />;
    return this.props.children;
  }
}