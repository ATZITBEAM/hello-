import express from "express";

import Queue from "better-queue";
const app = express();
app.use(express.json());

// 🧩 Create a queue
const emailQueue = new Queue(async (job, done) => {
  console.log(`📧 Sending email to ${job.email}...`);
  // Simulate delay (2 sec)
  await new Promise((r) => setTimeout(r, 2000));
  console.log(`✅ Email sent to ${job.email}`);
  done();
});

// 🧩 Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Fake login check
  if (email !== "test@example.com" || password !== "123456") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ Add job to queue
  emailQueue.push({ email });

  res.json({ message: "Login successful!" });
});

app.listen(3000, () => console.log(" Server running on port 3000"));
