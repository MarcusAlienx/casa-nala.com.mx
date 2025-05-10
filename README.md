This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables Configuration

For the application to function correctly, especially for sending order confirmation emails and generating WhatsApp links, you need to set up environment variables.

Create a file named `.env.local` in the root of your project and add the following variables, replacing the placeholder values with your actual credentials and information:

```env
# Email Server Configuration (for sending order emails via SMTP)
EMAIL_SERVER_USER=tu_usuario_smtp@example.com
EMAIL_SERVER_PASSWORD=tu_contraseña_smtp
EMAIL_TO=correo_destino_pedidos@example.com # Email address to receive order notifications

EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=465 # Or 587, depending on your provider
EMAIL_SMTP_SECURE=true # true for port 465 (SSL), false for port 587 (TLS/STARTTLS)

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=521XXXXXXXXXX # Your WhatsApp number incluindo country code (e.g., 521 for Mexico + mobile)
```

**Important Notes:**
- Ensure `.env.local` is included in your `.gitignore` file to prevent committing sensitive credentials.
- For Gmail, it's highly recommended to use an "App Password" instead of your main account password. You might also need to configure "Less secure app access" if not using an App Password, though this is less secure and being phased out by Google.
- The `EMAIL_TO` variable is where order notification emails will be sent.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` is used to generate the click-to-chat WhatsApp link. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Netlify

To deploy this project on Netlify:

1.  **Connect your Git repository** to Netlify.
2.  **Build Settings:**
    *   **Build command:** `npm run build` (or `yarn build`, `pnpm build`, `bun run build` depending on your package manager).
    *   **Publish directory:** `.next`
3.  **Environment Variables:**
    *   You **must** configure the same environment variables in your Netlify site settings as defined in your `.env.local` file (e.g., `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_TO`, `EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_SECURE`, `NEXT_PUBLIC_WHATSAPP_NUMBER`).
    *   Go to your site's settings on Netlify -> Build & deploy -> Environment -> Environment variables.
4.  **Next.js Runtime:**
    *   Netlify automatically detects and uses the Next.js Runtime for App Router projects. Ensure your Netlify account has this feature enabled if you encounter issues.

Refer to the [Netlify documentation for Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/) for the most up-to-date deployment instructions.
