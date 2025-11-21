// This prevents notes from being dragged off-screen.
// The farthest our notes can be moved to the top and left is 0.
export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

// Auto-grow effect for the textarea to get rid of scrollbar
export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;
  current.style.height = "auto"; // Reset the height
  current.style.height = current.scrollHeight + "px"; // Set the new height
};

// Set the z-index of the selected card to be on top of others
export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  // Lower the z-index of all other cards
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};
