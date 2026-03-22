import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { quizResultsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/quiz", async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }
  try {
    const results = await db.select().from(quizResultsTable)
      .where(eq(quizResultsTable.userId, userId))
      .orderBy(desc(quizResultsTable.createdAt))
      .limit(50);
    res.json(results);
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/quiz", async (req, res) => {
  const { userId, score, total, percentage, subject } = req.body;
  if (!userId || score === undefined || total === undefined || percentage === undefined) {
    res.status(400).json({ error: "Required fields missing" });
    return;
  }
  try {
    const created = await db.insert(quizResultsTable)
      .values({ userId, score, total, percentage: percentage.toString(), subject: subject || "General" })
      .returning();
    res.status(201).json(created[0]);
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

export default router;
