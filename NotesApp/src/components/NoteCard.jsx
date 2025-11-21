import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex } from "../utils";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  // Use state to manage position for drag-and-drop functionality
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  const textAreaRef = useRef(null);

  const mouseStartPos = useRef({ x: 0, y: 0 });

  const cardRef = useRef(null);

  // Adjust textarea height on component mount
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  // Mouse down event to initiate dragging
  // Capture the starting x & y position
  // Listen for the following mousemove events.
  const mouseDown = (e) => {
    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    // Bring the selected card to the front
    setZIndex(cardRef.current);
  };

  const mouseMove = (e) => {
    //1 - Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    //3 - Update card top and left position.
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          // As we're typing, adjust height
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          // Bring the selected card to the front
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
