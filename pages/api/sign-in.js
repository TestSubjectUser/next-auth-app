// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.status(200).json({ name: "John Doe" });
  if (req.method === "POST") {
    const { email, password } = req.body;
    // throw new Error("Something went wrong");
    try {
      // console.log(email, password);
      res.status(201).json({
        message: "User created successfully",
        cred: { email, password },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
