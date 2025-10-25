const textInput = document.getElementById("textInput");
const outputText = document.getElementById("outputText");
const visualCard = document.getElementById("visualCard");
const bgColor = document.getElementById("bgColor");
const bgImage = document.getElementById("bgImage");

document.getElementById("generateBtn").addEventListener("click", () => {
  outputText.innerText = textInput.value || "Start typing something cool...";
  visualCard.style.backgroundColor = bgColor.value;
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
  html2canvas(visualCard, { scale: 2 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "visualify-viralizelab.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
