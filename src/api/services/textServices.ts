export const justifyTextService = (text: string): {newText: string , tokenLength: number} => {
  if (text.length > 10000) {
    //arbitrary limit to avoid server overload
    return {
      newText: "Text too long",
      tokenLength: 0,
    };
  }

  const words = text.split(" "); //splitting text into words
  let lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    if (line.length + word.length <= 80) {
      line += `${word} `; //adding words to line until it reaches 80 characters
    } else {
      lines.push(line.trim()); //pushing line to lines array and starting a new line
      line = `${word} `;
    }
  });
  lines.push(line.trim());
  const justified = lines.join("\n")
  return {
    newText: justified,
    tokenLength: words.length,
  } //returning justified text with line breaks between lines
};
