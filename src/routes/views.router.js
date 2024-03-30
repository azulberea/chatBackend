import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
    res.render(
        "index",
        {   
            title: "chat app",
            style: "index.css"
        }
    )
})

export default router