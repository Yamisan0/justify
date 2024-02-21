export const justifyTextService = (
  text: string,
  maxWidth: number
): { newText: string; tokenLength: number } => {
  const justifiedText: string[] = [];
  if (text.length > 10000) {
    //arbitrary limit to avoid server overload
    return {
      newText: "Text too long",
      tokenLength: 0,
    };
  }

  const words = text.split(" ");
  for (let i = 0, totalWords = words.length; i < totalWords; ) {
    const currentLine: string[] = [words[i]]; // Start with the current word.
    let currentLineCharCount = words[i++].length; // Char count includes current word.

    // Keep adding words while they fit in maxWidth including spaces.
    while (
      i < totalWords &&
      currentLineCharCount + 1 + words[i].length <= maxWidth
    ) {
      currentLine.push(words[i]);
      // Update char count, adding one for the new space before the word.
      currentLineCharCount += 1 + words[i++].length;
    }

    // If this is the last line or the line contains only one word.
    if (i === totalWords || currentLine.length === 1) {
      // Join all the words with a single space
      const leftJustified = currentLine.join(" ");
      const rightPadding = " ".repeat(maxWidth - leftJustified.length);
      // Add the final line to the answer.
      justifiedText.push(leftJustified + rightPadding);
      continue;
    }

    // Calculate the width of spaces needed and the width to distribute evenly.
    const totalSpaceWidth =
      maxWidth - (currentLineCharCount - currentLine.length + 1);
    const evenSpaceWidth = Math.floor(
      totalSpaceWidth / (currentLine.length - 1)
    );
    // Determine if any extra spaces are needed.
    const remainderSpaces = totalSpaceWidth % (currentLine.length - 1);
    const currentRow: string[] = []; // This will hold the contents of the line.

    // Distribute the spaces to the current row.
    for (let j = 0; j < currentLine.length - 1; ++j) {
      currentRow.push(currentLine[j]); // Add the word to the line.
      // Add the appropriate number of spaces after the word.
      currentRow.push(
        " ".repeat(evenSpaceWidth + (j < remainderSpaces ? 1 : 0))
      );
    }

    // Add the last word without extra spaces after it.
    currentRow.push(currentLine[currentLine.length - 1]);

    // Join all elements of the row into a string and add to the result.
    justifiedText.push(currentRow.join(""));
  }
  return {
    newText: justifiedText.join("\n"),
    tokenLength: words.length,
  }; //returning justified text with line breaks between lines
};
