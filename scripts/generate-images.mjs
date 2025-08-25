import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const targets = [
  { name: 'hero.jpg', url: 'https://picsum.photos/seed/ocean-infra-hero/1600/900.jpg' },
  { name: 'p1.jpg', url: 'https://picsum.photos/seed/ocean-infra-p1/800/600.jpg' },
  { name: 'p2.jpg', url: 'https://picsum.photos/seed/ocean-infra-p2/800/600.jpg' },
  { name: 'p3.jpg', url: 'https://picsum.photos/seed/ocean-infra-p3/800/600.jpg' },
];

const fallbackJpegBase64 =
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQFRIVFRUVFhUVFRUVFRUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJ8BPgMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABQYBBAID/8QALhAAAQMDAgQFAwUAAAAAAAAAAQIDEQQFEiExQVEGIlJhgaGx0RMUM3HB8BVCUnL/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAlEQACAgIDAQACAwAAAAAAAAABAgMRBBIhMQUTQVEiMmH/2gAMAwEAAhEDEQA/APrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbq1xk9m3qkq9q3Gk0l4b2a8b5fG+2qS3iRjM2rS7eQ0m0q6m4m1q0pM1qfVwWk3VQm1Yt7zv8g6s7a1W1m0sTcvw9pR3s2+6mKkq3wV9i6tq2u5m0n3hHcY4bU1Vf9u2zlz7tUttz1C1q8u3n3vVZQm1Nq1k6Vt8a2+5n4m6k9Jw9m2r9m8v1Wv1m8fHfK0m4y56M3i6+5r5pbgm7Hc3f8A0SAAAAAAAAAAAAAAAAAKm0G5gqfH2WqTj5bQm8fVg1jU7bVpo3N3b4tq7N+0r8f3xU2S3dJK9b6fZb1b1m1N1r0l4b4f7oYl1fX8vW3Qy+5c5n3y6cL9Y0H8x8X6z5Q8S3HymV7r/AFV7TT1r0JxR2s6r7svr3+8mX4mLQn8m3zK7t6b+uqlK3nV7mWq2l3vR9zTfJvJ9R3rU7z2U1P7y8v6mZy5t6f1r+FhQAAAAAAAAAAAAAAAABKpHau8lq8s2b7WJdJvR2bY2k2r+1xU4VZ1qz0s9dVb8yYf4Ztq7d7Uq3o7c5sWk9e6p3v7Z5L0m3o3bX3V4f2f4l6s3v8A8x7Z6E2Wk+q8q3m3fN0q8r3kq9R7b6Xzv5v8A9EAAAAAAAAAAAAAAACm1A7m1R6s8dWm2zWqk6r1d9dVtM1b8m9rV1n2b7d2a7b6f8A1eZ9W6uXn2n3l3b0tKOy+f1a6nHq6iWq3d+3x3zV1Wy6eP8Afoi6AAAAAAAAAAAAAAAACUqj3S5Wb3rU3bV1d1qk6XJvK2n6q2m5Z3V9q3V2S8x5c+fVZ6n3S9ntw8+0q0b9x1W8t+zvY8f5dV6WZ7r3V5+z8k0M0AAAAAAAAAAAAAAAAGo2qfU9lZK7lL2vK2b1fZ9q1r8rX3m3c+X1fZ9u2t9r7f0s8v2AAAAAAAAAAAAAAAACFq7X16n1tHn3n5tZr7m1r8l9l+X83AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';

async function download(url, destPath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return download(res.headers.location, destPath).then(resolve);
      }
      if ((res.statusCode || 0) >= 400) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    });
    req.on('error', () => {
      try { fs.unlinkSync(destPath); } catch {}
      resolve(false);
    });
  });
}

async function ensureImage(target) {
  const outPath = path.join(publicDir, target.name);
  if (fs.existsSync(outPath)) return;
  const ok = await download(target.url, outPath);
  if (!ok) {
    // Fallback to tiny embedded JPEG
    const buf = Buffer.from(fallbackJpegBase64, 'base64');
    fs.writeFileSync(outPath, buf);
  }
}

await Promise.all(targets.map(ensureImage));

// Create robots.txt
const robots = `User-agent: *\nAllow: /\n`;
if (!fs.existsSync(path.join(publicDir, 'robots.txt'))) {
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
}

