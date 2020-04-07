const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

const users = [];

app.get("/users", (req, res) => {
 
    res.json(users);

});

app.post("/users", async (req, res) => {
  try {

    // const salt=await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedpassword };
    users.push(user);
    res.status(201).send();

  } catch {

    res.send(500);

  }

}
);

app.post("/users/login", async (req, res) => {

  const user = await users.find((user) => user.name === req.body.name);

  if (user == null) 
    return res.status(404).send("Cannot Find User");

  try {

    if (await bcrypt.compare(req.body.password, user.password)) 
        {
             res.send("success");
         }
    else 
            res.send("Not Allowed")
  }
  catch {
    res.status(500).send();
  }
}
);

app.listen(3000);
