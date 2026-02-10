# Lunar Trade

A modern, advanced trading platform built with vanilla HTML, CSS, and JavaScript. Features real-time market data, interactive charts, portfolio management, and a beautiful dark/light theme toggle.

## ✨ Features Implemented

### 1. **Layout & Responsiveness**
- **Desktop**: Full sidebar (260px) with menu items visible
- **Tablet** (1024px and below): Sidebar collapses to icon-only (80px)
- **Mobile** (768px and below): Sidebar transforms into off-canvas slide-out menu
- Smooth transitions between breakpoints
- Mobile overlay that closes menu on tap

### 2. **Navigation & Sidebar**
- 5+ menu items (Dashboard, Users, Orders, Products, Settings, Logout)
- Active state indicator (left border + highlight)
- Collapsible sidebar with toggle button
- Responsive menu text hiding on collapse
- Mobile-friendly off-canvas menu

### 3. **Top Bar**
- Search input (hidden on mobile)
- Theme toggle button
- Notification bell with badge
- User profile with avatar placeholder
- Responsive layout that adapts to screen size

### 4. **KPI Cards (4 Cards)**
- Total Revenue with trend indicator
- Total Orders with trend indicator
- New Users with trend indicator
- Conversion Rate with trend indicator
- Color-coded icons (purple, orange, blue, green)
- Animated value updates
- Responsive grid that stacks on mobile

### 5. **Revenue Analytics Chart**
- Canvas-based line chart
- Smooth curve rendering with Bezier curves
- Gradient fill under the chart
- Grid lines for reference
- Responsive to container size
- Updates on theme change
- Auto-resizes on window resize

### 6. **Recent Activity**
- Activity list with 5+ items
- Icons for different event types
- Timestamps for each activity
- Scrollable list
- Clean typography

### 7. **Recent Orders Table**
- 6+ rows of mock data with realistic information
- Columns: Order ID, User, Product, Date, Status, Amount
- **Search/Filter**: Filter rows by keyword (name, product, or ID)
- **Sorting**: Sort by amount (ascending/descending toggle)
- Status badges (completed, pending, cancelled)
- Responsive table with horizontal scroll on mobile
- Hover effects on rows

### 8. **Interactivity**

#### Theme Toggle
- Light/Dark mode switch
- Icon changes (moon ↔ sun)
- Persists using localStorage
- Chart updates to match theme
- Smooth color transitions

#### Sidebar Controls
- Desktop: Click toggle button to collapse/expand
- Mobile: Menu button opens off-canvas drawer
- Overlay closes menu on click
- Menu items close drawer on click (mobile)

#### Search & Filter
- Real-time filtering as you type
- Searches across name, product, and order ID
- Case-insensitive matching
- Updates table instantly

#### Sorting
- Click sort button to toggle ascending/descending
- Sorts by amount column
- Direction indicator in UI

#### KPI Refresh
- Auto-updates every 5 seconds
- Manual refresh button with rotating animation
- Animated number transitions
- Random realistic data generation

### 9. **Authentication**
- Login page with form validation
- Mock authentication (accepts any username/password)
- localStorage-based session management
- Redirects unauthenticated users to login
- Redirects authenticated users away from login
- Logout functionality

## 📁 File Structure

```
nexus-dashboard/
├── index.html          # Login page
├── dashboard.html      # Main dashboard
├── style.css          # All styling (responsive)
├── script.js          # All JavaScript logic
└── README.md          # This file
```

## 🚀 Getting Started

1. **Download all 4 files** (index.html, dashboard.html, style.css, script.js)
2. **Place them in the same directory**
3. **Open `index.html` in a modern web browser**

No build tools, dependencies, or server setup required!

### Login Credentials
- **Username**: admin (or any text)
- **Password**: anything (accepts any input)

## 🎨 Design Features

### Color Scheme
- **Primary**: #8B72F7 (Purple)
- **Success**: Teal
- **Warning**: Orange
- **Danger**: Red
- **Light Mode**: White background with dark text
- **Dark Mode**: Dark background with light text

### Typography
- Font: Outfit (Google Fonts)
- Clean, modern hierarchy
- Responsive font sizes

### Components
- Glass-morphism effect on login card
- Smooth animations and transitions
- Hover states on interactive elements
- Gradient buttons and icons
- Status badge styling

## 📱 Responsive Breakpoints

| Screen Size | Behavior |
|-------------|----------|
| 1024px+ | Desktop: Full sidebar visible |
| 768px-1024px | Tablet: Sidebar collapsed to icons |
| 320px-768px | Mobile: Off-canvas sidebar menu |

## 🔧 Technical Implementation

### JavaScript Structure
- **Auth Guard**: Prevents unauthorized access
- **State Management**: Central state object for app data
- **Mock Data**: Realistic sample data in DATA object
- **Event Listeners**: Delegated handlers for interactions
- **Canvas Chart**: Custom drawn with quadratic bezier curves
- **Animation**: requestAnimationFrame for smooth value updates

### CSS Architecture
- **CSS Variables**: Centralized color/spacing management
- **CSS Grid/Flexbox**: Modern layout system
- **Media Queries**: Mobile-first responsive design
- **Transitions**: Smooth theme and layout changes
- **Dark Mode**: data-theme attribute switching

### localStorage Usage
- `authToken`: Session authentication
- `theme`: User's theme preference (light/dark)
- `user`: Logged-in username

## 🎯 Feature Checklist

- ✅ Layout (HTML/CSS)
  - ✅ Sidebar (collapsible)
  - ✅ Logo/title
  - ✅ 5+ Menu items
  - ✅ Active menu state
  - ✅ Topbar with search, notifications, user profile
  - ✅ 4 KPI cards
  - ✅ Chart area (Canvas)
  - ✅ Recent orders table (6+ rows)
  - ✅ Activity list (5+ items)

- ✅ Interactivity (JavaScript)
  - ✅ Sidebar collapse/expand
  - ✅ Search filter for table
  - ✅ Sort table by amount
  - ✅ Theme toggle (light/dark)
  - ✅ KPI auto-update every 5 seconds
  - ✅ Manual refresh button

- ✅ Responsive Behavior
  - ✅ Desktop: Sidebar visible
  - ✅ Tablet: Sidebar collapsible
  - ✅ Mobile: Off-canvas sidebar

## 🌟 Bonus Features

- Login/authentication system
- Beautiful animations and transitions
- Glass-morphism design elements
- Animated number counters
- Chart gradient fills
- Status badge styling
- Empty state handling
- Smooth theme switching
- Mobile overlay backdrop
- Accessible buttons and labels
- Scrollbar styling
- Floating background orbs on login page

## 🔐 Browser Support

Works on all modern browsers:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All data is mock/simulated
- No backend API calls
- All styling is vanilla CSS (no frameworks)
- Uses Phosphor Icons from CDN
- Uses Google Fonts from CDN
- Fully functional without internet after initial load

## 🎬 Getting More from This Dashboard

To extend this dashboard:

1. **Connect Real Data**: Replace `DATA.users` with API calls
2. **Add More Charts**: Create additional Canvas-based or SVG charts
3. **Implement Real Auth**: Connect to backend authentication
4. **Add More Pages**: Create additional dashboard sections
5. **Form Validations**: Add input validation to forms
6. **Notifications**: Implement toast/notification system
7. **Export Data**: Add CSV/PDF export functionality
8. **Analytics**: Track user interactions
9. **Dark Mode Detection**: Use `prefers-color-scheme` for automatic dark mode
10. **PWA Support**: Add service worker for offline functionality

## 📄 License

Free to use and modify for personal or commercial projects.

---

**Built with ❤️ - A modern dashboard starter template**
