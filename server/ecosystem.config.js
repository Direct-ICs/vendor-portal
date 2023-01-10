module.exports = {
  apps : [{
    name: "server",
    script : "../private_html/server.js",
    watch: "true",
    env: {
      "NODE_ENV": "production",
    }
  }]
}
