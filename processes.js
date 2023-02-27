const pm2 = require("pm2")
const path = require("path")
const name = require(path.resolve("package.json")).name

pm2.connect(() => {
    pm2.start(
        {
            name: "em-chores-node",
            script: `${__dirname}/dist/server.js`,
            max_memory_restart: `${process.env.WEB_MEMORY || 512}M`,
            watch: false,
            exec_mode: "cluster",
            listen_timeout: 50000,
            kill_timeout: 5000,
            restart_delay: 5000,
            out_file: path.resolve(".", `${name}-output.log`),
            error_file: path.resolve(".", `${name}-error.log`),
            combine_logs: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
            instances: process.env.WEB_CONCURRENCY || -1,
            // source_map_support: true,
            // env: {
            //     PORT: process.env.PORT || 3000,
            //     NODE_ENV: "development",
            // },
        },
        err => {
            if (err) {
                pm2.disconnect()
                throw new Error(`Error while launching applications ${err.stack || err}.`)
            }

            console.log("PM2 and application has been succesfully started.")

            pm2.launchBus((errLb, bus) => {
                console.log("PM2: Log streaming started.")
                bus.on("log:out", packet => console.log(`App (out): ${packet.process.name} - ${packet.data}`))
                bus.on("log:err", packet => console.error(`App (err): ${packet.process.name} - ${packet.data}`))
            })
        }
    )
})
