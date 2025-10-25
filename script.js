const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const textInput = document.getElementById('textInput');
const output = document.getElementById('output');
const bgColor = document.getElementById('bgColor');
const textColor = document.getElementById('textColor');

generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) {
    alert("Please type something first!");
    return;
  }

  output.innerHTML = `
    <div class="visual-card" id="visualCard" 
      style="background:${bgColor.value};color:${textColor.value};">
      ${text}
    </div>
  `;
  downloadBtn.style.display = 'inline-block';
});

downloadBtn.addEventListener('click', () => {
  const card = document.getElementById('visualCard');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'visualify-card.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
