import { Router, type IRouter } from "express";
import { createClient } from "@supabase/supabase-js";
import { db } from "@workspace/db";
import { profilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const getAdminClient = () => {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin credentials not configured");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};

router.post("/auth/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ error: "email, password, and name are required" });
    return;
  }

  try {
    const admin = getAdminClient();

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

    if (error) {
      req.log.error(error);
      res.status(400).json({ error: error.message });
      return;
    }

    const userId = data.user.id;

    const existing = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.supabaseId, userId))
      .limit(1);

    if (!existing.length) {
      await db.insert(profilesTable).values({
        supabaseId: userId,
        name,
        email,
        college: "",
      });
    }

    res.json({ userId, email, name });
  } catch (e: any) {
    req.log.error(e);
    res.status(500).json({ error: e.message || "Signup failed" });
  }
});

export default router;
