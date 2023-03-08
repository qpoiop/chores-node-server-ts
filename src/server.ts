import { PORT, HOST } from "./env"
import app from "./app"

const server = app.listen(Number(PORT), HOST, () => {
    if (process.send) process.send("ready")
    console.log("App launched Succeeded")
    console.log(`Host: http://${HOST}:${PORT}`)
})

process.on("SIGINT", function () {
    server.close(() => {
        console.log("App closed")
        process.exit(0)
    })
})
