SMTP and Email setup

Required environment variables (set these in your hosting platform or in a local `.env.local`):

- SMTP_HOST - e.g. smtp.gmail.com
- SMTP_PORT - e.g. 587
- SMTP_SECURE - "true" if using TLS on port 465, otherwise "false"
- SMTP_USER - SMTP username (from address)
- SMTP_PASS - SMTP password
- FROM_EMAIL - (optional) From address to use; falls back to SMTP_USER
- RASTER_MEDIA_EMAIL - destination email where Raster Media receives form submissions
 - MONGODB_URI - MongoDB connection string for saving submissions

Notes
- This implementation sends plain HTML emails without attachments. If you need file uploads attached, we can add multipart parsing and attachment handling using `formidable`.
- Install dependencies locally before running:

```bash
npm install
```

Testing locally
- Add a `.env.local` at project root with the variables above.
- Run the dev server:

```bash
npm run dev
```

API endpoints
- Career form: `POST /api/career/apply` (expects JSON)
- Model registration: `POST /api/model/apply` (expects JSON)

Frontend
- The career and model forms have been wired to POST JSON to the endpoints and will show a simple alert on success/failure.
