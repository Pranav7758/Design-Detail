import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { studySessionsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/sessions", async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }
  try {
    const sessions = await db.select().from(studySessionsTable)
      .where(eq(studySessionsTable.userId, userId))
      .orderBy(desc(studySessionsTable.sessionDate))
      .limit(100);
    res.json(sessions);
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/sessions", async (req, res) => {
  const { userId, subjectName, subjectCode, hours, sessionDate, completed, topic } = req.body;
  if (!userId || !subjectName || hours === undefined || !sessionDate) {
    res.status(400).json({ error: "Required fields missing" });
    return;
  }
  try {
    const created = await db.insert(studySessionsTable)
      .values({ userId, subjectName, subjectCode: subjectCode || "", hours: hours.toString(), sessionDate, completed: completed || false, topic: topic || "" })
      .returning();
    res.status(201).json(created[0]);
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

export default router;
