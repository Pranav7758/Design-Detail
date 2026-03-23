import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profileRouter from "./profile";
import configRouter from "./config";
import quizRouter from "./quiz";
import sessionsRouter from "./sessions";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(authRouter);
router.use(healthRouter);
router.use(profileRouter);
router.use(configRouter);
router.use(quizRouter);
router.use(sessionsRouter);

export default router;
