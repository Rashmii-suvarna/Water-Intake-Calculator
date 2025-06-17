document.getElementById("waterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById("weight").value);
  const activity = parseInt(document.getElementById("activity").value);
  const weather = document.getElementById("weather").value;
  const exercised = document.getElementById("exercised").checked;
  const caffeine = document.getElementById("caffeine").checked;
  const consumed = parseFloat(document.getElementById("consumedWater").value) || 0;

  if (!weight || activity === 0) {
    alert("Please enter your weight and select your activity level.");
    return;
  }

  // Base intake factors by activity
  const activityFactors = {
    1: 0.03, // Sedentary
    2: 0.04, // Lightly active
    3: 0.05, // Moderately active
    4: 0.06  // Very active
  };

  let intake = weight * activityFactors[activity];

  // Weather adjustment
  if (weather === "hot") intake *= 1.10;
  else if (weather === "cold") intake *= 0.95;

  // Other conditions
  if (exercised) intake *= 1.05;
  if (caffeine) intake *= 1.07;

  const remaining = Math.max(0, (intake - consumed)).toFixed(2);

  const resultText = `
    💧 Recommended Intake: <strong>${intake.toFixed(2)} L</strong><br>
    🧪 Water remaining: <strong>${remaining} L</strong><br>
    ${remaining > 0 ? "🚰 Stay hydrated!" : "✅ You've met your hydration goal!"}
  `;

  document.getElementById("result").innerHTML = resultText;
});
