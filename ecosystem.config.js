module.exports = {
    apps : [{
      name   : "hall-of-fame-bot",
      script : "./index.js"
    }],
    deploy: {
      production: {
        user: "exsys",
        host: "217.160.54.184 -p 42069",
        key: "~/.ssh/id_ed25519.pub",
        ref: "origin/main",
        repo: "git@github.com:exsyss/hall-of-fame-bot.git",
        path: "/home/exsys/hall-of-fame-bot",
        "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
      }
    }
  }