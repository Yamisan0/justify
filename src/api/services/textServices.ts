export const justifyTextService = (text: string): string => {
  if (text.length > 10000) {
    //arbitrary limit to avoid server overload
    return "Text too long";
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
  return lines.join("\n"); //returning justified text with line breaks between lines
};
