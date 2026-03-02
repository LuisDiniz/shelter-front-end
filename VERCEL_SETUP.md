# Vercel Deployment Setup Guide

This guide explains how to configure environment variables for the Animal Shelter website when deploying to Vercel.

## Environment Variables Overview

The application requires the following environment variables:

- **VITE_SUPABASE_URL**: Your Supabase project URL (frontend)
- **VITE_SUPABASE_ANON_KEY**: Your Supabase anonymous key (frontend)
- **FORMSPREE_ENDPOINT**: Your Formspree form endpoint (backend/API routes)

## Local Development Setup

1. Copy the `.env.example` file to create your `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual values:
   - Replace `https://your-project.supabase.co` with your Supabase URL
   - Replace `your_supabase_anon_key_here` with your Supabase anonymous key
   - Replace `YOUR_FORM_ID` with your Formspree form ID

3. Verify your setup by running:
   ```bash
   npm run dev
   ```

## Vercel Deployment Setup

### Step 1: Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Click "Import"

### Step 2: Add Environment Variables

Before deploying, you need to configure the environment variables in Vercel:

1. In the import dialog (or in existing project settings), scroll to "Environment Variables"
2. Add the following variables:

   **For frontend (these use VITE_ prefix):**
   - **Name:** `VITE_SUPABASE_URL`
     - **Value:** Your Supabase project URL
     - **Environments:** Production, Preview, Development

   - **Name:** `VITE_SUPABASE_ANON_KEY`
     - **Value:** Your Supabase anonymous key
     - **Environments:** Production, Preview, Development

   **For API routes (backend):**
   - **Name:** `FORMSPREE_ENDPOINT`
     - **Value:** Your complete Formspree endpoint URL (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
     - **Environments:** Production, Preview, Development

### Step 3: Deploy

1. Click "Deploy"
2. Vercel will automatically build and deploy your application
3. Once deployment is complete, your site will be live

### Step 4: Verify Deployment

1. Visit your deployed site at the Vercel URL provided
2. Test the email form to ensure it works correctly
3. Check the Vercel logs if there are any issues:
   - Go to "Deployments" → Select latest deployment → "View Logs"

## Getting Your Configuration Values

### Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click "Settings" → "API"
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon public** key → Use as `VITE_SUPABASE_ANON_KEY`

### Formspree Form ID

1. Go to [Formspree Dashboard](https://formspree.io)
2. Select your form
3. Copy the form ID from the Settings
4. Create the full URL: `https://formspree.io/f/YOUR_FORM_ID`
5. Use as `FORMSPREE_ENDPOINT`

## Important Notes

- **VITE_ prefix**: Variables prefixed with `VITE_` are automatically exposed to the frontend during build. They are safe to include in source code references.
- **API Environment Variables**: The `FORMSPREE_ENDPOINT` variable is only available in API routes (`/api/*`) and is not exposed to the frontend, making it secure.
- **Environment Parity**: Ensure the same environment variables are set across Production, Preview, and Development environments in Vercel for consistency.

## Troubleshooting

### Email Form Not Sending
- Verify `FORMSPREE_ENDPOINT` is set correctly in Vercel settings
- Check Vercel logs for error messages
- Confirm your Formspree account is active and form is created

### Build Failures
- Ensure all `VITE_` variables are set in Vercel
- Check that no required variables are missing
- Review Vercel deployment logs for specific errors

### Local Development Issues
- Verify `.env` file exists in the project root
- Ensure values match your Supabase and Formspree accounts
- Restart the development server after updating `.env`

## Advanced Configuration

### Different Endpoints per Environment

If you want to use different Formspree forms for different environments:

1. In Vercel Settings → Environment Variables
2. Add `FORMSPREE_ENDPOINT` separately for each environment
3. Set different values for Production, Preview, and Development

This allows you to test with one form and use another in production.

## Support

For issues related to:
- **Supabase**: Visit [Supabase Documentation](https://supabase.com/docs)
- **Vercel**: Visit [Vercel Documentation](https://vercel.com/docs)
- **Formspree**: Visit [Formspree Help](https://formspree.io/help)
