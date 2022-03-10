module.exports = {
    apps : [{
      name   : "hall-of-fame-bot",
      script : "./app.js"
    }],
    deploy: {
      production: {
        user: "exsys",
        host: "178.18.244.82 -p 42069",
        key: "~/.ssh/id_ed25519.pub",
        ref: "origin/main",
        repo: "git@github.com:exsyss/hall-of-fame-bot.git",
        path: "/home/exsys/hall-of-fame-bot",
        "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
      }
    }
  }