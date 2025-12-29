# Trade Digitalization Simulator

A comprehensive financial calculator for analyzing the benefits of trade digitalization, including P&L improvements, working capital gains, headcount efficiencies, and customs savings.

## Features

- **Two-Panel Interface**: 
  - Panel 1: Input assumptions with real-time benefit summary
  - Panel 2: Complete financial statement simulation and detailed benefits breakdown

- **Comprehensive Benefits Analysis**:
  - Supplier discount benefits from early payment
  - Headcount savings from AP and trade compliance automation
  - Customs fee reductions through direct filing
  - Working capital released through extended DPO

- **Auto-Save Functionality**: All inputs automatically saved to browser localStorage

- **Professional Financial Simulation**: Before/after comparison of Income Statement, Balance Sheet, and key financial KPIs

## Quick Start - Deploy to Netlify

### Method 1: Drag & Drop (Easiest)

1. Download all files:
   - `index.html`
   - `compact-trade-simulator.jsx`
   - `netlify.toml`
   - `_redirects`

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the folder containing all files onto the page

4. Your app is live! Netlify will provide a URL like `https://random-name.netlify.app`

### Method 2: Git Repository

1. Create a new repository on GitHub

2. Add all files:
```bash
git init
git add .
git commit -m "Initial commit - Trade Digitalization Simulator"
git remote add origin https://github.com/yourusername/trade-simulator.git
git push -u origin main
```

3. Go to [Netlify](https://app.netlify.com)

4. Click "New site from Git"

5. Connect your repository

6. Deploy settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (current directory)

7. Click "Deploy site"

### Method 3: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Navigate to your project folder

3. Deploy:
```bash
netlify deploy --prod
```

4. Follow the prompts to connect or create a site

## File Structure

```
.
├── index.html                      # Main HTML file
├── compact-trade-simulator.jsx     # React component with calculator logic
├── netlify.toml                    # Netlify configuration
├── _redirects                      # Routing configuration
└── README.md                       # This file
```

## Technology Stack

- **React 18** - UI framework (loaded via CDN)
- **Tailwind CSS** - Styling (loaded via CDN)
- **Lucide Icons** - Icon library (loaded via CDN)
- **Babel Standalone** - JSX transpilation (loaded via CDN)
- **localStorage API** - Data persistence

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Features Detail

### Input Panel
- Company financial statements (Income Statement, Balance Sheet, Cash Flow)
- Operational costs (shipments, headcount, salaries)
- Trade finance assumptions (DPO, discounts, funding rates)
- Efficiency assumptions (headcount reductions, customs savings)
- Real-time benefit summary with live calculations

### Results Panel
- Complete before/after financial statement comparison
- Detailed benefit cards for all categories
- P&L impact breakdown
- Program metrics summary
- All KPIs including leverage, solvency, margins

## Data Privacy

All data is stored locally in your browser using localStorage. No data is sent to external servers. Your financial information remains completely private.

## Customization

To customize default values, edit the `useState` initialization in `compact-trade-simulator.jsx`:

```javascript
const [turnover, setTurnover] = useState(() => loadSavedValue('turnover', 1291.6));
```

Change `1291.6` to your desired default value.

## Support

For issues or questions, contact: tim.nicolle@prima.trade

## License

© 2024 Prima Trade. All rights reserved.
