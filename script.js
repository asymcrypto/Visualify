const textInput = document.getElementById("textInput");
const outputText = document.getElementById("outputText");
const visualCard = document.getElementById("visualCard");
const bgColor = document.getElementById("bgColor");
const bgImage = document.getElementById("bgImage");
const output = document.getElementById("output");

document.getElementById("generateBtn").addEventListener("click", () => {
  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter some text to generate a visual.");
    return;
  }

  // Set text content
  outputText.innerText = text;

  // Make sure the card is visible
  output.style.display = "block";
  visualCard.style.display = "flex";
  visualCard.style.justifyContent = "center";
  visualCard.style.alignItems = "center";
  visualCard.style.minHeight = "250px";
  visualCard.style.textAlign = "center";

  // Apply background color
  visualCard.style.backgroundColor = bgColor.value;
  visualCard.style.backgroundImage = "";
});

bgImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      visualCard.style.backgroundImage = `url(${event.target.result})`;
      visualCard.style.backgroundSize = "cover";
      visualCard.style.backgroundPosition = "center";
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  if (!outputText.innerText) {
    alert("Please generate a visual first.");
    return;
  }

  html2canvas(visualCard, { scale: 2 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "visualify-viralizelab.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});});
