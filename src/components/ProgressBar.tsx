type ProgressBarProps = {
  hidden: boolean;
  section: string;
  current: number;
  total: number;
  progress: number;
};

const formatNumber = (value: number) => String(value).padStart(2, "0");

export default function ProgressBar({ hidden, section, current, total, progress }: ProgressBarProps) {
  return (
    <footer className={`presentation-footer ${hidden ? "is-dimmed" : ""}`}>
      <div className="footer-section">
        <span className="footer-pulse" aria-hidden="true" />
        {section}
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="발표 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <span className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="footer-count" aria-label={`${current} / ${total}`}>
        <strong>{formatNumber(current)}</strong>
        <span>/</span>
        {formatNumber(total)}
      </div>
    </footer>
  );
}
