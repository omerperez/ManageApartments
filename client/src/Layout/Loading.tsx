import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  text?: string;
}
export default function Loading({ text }: LoadingProps) {
  return (
    <div className="loading">
      <CircularProgress size={80} />
      <div className="loading-text">{text ?? "טוען נתונים..."}</div>
    </div>
  );
}
