# Nexus Dashboard - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

1. Download all 4 files from the outputs folder
2. Put them in the same directory  
3. Double-click `index.html` to open in browser
4. Login with any username/password
5. You're in! ✨

---

## 📌 What Each File Does

| File | Purpose |
|------|---------|
| `index.html` | Login page - handles authentication |
| `dashboard.html` | Main dashboard - all the analytics |
| `style.css` | All styling (22KB, responsive design) |
| `script.js` | All JavaScript logic (14KB) |

**That's it!** Just these 4 files running in your browser.

---

## 🎮 How to Use Features

### 🔐 Login
```
Username: admin (or anything)
Password: anything
Click "Access Dashboard"
```
→ You'll see the dashboard

### 🌓 Theme Toggle
Click the moon icon in top-right
- Dark theme has lower brightness
- Light theme is bright white
- Your choice is saved in browser

### 📊 Interact with Data

**Search Orders:**
- Type in "Filter orders..." box
- Filters by: customer name, product name, or order ID
- Updates instantly as you type

**Sort by Amount:**
- Click the sort icon (↑↓)
- First click: High to low
- Second click: Low to high
- Toggles on each click

**Refresh KPIs:**
- Click "Refresh Data" button
- Numbers animate upward
- Auto-refreshes every 5 seconds anyway

### 📱 Mobile Features

**On Mobile (< 768px):**
- Click hamburger menu icon ☰
- Sidebar slides in from left
- Click overlay to close
- Click menu item to navigate and close

**On Tablet (768px - 1024px):**
- Sidebar collapsed to icons only
- Hover to see tooltips
- Click toggle to expand/collapse

**On Desktop (> 1024px):**
- Full sidebar always visible
- Click collapse arrow next to logo
- Sidebar shrinks smoothly

### 💾 What Gets Saved?

Your browser saves:
- ✅ Theme preference (dark/light)
- ✅ Login status
- ✅ Username

These persist even if you close the browser!

---

## 📊 Dashboard Sections

### Top Section: KPI Cards
- **Revenue**: Total money earned (updates every 5s)
- **Orders**: Total orders placed (updates every 5s)
- **Users**: Total active users (updates every 5s)  
- **Conversion**: % of visitors who convert

Each shows a trend indicator (📈 up/down)

### Middle Left: Revenue Chart
- Canvas-based line chart
- Shows weekly revenue data
- Smooth curves with gradient fill
- Responsive to your screen size
- Updates colors when theme changes

### Middle Right: Recent Activity
- Latest 5 activities
- Icons show type of activity
- Timestamps show recency
- Scrollable list

### Bottom: Recent Orders Table
- 6 sample orders
- Columns: ID, User, Product, Date, Status, Amount
- Status shown as colored badge
- Fully searchable and sortable
- Hover rows to highlight

---

## 🎨 Visual Elements

### Status Badges (in table)
- 🟢 **Completed** = Green
- 🟡 **Pending** = Orange/Yellow
- 🔴 **Cancelled** = Red

### Trend Indicators
- 📈 **Up** = Green arrow (positive trend)
- 📉 **Down** = Red arrow (negative trend)

### Icons Used
- All from Phosphor Icons (free icon library)
- Automatically render from browser
- No image files needed

---

## 🔄 Data & Updates

### Where Does Data Come From?
Everything is **mock data** - simulated for demo purposes:
- Orders come from `DATA.users` array in script.js
- Activities from `DATA.activities` array
- Chart data from `DATA.revenue` array
- KPI numbers are randomly generated

### How to Change Data?
Edit the DATA object in script.js:

```javascript
const DATA = {
    users: [
        { id: 1, name: "Alice Johnson", ... },
        { id: 2, name: "Bob Smith", ... },
        // Add more here
    ],
    ...
}
```

### How to Connect Real API?
Replace data sources with fetch() calls:

```javascript
// Instead of const DATA = { users: [...] }
async function loadUsers() {
    const response = await fetch('/api/users');
    return response.json();
}
```

---

## 🛠️ Customization

### Change Colors
Edit `:root` in style.css:

```css
:root {
    --primary: 250 84% 65%;      /* Purple - change this */
    --success: 150 70% 40%;      /* Green */
    --warning: 35 90% 60%;       /* Orange */
    --danger: 0 80% 60%;         /* Red */
}
```

### Change Spacing
Adjust these in style.css:

```css
--sidebar-width: 260px;           /* Sidebar width */
--header-height: 70px;            /* Top bar height */
--radius-md: 12px;                /* Border radius */
```

### Change Font
In dashboard.html and index.html, swap:

```html
<!-- From -->
<link href="...Outfit:wght@300;400;500;600;700..." rel="stylesheet">

<!-- To any Google Font like -->
<link href="...Roboto:wght@300;400;500;600;700..." rel="stylesheet">
```

Then update in style.css:
```css
body {
    font-family: 'Roboto', sans-serif;  /* Change here */
}
```

---

## 🐛 Troubleshooting

### "Chart not showing"
- Check that you're on the dashboard page (not login)
- Browser console should show no errors (F12)
- Try refreshing page

### "Login not working"
- Make sure all 4 files are in same directory
- Try clearing browser cache (Ctrl+Shift+Del)
- Check that script.js is loading (F12 → Network tab)

### "Sidebar not closing on mobile"
- Refresh the page
- Make sure browser window width is < 768px
- Try a different mobile browser

### "Data not updating"
- KPI cards update every 5 seconds automatically
- Click "Refresh Data" for instant update
- Numbers should animate when updating

---

## 📈 Performance

- **File sizes**: ~48KB total (gzips to ~15KB)
- **Load time**: < 1 second on decent connection
- **Memory**: Minimal - perfect for low-end devices
- **No external APIs**: Everything is local

---

## 🔐 Security Notes

⚠️ **This is a demo/starter template**

- Authentication is mock (any password works)
- Data is not encrypted
- Not suitable for real sensitive data
- For production, add:
  - Real backend authentication
  - API encryption
  - HTTPS
  - Input validation
  - CSRF protection

---

## 📚 Learning Resources

If you want to extend this:

1. **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
2. **localStorage**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
3. **CSS Grid**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
4. **Responsive Design**: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design

---

## 🎯 Next Steps

Ready to enhance? Try these:

1. **Add a new KPI card** - Copy one of the existing cards in dashboard.html
2. **Change the chart data** - Edit `DATA.revenue` array in script.js
3. **Add a new page** - Create `reports.html` and link it in the sidebar
4. **Connect to API** - Replace mock data with real fetch() calls
5. **Add animations** - Use CSS @keyframes for more polish

---

## ❓ FAQ

**Q: Can I use this commercially?**
A: Yes! It's free to use and modify.

**Q: Do I need Node.js or npm?**
A: Nope! Just open the HTML file in a browser.

**Q: Can I host this online?**
A: Yes! Upload to any web host (Vercel, Netlify, etc.)

**Q: How do I make it persist data?**
A: Add a backend API and replace the fetch calls.

**Q: Is it mobile responsive?**
A: Yes! Optimized for all screen sizes.

---

## 📞 Support

This is a template starter. For modifications:
- Edit the HTML for structure
- Edit the CSS for styling
- Edit the script.js for functionality

Have fun building! 🚀
