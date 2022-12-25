import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="loading">
      <CircularProgress size={80} />
      <div className="loading-text">Loading...</div>
    </div>
  );
}
