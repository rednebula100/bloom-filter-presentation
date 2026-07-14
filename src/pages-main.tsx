import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Presentation from "@/src/app/Presentation";
import "@/src/styles/tokens.css";
import "@/src/styles/global.css";
import "@/src/styles/presentation.css";
import "@/src/styles/animations.css";

const root = document.getElementById("root");

if (!root) throw new Error("Presentation root element was not found.");

createRoot(root).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
);
