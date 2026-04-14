# 📖 COMPLETE BEGINNER'S GUIDE
### Writer Playbook + GitHub + Vercel Webhook Setup

*Follow these steps exactly, in order. Each step includes screenshots descriptions.*

---

## ⏱️ Time Required: 15-20 minutes

---

## 🎯 PART 1: GITHUB SETUP (5 minutes)

### Step 1.1: Create GitHub Account
1. Open your web browser
2. Go to: **https://github.com**
3. Click the **"Sign up"** button (top right)
4. Enter your email address
5. Create a password
6. Choose a username
7. Complete the verification
8. Click **"Create account"**

✅ **You now have a GitHub account!**

---

### Step 1.2: Create a New Repository

1. After logging in, click your profile picture (top right)
2. Click **"Your repositories"**
3. Click the green **"New"** button
4. Fill in the form:
   ```
   Repository name: writer-webhook-site
   Description: Receives data from Writer playbooks
   ☑️ Public (leave this checked)
   ☑️ Add a README file (check this box)
   ```
5. Click the green **"Create repository"** button

✅ **Your repository is created!**

---

### Step 1.3: Upload Your Project Files

1. You should see your new repository page
2. Click **"Add file"** button → **"Upload files"**
3. Open the `vercel-webhook-project` folder on your computer
4. Select ALL files:
   - `package.json`
   - `.gitignore`
   - `README.md`
   - `STEP_BY_STEP_GUIDE.md`
5. Also upload the `pages` folder (with both files inside)
6. Drag them all into the GitHub upload area
7. At the bottom, in the commit message box, type: `Initial upload`
8. Click the green **"Commit changes"** button
9. Wait for the upload to complete (10-30 seconds)

✅ **Your code is now on GitHub!**

---

## 🚀 PART 2: VERCEL SETUP (5 minutes)

### Step 2.1: Create Vercel Account

1. Open a new tab and go to: **https://vercel.com**
2. Click **"Sign Up"** (top right)
3. Click **"Continue with GitHub"**
4. GitHub will ask for permission
5. Click **"Authorize Vercel"**
6. Complete any additional verification if asked

✅ **Your Vercel account is connected to GitHub!**

---

### Step 2.2: Import Your GitHub Project

1. You should now see the Vercel dashboard
2. Click **"Add New..."** button → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find **"writer-webhook-site"**
5. Click the **"Import"** button next to it
6. On the configuration screen:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: **./** (leave as is)
   - Build Command: leave blank
   - Output Directory: leave blank
7. Click the blue **"Deploy"** button
8. Wait 1-2 minutes while Vercel builds your site
9. You'll see a success screen with confetti 🎉

✅ **Your website is now LIVE on the internet!**

---

### Step 2.3: Get Your Webhook URL

1. Click the **"Visit"** button or the preview image
2. Your website will open in a new tab
3. You'll see a purple page with your webhook information
4. Look for the section that says **"Your Webhook URL:"**
5. The URL will look like: `https://writer-webhook-site-abc123.vercel.app/api/webhook`
6. Click the **"📋 Copy URL"** button
7. **SAVE THIS URL** - paste it in a notepad or text file

✅ **You have your webhook URL!**

---

## 🎯 PART 3: WRITER PLAYBOOK SETUP (5 minutes)

### Step 3.1: Open Your Writer Playbook

1. Go to: **https://app.writer.com**
2. Log into your Writer account
3. Navigate to your playbooks section
4. Open the playbook you want to connect
   OR
   Create a new playbook if needed

---

### Step 3.2: Add a Webhook Action to Your Playbook

**Option A: If Writer has a built-in Webhook/HTTP action:**

1. In your playbook, add a new action/step
2. Look for **"Webhook"**, **"HTTP Request"**, or **"API Call"**
3. Configure it:
   - **URL:** Paste your Vercel URL from Step 2.3
   - **Method:** Select **POST**
   - **Headers:** Add this:
     ```
     Content-Type: application/json
     ```
   - **Body:** Configure to send your playbook results
     - This might be a variable like `{{results}}` or `{{output}}`
     - Or use JSON format: `{"content": "{{playbook_output}}"}`

**Option B: If Writer doesn't have a direct webhook action:**

You may need to use a connector like:
- Zapier
- Make.com
- n8n

Or ask Writer support about webhook capabilities.

---

### Step 3.3: Test Your Connection

1. **Save** your playbook
2. **Run** your playbook (click Run/Execute)
3. Wait for it to complete
4. Go back to Vercel

---

## ✅ PART 4: VERIFY IT'S WORKING (2 minutes)

### Step 4.1: Check Vercel Logs

1. Go back to **https://vercel.com/dashboard**
2. Click on your **"writer-webhook-site"** project
3. Click the **"Functions"** tab (top menu)
4. Click on **"/api/webhook"**
5. You should see logs of incoming requests
6. If your playbook sent data, you'll see it here!

---

### Step 4.2: Test Manually from Your Website

1. Go to your website: `https://your-site.vercel.app`
2. Scroll down to **"Test your webhook:"**
3. Click the **"🧪 Send Test Request"** button
4. You should see a success alert
5. Check Vercel logs again to see this test request

✅ **If you see the test request in logs, everything is working!**

---

## 🎉 SUCCESS CHECKLIST

Make sure you can check all these boxes:

- [ ] ✅ GitHub account created
- [ ] ✅ Repository created with all files
- [ ] ✅ Vercel account created and connected to GitHub
- [ ] ✅ Website deployed successfully
- [ ] ✅ Webhook URL copied and saved
- [ ] ✅ Writer playbook configured with webhook
- [ ] ✅ Test request successful
- [ ] ✅ Can see logs in Vercel

---

## 🔍 UNDERSTANDING YOUR WEBHOOK

### What happens when your playbook runs?

1. **Writer Playbook finishes** → Creates output/results
2. **Webhook action triggers** → Sends data to your URL
3. **Your Vercel function receives it** → `api/webhook.js` runs
4. **Data is logged** → You can see it in Vercel logs
5. **Success response sent** → Writer knows it worked

### What can you do with the data?

Right now, it's just being logged. But you can modify the code to:
- Save to a database
- Send emails
- Update a spreadsheet
- Trigger other actions
- Display on your website

---

## 🆘 COMMON ISSUES & SOLUTIONS

### Issue 1: "Build failed" on Vercel
**Solution:**
- Make sure `package.json` is in the root of your repository
- Make sure the `pages` folder is uploaded correctly
- Try deploying again

### Issue 2: Website shows 404
**Solution:**
- Check that all files uploaded to GitHub correctly
- Make sure `pages/index.js` exists
- Try redeploying from Vercel

### Issue 3: Webhook returns error
**Solution:**
- Double-check the URL is exactly: `https://your-site.vercel.app/api/webhook`
- Make sure method is POST, not GET
- Check that Content-Type header is `application/json`

### Issue 4: No data showing in logs
**Solution:**
- Confirm your playbook actually ran
- Check the webhook action in your playbook is configured
- Try the manual test from your website first
- Look in Vercel logs under the Functions tab

### Issue 5: Can't find Vercel logs
**Solution:**
- Go to Vercel dashboard
- Click your project name
- Click "Functions" tab at the top
- Click "/api/webhook"
- Logs appear at the bottom

---

## 📱 QUICK REFERENCE

### Your Important URLs:
- GitHub Repository: `https://github.com/YOUR_USERNAME/writer-webhook-site`
- Live Website: `https://writer-webhook-site-XXXXX.vercel.app`
- Webhook Endpoint: `https://writer-webhook-site-XXXXX.vercel.app/api/webhook`
- Vercel Dashboard: `https://vercel.com/dashboard`

### Commands You Might Need:
```bash
# View live logs (if you have Vercel CLI)
vercel logs your-project-name.vercel.app --follow

# Test webhook from terminal
curl -X POST https://your-site.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "hello"}'
```

---

## 🎓 NEXT STEPS: MAKE IT YOUR OWN

### Beginner Customizations:
1. Change the colors on your homepage (edit `pages/index.js`)
2. Add your company name/logo
3. Change the title text

### Intermediate Customizations:
1. Add a database to store webhook data
2. Create a page to display saved data
3. Add email notifications

### Advanced Customizations:
1. Add authentication/security
2. Create a dashboard with charts
3. Connect multiple Writer playbooks
4. Build a full application around the data

---

## 📚 LEARNING RESOURCES

- **Next.js Basics:** https://nextjs.org/learn
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Guides:** https://guides.github.com
- **JavaScript Basics:** https://javascript.info

---

## 🎉 CONGRATULATIONS!

You've successfully:
- ✅ Set up GitHub
- ✅ Deployed a website to Vercel
- ✅ Created a working webhook endpoint
- ✅ Connected it to Writer playbooks

You're now a webhook developer! 🚀

---

**Need more help?** 
- Check the main README.md file
- Visit Vercel's documentation
- Contact Writer support for playbook questions