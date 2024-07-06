const exp = require("express");
const { db } = require("./config/firebase");

const app = exp();
app.set("view engine", "ejs");
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.get("/admin", (req, res) => {
  res.render("home");
});

app.post("/admin", async (req, res) => {
  const { event, desc, start, end, formLink } = req.body;

  try {
    const ref = db.collection("eventDetails").doc();
    const eventData = {
      id: ref.id,
      event,
      desc,
      start,
      end,
      formLink,
    };

    await ref.set(eventData);
    res.status(200).send({
      status: "success",
      message: "Entry added successfully",
      data: eventData,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000...");
});
