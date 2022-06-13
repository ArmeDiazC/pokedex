import "./styles/LoadingSpinner.scss";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="loading-spinner">
      </div>
    </div>
  );
}