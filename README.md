# Writer Playbook → Vercel Webhook Integration

## 🎯 What This Does

This project creates a website that can receive data from your Writer playbooks via webhooks. When your playbook runs, it will send data to your website automatically.

---

## 📦 COMPLETE SETUP GUIDE (For Beginners)

### STEP 1: Get Your Files Ready

1. **Download this project folder** to your computer
2. You should have these files:
   - `package.json`
   - `pages/api/webhook.js`
   - `pages/index.js`
   - `.gitignore`
   - `README.md` (this file)

---

### STEP 2: Create a GitHub Account & Repository

#### 2.1 Create GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up"
3. Follow the instructions

#### 2.2 Create a New Repository
1. Log into GitHub
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - Repository name: `writer-webhook-site`
   - Description: `Webhook receiver for Writer playbooks`
   - Choose **Public** (free)
   - ✅ Check "Add a README file"
4. Click **Create repository**

#### 2.3 Upload Your Files
1. On your new repository page, click **Add file** → **Upload files**
2. Drag ALL the files from the `vercel-webhook-project` folder to the upload area
3. Add a commit message: "Initial commit"
4. Click **Commit changes**

---

### STEP 3: Deploy to Vercel

#### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

#### 3.2 Import Your Project
1. On Vercel dashboard, click **Add New...** → **Project**
2. Find your `writer-webhook-site` repository
3. Click **Import**
4. Click **Deploy** (don't change any settings)
5. Wait 1-2 minutes for deployment to complete
6. You'll see **"Congratulations! 🎉"** when it's done

#### 3.3 Get Your Webhook URL
1. Click **Visit** to see your website
2. Your webhook URL will be displayed on the page
3. It looks like: `https://your-project-name.vercel.app/api/webhook`
4. **Copy this URL** - you'll need it for Step 4

---

### STEP 4: Configure Your Writer Playbook

#### 4.1 Create or Open Your Playbook
1. Go to Writer (https://app.writer.com)
2. Open the playbook you want to connect

#### 4.2 Add Webhook Action
1. In your playbook editor, add a new step
2. Look for **webhook** or **HTTP request** action
3. Configure it:
   - **URL:** Paste your Vercel URL from Step 3.3
   - **Method:** POST
   - **Headers:** 
     ```
     Content-Type: application/json
     ```
   - **Body:** This will be your playbook output (usually set to send the result)

#### 4.3 Test Your Playbook
1. Run your playbook
2. It should send data to your webhook
3. Check Vercel logs to see if data was received:
   - Go to Vercel dashboard
   - Click on your project
   - Click **Functions** tab
   - Click on `/api/webhook`
   - View the logs

---

### STEP 5: Test Your Webhook

#### Option A: Test from Your Website
1. Visit your deployed site: `https://your-project-name.vercel.app`
2. Click the **"🧪 Send Test Request"** button
3. You should see a success message

#### Option B: Test with curl (Terminal/Command Line)
```bash
curl -X POST https://your-project-name.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "hello from terminal", "timestamp": "2024-01-01"}'
```

---

## 🔍 How to View Incoming Data

### View Logs in Vercel:
1. Go to https://vercel.com/dashboard
2. Click your project
3. Click **Functions** tab
4. Click `/api/webhook`
5. You'll see all incoming requests

### View Real-Time Logs:
1. Open terminal/command line
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. View live logs:
   ```bash
   vercel logs your-project-name.vercel.app --follow
   ```

---

## 🛠️ Customization Options

### Want to Save Data to a File?
The current setup just logs data. To save it, you'll need a database:
- Vercel KV (key-value store) - Simple, built into Vercel
- MongoDB - Popular database
- Supabase - Free PostgreSQL database

### Want to Display Data on Your Site?
Modify `pages/index.js` to fetch and display saved data.

### Want to Send Email Notifications?
Add an email service like:
- SendGrid
- Resend
- Nodemailer

---

## ❓ Troubleshooting

### Problem: "Cannot find module 'next'"
**Solution:** You need to install dependencies locally:
```bash
cd vercel-webhook-project
npm install
```

### Problem: Webhook returns 404
**Solution:** Make sure your URL is exactly:
`https://your-domain.vercel.app/api/webhook`

### Problem: Data not showing in logs
**Solution:**
1. Check the URL is correct
2. Make sure method is POST
3. Check Vercel function logs
4. Verify Writer playbook actually ran

### Problem: Deployment fails
**Solution:**
1. Make sure all files are in the correct folders
2. Check that `package.json` is in the root directory
3. Try redeploying from Vercel dashboard

---

## 📚 Next Steps

1. ✅ Test your webhook with the test button
2. ✅ Run your Writer playbook and confirm data arrives
3. ✅ Check Vercel logs to see the data
4. 🎉 Customize the code to do what you want with the data!

---

## 📞 Need Help?

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Writer Documentation: https://dev.writer.com

---

## 🎉 You're Done!

Your webhook is now live and ready to receive data from Writer playbooks!