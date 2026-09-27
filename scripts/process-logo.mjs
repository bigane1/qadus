import sharp from "sharp";
import fs from "fs";

const src = fs.existsSync("public/logo-original-backup.jpg")
  ? "public/logo-original-backup.jpg"
  : "public/logo.png";
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const c = info.channels;
const out = Buffer.from(data);

for (let i = 0; i < out.length; i += c) {
  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const isCream =
    r > 220 &&
    g > 210 &&
    b > 190 &&
    Math.abs(r - g) < 25 &&
    r - b < 45 &&
    g - b < 40;
  if (isCream) out[i + 3] = 0;
}

const transparent = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toBuffer();

await sharp(transparent).png().toFile("public/logo-transparent.png");
fs.copyFileSync("public/logo-transparent.png", "public/logo.png");

const iconSize = 512;
const inner = Math.round(iconSize * 0.88);

const iconSquare = await sharp(transparent)
  .extract({ left: 97, top: 38, width: 451, height: 380 })
  .resize(inner, inner, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: Math.round((iconSize - inner) / 2),
    bottom: Math.round((iconSize - inner) / 2),
    left: Math.round((iconSize - inner) / 2),
    right: Math.round((iconSize - inner) / 2),
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const circleSvg = Buffer.from(
  `<svg width="${iconSize}" height="${iconSize}"><circle cx="${iconSize / 2}" cy="${iconSize / 2}" r="${iconSize / 2}" fill="white"/></svg>`
);

const roundIcon = await sharp(iconSquare)
  .composite([{ input: circleSvg, blend: "dest-in" }])
  .png()
  .toBuffer();

async function writeIcon(size, path) {
  await sharp(roundIcon).resize(size, size).png().toFile(path);
}

await writeIcon(32, "public/favicon.png");
await writeIcon(192, "public/icon-192.png");
await writeIcon(180, "public/apple-icon.png");
await writeIcon(32, "app/icon.png");
await writeIcon(180, "app/apple-icon.png");
await writeIcon(256, "public/logo-round.png");

console.log("logo processed", {
  logo: fs.statSync("public/logo.png").size,
  favicon: fs.statSync("public/favicon.png").size,
  round: fs.statSync("public/logo-round.png").size,
});
