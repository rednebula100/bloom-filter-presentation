type StatusPanelProps = {
  label: string;
  value: string;
  note?: string;
  tone?: "cyan" | "lime" | "purple";
  className?: string;
};

export default function StatusPanel({
  label,
  value,
  note,
  tone = "cyan",
  className = "",
}: StatusPanelProps) {
  return (
    <div className={`status-panel status-panel--${tone} ${className}`.trim()}>
      <span className="status-panel__label">{label}</span>
      <strong className="status-panel__value">{value}</strong>
      {note && <span className="status-panel__note">{note}</span>}
    </div>
  );
}
