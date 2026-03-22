import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { profilesTable, studyConfigsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/profile", async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }
  try {
    const profile = await db.select().from(profilesTable).where(eq(profilesTable.supabaseId, userId)).limit(1);
    if (!profile.length) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    res.json(profile[0]);
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/profile", async (req, res) => {
  const { userId, supabaseId, name, email, college } = req.body;
  if (!userId || !name || !email) {
    res.status(400).json({ error: "userId, name, email required" });
    return;
  }
  try {
    const existing = await db.select().from(profilesTable).where(eq(profilesTable.supabaseId, userId)).limit(1);
    if (existing.length) {
      const updated = await db.update(profilesTable)
        .set({ name, email, college: college || "", updatedAt: new Date() })
        .where(eq(profilesTable.supabaseId, userId))
        .returning();
      res.json(updated[0]);
    } else {
      const created = await db.insert(profilesTable)
        .values({ supabaseId: userId, name, email, college: college || "" })
        .returning();
      res.json(created[0]);
    }
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

export default router;
