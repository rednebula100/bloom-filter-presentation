type NavigationProps = {
  hidden: boolean;
  previousDisabled: boolean;
  nextDisabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Navigation({
  hidden,
  previousDisabled,
  nextDisabled,
  onPrevious,
  onNext,
}: NavigationProps) {
  return (
    <nav className={`slide-navigation ${hidden ? "is-dimmed" : ""}`} aria-label="발표 장면 이동">
      <button
        className="navigation-arrow navigation-arrow--previous"
        type="button"
        aria-label="이전 비트 또는 슬라이드"
        disabled={previousDisabled}
        onClick={onPrevious}
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        className="navigation-arrow navigation-arrow--next"
        type="button"
        aria-label="다음 비트 또는 슬라이드"
        disabled={nextDisabled}
        onClick={onNext}
      >
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
