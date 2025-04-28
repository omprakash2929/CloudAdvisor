import { auth } from "@clerk/nextjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  
  const { userId, email } = auth();

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  let user = await User.findOne({ email });

  if (!user || !user.triedOnce) {
    return res.status(403).json({ error: "Sign up required to continue" });
  }

  res.status(200).json({ message: "Welcome to AI Advisor" });
}
