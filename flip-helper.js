/* =========================================
   FLIP MODE FUNCTION
   ========================================= */

function applyFlipMode(flipMode) {
  const flipValue = String(flipMode || "no").toLowerCase();
  
  if (flipValue === "yes") {
    beeLayer.classList.add("flip-enabled");
  } else {
    beeLayer.classList.remove("flip-enabled");
  }
}

/* Reverse text for readability when path is flipped */
function getReverseText(text) {
  return text.split('').reverse().join('');
}

/* Queue text path with flip awareness */
function queueTextPathWithFlip(text) {
  const flipValue = String(fieldData.flipMode || "no").toLowerCase();
  
  // If flip mode is enabled, reverse the text so it reads correctly when path is flipped
  const displayText = flipValue === "yes" ? getReverseText(text) : text;
  
  textQueue.push(displayText);
}
