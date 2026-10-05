# Bhoruka Park website

Next.js website with a royal white, navy and gold design inspired by the Windsor reference, official Bhoruka Park photography, and a saved day/night preference.

Run `npm install`, copy `.env.example` to `.env.local`, then run `npm run dev`. Open http://localhost:3000. Validate using `npm run typecheck` and `npm run build`.

## Google Workspace SMTP

Set these server-only values in `.env.local`:
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465` (SSL), or `587` (STARTTLS)
- `SMTP_USER`: full Google Workspace business email address
- `SMTP_PASSWORD`: Google app password, not the normal account password
- `SMTP_FROM`: optional authorised sender; defaults to SMTP_USER
- `MAIL_TO`: recipient for all submissions
- `ENQUIRY_TO` / `CAREERS_TO`: optional separate recipient addresses

Restart the app after updating these values. Google setup: https://support.google.com/a/answer/176600 and https://support.google.com/mail/answer/185833. App password availability depends on Workspace policy.

Enquiries are delivered as emails. Career applications include all form fields and the résumé attachment (PDF/DOC/DOCX, maximum 5 MB). Reply-To is the applicant's address. No database or uploaded-file storage is used. Success is returned only when SMTP accepts the email; missing configuration or delivery failures return an error. Actual delivery requires real credentials and recipient addresses.

Images in `public/images` are downloaded from https://bhorukapark.com/. The uploaded `public/main-logo.png` is displayed at its natural aspect ratio on white for clarity in both themes.
