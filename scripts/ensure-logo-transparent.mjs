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
  const isWhite = r > 245 && g > 245 && b > 245;
  const isFlatBlack = r < 12 && g < 12 && b < 12;
  if (isCream || isWhite || isFlatBlack) out[i + 3] = 0;
}

const trimmed = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .trim()
  .png()
  .toBuffer();

await sharp(trimmed).png().toFile("public/logo.png");
console.log("logo.png transparent + trimmed", fs.statSync("public/logo.png").size);
