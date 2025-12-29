# Quick Deployment Guide

## Files You Need

All files are ready in the outputs folder:

1. ✅ **index.html** - Main HTML file that loads everything
2. ✅ **compact-trade-simulator.jsx** - Your React calculator component
3. ✅ **netlify.toml** - Netlify configuration
4. ✅ **_redirects** - Routing configuration
5. ✅ **README.md** - Full documentation
6. ✅ **package.json** - Project metadata
7. ✅ **.gitignore** - Git ignore rules

## Deploy in 3 Steps

### Option A: Netlify Drop (Fastest - 2 minutes)

1. **Download all 7 files** from the outputs folder to a single folder on your computer

2. **Go to**: https://app.netlify.com/drop

3. **Drag & drop** the entire folder onto the page

✅ **Done!** You'll get a URL like: `https://random-name-12345.netlify.app`

### Option B: GitHub + Netlify (Best for teams)

1. **Create GitHub repo**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/trade-simulator.git
git push -u origin main
```

2. **Connect to Netlify**:
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your repository
   - Leave build settings empty
   - Click "Deploy site"

✅ **Done!** Auto-deploys on every Git push

### Option C: Netlify CLI (For developers)

1. **Install CLI**:
```bash
npm install -g netlify-cli
```

2. **Deploy**:
```bash
cd your-folder
netlify deploy --prod
```

✅ **Done!** Follow the prompts

## Custom Domain (Optional)

Once deployed, add your domain in Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain (e.g., `calculator.prima.trade`)
3. Update DNS records as shown

## Test Your Deployment

Visit your Netlify URL and verify:
- ✅ Calculator loads without errors
- ✅ All inputs accept values
- ✅ Sliders work smoothly
- ✅ Results panel shows calculations
- ✅ Data persists after page refresh
- ✅ "Reset to Defaults" button works

## Troubleshooting

**Blank page?**
- Check browser console (F12) for errors
- Verify all 7 files are uploaded
- Check file names match exactly (case-sensitive)

**Calculator not saving data?**
- Check localStorage is enabled in browser
- Try different browser
- Check privacy/incognito mode settings

**Sliders not working?**
- Clear browser cache
- Check Lucide icons loaded (check Network tab)
- Verify React loaded (check Console for errors)

## Update the Calculator

To make changes:

1. Edit `compact-trade-simulator.jsx`
2. Test locally (optional): `npx http-server -p 8080`
3. Re-deploy:
   - **Drag & Drop**: Just drag the folder again
   - **Git**: `git push` (auto-deploys)
   - **CLI**: `netlify deploy --prod`

## Support

Questions? Email: tim.nicolle@prima.trade

---

**Pro Tips:**

🔒 **SSL is automatic** - Netlify provides free HTTPS
📱 **Mobile responsive** - Works on all devices
⚡ **Lightning fast** - Served from global CDN
💾 **Auto-saves** - No data loss
🎨 **Professional** - Ready for client presentations
