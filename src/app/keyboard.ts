export type PresentationCommand =
  | "next"
  | "previous"
  | "home"
  | "end"
  | "reset"
  | "fullscreen";

export function commandForKeyboardEvent(event: KeyboardEvent): PresentationCommand | null {
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return null;

  const target = event.target as HTMLElement | null;
  if (target?.isContentEditable || target?.matches("input, textarea, select")) return null;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
    case " ":
    case "PageDown":
      return "next";
    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
      return "previous";
    case "Home":
      return "home";
    case "End":
      return "end";
    case "r":
    case "R":
      return "reset";
    case "f":
    case "F":
      return "fullscreen";
    default:
      return null;
  }
}
