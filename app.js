const lengthSlider = document.querySelector(".pass-length input"),
 options = document.querySelectorAll(".option input"),
 copyIcon = document.querySelector(".input-box span"),
 passwordInput = document.querySelector(".input-box input"),
 passIndicator = document.querySelector(".pass-indicator"),
 generateBtn = document.querySelector(".generate-btn");


const characters = {
    lowercase: "abcdefghijklmnopqrstuvxwyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVXWYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){};:.,*+-#@<>~"
};


const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;
  
        options.forEach((option) => {
            if (option.checked){
                if (option.id !== "exc-duplicate" && option.id !== "spaces"){
                    staticPassword += characters[option.id];
                }else if (option.id == "spaces"){
                    staticPassword += ` ${staticPassword} `;
                }else {
                    excludeDuplicate = true;
                }
            }
        });

    if (staticPassword.length === 0) {
        console.error("Error: Static password set is empty.");
        return;
    }

    for (let i = 0; i < passLength; i++) {
        let randomChar =
            staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " "
                ? (randomPassword += randomChar)
                : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
};

      const updatePassIndicator = () => {
         passIndicator.id =
            lengthSlider.value < 8
            ? "weak"
            : lengthSlider.value < 16
            ? "medium"
            : "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
};
lengthSlider.addEventListener("input", updateSlider);

updateSlider();

generateBtn.addEventListener("click", () => {
    generatePassword();
    updateSlider();  // Chama a função updateSlider após gerar a senha
});

const copyBtn = document.getElementById("copyBtn");
 passwordInput = document.getElementById("passwordInput");

copyBtn.addEventListener("click", () => {
    passwordInput.select();
    document.execCommand("copy");
});
