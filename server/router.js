import express from 'express'
import { saveDb, sendData } from './controller.js'
const router = express.Router()



router.post('/saveToDb',(req,res)=>saveDb(req,res))
router.get('/sendData',(req,res)=>sendData(req,res))

export default router