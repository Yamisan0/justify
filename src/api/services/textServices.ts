export const justifyTextService = (text: string): string => {
  if (text.length > 10000) {
    return "Text too long"; //arbitrary limit
  }

  const words = text.split(" ");
  let lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    if (line.length + word.length <= 80) {
      line += `${word} `;
    } else {
      lines.push(line.trim());
      line = `${word} `;
    }
  });
  lines.push(line.trim());
  return lines.join("\n"); //returning justified text with line breaks between lines
};
