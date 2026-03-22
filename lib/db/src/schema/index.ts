import { pgTable, text, uuid, jsonb, integer, numeric, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profilesTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  supabaseId: text("supabase_id").unique(),
  name: text("name").notNull().default(""),
  email: text("email").notNull().unique(),
  college: text("college").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studyConfigsTable = pgTable("study_configs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().unique(),
  courseType: text("course_type").notNull().default(""),
  branch: text("branch").notNull().default(""),
  year: text("year").notNull().default(""),
  semester: text("semester").notNull().default(""),
  subjects: jsonb("subjects").default([]).$type<Subject[]>(),
  studySettings: jsonb("study_settings").default({}).$type<StudySettings>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const quizResultsTable = pgTable("quiz_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  score: integer("score").notNull().default(0),
  total: integer("total").notNull().default(0),
  percentage: numeric("percentage", { precision: 5, scale: 2 }).notNull().default("0"),
  subject: text("subject").default("General"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studySessionsTable = pgTable("study_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  subjectName: text("subject_name").notNull().default(""),
  subjectCode: text("subject_code").default(""),
  hours: numeric("hours", { precision: 4, scale: 2 }).notNull().default("0"),
  sessionDate: date("session_date").notNull().defaultNow(),
  completed: boolean("completed").default(false),
  topic: text("topic").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Subject = {
  code: string;
  name: string;
  hours: number;
  difficulty: string;
  description: string;
  selected?: boolean;
};

export type StudySettings = {
  startTime: string;
  endTime: string;
  targetHours: number;
  includeWeekends: boolean;
  targetDate: string;
};

export const insertProfileSchema = createInsertSchema(profilesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStudyConfigSchema = createInsertSchema(studyConfigsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertQuizResultSchema = createInsertSchema(quizResultsTable).omit({ id: true, createdAt: true });
export const insertStudySessionSchema = createInsertSchema(studySessionsTable).omit({ id: true, createdAt: true });

export type Profile = typeof profilesTable.$inferSelect;
export type StudyConfig = typeof studyConfigsTable.$inferSelect;
export type QuizResult = typeof quizResultsTable.$inferSelect;
export type StudySession = typeof studySessionsTable.$inferSelect;
