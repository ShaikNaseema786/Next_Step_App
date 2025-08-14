// quiz.js – Branch-Specific Questions & Suggestions
const branch = localStorage.getItem("branch") || "CSE";
const quizData = {
  CSE: [
    { q: "Which topic do you enjoy most?", o: ["HTML/CSS", "Node.js", "AI/ML"] },
    { q: "What’s your ideal project?", o: ["Website", "Backend System", "Chatbot"] },
    { q: "Favorite tool?", o: ["VS Code", "MongoDB", "Python"] },
    { q: "Dream internship?", o: ["Frontend Team", "Backend Dev", "AI Research"] },
    { q: "What motivates you?", o: ["User Interface", "System Building", "Smart Tech"] },
  ],
  ECE: [
    { q: "Which domain attracts you more?", o: ["Embedded", "IoT", "Signal Processing"] },
    { q: "Which tool do you prefer?", o: ["Arduino", "ESP32", "MATLAB"] },
    { q: "Which role suits you?", o: ["Microcontroller Dev", "Smart Device Creator", "Signal Analyst"] },
    { q: "What do you like working on?", o: ["Hardware", "Automation", "Data Transmission"] },
    { q: "Choose a hobby project:", o: ["Smart Home", "IoT Lock", "Noise Filter"] },
  ],
  MECH: [
    { q: "Which subject do you like most?", o: ["Design", "Thermodynamics", "Robotics"] },
    { q: "Preferred software?", o: ["SolidWorks", "Ansys", "MATLAB"] },
    { q: "What kind of project excites you?", o: ["Machine Design", "Thermal Simulation", "Autonomous Bot"] },
    { q: "What industry would you join?", o: ["Auto Design", "Energy", "Automation"] },
    { q: "Where do you see yourself?", o: ["CAD Expert", "Thermal Analyst", "Mechatronics Dev"] },
  ],
  EEE: [
    { q: "What are you most interested in?", o: ["Circuit Design", "Power Systems", "Automation"] },
    { q: "Choose a tool:", o: ["Proteus", "Power World", "PLC"] },
    { q: "What inspires you?", o: ["PCB Design", "Power Grid", "Factory Automation"] },
    { q: "Your dream internship?", o: ["Electronics R&D", "Grid Planning", "Industrial Automation"] },
    { q: "Best learning platform?", o: ["PCBWay", "NPTEL", "Coursera"] },
  ]
};

const questions = quizData[branch] || quizData["CSE"];
const container = document.getElementById("quizContainer");

questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.innerHTML = `<p><strong>Q${i+1}: ${q.q}</strong></p>` +
    q.o.map((opt, j) => `
      <label><input type="radio" name="q${i}" value="${j}" required> ${opt}</label><br>`
    ).join('');
  container.appendChild(div);
});

document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const responses = [];
  for (let i = 0; i < questions.length; i++) {
    responses.push(parseInt(formData.get(`q${i}`)));
  }
  const most = mode(responses);
  const roleMap = ["frontend", "backend", "ai"];
  const suggestion = roleMap[most] || "explorer";
  localStorage.setItem("suggestion", suggestion);
  window.location.href = "suggestion.html";
});

function mode(arr) {
  return arr.reduce((a, b, i, arr) =>
    arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
  );
}
