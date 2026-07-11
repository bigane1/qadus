/** PM2 — toujours démarrer depuis le dossier du repo cloné sur le VPS */
module.exports = {
  apps: [
    {
      name: "qadus",
      cwd: __dirname,
      script: "npm",
      args: "start -- -p 3002",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
