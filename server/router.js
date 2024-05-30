import express from 'express'
import { saveDb } from './controller'
const router = express.Router()

router.post('/saveToDb',(req,res)=>saveDb(req,res))

export default router