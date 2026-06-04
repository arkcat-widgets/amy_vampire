/* =========================================
   TEXT PATH FUNCTIONS
   ========================================= */

function queueTextPath(text) {
  textQueue.push(text);
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

function consumeNextText() {
  activeText = textQueue.shift() || null;
  
  if (!activeText || !beeTextPath) {
    textActive = false;
    if (beePathText) beePathText.style.opacity = "0";
    return;
  }

  beeTextPath.textContent = activeText;
  beeTextPath.setAttribute("startOffset", "0%");
  if (beePathText) beePathText.style.opacity = "0";
  textActive = true;
}
