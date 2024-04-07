import { HashiPuzzleRendered } from "./HashiPuzzleRendered";
import { PuzzleMenuBar } from "./PuzzleMenuBar";
import { HashiPuzzle } from "./library/HashiPuzzle";

export function PuzzleView(puzzleObject: HashiPuzzle) {
  return (
    <>
      <PuzzleMenuBar />
      <HashiPuzzleRendered puzzle={puzzleObject} />
    </>
  );
}
