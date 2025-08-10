const digitWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

// speak full number
function numberToWords(num) {
  const belowTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if (num < 20) return belowTwenty[num];
  const tenPart = Math.floor(num / 10);
  const unitPart = num % 10;
  return `${tens[tenPart]}${unitPart ? "-" + belowTwenty[unitPart] : ""}`;
}


//speaking any text
function speak(text, voiceType, rate) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate;
  u.voice = window.speechSynthesis.getVoices().find(v =>
    v.name.toLowerCase().includes(voiceType)
  );
  window.speechSynthesis.speak(u);
}

//  speak each digit with full num
export function speakNumber(num, voiceType, rate) {
  if (!window.speechSynthesis) return;

  let speechText = "";

  if (num < 10) {
    speechText = `Single number ${digitWords[num]}`;
  } else {
    const digits = String(num).split("").map(d => digitWords[parseInt(d)]).join(" ");
    const fullName = numberToWords(num);
    speechText = `${digits}, ${fullName}`;
  }

  const utter = new SpeechSynthesisUtterance(speechText);
  utter.rate = rate;
  utter.voice = window.speechSynthesis
    .getVoices()
    .find(v => v.name.toLowerCase().includes(voiceType));

  window.speechSynthesis.speak(utter);
}
