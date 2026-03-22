import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { studyConfigsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/config", async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }
  try {
    const config = await db.select().from(studyConfigsTable).where(eq(studyConfigsTable.userId, userId)).limit(1);
    if (!config.length) {
      res.status(404).json({ error: "Config not found" });
      return;
    }
    res.json(config[0]);
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/config", async (req, res) => {
  const { userId, courseType, branch, year, semester, subjects, studySettings } = req.body;
  if (!userId || !courseType || !branch || !year || !semester) {
    res.status(400).json({ error: "Required fields missing" });
    return;
  }
  try {
    const existing = await db.select().from(studyConfigsTable).where(eq(studyConfigsTable.userId, userId)).limit(1);
    if (existing.length) {
      const updated = await db.update(studyConfigsTable)
        .set({ courseType, branch, year, semester, subjects: subjects || [], studySettings: studySettings || {}, updatedAt: new Date() })
        .where(eq(studyConfigsTable.userId, userId))
        .returning();
      res.json(updated[0]);
    } else {
      const created = await db.insert(studyConfigsTable)
        .values({ userId, courseType, branch, year, semester, subjects: subjects || [], studySettings: studySettings || {} })
        .returning();
      res.json(created[0]);
    }
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

export default router;
