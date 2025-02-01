module.exports = {
  apps: [
    {
      name: "gameshop-api",
      instances: 1,
      script: "server.js",
      autorestart: true,
      watch: ".",
      watchdelay: 1000,
      ignore_watch: ["node_modules", ".git", "seeds", "*.md"],
    },
  ],
};
