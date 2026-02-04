import "./LoadingSpinner.css";

const LoadingSpinner = ({
	size = 40,
	label = "Завантаження...",
	overlay = false,
}) => {
	const spinner = (
		<div
			className="loading-spinner"
			style={{ width: size, height: size }}
			role="status"
			aria-live="polite"
			aria-label={label}
		>
			<span className="visually-hidden">{label}</span>
		</div>
	);

	if (!overlay) return spinner;

	return <div className="loading-spinner-overlay">{spinner}</div>;
};

export default LoadingSpinner;
