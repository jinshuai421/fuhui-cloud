const unit = "px";
function createTemp(start, end, step = 1) {
  const temp = {};
  for (let i = start; i <= end; i += step) {
    temp[i] = `${i}${unit}`;
  }

  return temp;
}

const temp = createTemp(0, 100);

const weightTemp = createTemp(100, 1000, 100);

const marginTemp = Object.assign({ auto: "auto" }, temp);
module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    padding: marginTemp,
    margin: marginTemp,
    borderRadius: temp,
    fontSize: temp,
    extend: {
      colors: {
        blue: "#2665FA",
        'light-blue': "#F3F6FE",
        green: "#07D389",
        grey: "#5B6775",
        black: "#1F1F1F",
        red: "#FF2659",
        orange: "#FD7125",
        qgreen: '#51CADD ',


        num: {
          blue: "#2665FA",
          red: "#FF2659",
        },
        text: {
          grey: "#5B6775",
          black: "#1F1F1F",
          blue: "#2665FA",
        },
        neutral: {
          3: "#333333",
          9: "#999999",
          d: "#DDDDDD",
        },
      },
      fontWeight: weightTemp,
    },
  },
  // ...
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
