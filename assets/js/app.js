const colorInput = document.querySelector("input");
const colorSection = document.querySelector(".section");
const colorText = document.querySelector(".color-text b");
const network = new brain.NeuralNetwork();
// Training network
network.train([
  { input: { red: 0.18, green: 0.19, blue: 0.82 }, output: { dark: 1 } },
  { input: { red: 0.96, green: 0.98, blue: 0.07 }, output: { light: 1 } },
  { input: { red: 1, green: 0.44, blue: 0.23 }, output: { light: 1 } },
  { input: { red: 0.27, green: 0.26, blue: 0 }, output: { dark: 1 } },
  { input: { red: 0.58, green: 0.73, blue: 1 }, output: { light: 1 } },
  { input: { red: 0.11, green: 0.2, blue: 0.13 }, output: { dark: 1 } },
  { input: { red: 0.27, green: 0.26, blue: 1 }, output: { light: 1 } },
  { input: { red: 0.58, green: 0.02, blue: 0.21 }, output: { dark: 1 } },
]);
// Functions
const changeColor = () => {
  const color = colorInput.value;
  const rgb = calcRgb(color);
  const colorResult = brain.likely(rgb, network);
  colorText.innerHTML = colorResult === "dark" ? "Dark" : "Light";
  colorSection.style.backgroundColor = color;
};

const calcRgb = (hex) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        green: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        blue: Math.round(parseInt(result[3], 16) / 2.55) / 100,
      }
    : null;
};

// Events
colorInput.addEventListener("change", changeColor);
