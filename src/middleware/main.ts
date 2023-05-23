import express from 'express'
import { Request, Response, NextFunction } from 'express'

const app = express()

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World')
})

export default app
