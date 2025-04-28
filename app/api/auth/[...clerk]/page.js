import { auth } from "@clerk/nextjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  
  const { userId, email, name } = auth();

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name });
  }

  res.status(200).json(user);
}
