/**
 * Lunar Trade - Advanced Trading Platform
 * Multi-page navigation with real-time market data
 */

// --- Real Stock Data ---
const STOCK_DATA = {
    stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 189.95, change: 2.45, changePercent: 1.31, high: 192.50, low: 187.80, volume: '52.3M' },
        { symbol: 'MSFT', name: 'Microsoft', price: 423.78, change: 5.23, changePercent: 1.25, high: 427.50, low: 420.10, volume: '18.2M' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.25, change: 3.15, changePercent: 2.27, high: 145.80, low: 140.50, volume: '22.5M' },
        { symbol: 'AMZN', name: 'Amazon.com', price: 185.64, change: -2.30, changePercent: -1.22, high: 188.50, low: 184.20, volume: '44.8M' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 251.35, change: 8.65, changePercent: 3.57, high: 255.20, low: 248.90, volume: '132.4M' },
        { symbol: 'META', name: 'Meta Platforms', price: 512.19, change: 15.47, changePercent: 3.12, high: 516.80, low: 508.40, volume: '12.1M' }
    ],
    watchlist: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 189.95, change: 2.45, changePercent: 1.31 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 251.35, change: 8.65, changePercent: 3.57 }
    ],
    portfolio: [
        { symbol: 'AAPL', shares: 10, buyPrice: 175.50, currentPrice: 189.95, gain: 1445.00 },
        { symbol: 'MSFT', shares: 5, buyPrice: 410.20, currentPrice: 423.78, gain: 67.90 },
        { symbol: 'GOOGL', shares: 8, buyPrice: 138.90, currentPrice: 142.25, gain: 26.80 }
    ],
    transactions: [
        { id: 1, symbol: 'AAPL', action: 'BUY', shares: 10, price: 175.50, date: '2024-01-15', status: 'completed' },
        { id: 2, symbol: 'MSFT', action: 'BUY', shares: 5, price: 410.20, date: '2024-01-10', status: 'completed' },
        { id: 3, symbol: 'GOOGL', action: 'BUY', shares: 8, price: 138.90, date: '2024-01-05', status: 'completed' },
        { id: 4, symbol: 'AMZN', action: 'SELL', shares: 3, price: 180.45, date: '2023-12-28', status: 'completed' },
        { id: 5, symbol: 'TSLA', action: 'BUY', shares: 2, price: 235.80, date: '2023-12-20', status: 'completed' }
    ],
    activities: [
        { type: 'trade', icon: 'ph-arrows-left-right', text: 'Bought 10 shares of AAPL', sub: '2 minutes ago' },
        { type: 'alert', icon: 'ph-bell', text: 'TSLA exceeded target price', sub: '15 minutes ago' },
        { type: 'news', icon: 'ph-newspaper', text: 'Apple announces new product', sub: '1 hour ago' },
        { type: 'gain', icon: 'ph-trend-up', text: 'Portfolio gain: +$1,539.70', sub: '2 hours ago' },
        { type: 'dividend', icon: 'ph-gift', text: 'Dividend received: $45.50', sub: '1 day ago' }
    ],
    chartData: {
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        aapl: [175.50, 178.20, 182.45, 186.75, 189.95, 188.50, 190.25],
        msft: [410.20, 413.50, 418.75, 421.30, 423.78, 420.50, 425.00],
        googl: [138.90, 139.75, 140.50, 141.75, 142.25, 141.50, 143.00],
        tsla: [235.80, 240.50, 245.25, 248.75, 251.35, 250.00, 252.50]
    },
    stockCharts: {} // Store chart instances
};

// --- Auth Guard ---
const isDashboard = document.getElementById('mainContent');
const isLoginPage = document.querySelector('.login-page');
const loginForm = document.getElementById('loginForm');
const authToken = localStorage.getItem('authToken');

if (isDashboard && !authToken) {
    window.location.href = 'index.html';
}

if (isLoginPage && authToken) {
    window.location.href = 'dashboard.html';
}

// --- Login Logic ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user && pass) {
            const btn = loginForm.querySelector('.btn-login');
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> ' + t('loggingIn');
            btn.disabled = true;

            setTimeout(() => {
                localStorage.setItem('authToken', 'true');
                localStorage.setItem('user', user);
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    });

    // Translate Login Page immediately (since script runs at end of body)
    translateLoginPage();

    if (isLoginPage) throw new Error("Login Page Loaded - Stopping Dashboard Scripts");
}

function translateLoginPage() {
    if (!isLoginPage) return;

    // Update static text if elements exist
    const h1 = document.querySelector('.login-header h1');
    if (h1) h1.textContent = t('loginTitle');

    const p = document.querySelector('.login-header p');
    if (p) p.textContent = t('loginSubtitle');

    const labelUser = document.querySelector('label[for="username"]');
    if (labelUser) labelUser.textContent = t('loginUsername');

    const labelPass = document.querySelector('label[for="password"]');
    if (labelPass) labelPass.textContent = t('loginPassword');

    const btnSpan = document.querySelector('.btn-login span');
    if (btnSpan) btnSpan.textContent = t('btnLogin');

    const forgot = document.querySelector('.login-footer a');
    if (forgot) forgot.textContent = t('forgotPassword');
}

// --- Language & Localization ---
const TRANSLATIONS = {
    en: {
        dashboard: 'Dashboard',
        stocks: 'Stocks',
        portfolio: 'Portfolio',
        watchlist: 'Watchlist',
        trades: 'Trades',
        settings: 'Settings',
        logout: 'Logout',
        overview: 'Overview',
        welcome: "Welcome back! Here's your portfolio overview.",
        portfolioValue: 'Portfolio Value',
        holdings: 'Holdings',
        totalGain: 'Total Gain',
        totalTrades: 'Total Trades',
        topStocks: 'Top Stocks',
        activity: 'Activity',
        yourHoldings: 'Your Holdings',
        stockPriceTrends: 'Stock Price Trends (7 Days)',
        symbol: 'Symbol',
        shares: 'Shares',
        buyPrice: 'Buy Price',
        currentPrice: 'Current Price',
        gainLoss: 'Gain/Loss',
        action: 'Action',
        view: 'View',
        stocks_title: 'Market Stocks',
        stocks_subtitle: 'Browse and track real stock prices.',
        portfolio_title: 'Portfolio',
        portfolio_subtitle: 'Manage your investments and track performance.',
        totalValue: 'Total Value',
        returnPercent: 'Return %',
        holdingsBreakdown: 'Holdings Breakdown',
        watchlist_title: 'Watchlist',
        watchlist_subtitle: 'Stocks you\'re following.',
        allAvailableStocks: 'All Available Stocks',
        inWatchlist: 'In Watchlist',
        trades_title: 'Trade History',
        trades_subtitle: 'View all your trading activity.',
        transactionHistory: 'Transaction History',
        date: 'Date',
        settings_title: 'Settings',
        settings_subtitle: 'Manage your account preferences.',
        accountSettings: 'Account Settings',
        username: 'Username',
        emailNotifications: 'Email Notifications',
        tradeAlerts: 'Trade Alerts',
        enabled: 'Enabled',
        displaySettings: 'Display Settings',
        language: 'Language',
        currency: 'Currency',
        save: 'Save Changes',
        saved: 'Settings saved!',
        searchStocks: 'Search stocks...',
        name: 'Name',
        price: 'Price',
        change: 'Change',
        buy: 'Buy',
        sell: 'Sell',
        details: 'Details',
        backToStocks: 'Back to Stocks',
        keyMetrics: 'Key Metrics',
        trading: 'Trading',
        avgBuyPrice: 'Avg Buy Price',
        // New Keys
        completed: 'Completed',
        stocks_unit: 'Stocks',
        volume: 'Volume',
        high: 'High',
        low: 'Low',
        high52: '52W High',
        low52: '52W Low',
        marketCap: 'Market Cap',
        addToPortfolio: 'Add to Portfolio',
        currentValue: 'Current Value',
        totalGainLoss: 'Total Gain/Loss',
        total: 'Total',
        stockDetailSubtitle: 'Detailed stock information and trading options.',
        loginTitle: 'Lunar Trade',
        loginSubtitle: 'Your gateway to intelligent trading.',
        loginUsername: 'Username',
        loginPassword: 'Password',
        btnLogin: 'Access Dashboard',
        forgotPassword: 'Forgot Password?',
        loggingIn: 'Logging in...'
    },
    th: {
        dashboard: 'แดชบอร์ด',
        stocks: 'ตลาดหุ้น',
        portfolio: 'พอร์ตลงทุน',
        watchlist: 'รายการที่ติดตาม',
        trades: 'ประวัติการซื้อขาย',
        settings: 'ตั้งค่า',
        logout: 'ออกจากระบบ',
        overview: 'ภาพรวม',
        welcome: 'ยินดีต้อนรับกลับ! นี่คือภาพรวมพอร์ตการลงทุนของคุณ',
        portfolioValue: 'มูลค่าพอร์ตลงทุน',
        holdings: 'การถือครอง',
        totalGain: 'กำไรรวม',
        totalTrades: 'การซื้อขายทั้งหมด',
        topStocks: 'หุ้นยอดนิยม',
        activity: 'กิจกรรมล่าสุด',
        yourHoldings: 'หุ้นในพอร์ตของคุณ',
        stockPriceTrends: 'แนวโน้มราคาหุ้น (7 วัน)',
        symbol: 'สัญลักษณ์',
        shares: 'จำนวนหุ้น',
        buyPrice: 'ราคาที่ซื้อ',
        currentPrice: 'ราคาปัจจุบัน',
        gainLoss: 'กำไร/ขาดทุน',
        action: 'ดำเนินการ',
        view: 'ดูข้อมูล',
        stocks_title: 'ตลาดหุ้น',
        stocks_subtitle: 'ค้นหาและติดตามราคาหุ้นแบบเรียลไทม์',
        portfolio_title: 'พอร์ตการลงทุน',
        portfolio_subtitle: 'จัดการการลงทุนและติดตามผลตอบแทนของคุณ',
        totalValue: 'มูลค่ารวม',
        returnPercent: 'ผลตอบแทน %',
        holdingsBreakdown: 'รายละเอียดการถือครองหุ้น',
        watchlist_title: 'รายการที่ติดตาม',
        watchlist_subtitle: 'หุ้นที่คุณกำลังจับตามอง',
        allAvailableStocks: 'หุ้นที่มีอยู่ทั้งหมด',
        inWatchlist: 'ติดตามอยู่',
        trades_title: 'ประวัติการซื้อขาย',
        trades_subtitle: 'ดูกิจกรรมการซื้อขายทั้งหมดของคุณที่นี่',
        transactionHistory: 'ประวัติธุรกรรม',
        date: 'วันที่',
        settings_title: 'การตั้งค่า',
        settings_subtitle: 'จัดการข้อมูลบัญชีและการแสดงผลของคุณ',
        accountSettings: 'ตั้งค่าบัญชี',
        username: 'ชื่อผู้ใช้',
        emailNotifications: 'แจ้งเตือนทางอีเมล',
        tradeAlerts: 'แจ้งเตือนการเทรด',
        enabled: 'เปิดใช้งาน',
        displaySettings: 'การแสดงผล',
        language: 'ภาษา',
        currency: 'สกุลเงิน',
        save: 'บันทึกการเปลี่ยนแปลง',
        saved: 'บันทึกการตั้งค่าแล้ว!',
        searchStocks: 'ค้นหาหุ้น...',
        name: 'ชื่อบริษัท',
        price: 'ราคา',
        change: 'เปลี่ยนแปลง',
        buy: 'ซื้อ',
        sell: 'ขาย',
        details: 'รายละเอียด',
        backToStocks: 'กลับหน้ารวมหุ้น',
        keyMetrics: 'ข้อมูลสำคัญ',
        trading: 'การซื้อขาย',
        avgBuyPrice: 'ราคาซื้อเฉลี่ย',
        completed: 'รายการ',
        stocks_unit: 'บริษัท',
        volume: 'ปริมาณการซื้อขาย',
        high: 'สูงสุด',
        low: 'ต่ำสุด',
        high52: 'สูงสุด 52 สัปดาห์',
        low52: 'ต่ำสุด 52 สัปดาห์',
        marketCap: 'มูลค่าตามราคาตลาด',
        addToPortfolio: 'เพิ่มเข้าพอร์ต',
        currentValue: 'มูลค่าปัจจุบัน',
        totalGainLoss: 'กำไร/ขาดทุนรวม',
        total: 'รวมเป็นเงิน',
        stockDetailSubtitle: 'ข้อมูลหุ้นเชิงลึกและตัวเลือกการซื้อขาย',
        loginTitle: 'Lunar Trade',
        loginSubtitle: 'ประตูสู่การเทรดด้วยระบบอัจฉริยะ',
        loginUsername: 'ชื่อผู้ใช้',
        loginPassword: 'รหัสผ่าน',
        btnLogin: 'เข้าสู่แดชบอร์ด',
        forgotPassword: 'ลืมรหัสผ่าน?',
        loggingIn: 'กำลังเข้าสู่ระบบ...'
    }
};

// --- State with Language Support ---
const state = {
    currentPage: 'dashboard',
    isDark: localStorage.getItem('theme') === 'dark',
    selectedStock: null,
    currentLanguage: localStorage.getItem('language') || 'th', // Default to Thai per request
    currentCurrency: localStorage.getItem('currency') || 'USD'
};

function t(key) {
    return TRANSLATIONS[state.currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
}

// --- DOM Elements ---
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const mobileToggle = document.getElementById('mobileToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeSwitch = document.getElementById('themeSwitch');
const menuItems = document.querySelectorAll('.menu-item[data-page]');
const logoutBtn = document.querySelector('.sidebar-footer .menu-item');

// --- Theme Toggle ---
if (state.isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeSwitch) themeSwitch.querySelector('i').classList.replace('ph-moon', 'ph-sun');
}

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        state.isDark = !state.isDark;
        const theme = state.isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeSwitch.querySelector('i');
        if (state.isDark) {
            icon.classList.replace('ph-moon', 'ph-sun');
        } else {
            icon.classList.replace('ph-sun', 'ph-moon');
        }
    });
}

// --- Sidebar Controls ---
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        // Save state and update icon
        state.sidebarCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', state.sidebarCollapsed);
        updateSidebarToggleIcon();
        // Update menu text visibility based on collapse state (css handles it mostly)
    });
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        sidebarOverlay.classList.add('visible');
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        closeSidebar();
    });
}

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('visible');
}

function updateSidebarToggleIcon() {
    if (!sidebarToggle) return;
    const icon = sidebarToggle.querySelector('i');
    if (!icon) return;

    const isCollapsed = sidebar.classList.contains('collapsed');
    icon.className = isCollapsed ? 'ph ph-caret-right' : 'ph ph-caret-left';
}

// Initialize sidebar icon
updateSidebarToggleIcon();

// --- Menu Navigation ---
menuItems.forEach(item => {
    // Translate Menu Items on Init
    const span = item.querySelector('span');
    const page = item.dataset.page;
    if (span && page && TRANSLATIONS[state.currentLanguage][page]) {
        span.textContent = t(page);
    }

    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        navigateTo(page);
        closeSidebar();

        // Update active state
        menuItems.forEach(m => m.classList.remove('active'));
        item.classList.add('active');
    });
});

// Update Logout Text
if (logoutBtn) {
    const span = logoutBtn.querySelector('span');
    if (span) span.textContent = t('logout');

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
}

// --- Page Navigation ---
function navigateTo(page) {
    state.currentPage = page;
    if (mainContent) mainContent.innerHTML = '';

    switch (page) {
        case 'dashboard': renderDashboard(); break;
        case 'stocks': renderStocksPage(); break;
        case 'portfolio': renderPortfolioPage(); break;
        case 'watchlist': renderWatchlistPage(); break;
        case 'trades': renderTradesPage(); break;
        case 'settings': renderSettingsPage(); break;
        default: renderDashboard();
    }
}

// --- Page Renderers ---

function renderDashboard() {
    const portfolioValue = STOCK_DATA.portfolio.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
    const totalGain = STOCK_DATA.portfolio.reduce((sum, stock) => sum + stock.gain, 0);

    const html = `
        <div class="page-header">
            <h1>${t('dashboard')}</h1>
            <p class="subtitle">${t('welcome')}</p>
        </div>

        <div class="kpi-grid">
            <div class="card kpi-card">
                <div class="kpi-icon portfolio">
                    <i class="ph ph-briefcase"></i>
                </div>
                <div class="kpi-info">
                    <span class="label">${t('portfolioValue')}</span>
                    <h2 class="value">$${portfolioValue.toFixed(2)}</h2>
                    <span class="trend up"><i class="ph ph-trend-up"></i> +${totalGain.toFixed(2)}</span>
                </div>
            </div>
            <div class="card kpi-card">
                <div class="kpi-icon stocks">
                    <i class="ph ph-chart-line-up"></i>
                </div>
                <div class="kpi-info">
                    <span class="label">${t('holdings')}</span>
                    <h2 class="value">${STOCK_DATA.portfolio.length}</h2>
                    <span class="trend neutral"><i class="ph ph-minus"></i> ${t('stocks_unit')}</span>
                </div>
            </div>
            <div class="card kpi-card">
                <div class="kpi-icon gain">
                    <i class="ph ph-trend-up"></i>
                </div>
                <div class="kpi-info">
                    <span class="label">${t('totalGain')}</span>
                    <h2 class="value">+$${(totalGain).toFixed(2)}</h2>
                    <span class="trend up"><i class="ph ph-trend-up"></i> +${(totalGain / portfolioValue * 100).toFixed(2)}%</span>
                </div>
            </div>
            <div class="card kpi-card">
                <div class="kpi-icon trades">
                    <i class="ph ph-arrows-left-right"></i>
                </div>
                <div class="kpi-info">
                    <span class="label">${t('totalTrades')}</span>
                    <h2 class="value">${STOCK_DATA.transactions.length}</h2>
                    <span class="trend neutral"><i class="ph ph-minus"></i> ${t('completed')}</span>
                </div>
            </div>
        </div>

        <div class="content-grid-lg">
            <div class="card">
                <div class="card-header">
                    <h3>${t('topStocks')}</h3>
                </div>
                <div class="stocks-list">
                    ${STOCK_DATA.stocks.slice(0, 4).map(stock => `
                        <div class="stock-item">
                            <div class="stock-info">
                                <strong>${stock.symbol}</strong>
                                <span class="stock-name">${stock.name}</span>
                            </div>
                            <div class="stock-price">
                                <strong>$${stock.price.toFixed(2)}</strong>
                                <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>${t('activity')}</h3>
                </div>
                <div class="activity-list">
                    ${STOCK_DATA.activities.map(activity => `
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="ph ${activity.icon}"></i>
                            </div>
                            <div class="activity-content">
                                <p>${activity.text}</p>
                                <span>${activity.sub}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Stock Price Charts -->
        <div class="card">
            <div class="card-header">
                <h3>${t('stockPriceTrends')}</h3>
            </div>
            <div class="charts-grid">
                <div class="chart-container">
                    <h4>AAPL - Apple</h4>
                    <canvas id="chart-aapl"></canvas>
                </div>
                <div class="chart-container">
                    <h4>MSFT - Microsoft</h4>
                    <canvas id="chart-msft"></canvas>
                </div>
                <div class="chart-container">
                    <h4>GOOGL - Alphabet</h4>
                    <canvas id="chart-googl"></canvas>
                </div>
                <div class="chart-container">
                    <h4>TSLA - Tesla</h4>
                    <canvas id="chart-tsla"></canvas>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3>${t('yourHoldings')}</h3>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${t('symbol')}</th>
                            <th>${t('shares')}</th>
                            <th>${t('buyPrice')}</th>
                            <th>${t('currentPrice')}</th>
                            <th>${t('gainLoss')}</th>
                            <th>${t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${STOCK_DATA.portfolio.map(holding => `
                            <tr>
                                <td><strong>${holding.symbol}</strong></td>
                                <td>${holding.shares}</td>
                                <td>$${holding.buyPrice.toFixed(2)}</td>
                                <td>$${holding.currentPrice.toFixed(2)}</td>
                                <td class="gain">+$${holding.gain.toFixed(2)}</td>
                                <td>
                                    <button class="btn-action" onclick="showStockDetail('${holding.symbol}')">${t('view')}</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;

    // Create charts after DOM is ready
    setTimeout(() => {
        createStockCharts();
    }, 100);
}

function renderStocksPage() {
    const html = `
        <div class="page-header">
            <h1>${t('stocks_title')}</h1>
            <p class="subtitle">${t('stocks_subtitle')}</p>
        </div>

        <div class="filters-bar">
            <input type="text" id="stockSearch" placeholder="${t('searchStocks')}" class="search-input" oninput="searchStocks(this.value)">
        </div>

        <div class="stocks-grid">
            ${STOCK_DATA.stocks.map(stock => `
                <div class="card stock-card" onclick="showStockDetail('${stock.symbol}')">
                    <div class="stock-header">
                        <h3>${stock.symbol}</h3>
                        <span class="stock-name">${stock.name}</span>
                    </div>
                    <div class="stock-body">
                        <div class="price-display">
                            <h2>$${stock.price.toFixed(2)}</h2>
                            <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                                <i class="ph ${stock.change >= 0 ? 'ph-trend-up' : 'ph-trend-down'}"></i>
                                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                            </span>
                        </div>
                        <div class="stock-details">
                            <div>
                                <span class="label">${t('high')}</span>
                                <span class="value">$${stock.high.toFixed(2)}</span>
                            </div>
                            <div>
                                <span class="label">${t('low')}</span>
                                <span class="value">$${stock.low.toFixed(2)}</span>
                            </div>
                            <div>
                                <span class="label">${t('volume')}</span>
                                <span class="value">${stock.volume}</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary">${t('view')} ${t('details')}</button>
                </div>
            `).join('')}
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

function renderPortfolioPage() {
    const totalValue = STOCK_DATA.portfolio.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
    const totalGain = STOCK_DATA.portfolio.reduce((sum, stock) => sum + stock.gain, 0);

    const html = `
        <div class="page-header">
            <h1>${t('portfolio_title')}</h1>
            <p class="subtitle">${t('portfolio_subtitle')}</p>
        </div>

        <div class="portfolio-summary">
            <div class="summary-card">
                <span class="summary-label">${t('totalValue')}</span>
                <h2 class="summary-value">$${totalValue.toFixed(2)}</h2>
            </div>
            <div class="summary-card">
                <span class="summary-label">${t('totalGain')}</span>
                <h2 class="summary-value gain">+$${totalGain.toFixed(2)}</h2>
            </div>
            <div class="summary-card">
                <span class="summary-label">${t('returnPercent')}</span>
                <h2 class="summary-value">+${(totalGain / totalValue * 100).toFixed(2)}%</h2>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3>${t('holdingsBreakdown')}</h3>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${t('symbol')}</th>
                            <th>${t('shares')}</th>
                            <th>${t('avgBuyPrice')}</th>
                            <th>${t('currentPrice')}</th>
                            <th>${t('currentValue')}</th>
                            <th>${t('totalGainLoss')}</th>
                            <th>${t('returnPercent')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${STOCK_DATA.portfolio.map(holding => {
        const currentValue = holding.shares * holding.currentPrice;
        const gainPercent = ((holding.currentPrice - holding.buyPrice) / holding.buyPrice * 100).toFixed(2);
        return `
                                <tr>
                                    <td><strong>${holding.symbol}</strong></td>
                                    <td>${holding.shares}</td>
                                    <td>$${holding.buyPrice.toFixed(2)}</td>
                                    <td>$${holding.currentPrice.toFixed(2)}</td>
                                    <td>$${currentValue.toFixed(2)}</td>
                                    <td class="gain">+$${holding.gain.toFixed(2)}</td>
                                    <td class="gain">+${gainPercent}%</td>
                                </tr>
                            `;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

function renderWatchlistPage() {
    const html = `
        <div class="page-header">
            <h1>${t('watchlist_title')}</h1>
            <p class="subtitle">${t('watchlist_subtitle')}</p>
        </div>

        <div class="watchlist-grid">
            ${STOCK_DATA.watchlist.map(stock => `
                <div class="card watchlist-item" onclick="showStockDetail('${stock.symbol}')">
                    <div class="watchlist-header">
                        <h3>${stock.symbol}</h3>
                        <button class="btn-remove">
                            <i class="ph ph-x"></i>
                        </button>
                    </div>
                    <div class="watchlist-body">
                        <h2>$${stock.price.toFixed(2)}</h2>
                        <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                            <i class="ph ${stock.change >= 0 ? 'ph-trend-up' : 'ph-trend-down'}"></i>
                            ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                        </span>
                    </div>
                    <button class="btn-primary full">${t('addToPortfolio')}</button>
                </div>
            `).join('')}
        </div>

        <div class="card">
            <div class="card-header">
                <h3>${t('allAvailableStocks')}</h3>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${t('symbol')}</th>
                            <th>${t('name')}</th>
                            <th>${t('price')}</th>
                            <th>${t('change')}</th>
                            <th>${t('inWatchlist')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${STOCK_DATA.stocks.map(stock => {
        const inWatchlist = STOCK_DATA.watchlist.some(w => w.symbol === stock.symbol);
        return `
                                <tr onclick="showStockDetail('${stock.symbol}')">
                                    <td><strong>${stock.symbol}</strong></td>
                                    <td>${stock.name}</td>
                                    <td>$${stock.price.toFixed(2)}</td>
                                    <td class="${stock.change >= 0 ? 'gain' : 'loss'}">
                                        ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                                    </td>
                                    <td>${inWatchlist ? '<i class="ph ph-check"></i>' : '-'}</td>
                                </tr>
                            `;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

function renderTradesPage() {
    const html = `
        <div class="page-header">
            <div>
                <i class="ph ph-arrows-left-right" style="font-size: 2rem; color: hsl(var(--primary)); margin-bottom: 12px;"></i>
                <h1>${t('trades_title')}</h1>
                <p class="subtitle">${t('trades_subtitle')}</p>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3>${t('transactionHistory')}</h3>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${t('date')}</th>
                            <th>${t('name')}</th>
                            <th>${t('change')}</th>
                            <th>${t('shares')}</th>
                            <th>${t('price')}</th>
                            <th>${t('total')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${STOCK_DATA.transactions.map(tx => `
                            <tr>
                                <td>${new Date(tx.date).toLocaleDateString()}</td>
                                <td><strong>${tx.symbol}</strong></td>
                                <td>
                                    <span class="badge ${tx.action === 'BUY' ? 'buy' : 'sell'}">
                                        ${tx.action}
                                    </span>
                                </td>
                                <td>${tx.shares}</td>
                                <td>$${tx.price.toFixed(2)}</td>
                                <td>$${(tx.shares * tx.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

function renderSettingsPage() {
    const userEmail = localStorage.getItem('user') || 'user@example.com';

    const html = `
        <div class="page-header">
            <h1>${t('settings_title')}</h1>
            <p class="subtitle">${t('settings_subtitle')}</p>
        </div>

        <div class="settings-grid">
            <div class="card">
                <div class="card-header">
                    <h3>${t('accountSettings')}</h3>
                </div>
                <div class="settings-form">
                    <div class="form-group">
                        <label>${t('username')}</label>
                        <input type="text" value="${userEmail}" disabled class="form-input">
                    </div>
                    <div class="form-group">
                        <label>${t('emailNotifications')}</label>
                        <div class="form-control">
                            <input type="checkbox" id="emailNotif" checked>
                            <label for="emailNotif">${t('enabled')}</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>${t('tradeAlerts')}</label>
                        <div class="form-control">
                            <input type="checkbox" id="tradeAlerts" checked>
                            <label for="tradeAlerts">${t('enabled')}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>${t('displaySettings')}</h3>
                </div>
                <div class="settings-form">
                    <div class="form-group">
                        <label>${t('language')}</label>
                        <select id="languageSelect" class="form-select">
                            <option value="en" ${state.currentLanguage === 'en' ? 'selected' : ''}>English</option>
                            <option value="th" ${state.currentLanguage === 'th' ? 'selected' : ''}>ไทย (Thai)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${t('currency')}</label>
                        <select id="currencySelect" class="form-select">
                            <option value="USD" ${state.currentCurrency === 'USD' ? 'selected' : ''}>USD ($)</option>
                            <option value="THB" ${state.currentCurrency === 'THB' ? 'selected' : ''}>THB (฿)</option>
                            <option value="EUR" ${state.currentCurrency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                        </select>
                    </div>
                    <button class="btn-primary" onclick="saveSettings()">
                        <i class="ph ph-check"></i> ${t('save')}
                    </button>
                </div>
            </div>
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

// --- Helper Functions ---

function showStockDetail(symbol) {
    const stock = STOCK_DATA.stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    const html = `
        <div class="page-header">
            <h1>${stock.symbol} - ${stock.name}</h1>
            <p class="subtitle">${t('stockDetailSubtitle')}</p>
        </div>

        <div class="stock-detail-grid">
            <div class="card">
                <div class="stock-detail-price">
                    <h2>$${stock.price.toFixed(2)}</h2>
                    <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                        ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                    </span>
                </div>
            </div>

            <div class="card">
                <h3>${t('keyMetrics')}</h3>
                <div class="metrics">
                    <div class="metric">
                        <span class="label">${t('high52')}</span>
                        <span class="value">$${(stock.high * 1.15).toFixed(2)}</span>
                    </div>
                    <div class="metric">
                        <span class="label">${t('low52')}</span>
                        <span class="value">$${(stock.low * 0.85).toFixed(2)}</span>
                    </div>
                    <div class="metric">
                        <span class="label">${t('volume')}</span>
                        <span class="value">${stock.volume}</span>
                    </div>
                    <div class="metric">
                        <span class="label">${t('marketCap')}</span>
                        <span class="value">$${((stock.price * 1000000000) / 1000000000).toFixed(2)}B</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>${t('trading')}</h3>
            <div class="trading-buttons">
                <button class="btn-buy" onclick="alert('${t('buy')} ${symbol} at $${stock.price.toFixed(2)}')">
                    <i class="ph ph-plus"></i> ${t('buy')} ${symbol}
                </button>
                <button class="btn-sell" onclick="alert('${t('sell')} ${symbol} at $${stock.price.toFixed(2)}')">
                    <i class="ph ph-minus"></i> ${t('sell')} ${symbol}
                </button>
            </div>
        </div>

        <div class="button-group">
            <button class="btn-secondary" onclick="navigateTo('stocks')">
                <i class="ph ph-arrow-left"></i> ${t('backToStocks')}
            </button>
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

function saveSettings() {
    const languageSelect = document.getElementById('languageSelect');
    const currencySelect = document.getElementById('currencySelect');

    if (languageSelect && currencySelect) {
        const newLanguage = languageSelect.value;
        const newCurrency = currencySelect.value;

        // Save to localStorage
        localStorage.setItem('language', newLanguage);
        localStorage.setItem('currency', newCurrency);

        // Update state
        state.currentLanguage = newLanguage;
        state.currentCurrency = newCurrency;

        // Update Menu Items (which are outside mainContent)
        menuItems.forEach(item => {
            const span = item.querySelector('span');
            const page = item.dataset.page;
            if (span && page && TRANSLATIONS[state.currentLanguage][page]) {
                span.textContent = t(page);
            }
        });

        // Update Logout Text
        if (logoutBtn) {
            const span = logoutBtn.querySelector('span');
            if (span) span.textContent = t('logout');
        }

        // Show confirmation
        alert(t('saved'));

        // Re-render the page to apply language changes
        navigateTo('settings');
    }
}

function searchStocks(term) {
    if (!term) {
        renderStocksPage();
        return;
    }

    term = term.toLowerCase();
    const filtered = STOCK_DATA.stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(term) ||
        stock.name.toLowerCase().includes(term)
    );

    const html = `
        <div class="page-header">
            <h1>${t('stocks_title')}</h1>
            <p class="subtitle">${t('stocks_subtitle')}</p>
        </div>

        <div class="filters-bar">
            <input type="text" id="stockSearch" placeholder="${t('searchStocks')}" class="search-input" value="${term}" oninput="searchStocks(this.value)">
        </div>

        <div class="stocks-grid">
            ${filtered.map(stock => `
                <div class="card stock-card" onclick="showStockDetail('${stock.symbol}')">
                    <div class="stock-header">
                        <h3>${stock.symbol}</h3>
                        <span class="stock-name">${stock.name}</span>
                    </div>
                    <div class="stock-body">
                        <div class="price-display">
                            <h2>$${stock.price.toFixed(2)}</h2>
                            <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                                <i class="ph ${stock.change >= 0 ? 'ph-trend-up' : 'ph-trend-down'}"></i>
                                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                            </span>
                        </div>
                        <div class="stock-details">
                            <div>
                                <span class="label">${t('high')}</span>
                                <span class="value">$${stock.high.toFixed(2)}</span>
                            </div>
                            <div>
                                <span class="label">${t('low')}</span>
                                <span class="value">$${stock.low.toFixed(2)}</span>
                            </div>
                            <div>
                                <span class="label">${t('volume')}</span>
                                <span class="value">${stock.volume}</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary">${t('view')} ${t('details')}</button>
                </div>
            `).join('')}
        </div>
    `;

    if (mainContent) mainContent.innerHTML = html;
}

// --- Initialize ---
if (isDashboard) {
    const dashboardItem = document.querySelector('[data-page="dashboard"]');
    if (dashboardItem) dashboardItem.classList.add('active');
    renderDashboard();
}

// --- Chart Functions ---
function createStockCharts() {
    // AAPL Chart
    createLineChart('chart-aapl', 'AAPL', STOCK_DATA.chartData.dates, STOCK_DATA.chartData.aapl, '#8B72F7');

    // MSFT Chart
    createLineChart('chart-msft', 'MSFT', STOCK_DATA.chartData.dates, STOCK_DATA.chartData.msft, '#3498DB');

    // GOOGL Chart
    createLineChart('chart-googl', 'GOOGL', STOCK_DATA.chartData.dates, STOCK_DATA.chartData.googl, '#E74C3C');

    // TSLA Chart
    createLineChart('chart-tsla', 'TSLA', STOCK_DATA.chartData.dates, STOCK_DATA.chartData.tsla, '#2ECC71');
}

function createLineChart(canvasId, label, dates, data, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (STOCK_DATA.stockCharts[canvasId]) {
        STOCK_DATA.stockCharts[canvasId].destroy();
    }

    // Check if Chart is defined (might not be loaded yet if network issue, but we assume cdn script is there)
    if (typeof Chart === 'undefined') return;

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: label + ' Price ($)',
                data: data,
                borderColor: color,
                backgroundColor: color + '15',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: state.isDark ? '#e0e0e0' : '#333',
                        font: { size: 12, weight: 'bold' }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: state.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    },
                    ticks: {
                        color: state.isDark ? '#e0e0e0' : '#666',
                        callback: function (value) {
                            return '$' + value.toFixed(0);
                        }
                    }
                },
                x: {
                    grid: {
                        color: state.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    },
                    ticks: {
                        color: state.isDark ? '#e0e0e0' : '#666',
                    }
                }
            }
        }
    });

    STOCK_DATA.stockCharts[canvasId] = chart;
}
