/**
 * AJTS Asset Sticker & Master Sheet Generator
 * Features:
 * - 4 in a row A4 Sheet Layout (24 or 20 stickers per page)
 * - Proportional compact dimensions with ZERO extra spaces
 * - Large, prominent Logo
 * - Mention Category: DESKTOP and SCREEN inline with labels (no gaps between field name and value)
 * - Starts in Master Sheet View ("at starting time showing non sticker make")
 * - Master Inventory Sheet aggregating all Desktop & Screen records
 */

(function () {
  'use strict';

  // Default 20 Desktop Items (Desktops / Laptops / Workstations)
  const DEFAULT_DESKTOP_ITEMS = [
    { id: 'desk-1', number: '01', model: 'Dell 3420', serial: '3GNGBM2' },
    { id: 'desk-2', number: '02', model: 'Dell 3420', serial: '4HPHCN2' },
    { id: 'desk-3', number: '03', model: 'Dell Latitude 5420', serial: '8JKLM91' },
    { id: 'desk-4', number: '04', model: 'Dell Latitude 5420', serial: '9QWERT3' },
    { id: 'desk-5', number: '05', model: 'HP ProBook 450 G8', serial: '5CD12984X' },
    { id: 'desk-6', number: '06', model: 'HP ProBook 450 G8', serial: '5CD12985Y' },
    { id: 'desk-7', number: '07', model: 'Lenovo ThinkPad E14', serial: 'PF29KLM8' },
    { id: 'desk-8', number: '08', model: 'Lenovo ThinkPad E14', serial: 'PF29KLM9' },
    { id: 'desk-9', number: '09', model: 'Dell OptiPlex 7080', serial: '2X89LM1' },
    { id: 'desk-10', number: '10', model: 'Dell OptiPlex 7080', serial: '2X89LM2' },
    { id: 'desk-11', number: '11', model: 'HP EliteDesk 800 G6', serial: '4CE1982X' },
    { id: 'desk-12', number: '12', model: 'HP EliteDesk 800 G6', serial: '4CE1983Y' },
    { id: 'desk-13', number: '13', model: 'Lenovo ThinkCentre M70q', serial: 'MJ089KP1' },
    { id: 'desk-14', number: '14', model: 'Lenovo ThinkCentre M70q', serial: 'MJ089KP2' },
    { id: 'desk-15', number: '15', model: 'Dell Latitude 7420', serial: '7KN89P1' },
    { id: 'desk-16', number: '16', model: 'Dell Latitude 7420', serial: '7KN89P2' },
    { id: 'desk-17', number: '17', model: 'HP ZBook Firefly 15', serial: '5CD34190A' },
    { id: 'desk-18', number: '18', model: 'HP ZBook Firefly 15', serial: '5CD34190B' },
    { id: 'desk-19', number: '19', model: 'Lenovo ThinkPad T14', serial: 'PF38NK21' },
    { id: 'desk-20', number: '20', model: 'Lenovo ThinkPad T14', serial: 'PF38NK22' }
  ];

  // Default 20 Screen Items (Monitors / Displays) - authentic screen serial numbers
  const DEFAULT_SCREEN_ITEMS = [
    { id: 'scr-1', number: '101', model: 'Dell 24" P2419H', serial: 'CN-0K7M2L-74261-987-1234' },
    { id: 'scr-2', number: '102', model: 'Dell 24" P2419H', serial: 'CN-0K7M2L-74261-987-1235' },
    { id: 'scr-3', number: '103', model: 'Dell 22" P2219H', serial: 'CN-0J5P8M-74261-89A-0451' },
    { id: 'scr-4', number: '104', model: 'Dell 22" P2219H', serial: 'CN-0J5P8M-74261-89A-0452' },
    { id: 'scr-5', number: '105', model: 'HP 24" E243 EliteDisplay', serial: '6CM8912X45-98124' },
    { id: 'scr-6', number: '106', model: 'HP 24" E243 EliteDisplay', serial: '6CM8913Y45-98125' },
    { id: 'scr-7', number: '107', model: 'Lenovo 24" ThinkVision T24i', serial: 'V3089KP1-789214' },
    { id: 'scr-8', number: '108', model: 'Lenovo 24" ThinkVision T24i', serial: 'V3089KP2-789215' },
    { id: 'scr-9', number: '109', model: 'Samsung 24" LF24T350', serial: '0N89456AZ00123' },
    { id: 'scr-10', number: '110', model: 'Samsung 24" LF24T350', serial: '0N89457BZ00124' },
    { id: 'scr-11', number: '111', model: 'Dell 27" P2722H', serial: 'CN-0L991X-74261-55B-0891' },
    { id: 'scr-12', number: '112', model: 'Dell 27" P2722H', serial: 'CN-0L992Y-74261-55B-0892' },
    { id: 'scr-13', number: '113', model: 'LG 24" 24MP400', serial: '203NTPK8123490' },
    { id: 'scr-14', number: '114', model: 'LG 24" 24MP400', serial: '203NTPK9123491' },
    { id: 'scr-15', number: '115', model: 'Acer 21.5" EK220Q', serial: 'MML78901234567' },
    { id: 'scr-16', number: '116', model: 'Acer 21.5" EK220Q', serial: 'MML78902234568' },
    { id: 'scr-17', number: '117', model: 'BenQ 24" GW2480', serial: 'ETL8912P456789' },
    { id: 'scr-18', number: '118', model: 'BenQ 24" GW2480', serial: 'ETL8913Q456790' },
    { id: 'scr-19', number: '119', model: 'ViewSonic 24" VA2432', serial: 'VS98231A123456' },
    { id: 'scr-20', number: '120', model: 'ViewSonic 24" VA2432', serial: 'VS98231B123457' }
  ];

  // Application State
  const state = {
    sheets: {
      desktop: JSON.parse(JSON.stringify(DEFAULT_DESKTOP_ITEMS)),
      screen: JSON.parse(JSON.stringify(DEFAULT_SCREEN_ITEMS))
    },
    activeTab: 'master', // 'master' (all records) | 'desktop' | 'screen'
    currentView: 'sheet', // Starts in Master Sheet view ("at starting time showing non sticker make")
    selectedItemId: 'desk-1',
    settings: {
      gridFormat: 'grid-24-4x6', // 4 in a row (24 per A4 page) default
      showCuttingGuides: false,
      qrMode: 'serial',
      urlPattern: 'https://ajtscomputers.com/asset/{serial}',
      companyName: 'AJTS',
      companySubtitle: 'COMPUTERS',
      companyTagline: 'RENTAL SERVICES',
      customLogo: null
    }
  };

  const qrCache = new Map();
  let elements = {};

  function initDomElements() {
    elements = {
      btnPrint: document.getElementById('btnPrint'),
      btnExportZip: document.getElementById('btnExportZip'),
      btnExportXlsx: document.getElementById('btnExportXlsx'),
      btnLoadSample: document.getElementById('btnLoadSample'),
      btnClearAll: document.getElementById('btnClearAll'),
      
      pillMaster: document.getElementById('pillMaster'),
      pillDesktop: document.getElementById('pillDesktop'),
      pillScreen: document.getElementById('pillScreen'),
      pillMasterCount: document.getElementById('pillMasterCount'),
      pillDesktopCount: document.getElementById('pillDesktopCount'),
      pillScreenCount: document.getElementById('pillScreenCount'),
      
      viewA4Btn: document.getElementById('viewA4Btn'),
      viewSheetBtn: document.getElementById('viewSheetBtn'),
      viewSingleBtn: document.getElementById('viewSingleBtn'),
      viewCompareBtn: document.getElementById('viewCompareBtn'),
      
      viewport: document.getElementById('previewViewport'),
      
      singleForm: document.getElementById('singleForm'),
      inpCategory: document.getElementById('inpCategory'),
      inpNumber: document.getElementById('inpNumber'),
      inpModel: document.getElementById('inpModel'),
      inpSerial: document.getElementById('inpSerial'),
      inpCustomQr: document.getElementById('inpCustomQr'),
      
      rangeForm: document.getElementById('rangeForm'),
      bulkTargetTab: document.getElementById('bulkTargetTab'),
      bulkModel: document.getElementById('bulkModel'),
      bulkStartNum: document.getElementById('bulkStartNum'),
      bulkEndNum: document.getElementById('bulkEndNum'),
      bulkPadZeroes: document.getElementById('bulkPadZeroes'),
      bulkSerialMode: document.getElementById('bulkSerialMode'),
      bulkSerialPrefix: document.getElementById('bulkSerialPrefix'),
      bulkSerialStart: document.getElementById('bulkSerialStart'),
      bulkSerialList: document.getElementById('bulkSerialList'),
      prefixGroup: document.getElementById('prefixGroup'),
      listGroup: document.getElementById('listGroup'),
      
      bulkPasteForm: document.getElementById('bulkPasteForm'),
      pasteTargetTab: document.getElementById('pasteTargetTab'),
      bulkTextarea: document.getElementById('bulkTextarea'),
      csvFileInput: document.getElementById('csvFileInput'),
      dropZone: document.getElementById('dropZone'),
      
      btnQuickGrid24: document.getElementById('btnQuickGrid24'),
      btnQuickGrid20: document.getElementById('btnQuickGrid20'),
      btnQuickGrid15: document.getElementById('btnQuickGrid15'),
      selectGrid: document.getElementById('selectGrid'),
      checkCuttingGuides: document.getElementById('checkCuttingGuides'),
      selectQrMode: document.getElementById('selectQrMode'),
      urlPatternGroup: document.getElementById('urlPatternGroup'),
      inpUrlPattern: document.getElementById('inpUrlPattern'),
      inpCompName: document.getElementById('inpCompName'),
      inpCompSub: document.getElementById('inpCompSub'),
      inpCompTag: document.getElementById('inpCompTag'),
      logoFileInput: document.getElementById('logoFileInput'),
      btnResetLogo: document.getElementById('btnResetLogo'),
      
      itemsTableBody: document.getElementById('itemsTableBody'),
      totalStickersCount: document.getElementById('totalStickersCount'),
      statTotalCount: document.getElementById('statTotalCount'),
      statPagesCount: document.getElementById('statPagesCount'),
      
      tabButtons: document.querySelectorAll('.tab-btn'),
      tabContents: document.querySelectorAll('.tab-content'),

      // Security & Authentication Elements
      authOverlay: document.getElementById('authOverlay'),
      authLoginForm: document.getElementById('authLoginForm'),
      authUsername: document.getElementById('authUsername'),
      authPassword: document.getElementById('authPassword'),
      btnTogglePassword: document.getElementById('btnTogglePassword'),
      authRememberMe: document.getElementById('authRememberMe'),
      authAlertBanner: document.getElementById('authAlertBanner'),
      authAlertMsg: document.getElementById('authAlertMsg'),
      userSessionBadge: document.getElementById('userSessionBadge'),
      headerUserName: document.getElementById('headerUserName'),
      headerUserRole: document.getElementById('headerUserRole'),
      btnLogout: document.getElementById('btnLogout'),
      
      // User Management Elements
      userCountBadge: document.getElementById('userCountBadge'),
      btnToggleAddUser: document.getElementById('btnToggleAddUser'),
      usersListContainer: document.getElementById('usersListContainer'),
      addUserBox: document.getElementById('addUserBox'),
      btnCloseAddUser: document.getElementById('btnCloseAddUser'),
      btnCancelAddUser: document.getElementById('btnCancelAddUser'),
      addUserForm: document.getElementById('addUserForm'),
      newUsername: document.getElementById('newUsername'),
      newUserRole: document.getElementById('newUserRole'),
      newUserPassword: document.getElementById('newUserPassword'),
      newUserConfirmPassword: document.getElementById('newUserConfirmPassword'),
      
      // Change Password Elements
      changePwActiveUser: document.getElementById('changePwActiveUser'),
      changePasswordForm: document.getElementById('changePasswordForm'),
      currPassword: document.getElementById('currPassword'),
      newPassword: document.getElementById('newPassword'),
      confirmPassword: document.getElementById('confirmPassword'),
      btnResetSecurity: document.getElementById('btnResetSecurity')
    };
  }

  function getItemCategoryLabel(item) {
    const raw = (item.category || (item.id && (item.id.startsWith('scr') || item.id.startsWith('mon')) ? 'screen' : 'desktop')).toLowerCase();
    if (raw === 'screen' || raw === 'monitor') {
      return 'SCREEN';
    }
    return 'DESKTOP';
  }

  function getActiveItems() {
    if (state.activeTab === 'master') {
      const all = [];
      for (const cat in state.sheets) {
        state.sheets[cat].forEach(item => {
          all.push({ ...item, category: cat });
        });
      }
      return all;
    }
    const catList = state.sheets[state.activeTab] || [];
    return catList.map(item => ({ ...item, category: state.activeTab }));
  }

  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container no-print';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    if (type === 'error' || type === 'danger') {
      toast.style.borderLeftColor = 'var(--danger)';
    } else if (type === 'success') {
      toast.style.borderLeftColor = 'var(--success)';
    }
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================================================
  // Security & Authentication Module (Multi-User Support)
  // ==========================================================================
  const AUTH_STORAGE_KEYS = {
    USERS: 'ajts_auth_users',
    SESSION_USER: 'ajts_auth_session_user',
    SESSION_ROLE: 'ajts_auth_session_role',
    SESSION_TOKEN: 'ajts_auth_session_token',
    REMEMBER: 'ajts_auth_remember',
    LAST_ACTIVITY: 'ajts_auth_last_activity'
  };

  const DEFAULT_CREDENTIALS = {
    user: 'admin',
    pass: 'admin'
  };

  const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes auto-lock

  async function computeSha256(str) {
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
      try {
        const enc = new TextEncoder().encode(str);
        const hashBuf = await window.crypto.subtle.digest('SHA-256', enc);
        return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        console.warn('WebCrypto subtle digest unavailable, using fallback', e);
      }
    }
    let h1 = 0xdeadbeef, h2 = 0x41c64e6d;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }

  function generateSalt() {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  }

  function getStoredUsers() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEYS.USERS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse ajts_auth_users:', e);
    }
    return [];
  }

  function saveStoredUsers(users) {
    localStorage.setItem(AUTH_STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  async function seedDefaultUsers() {
    let users = getStoredUsers();
    if (users.length === 0) {
      const legacySalt = localStorage.getItem('ajts_auth_salt');
      const legacyHash = localStorage.getItem('ajts_auth_hash');
      const legacyUser = localStorage.getItem('ajts_auth_user') || 'admin';

      if (legacySalt && legacyHash) {
        users = [{
          username: legacyUser,
          role: 'Admin',
          salt: legacySalt,
          hash: legacyHash,
          createdAt: new Date().toLocaleDateString()
        }];
      } else {
        const salt = generateSalt();
        const hash = await computeSha256(`${salt}::${DEFAULT_CREDENTIALS.pass}::ajts_secret_2026`);
        users = [{
          username: 'admin',
          role: 'Admin',
          salt: salt,
          hash: hash,
          createdAt: new Date().toLocaleDateString()
        }];
      }
      saveStoredUsers(users);
    }
    return users;
  }

  function getActiveSession() {
    const token = sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION_TOKEN) || localStorage.getItem(AUTH_STORAGE_KEYS.SESSION_TOKEN);
    const user = sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION_USER) || localStorage.getItem(AUTH_STORAGE_KEYS.SESSION_USER);
    const role = sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION_ROLE) || localStorage.getItem(AUTH_STORAGE_KEYS.SESSION_ROLE) || 'Admin';
    const lastAct = parseInt(localStorage.getItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY) || sessionStorage.getItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY) || '0', 10);
    return { token, user, role, lastAct };
  }

  function updateActivity() {
    const now = Date.now();
    if (localStorage.getItem(AUTH_STORAGE_KEYS.SESSION_TOKEN)) {
      localStorage.setItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY, String(now));
    }
    if (sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION_TOKEN)) {
      sessionStorage.setItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY, String(now));
    }
  }

  function clearSession() {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_TOKEN);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_USER);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_ROLE);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY);
    localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_ROLE);
    localStorage.removeItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY);
  }

  function showAuthAlert(msg) {
    if (elements.authAlertBanner) {
      elements.authAlertBanner.style.display = 'flex';
      if (elements.authAlertMsg) elements.authAlertMsg.textContent = msg;
    }
  }

  function hideAuthAlert() {
    if (elements.authAlertBanner) {
      elements.authAlertBanner.style.display = 'none';
    }
  }

  function renderUsersList() {
    if (!elements.usersListContainer) return;
    const users = getStoredUsers();
    const activeSession = getActiveSession();
    const activeUserName = (activeSession.user || '').toLowerCase();

    if (elements.userCountBadge) {
      elements.userCountBadge.textContent = users.length;
    }
    if (elements.changePwActiveUser) {
      elements.changePwActiveUser.textContent = activeSession.user || 'admin';
    }

    elements.usersListContainer.innerHTML = '';

    users.forEach(u => {
      const row = document.createElement('div');
      row.className = 'user-item-row';
      const isCurrent = u.username.toLowerCase() === activeUserName;
      const isAdmin = (u.role || '').toLowerCase() === 'admin';
      const roleBadgeClass = isAdmin ? 'user-role-badge-admin' : 'user-role-badge-operator';

      row.innerHTML = `
        <div class="user-item-left">
          <span style="font-size: 0.95rem;">${isAdmin ? '🛡️' : '👤'}</span>
          <div>
            <div class="user-item-name">${escapeHtml(u.username)}</div>
            <div style="font-size: 0.65rem; color: #64748b;">Created: ${escapeHtml(u.createdAt || 'N/A')}</div>
          </div>
          <span class="${roleBadgeClass}">${escapeHtml(u.role || 'Operator')}</span>
        </div>
        <div class="user-item-right">
          ${isCurrent 
            ? '<span class="user-current-tag">(Active / You)</span>' 
            : `<button type="button" class="btn-del-user" data-user="${escapeHtml(u.username)}" title="Delete user ${escapeHtml(u.username)}">🗑️ Delete</button>`
          }
        </div>
      `;

      if (!isCurrent) {
        const delBtn = row.querySelector('.btn-del-user');
        if (delBtn) {
          delBtn.onclick = () => handleDeleteUser(u.username);
        }
      }

      elements.usersListContainer.appendChild(row);
    });
  }

  function handleDeleteUser(username) {
    const users = getStoredUsers();
    const userToDelete = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!userToDelete) return;

    const activeSession = getActiveSession();
    if (username.toLowerCase() === (activeSession.user || '').toLowerCase()) {
      showToast('You cannot delete your own active account.', 'error');
      return;
    }

    if ((userToDelete.role || '').toLowerCase() === 'admin') {
      const adminCount = users.filter(u => (u.role || '').toLowerCase() === 'admin').length;
      if (adminCount <= 1) {
        showToast('Cannot delete the last remaining Administrator account.', 'error');
        return;
      }
    }

    if (confirm(`Are you sure you want to delete user account "${username}"?`)) {
      const updated = users.filter(u => u.username.toLowerCase() !== username.toLowerCase());
      saveStoredUsers(updated);
      renderUsersList();
      showToast(`User account "${username}" deleted.`, 'info');
    }
  }

  async function initAuthModule() {
    // 1. Ensure user accounts are initialized
    let users = getStoredUsers();
    if (users.length === 0) {
      users = await seedDefaultUsers();
    }

    // 2. Check existing session
    const session = getActiveSession();
    const now = Date.now();

    if (session.token && session.lastAct && (now - session.lastAct < INACTIVITY_TIMEOUT_MS)) {
      updateActivity();
      if (elements.authOverlay) elements.authOverlay.classList.add('hidden');
      if (elements.headerUserName) elements.headerUserName.textContent = session.user || 'admin';
      if (elements.headerUserRole) elements.headerUserRole.textContent = session.role || 'Admin';
      renderUsersList();
    } else {
      clearSession();
      if (elements.authOverlay) elements.authOverlay.classList.remove('hidden');
      if (session.token) {
        showAuthAlert('Session timed out after 30 minutes of inactivity. Please sign in again.');
      }
    }

    // 3. Password visibility toggle
    if (elements.btnTogglePassword && elements.authPassword) {
      elements.btnTogglePassword.onclick = () => {
        const isPw = elements.authPassword.type === 'password';
        elements.authPassword.type = isPw ? 'text' : 'password';
        elements.btnTogglePassword.textContent = isPw ? '🙈' : '👁️';
      };
    }

    // 4. Auth Login Form Submit
    if (elements.authLoginForm) {
      elements.authLoginForm.onsubmit = async (e) => {
        e.preventDefault();
        const inputUser = elements.authUsername ? elements.authUsername.value.trim() : '';
        const inputPass = elements.authPassword ? elements.authPassword.value : '';
        const remember = elements.authRememberMe ? elements.authRememberMe.checked : false;

        let currentUsers = getStoredUsers();
        if (currentUsers.length === 0) {
          currentUsers = await seedDefaultUsers();
        }

        const matchedUser = currentUsers.find(u => u.username.toLowerCase() === inputUser.toLowerCase());

        if (matchedUser) {
          const inputHash = await computeSha256(`${matchedUser.salt}::${inputPass}::ajts_secret_2026`);
          if (inputHash === matchedUser.hash) {
            // Success
            hideAuthAlert();
            const token = `ajts_${Date.now()}_${Math.random().toString(36).substring(2)}`;
            const nowTime = Date.now();

            sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_TOKEN, token);
            sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_USER, matchedUser.username);
            sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_ROLE, matchedUser.role || 'Operator');
            sessionStorage.setItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY, String(nowTime));

            if (remember) {
              localStorage.setItem(AUTH_STORAGE_KEYS.SESSION_TOKEN, token);
              localStorage.setItem(AUTH_STORAGE_KEYS.SESSION_USER, matchedUser.username);
              localStorage.setItem(AUTH_STORAGE_KEYS.SESSION_ROLE, matchedUser.role || 'Operator');
              localStorage.setItem(AUTH_STORAGE_KEYS.LAST_ACTIVITY, String(nowTime));
              localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER, 'true');
            } else {
              localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_TOKEN);
              localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_USER);
              localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_ROLE);
              localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER);
            }

            if (elements.authOverlay) elements.authOverlay.classList.add('hidden');
            if (elements.headerUserName) elements.headerUserName.textContent = matchedUser.username;
            if (elements.headerUserRole) elements.headerUserRole.textContent = matchedUser.role || 'Operator';
            if (elements.authPassword) elements.authPassword.value = '';

            renderUsersList();
            showToast(`Welcome back, ${matchedUser.username}! Signed in as ${matchedUser.role || 'Operator'}.`, 'success');
            return;
          }
        }

        // Failed
        showAuthAlert('Invalid username or password. Please verify your credentials.');
        const card = document.querySelector('.auth-modal-card');
        if (card) {
          card.classList.remove('shake');
          void card.offsetWidth;
          card.classList.add('shake');
        }
      };
    }

    // 5. Header Logout / Lock Button
    if (elements.btnLogout) {
      elements.btnLogout.onclick = () => {
        clearSession();
        hideAuthAlert();
        if (elements.authPassword) elements.authPassword.value = '';
        if (elements.authOverlay) elements.authOverlay.classList.remove('hidden');
        showToast('Signed out. Application locked securely.', 'info');
      };
    }

    // 6. User Management: Toggle Add User Box
    if (elements.btnToggleAddUser) {
      elements.btnToggleAddUser.onclick = () => {
        if (elements.addUserBox) {
          const isShown = elements.addUserBox.style.display === 'block';
          elements.addUserBox.style.display = isShown ? 'none' : 'block';
          if (!isShown && elements.newUsername) {
            elements.newUsername.focus();
          }
        }
      };
    }

    if (elements.btnCloseAddUser) {
      elements.btnCloseAddUser.onclick = () => {
        if (elements.addUserBox) elements.addUserBox.style.display = 'none';
      };
    }

    if (elements.btnCancelAddUser) {
      elements.btnCancelAddUser.onclick = () => {
        if (elements.addUserBox) elements.addUserBox.style.display = 'none';
      };
    }

    // 7. User Management: Add User Form Submit
    if (elements.addUserForm) {
      elements.addUserForm.onsubmit = async (e) => {
        e.preventDefault();
        const newName = (elements.newUsername ? elements.newUsername.value : '').trim();
        const role = elements.newUserRole ? elements.newUserRole.value : 'Operator';
        const pw = elements.newUserPassword ? elements.newUserPassword.value : '';
        const pwConf = elements.newUserConfirmPassword ? elements.newUserConfirmPassword.value : '';

        if (!newName || !pw || !pwConf) {
          showToast('Please fill out all user fields.', 'error');
          return;
        }

        if (newName.length < 3) {
          showToast('Username must be at least 3 characters.', 'error');
          return;
        }

        if (!/^[a-zA-Z0-9_\-\.]+$/.test(newName)) {
          showToast('Username can only contain letters, numbers, hyphens, and underscores.', 'error');
          return;
        }

        const currentUsers = getStoredUsers();
        if (currentUsers.some(u => u.username.toLowerCase() === newName.toLowerCase())) {
          showToast(`User "${newName}" already exists! Please choose another username.`, 'error');
          return;
        }

        if (pw.length < 4) {
          showToast('Password must be at least 4 characters.', 'error');
          return;
        }

        if (pw !== pwConf) {
          showToast('Passwords do not match.', 'error');
          return;
        }

        const salt = generateSalt();
        const hash = await computeSha256(`${salt}::${pw}::ajts_secret_2026`);
        currentUsers.push({
          username: newName,
          role: role,
          salt: salt,
          hash: hash,
          createdAt: new Date().toLocaleDateString()
        });

        saveStoredUsers(currentUsers);
        renderUsersList();

        if (elements.newUsername) elements.newUsername.value = '';
        if (elements.newUserPassword) elements.newUserPassword.value = '';
        if (elements.newUserConfirmPassword) elements.newUserConfirmPassword.value = '';
        if (elements.addUserBox) elements.addUserBox.style.display = 'none';

        showToast(`User "${newName}" (${role}) successfully created!`, 'success');
      };
    }

    // 8. Settings: Change Password Form (for Active User)
    if (elements.changePasswordForm) {
      elements.changePasswordForm.onsubmit = async (e) => {
        e.preventDefault();
        const curr = elements.currPassword ? elements.currPassword.value : '';
        const newP = elements.newPassword ? elements.newPassword.value : '';
        const confP = elements.confirmPassword ? elements.confirmPassword.value : '';

        if (!curr || !newP || !confP) {
          showToast('Please fill out all password fields.', 'error');
          return;
        }

        if (newP.length < 4) {
          showToast('New password must be at least 4 characters.', 'error');
          return;
        }

        if (newP !== confP) {
          showToast('New password and confirmation do not match.', 'error');
          return;
        }

        const session = getActiveSession();
        const currentUsers = getStoredUsers();
        const activeUser = currentUsers.find(u => u.username.toLowerCase() === (session.user || '').toLowerCase()) || currentUsers[0];

        if (!activeUser) {
          showToast('Active user account not found.', 'error');
          return;
        }

        const currHash = await computeSha256(`${activeUser.salt}::${curr}::ajts_secret_2026`);
        if (currHash !== activeUser.hash) {
          showToast('Current password is incorrect.', 'error');
          return;
        }

        const newSalt = generateSalt();
        const newHash = await computeSha256(`${newSalt}::${newP}::ajts_secret_2026`);
        activeUser.salt = newSalt;
        activeUser.hash = newHash;

        saveStoredUsers(currentUsers);

        elements.currPassword.value = '';
        elements.newPassword.value = '';
        elements.confirmPassword.value = '';

        showToast(`Password changed successfully for ${activeUser.username}!`, 'success');
      };
    }

    // 9. Settings: Reset Password & Accounts to Default
    if (elements.btnResetSecurity) {
      elements.btnResetSecurity.onclick = async () => {
        if (confirm('Reset user accounts back to default administrator (admin / admin)?')) {
          localStorage.removeItem(AUTH_STORAGE_KEYS.USERS);
          await seedDefaultUsers();
          renderUsersList();
          if (elements.currPassword) elements.currPassword.value = '';
          if (elements.newPassword) elements.newPassword.value = '';
          if (elements.confirmPassword) elements.confirmPassword.value = '';
          showToast('User accounts reset to default (admin / admin).', 'info');
        }
      };
    }

    // 10. Inactivity Monitor & User Activity Tracking
    let lastThrottledTime = 0;
    const recordUserActivity = () => {
      const now = Date.now();
      if (now - lastThrottledTime > 5000) {
        lastThrottledTime = now;
        updateActivity();
      }
    };

    window.addEventListener('mousemove', recordUserActivity, { passive: true });
    window.addEventListener('keydown', recordUserActivity, { passive: true });
    window.addEventListener('click', recordUserActivity, { passive: true });
    window.addEventListener('touchstart', recordUserActivity, { passive: true });

    // Periodic check every 30 seconds for 30-min auto-lock
    setInterval(() => {
      const session = getActiveSession();
      if (session.token && session.lastAct) {
        if (Date.now() - session.lastAct >= INACTIVITY_TIMEOUT_MS) {
          clearSession();
          if (elements.authOverlay) elements.authOverlay.classList.remove('hidden');
          showAuthAlert('Session locked due to 30 minutes of inactivity. Please sign in again.');
          showToast('Session locked due to inactivity.', 'info');
        }
      }
    }, 30000);
  }

  function getQrText(item) {
    if (item.customQr && item.customQr.trim()) {
      return item.customQr.trim();
    }
    const cat = getItemCategoryLabel(item);
    switch (state.settings.qrMode) {
      case 'model-serial':
        return `${item.model} | ${item.serial}`;
      case 'full-info':
        return `Category: ${cat}\nAsset: #${item.number}\nModel: ${item.model}\nSerial: ${item.serial}`;
      case 'custom-url':
        return state.settings.urlPattern
          .replace('{serial}', encodeURIComponent(item.serial))
          .replace('{number}', encodeURIComponent(item.number))
          .replace('{model}', encodeURIComponent(item.model));
      case 'serial':
      default:
        return item.serial || 'N/A';
    }
  }

  function generateQrDataUrl(text) {
    if (qrCache.has(text)) {
      return Promise.resolve(qrCache.get(text));
    }
    return new Promise((resolve) => {
      if (window.QRCodeLib && typeof window.QRCodeLib.toDataURL === 'function') {
        window.QRCodeLib.toDataURL(text, {
          errorCorrectionLevel: 'M',
          margin: 1,
          width: 320,
          color: { dark: '#002c91', light: '#ffffff' }
        }, (err, url) => {
          if (err) {
            resolve('');
          } else {
            qrCache.set(text, url);
            resolve(url);
          }
        });
      } else {
        resolve('');
      }
    });
  }

  function getLogoSrc() {
    return state.settings.customLogo || window.AJTS_LOGO_BASE64 || 'assets/logo_clean.png';
  }

  /**
   * Redesigned Sticker Element:
   * - Enlarged, crisp logo occupying full header height
   * - Compact, clean company typography
   * - Mentions Category: DESKTOP or SCREEN directly inline with no extra spaces
   * - MODEL NO and SERIAL NO directly paired with values
   * - High-contrast, scannable QR code filling the right side
   */
  async function createStickerElement(item) {
    const card = document.createElement('div');
    card.className = 'ajts-sticker';
    card.dataset.id = item.id;
    const catLabel = getItemCategoryLabel(item);
    card.dataset.category = catLabel.toLowerCase();

    const qrText = getQrText(item);
    const qrUrl = await generateQrDataUrl(qrText);

    const logoSrc = getLogoSrc();
    const compName = escapeHtml(state.settings.companyName);
    const compSub = escapeHtml(state.settings.companySubtitle);
    const compTag = escapeHtml(state.settings.companyTagline);
    const numberText = escapeHtml(String(item.number));
    const modelText = escapeHtml(String(item.model));
    const serialText = escapeHtml(String(item.serial));

    const serialLen = String(item.serial || '').length;
    let serialSizeClass = 'serial-normal';
    if (serialLen > 18) {
      serialSizeClass = 'serial-xl';
    } else if (serialLen > 12) {
      serialSizeClass = 'serial-lg';
    } else if (serialLen > 7) {
      serialSizeClass = 'serial-md';
    }
    const isStackedSerial = serialLen > 7;

    const modelLen = String(item.model || '').length;
    let modelSizeClass = 'model-normal';
    if (modelLen > 24) {
      modelSizeClass = 'model-lg';
    } else if (modelLen > 15) {
      modelSizeClass = 'model-md';
    }
    const isStackedModel = modelLen > 10;

    const badgeClass = String(item.number).length > 2 ? 'badge-wide' : 'badge-std';

    card.innerHTML = `
      <div class="sticker-badge ${badgeClass}">${numberText}</div>
      <div class="sticker-header">
        <div class="sticker-logo">
          <img src="${logoSrc}" alt="AJTS Logo">
        </div>
        <div class="sticker-company-info">
          <div class="company-name">${compName}</div>
          <div class="company-subtitle">${compSub}</div>
          <div class="company-tagline">${compTag}</div>
        </div>
      </div>
      <div class="sticker-divider"></div>
      <div class="sticker-body">
        <div class="sticker-meta">
          <div class="meta-field meta-field-cat">
            <span class="meta-label">CATEGORY:</span>
            <span class="meta-value cat-tag-text">${catLabel}</span>
          </div>
          <div class="meta-field meta-field-model ${modelSizeClass} ${isStackedModel ? 'model-stacked' : ''}">
            <span class="meta-label">MODEL NO:</span>
            <span class="meta-value model-value" title="${modelText}">${modelText}</span>
          </div>
          <div class="meta-field meta-field-serial ${serialSizeClass} ${isStackedSerial ? 'serial-stacked' : ''}">
            <span class="meta-label">SERIAL NO:</span>
            <span class="meta-value serial-value" title="${serialText}">${serialText}</span>
          </div>
        </div>
        <div class="sticker-qr" title="Scans to: ${escapeHtml(qrText)}">
          <img src="${qrUrl}" alt="QR: ${escapeHtml(item.serial)}">
        </div>
      </div>
    `;

    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getCapacity() {
    switch (state.settings.gridFormat) {
      case 'grid-24-4x6': return 24; // 4 in a row × 6 rows (Primary Recommended)
      case 'grid-20-4x5': return 20; // 4 in a row × 5 rows
      case 'grid-16-4x4': return 16; // 4 in a row × 4 rows
      case 'grid-15': return 15;     // 3 in a row × 5 rows
      case 'grid-8': return 8;       // 2 in a row × 4 rows
      case 'grid-16': return 16;     // 2 in a row × 8 rows
      default: return 24;
    }
  }

  async function renderA4View() {
    elements.viewport.innerHTML = '';
    const items = getActiveItems();

    // If 0 stickers, show a friendly and clear empty state
    if (items.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-stickers-state no-print';
      emptyState.innerHTML = `
        <div class="empty-state-icon">📄</div>
        <h3>No Stickers in Queue</h3>
        <p>No inventory records are available to generate stickers for the selected category. You can add new items in the Master Sheet or reload demo data.</p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button id="btnEmptyLoadSample" class="btn btn-primary">
            <span>🔄</span> Load Demo Data (40 Items)
          </button>
          <button id="btnEmptyGoSheet" class="btn btn-secondary">
            <span>📊</span> Open Master Sheet
          </button>
        </div>
      `;
      elements.viewport.appendChild(emptyState);

      const btnSample = document.getElementById('btnEmptyLoadSample');
      if (btnSample) {
        btnSample.onclick = () => resetDefaultData();
      }
      const btnSheet = document.getElementById('btnEmptyGoSheet');
      if (btnSheet) {
        btnSheet.onclick = () => switchView('sheet');
      }
      return;
    }

    const container = document.createElement('div');
    container.className = 'a4-pages-container';

    if (state.settings.showCuttingGuides) {
      container.classList.add('show-cutting-guides');
    }

    const capacity = getCapacity();
    const totalPages = Math.max(1, Math.ceil(items.length / capacity));

    for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
      const pageWrapper = document.createElement('div');
      pageWrapper.className = 'a4-page-wrapper';

      let catName = 'Master (All)';
      if (state.activeTab === 'desktop') catName = 'Desktop';
      if (state.activeTab === 'screen') catName = 'Screen';

      const pageLabel = document.createElement('div');
      pageLabel.className = 'page-header-label no-print';
      pageLabel.textContent = `A4 Sheet ${pageIdx + 1} of ${totalPages} [${catName}] — 4 in a row (${capacity} stickers/sheet)`;
      pageWrapper.appendChild(pageLabel);

      const sheet = document.createElement('div');
      sheet.className = `a4-sheet ${state.settings.gridFormat}`;

      const start = pageIdx * capacity;
      const end = Math.min(start + capacity, items.length);
      const pageItems = items.slice(start, end);

      for (const item of pageItems) {
        const el = await createStickerElement(item);
        sheet.appendChild(el);
      }

      pageWrapper.appendChild(sheet);
      container.appendChild(pageWrapper);
    }

    elements.viewport.appendChild(container);
  }

  /**
   * Render Live Master Sheet (Google Sheets style):
   * Aggregates all records across Desktop and Screen categories
   * Allows live editing, category switching, row adding, deleting, and formula editing
   */
  function renderGoogleSheetView() {
    elements.viewport.innerHTML = '';
    const sheetContainer = document.createElement('div');
    sheetContainer.className = 'google-sheets-container';

    const currentTabKey = state.activeTab; // 'master' | 'desktop' | 'screen'
    const items = getActiveItems();
    const deskCount = state.sheets.desktop.length;
    const scrCount = state.sheets.screen.length;
    const totalCount = deskCount + scrCount;

    const firstItem = items[0] || {};

    sheetContainer.innerHTML = `
      <div class="sheets-top-bar">
        <div class="sheets-title-group">
          <div class="sheets-logo">田</div>
          <div class="sheets-title-text">
            <h2>AJTS Master Inventory Sheet &amp; QR Label System</h2>
            <span>Live synchronized database • Tracking ${items.length} records (${deskCount} Desktops, ${scrCount} Screens)</span>
          </div>
        </div>
        <div class="sheets-actions">
          <button id="btnSheetAddRow" class="btn btn-secondary btn-sm" title="Add a new blank item to sheet">
            <span>➕</span> Add Row
          </button>
          <button id="btnSheetResetSample" class="btn btn-secondary btn-sm" title="Reload default 40 Desktop + Screen items">
            <span>🔄</span> Reset Demo
          </button>
          <button id="btnSheetExportXlsx" class="btn btn-sheets btn-sm" title="Export genuine Microsoft Excel (.xlsx) workbook">
            <span>📊</span> Excel (.xlsx)
          </button>
          <button id="btnSheetPrint" class="btn btn-primary btn-sm" title="Switch to 4-in-a-row A4 view and print">
            <span>🖨️</span> Print Stickers (4 in a row)
          </button>
        </div>
      </div>

      <div class="sheets-formula-bar">
        <div class="sheets-cell-name" id="sheetActiveCellPos">A1</div>
        <div class="sheets-fx-label">fx</div>
        <input type="text" id="sheetFormulaInput" class="sheets-cell-input" value="${escapeHtml(firstItem.number || '')}" placeholder="Formula / Value">
      </div>

      <div class="sheets-grid-wrapper">
        <table class="sheets-table">
          <thead>
            <tr>
              <th class="col-row-idx"></th>
              <th style="width: 120px;">Category</th>
              <th style="width: 90px;">A &nbsp;(Badge #)</th>
              <th style="width: 260px;">B &nbsp;(Model Name)</th>
              <th style="width: 220px;">C &nbsp;(Serial Number)</th>
              <th>D &nbsp;(Scannable QR Status)</th>
              <th style="width: 70px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody id="sheetsGridBody">
            ${items.map((item, idx) => {
              const catLabel = getItemCategoryLabel(item);
              const isDesktop = catLabel === 'DESKTOP';
              const rawCat = isDesktop ? 'desktop' : 'screen';
              return `
                <tr data-row="${idx + 1}" data-id="${item.id}" data-cat="${rawCat}">
                  <td class="cell-row-idx">${idx + 1}</td>
                  <td>
                    <span class="cat-badge ${isDesktop ? 'cat-badge-desktop' : 'cat-badge-screen'}" data-id="${item.id}" data-cat="${rawCat}" title="Click to toggle category (Desktop / Screen)">
                      ${isDesktop ? '💻 Desktop' : '🖥️ Screen'}
                    </span>
                  </td>
                  <td>
                    <input type="text" class="sheets-cell-edit sheets-cell-badge cell-field" data-col="A" data-field="number" data-row="${idx + 1}" data-id="${item.id}" data-cat="${rawCat}" value="${escapeHtml(item.number)}">
                  </td>
                  <td>
                    <input type="text" class="sheets-cell-edit cell-field" data-col="B" data-field="model" data-row="${idx + 1}" data-id="${item.id}" data-cat="${rawCat}" value="${escapeHtml(item.model)}">
                  </td>
                  <td>
                    <input type="text" class="sheets-cell-edit cell-field" data-col="C" data-field="serial" data-row="${idx + 1}" data-id="${item.id}" data-cat="${rawCat}" value="${escapeHtml(item.serial)}">
                  </td>
                  <td>
                    <div class="sheets-cell-qr">
                      <span>📱</span>
                      <code>${escapeHtml(item.serial)}</code>
                      <span style="font-size: 0.65rem; color: #16a34a; background: #e6f4ea; padding: 1px 4px; border-radius: 4px; font-weight: 700;">OK</span>
                    </div>
                  </td>
                  <td style="text-align: center;">
                    <button class="action-icon-btn btn-sheet-del" data-id="${item.id}" data-cat="${rawCat}" title="Delete Row">🗑️</button>
                  </td>
                </tr>
              `;
            }).join('')}
            ${items.length === 0 ? `
              <tr>
                <td colspan="7" style="text-align: center; padding: 32px; color: #64748b;">
                  No records in this sheet view. Click <strong>"➕ Add Row"</strong> or <strong>"🔄 Reset Demo"</strong> above to populate.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>

      <div class="sheets-bottom-tabs-bar">
        <button class="sheets-tab-pill ${currentTabKey === 'master' ? 'active active-master' : ''}" data-tab="master">
          <span>📋 Master Sheet (All Records)</span>
          <span class="sheets-tab-badge">${totalCount} items</span>
        </button>
        <button class="sheets-tab-pill ${currentTabKey === 'desktop' ? 'active active-desktop' : ''}" data-tab="desktop">
          <span>💻 Desktop</span>
          <span class="sheets-tab-badge">${deskCount} items</span>
        </button>
        <button class="sheets-tab-pill ${currentTabKey === 'screen' ? 'active active-screen' : ''}" data-tab="screen">
          <span>🖥️ Screen</span>
          <span class="sheets-tab-badge">${scrCount} items</span>
        </button>
      </div>
    `;

    elements.viewport.appendChild(sheetContainer);
    setupSheetHandlers(sheetContainer);
  }

  function setupSheetHandlers(container) {
    const formulaInput = container.querySelector('#sheetFormulaInput');
    const cellPos = container.querySelector('#sheetActiveCellPos');
    let activeInput = null;

    container.querySelectorAll('.cell-field').forEach(input => {
      input.onfocus = () => {
        activeInput = input;
        const col = input.dataset.col;
        const row = input.dataset.row;
        cellPos.textContent = `${col}${row}`;
        formulaInput.value = input.value;
      };

      input.oninput = () => {
        formulaInput.value = input.value;
        const field = input.dataset.field;
        const cat = input.dataset.cat;
        const id = input.dataset.id;
        
        const list = state.sheets[cat];
        if (list) {
          const item = list.find(i => i.id === id);
          if (item) {
            item[field] = input.value;
            if (field === 'serial') qrCache.delete(input.value);
            renderTable();
            updateStats();
          }
        }
      };
    });

    // Toggle Category on clicking category badge in Master Sheet
    container.querySelectorAll('.cat-badge').forEach(badge => {
      badge.onclick = () => {
        const id = badge.dataset.id;
        const currentCat = badge.dataset.cat;
        const targetCat = currentCat === 'desktop' ? 'screen' : 'desktop';
        
        const list = state.sheets[currentCat];
        if (list) {
          const idx = list.findIndex(i => i.id === id);
          if (idx !== -1) {
            const [item] = list.splice(idx, 1);
            item.category = targetCat;
            state.sheets[targetCat].push(item);
            showToast(`Moved #${item.number} to ${targetCat.toUpperCase()}`, 'info');
            renderTable();
            renderGoogleSheetView();
            updateStats();
          }
        }
      };
    });

    if (formulaInput) {
      formulaInput.oninput = () => {
        if (activeInput) {
          activeInput.value = formulaInput.value;
          activeInput.dispatchEvent(new Event('input'));
        }
      };
    }

    const btnAddRow = container.querySelector('#btnSheetAddRow');
    if (btnAddRow) {
      btnAddRow.onclick = () => {
        const cat = state.activeTab === 'screen' ? 'screen' : 'desktop';
        const targetList = state.sheets[cat];
        const lastNum = parseInt(targetList[targetList.length - 1]?.number || '0', 10);
        const newNum = isNaN(lastNum) ? String(targetList.length + 1) : String(lastNum + 1);
        const defaultModel = cat === 'screen' ? 'Dell 24" P2419H' : 'Dell 3420';
        const defaultSerial = generateSampleSerial(cat);
        
        targetList.push({
          id: `${cat}-${Date.now()}`,
          number: newNum,
          model: defaultModel,
          serial: defaultSerial,
          category: cat
        });
        renderTable();
        renderGoogleSheetView();
        updateStats();
        showToast(`Added row to ${cat.toUpperCase()}`, 'success');
      };
    }

    const btnResetSample = container.querySelector('#btnSheetResetSample');
    if (btnResetSample) {
      btnResetSample.onclick = () => resetDefaultData();
    }

    const btnExportXlsx = container.querySelector('#btnSheetExportXlsx');
    if (btnExportXlsx) {
      btnExportXlsx.onclick = () => exportWorkbookXlsx();
    }

    const btnPrintSheet = container.querySelector('#btnSheetPrint');
    if (btnPrintSheet) {
      btnPrintSheet.onclick = () => {
        switchView('a4');
        setTimeout(() => window.print(), 300);
      };
    }

    container.querySelectorAll('.btn-sheet-del').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const cat = btn.dataset.cat;
        if (state.sheets[cat]) {
          state.sheets[cat] = state.sheets[cat].filter(i => i.id !== id);
          renderTable();
          renderGoogleSheetView();
          updateStats();
          showToast('Row deleted', 'info');
        }
      };
    });

    container.querySelectorAll('.sheets-tab-pill').forEach(pill => {
      pill.onclick = () => {
        setCategory(pill.dataset.tab);
        renderGoogleSheetView();
      };
    });
  }

  async function renderSingleView() {
    elements.viewport.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'single-sticker-wrapper';

    const items = getActiveItems();
    const selectedItem = items.find(i => i.id === state.selectedItemId) || items[0] || {
      id: 'preview',
      number: '01',
      model: 'Dell 3420',
      serial: '3GNGBM2',
      category: 'desktop'
    };

    const catLabel = getItemCategoryLabel(selectedItem);

    const nav = document.createElement('div');
    nav.className = 'no-print';
    nav.style.display = 'flex';
    nav.style.alignItems = 'center';
    nav.style.justifyContent = 'space-between';
    nav.style.width = '100%';
    nav.style.marginBottom = '20px';
    nav.innerHTML = `
      <div style="font-size: 0.9rem; font-weight: 700; color: #002c91;">
        Sticker #${selectedItem.number} Preview [${catLabel}]
      </div>
      <button id="btnDownloadSinglePng" class="btn btn-primary btn-sm">
        💾 Download this Sticker (PNG)
      </button>
    `;
    wrapper.appendChild(nav);

    const stickerEl = await createStickerElement(selectedItem);
    wrapper.appendChild(stickerEl);
    elements.viewport.appendChild(wrapper);

    const dlBtn = document.getElementById('btnDownloadSinglePng');
    if (dlBtn) {
      dlBtn.onclick = () => exportSingleStickerPng(selectedItem);
    }
  }

  async function renderComparisonView() {
    elements.viewport.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'comparison-view';

    const items = getActiveItems();
    const sampleItem = items[0] || {
      id: 'demo',
      number: '01',
      model: 'Dell 3420',
      serial: '3GNGBM2',
      category: 'desktop'
    };

    const cardGenerated = document.createElement('div');
    cardGenerated.className = 'comparison-card';
    cardGenerated.innerHTML = `<h4>Generated Live Sticker (Category + Large Logo)</h4>`;
    const genSticker = await createStickerElement(sampleItem);
    genSticker.style.width = '420px';
    genSticker.style.maxWidth = '90vw';
    genSticker.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
    cardGenerated.appendChild(genSticker);

    const cardOriginal = document.createElement('div');
    cardOriginal.className = 'comparison-card';
    cardOriginal.innerHTML = `<h4>Original Reference Image</h4>`;
    const origImg = document.createElement('img');
    origImg.className = 'ref-img';
    origImg.src = 'assets/reference_sticker.png';
    origImg.alt = 'Original Reference Sticker';
    origImg.style.width = '420px';
    origImg.style.maxWidth = '90vw';
    cardOriginal.appendChild(origImg);

    wrapper.appendChild(cardGenerated);
    wrapper.appendChild(cardOriginal);
    elements.viewport.appendChild(wrapper);
  }

  function updateViewport() {
    if (state.currentView === 'sheet') {
      renderGoogleSheetView();
    } else if (state.currentView === 'a4') {
      renderA4View();
    } else if (state.currentView === 'single') {
      renderSingleView();
    } else if (state.currentView === 'compare') {
      renderComparisonView();
    }
    updateStats();
  }

  function setCategory(category) {
    state.activeTab = category;
    if (elements.pillMaster) elements.pillMaster.classList.toggle('active', category === 'master');
    if (elements.pillDesktop) elements.pillDesktop.classList.toggle('active-desktop', category === 'desktop');
    if (elements.pillScreen) elements.pillScreen.classList.toggle('active-screen', category === 'screen');
    renderTable();
    updateViewport();
  }

  function updateStats() {
    const deskTotal = state.sheets.desktop.length;
    const scrTotal = state.sheets.screen.length;
    const masterTotal = deskTotal + scrTotal;

    if (elements.pillMasterCount) elements.pillMasterCount.textContent = masterTotal;
    if (elements.pillDesktopCount) elements.pillDesktopCount.textContent = deskTotal;
    if (elements.pillScreenCount) elements.pillScreenCount.textContent = scrTotal;

    const currentItems = getActiveItems();
    const total = currentItems.length;
    const capacity = getCapacity();
    const pages = Math.max(1, Math.ceil(total / capacity));

    if (elements.totalStickersCount) elements.totalStickersCount.textContent = `${total} items`;
    if (elements.statTotalCount) elements.statTotalCount.textContent = total;
    if (elements.statPagesCount) elements.statPagesCount.textContent = pages;

    if (elements.btnQuickGrid24 && elements.btnQuickGrid20 && elements.btnQuickGrid15) {
      elements.btnQuickGrid24.className = state.settings.gridFormat === 'grid-24-4x6' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
      elements.btnQuickGrid20.className = state.settings.gridFormat === 'grid-20-4x5' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
      elements.btnQuickGrid15.className = state.settings.gridFormat === 'grid-15' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
    }
  }

  function renderTable() {
    if (!elements.itemsTableBody) return;
    elements.itemsTableBody.innerHTML = '';
    const items = getActiveItems();

    items.forEach((item) => {
      const row = document.createElement('tr');
      const catLabel = getItemCategoryLabel(item);
      const isDesk = catLabel === 'DESKTOP';
      row.innerHTML = `
        <td class="td-num">#${escapeHtml(item.number)}</td>
        <td style="font-size: 0.72rem; font-weight: 700; color: ${isDesk ? '#3b82f6' : '#10b981'};">${isDesk ? '💻 Desktop' : '🖥️ Screen'}</td>
        <td><strong>${escapeHtml(item.model)}</strong></td>
        <td><code>${escapeHtml(item.serial)}</code></td>
        <td class="td-actions">
          <button class="action-icon-btn btn-view" title="Inspect this sticker" data-id="${item.id}">🔍</button>
          <button class="action-icon-btn btn-dup" title="Duplicate" data-id="${item.id}">📋</button>
          <button class="action-icon-btn btn-del" title="Delete" data-id="${item.id}">🗑️</button>
        </td>
      `;

      row.querySelector('.btn-view').onclick = () => {
        state.selectedItemId = item.id;
        switchView('single');
      };

      row.querySelector('.btn-dup').onclick = () => {
        duplicateItem(item.id);
      };

      row.querySelector('.btn-del').onclick = () => {
        deleteItem(item.id);
      };

      elements.itemsTableBody.appendChild(row);
    });
  }

  function addItem(item, targetCat) {
    const cat = targetCat || (state.activeTab === 'master' ? 'desktop' : state.activeTab);
    if (!state.sheets[cat]) state.sheets[cat] = [];
    item.category = cat;
    state.sheets[cat].push(item);
    renderTable();
    updateViewport();

    const lastNum = parseInt(item.number, 10);
    if (!isNaN(lastNum) && elements.inpNumber) {
      elements.inpNumber.value = lastNum + 1;
    }
  }

  function deleteItem(id) {
    for (const key in state.sheets) {
      state.sheets[key] = state.sheets[key].filter(i => i.id !== id);
    }
    renderTable();
    updateViewport();
    showToast('Item deleted', 'info');
  }

  function duplicateItem(id) {
    const items = getActiveItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    const num = parseInt(item.number, 10);
    const newNumber = !isNaN(num) ? String(num + 1) : `${item.number}-copy`;
    const newItem = {
      ...item,
      id: String(Date.now() + Math.random()),
      number: newNumber
    };
    addItem(newItem, item.category || 'desktop');
    showToast(`Sticker #${newItem.number} added`, 'success');
  }

  function switchView(viewName) {
    state.currentView = viewName;
    if (elements.viewSheetBtn) elements.viewSheetBtn.classList.toggle('active-sheet', viewName === 'sheet');
    if (elements.viewA4Btn) elements.viewA4Btn.classList.toggle('active', viewName === 'a4');
    if (elements.viewSingleBtn) elements.viewSingleBtn.classList.toggle('active', viewName === 'single');
    if (elements.viewCompareBtn) elements.viewCompareBtn.classList.toggle('active', viewName === 'compare');
    updateViewport();
  }

  function resetDefaultData() {
    state.sheets.desktop = JSON.parse(JSON.stringify(DEFAULT_DESKTOP_ITEMS));
    state.sheets.screen = JSON.parse(JSON.stringify(DEFAULT_SCREEN_ITEMS));
    renderTable();
    updateViewport();
    showToast('Reset data to 20 Desktop + 20 Screen demo records!', 'success');
  }

  function initEvents() {
    // Header Actions
    if (elements.btnPrint) {
      elements.btnPrint.onclick = () => {
        switchView('a4');
        setTimeout(() => window.print(), 350);
      };
    }

    if (elements.btnExportXlsx) {
      elements.btnExportXlsx.onclick = () => exportWorkbookXlsx();
    }

    if (elements.btnExportZip) {
      elements.btnExportZip.onclick = () => exportAllZip();
    }

    if (elements.btnLoadSample) {
      elements.btnLoadSample.onclick = () => resetDefaultData();
    }

    if (elements.btnClearAll) {
      elements.btnClearAll.onclick = () => {
        if (confirm('Clear all items in current category?')) {
          if (state.activeTab === 'master') {
            state.sheets.desktop = [];
            state.sheets.screen = [];
          } else if (state.sheets[state.activeTab]) {
            state.sheets[state.activeTab] = [];
          }
          renderTable();
          updateViewport();
          showToast('Cleared all items', 'info');
        }
      };
    }

    // Category Selector Pills in Header
    if (elements.pillMaster) {
      elements.pillMaster.onclick = () => setCategory('master');
    }
    if (elements.pillDesktop) {
      elements.pillDesktop.onclick = () => setCategory('desktop');
    }
    if (elements.pillScreen) {
      elements.pillScreen.onclick = () => setCategory('screen');
    }

    // View Selector Toolbar
    if (elements.viewSheetBtn) {
      elements.viewSheetBtn.onclick = () => switchView('sheet');
    }
    if (elements.viewA4Btn) {
      elements.viewA4Btn.onclick = () => switchView('a4');
    }
    if (elements.viewSingleBtn) {
      elements.viewSingleBtn.onclick = () => switchView('single');
    }
    if (elements.viewCompareBtn) {
      elements.viewCompareBtn.onclick = () => switchView('compare');
    }

    // Quick Grid Layout Presets
    if (elements.btnQuickGrid24) {
      elements.btnQuickGrid24.onclick = () => {
        state.settings.gridFormat = 'grid-24-4x6';
        if (elements.selectGrid) elements.selectGrid.value = 'grid-24-4x6';
        updateStats();
        if (state.currentView === 'a4') renderA4View();
      };
    }

    if (elements.btnQuickGrid20) {
      elements.btnQuickGrid20.onclick = () => {
        state.settings.gridFormat = 'grid-20-4x5';
        if (elements.selectGrid) elements.selectGrid.value = 'grid-20-4x5';
        updateStats();
        if (state.currentView === 'a4') renderA4View();
      };
    }

    if (elements.btnQuickGrid15) {
      elements.btnQuickGrid15.onclick = () => {
        state.settings.gridFormat = 'grid-15';
        if (elements.selectGrid) elements.selectGrid.value = 'grid-15';
        updateStats();
        if (state.currentView === 'a4') renderA4View();
      };
    }

    // Tab buttons in Sidebar
    elements.tabButtons.forEach(btn => {
      btn.onclick = () => {
        elements.tabButtons.forEach(b => b.classList.remove('active'));
        elements.tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      };
    });

    // Single Item Form Submission
    if (elements.singleForm) {
      elements.singleForm.onsubmit = (e) => {
        e.preventDefault();
        const number = elements.inpNumber.value.trim();
        const model = elements.inpModel.value.trim();
        const serial = elements.inpSerial.value.trim();
        const customQr = elements.inpCustomQr.value.trim();
        const category = elements.inpCategory ? elements.inpCategory.value : 'desktop';

        if (!number || !model || !serial) {
          alert('Please fill out Badge #, Model, and Serial.');
          return;
        }

        const newItem = {
          id: `${category}-${Date.now()}`,
          number,
          model,
          serial,
          category,
          customQr: customQr || null
        };

        addItem(newItem, category);
        showToast(`Sticker #${number} added to ${category.toUpperCase()}!`, 'success');

        elements.inpSerial.value = generateSampleSerial(category);
        elements.inpCustomQr.value = '';
      };
    }

    if (elements.inpCategory) {
      elements.inpCategory.onchange = () => {
        const cat = elements.inpCategory.value;
        if (cat === 'screen') {
          if (elements.inpModel && (elements.inpModel.value === 'Dell 3420' || !elements.inpModel.value)) {
            elements.inpModel.value = 'Dell 24" P2419H';
          }
          elements.inpSerial.value = generateScreenSerialTag();
          elements.inpSerial.placeholder = 'e.g. CN-0K7M2L-74261-987-1234';
        } else {
          if (elements.inpModel && (elements.inpModel.value === 'Dell 24" P2419H' || !elements.inpModel.value)) {
            elements.inpModel.value = 'Dell 3420';
          }
          elements.inpSerial.value = generateDellServiceTag();
          elements.inpSerial.placeholder = 'e.g. 3GNGBM2';
        }
      };
    }

    if (elements.bulkTargetTab) {
      elements.bulkTargetTab.onchange = () => {
        const cat = elements.bulkTargetTab.value;
        if (cat === 'screen') {
          if (elements.bulkModel && elements.bulkModel.value === 'Dell 3420') {
            elements.bulkModel.value = 'Dell 24" P2419H';
          }
        } else {
          if (elements.bulkModel && elements.bulkModel.value === 'Dell 24" P2419H') {
            elements.bulkModel.value = 'Dell 3420';
          }
        }
      };
    }

    // Bulk Serial Mode Switcher in Range Form
    if (elements.bulkSerialMode) {
      elements.bulkSerialMode.onchange = () => {
        const val = elements.bulkSerialMode.value;
        if (elements.prefixGroup) elements.prefixGroup.style.display = val === 'prefix' ? 'grid' : 'none';
        if (elements.listGroup) elements.listGroup.style.display = val === 'list' ? 'block' : 'none';
      };
    }

    // Bulk Range Form Submission
    if (elements.rangeForm) {
      elements.rangeForm.onsubmit = (e) => {
        e.preventDefault();
        const targetCat = elements.bulkTargetTab.value || 'desktop';
        const model = elements.bulkModel.value.trim();
        const start = parseInt(elements.bulkStartNum.value, 10);
        const end = parseInt(elements.bulkEndNum.value, 10);
        const pad = elements.bulkPadZeroes.checked;
        const serialMode = elements.bulkSerialMode.value;

        if (isNaN(start) || isNaN(end) || start > end) {
          alert('Please enter valid Start and End numbers.');
          return;
        }

        let serialsList = [];
        if (serialMode === 'list') {
          serialsList = elements.bulkSerialList.value.trim().split(/\r?\n/).filter(Boolean);
        }

        const newItems = [];
        let prefixStart = parseInt(elements.bulkSerialStart.value, 10) || 1001;
        const prefix = elements.bulkSerialPrefix.value.trim();

        for (let i = start; i <= end; i++) {
          let numStr = String(i);
          if (pad && i < 10) numStr = '0' + numStr;

          let sNumber = '';
          if (serialMode === 'random') {
            sNumber = generateSampleSerial(targetCat);
          } else if (serialMode === 'prefix') {
            sNumber = `${prefix}${prefixStart++}`;
          } else if (serialMode === 'list') {
            const listIdx = i - start;
            sNumber = serialsList[listIdx] || generateSampleSerial(targetCat);
          }

          newItems.push({
            id: `${targetCat}-${Date.now()}-${i}`,
            number: numStr,
            model: model,
            serial: sNumber,
            category: targetCat
          });
        }

        if (!state.sheets[targetCat]) state.sheets[targetCat] = [];
        state.sheets[targetCat].push(...newItems);
        setCategory(targetCat);
        showToast(`Generated ${newItems.length} stickers for ${targetCat.toUpperCase()}!`, 'success');
      };
    }

    // Bulk Textarea / CSV Import
    if (elements.bulkPasteForm) {
      elements.bulkPasteForm.onsubmit = (e) => {
        e.preventDefault();
        const targetCat = elements.pasteTargetTab.value || 'desktop';
        const text = elements.bulkTextarea.value.trim();
        parseBulkText(text, targetCat);
      };
    }

    // Dropzone for CSV
    if (elements.dropZone && elements.csvFileInput) {
      elements.dropZone.onclick = () => elements.csvFileInput.click();

      elements.dropZone.ondragover = (e) => {
        e.preventDefault();
        elements.dropZone.style.borderColor = '#3b82f6';
      };

      elements.dropZone.ondragleave = () => {
        elements.dropZone.style.borderColor = 'var(--border-surface)';
      };

      elements.dropZone.ondrop = (e) => {
        e.preventDefault();
        elements.dropZone.style.borderColor = 'var(--border-surface)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          readCsvFile(e.dataTransfer.files[0]);
        }
      };

      elements.csvFileInput.onchange = () => {
        if (elements.csvFileInput.files && elements.csvFileInput.files[0]) {
          readCsvFile(elements.csvFileInput.files[0]);
        }
      };
    }

    // Settings Listeners
    if (elements.selectGrid) {
      elements.selectGrid.onchange = () => {
        state.settings.gridFormat = elements.selectGrid.value;
        updateStats();
        if (state.currentView === 'a4') renderA4View();
      };
    }

    if (elements.checkCuttingGuides) {
      elements.checkCuttingGuides.onchange = () => {
        state.settings.showCuttingGuides = elements.checkCuttingGuides.checked;
        if (state.currentView === 'a4') renderA4View();
      };
    }

    if (elements.selectQrMode) {
      elements.selectQrMode.onchange = () => {
        state.settings.qrMode = elements.selectQrMode.value;
        if (elements.urlPatternGroup) {
          elements.urlPatternGroup.style.display = state.settings.qrMode === 'custom-url' ? 'block' : 'none';
        }
        qrCache.clear();
        updateViewport();
      };
    }

    if (elements.inpUrlPattern) {
      elements.inpUrlPattern.oninput = () => {
        state.settings.urlPattern = elements.inpUrlPattern.value.trim();
        qrCache.clear();
        updateViewport();
      };
    }

    if (elements.inpCompName) {
      elements.inpCompName.oninput = () => {
        state.settings.companyName = elements.inpCompName.value.trim();
        updateViewport();
      };
    }

    if (elements.inpCompSub) {
      elements.inpCompSub.oninput = () => {
        state.settings.companySubtitle = elements.inpCompSub.value.trim();
        updateViewport();
      };
    }

    if (elements.inpCompTag) {
      elements.inpCompTag.oninput = () => {
        state.settings.companyTagline = elements.inpCompTag.value.trim();
        updateViewport();
      };
    }

    if (elements.logoFileInput) {
      elements.logoFileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            state.settings.customLogo = evt.target.result;
            updateViewport();
            showToast('Custom logo applied!', 'success');
          };
          reader.readAsDataURL(file);
        }
      };
    }

    if (elements.btnResetLogo) {
      elements.btnResetLogo.onclick = () => {
        state.settings.customLogo = null;
        if (elements.logoFileInput) elements.logoFileInput.value = '';
        updateViewport();
        showToast('Logo reset to default AJTS logo', 'info');
      };
    }
  }

  function readCsvFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const targetCat = elements.pasteTargetTab.value || 'desktop';
      parseBulkText(text, targetCat);
    };
    reader.readAsText(file);
  }

  function generateDellServiceTag() {
    const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 7; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  }

  function generateScreenSerialTag() {
    const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const randChars = (len) => Array.from({ length: len }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    const randDigits = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
    return `CN-0${randChars(5)}-74261-${randDigits(3)}-${randDigits(4)}`;
  }

  function generateSampleSerial(cat = 'desktop') {
    return cat === 'screen' ? generateScreenSerialTag() : generateDellServiceTag();
  }

  function parseBulkText(text, targetTab = 'desktop') {
    if (!text || !text.trim()) {
      alert('Please enter or paste data first.');
      return;
    }

    const lines = text.trim().split(/\r?\n/);
    const newItems = [];
    const targetList = state.sheets[targetTab] || state.sheets.desktop;
    let startNum = targetList.length + 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (i === 0 && (line.toLowerCase().startsWith('number') || line.toLowerCase().startsWith('model') || line.toLowerCase().startsWith('sr') || line.toLowerCase().startsWith('badge'))) {
        continue;
      }

      let parts = [];
      if (line.includes('\t')) {
        parts = line.split('\t').map(p => p.trim());
      } else if (line.includes(',')) {
        parts = line.split(',').map(p => p.trim());
      } else if (line.includes('|')) {
        parts = line.split('|').map(p => p.trim());
      } else {
        parts = line.split(/\s+/).map(p => p.trim());
      }

      if (parts.length >= 3) {
        newItems.push({
          id: `${targetTab}-${Date.now()}-${i}`,
          number: parts[0] || String(startNum++),
          model: parts[1] || 'Dell 3420',
          serial: parts[2] || generateSampleSerial(targetTab),
          category: targetTab
        });
      } else if (parts.length === 2) {
        newItems.push({
          id: `${targetTab}-${Date.now()}-${i}`,
          number: String(startNum++),
          model: parts[0],
          serial: parts[1],
          category: targetTab
        });
      } else if (parts.length === 1 && parts[0]) {
        newItems.push({
          id: `${targetTab}-${Date.now()}-${i}`,
          number: String(startNum++),
          model: targetTab === 'screen' ? 'Dell 24" P2419H' : 'Dell 3420',
          serial: parts[0],
          category: targetTab
        });
      }
    }

    if (newItems.length > 0) {
      targetList.push(...newItems);
      setCategory(targetTab);
      showToast(`Imported ${newItems.length} items to ${targetTab.toUpperCase()}!`, 'success');
    } else {
      alert('Could not parse items from input.');
    }
  }

  /**
   * Export genuine Multi-Tab Microsoft Excel (.xlsx) Workbook:
   * 1. Master Sheet (All Records)
   * 2. Desktop
   * 3. Screen
   */
  function exportWorkbookXlsx() {
    if (!window.XLSXLib) {
      alert('Excel export library loading...');
      return;
    }

    const wb = window.XLSXLib.utils.book_new();

    // Sheet 1: Master Sheet (All Records)
    const allRecords = [];
    state.sheets.desktop.forEach(i => allRecords.push({ ...i, catName: 'Desktop' }));
    state.sheets.screen.forEach(i => allRecords.push({ ...i, catName: 'Screen' }));

    const masterData = allRecords.map((i, idx) => ({
      'Row #': idx + 1,
      'Hardware Category': i.catName,
      'Badge Number': i.number,
      'Model Name': i.model,
      'Serial Number': i.serial,
      'QR Content': getQrText(i)
    }));
    const wsMaster = window.XLSXLib.utils.json_to_sheet(masterData);
    window.XLSXLib.utils.book_append_sheet(wb, wsMaster, 'Master Sheet (All Records)');

    // Sheet 2: Desktop
    const deskData = state.sheets.desktop.map(i => ({
      'Badge Number': i.number,
      'Model Name': i.model,
      'Serial Number': i.serial,
      'QR Content': getQrText(i)
    }));
    const wsDesk = window.XLSXLib.utils.json_to_sheet(deskData);
    window.XLSXLib.utils.book_append_sheet(wb, wsDesk, 'Desktop');

    // Sheet 3: Screen
    const scrData = state.sheets.screen.map(i => ({
      'Badge Number': i.number,
      'Model Name': i.model,
      'Serial Number': i.serial,
      'QR Content': getQrText(i)
    }));
    const wsScr = window.XLSXLib.utils.json_to_sheet(scrData);
    window.XLSXLib.utils.book_append_sheet(wb, wsScr, 'Screen');

    window.XLSXLib.writeFile(wb, `AJTS_Master_Inventory_${Date.now()}.xlsx`);
    showToast('Downloaded genuine 3-Tab Excel (.xlsx) workbook!', 'success');
  }

  /**
   * High-Resolution Canvas Rendering for Single Download & ZIP Export
   * Replicating the exact reference sticker layout:
   * - Large, prominent logo
   * - Inline CATEGORY (DESKTOP / SCREEN)
   * - Inline MODEL NO and SERIAL NO
   * - Zero wasted spacing
   * - Crisp QR code filling the right side
   */
  async function renderStickerToCanvas(item, width = 1024, height = 700) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const catLabel = getItemCategoryLabel(item);

    // Clean White Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Outer Border
    const borderWidth = 12;
    const radius = 50;
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = '#002c91';
    
    const x = borderWidth / 2;
    const y = borderWidth / 2;
    const w = width - borderWidth;
    const h = height - borderWidth;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();

    // Top-Right Badge
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();

    const numStr = String(item.number);
    const badgeW = numStr.length > 2 ? 180 : 150;
    const badgeH = 110;
    const badgeRadius = 38;
    ctx.fillStyle = '#002c91';
    ctx.beginPath();
    ctx.moveTo(width - badgeW, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, badgeH);
    ctx.lineTo(width - badgeW + badgeRadius, badgeH);
    ctx.quadraticCurveTo(width - badgeW, badgeH, width - badgeW, badgeH - badgeRadius);
    ctx.lineTo(width - badgeW, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    const numFont = numStr.length > 3 ? 46 : (numStr.length > 2 ? 54 : 64);
    ctx.font = `bold ${numFont}px Montserrat, Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(numStr, width - (badgeW / 2) + 2, badgeH / 2);

    ctx.restore();

    // Large, Prominent Logo
    const logoImg = new Image();
    logoImg.src = getLogoSrc();
    await new Promise(r => {
      if (logoImg.complete) r();
      else logoImg.onload = r;
    });
    const logoSize = 220;
    ctx.drawImage(logoImg, 45, 35, logoSize, logoSize);

    // Company Information
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.fillStyle = '#002c91';
    ctx.font = '900 96px Montserrat, Inter, sans-serif';
    ctx.fillText(state.settings.companyName || 'AJTS', 285, 45);

    ctx.fillStyle = '#0e1726';
    ctx.font = '800 52px Montserrat, Inter, sans-serif';
    ctx.fillText(state.settings.companySubtitle || 'COMPUTERS', 287, 142);

    ctx.fillStyle = '#0e1726';
    ctx.font = '700 34px Inter, sans-serif';
    drawTextWithSpacing(ctx, state.settings.companyTagline || 'RENTAL SERVICES', 289, 206, 3.5);

    // Divider Line
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(45, 270);
    ctx.lineTo(width - 45, 270);
    ctx.stroke();

    // Body Meta: Category, Model, and Managed Serial Number
    const qrSize = 380;
    const qrX = width - qrSize - 45; // 599
    const qrY = 295;
    const maxTextX = qrX - 25; // 574

    // 1. Category
    ctx.fillStyle = '#002c91';
    ctx.font = '800 34px Montserrat, Inter, sans-serif';
    ctx.fillText('CATEGORY:', 48, 305);

    ctx.fillStyle = '#002c91';
    ctx.font = '900 42px Inter, sans-serif';
    ctx.fillText(catLabel, 260, 298);

    // 2. Model No. (moves to another line if not enough space, ensuring full text)
    const modelStr = String(item.model || '');
    const isStackedModel = modelStr.length > 10;

    ctx.fillStyle = '#002c91';
    ctx.font = '800 32px Montserrat, Inter, sans-serif';

    if (!isStackedModel) {
      // Short model: draw side-by-side
      ctx.fillText('MODEL NO:', 48, 385);
      ctx.fillStyle = '#000000';
      let modelFont = 44;
      ctx.font = `800 ${modelFont}px Inter, sans-serif`;
      while (ctx.measureText(modelStr).width > (maxTextX - 260) && modelFont > 24) {
        modelFont -= 2;
        ctx.font = `800 ${modelFont}px Inter, sans-serif`;
      }
      ctx.fillText(modelStr, 260, 385 - (modelFont - 32) / 2);
    } else {
      // Large model: move to another line with full width
      ctx.fillText('MODEL NO:', 48, 365);
      ctx.fillStyle = '#000000';
      const availableW = maxTextX - 48; // 526px
      let modelFont = 42;
      if (modelStr.length > 20) modelFont = 34;
      else if (modelStr.length > 15) modelFont = 38;

      ctx.font = `800 ${modelFont}px Inter, sans-serif`;
      while (ctx.measureText(modelStr).width > availableW && modelFont > 22) {
        modelFont -= 2;
        ctx.font = `800 ${modelFont}px Inter, sans-serif`;
      }
      ctx.fillText(modelStr, 48, 406);
    }

    // 3. Serial No. (moves below label if large number, ensuring full display without cutoff)
    const serialStr = String(item.serial || '');
    const isStackedSerial = serialStr.length > 7;

    ctx.fillStyle = '#002c91';
    ctx.font = '800 32px Montserrat, Inter, sans-serif';

    if (!isStackedSerial) {
      // Short serial: draw side-by-side
      const serialY = isStackedModel ? 475 : 485;
      ctx.fillText('SERIAL NO:', 48, serialY);
      ctx.fillStyle = '#000000';
      let serialFont = 44;
      ctx.font = `800 ${serialFont}px Inter, sans-serif`;
      while (ctx.measureText(serialStr).width > (maxTextX - 260) && serialFont > 24) {
        serialFont -= 2;
        ctx.font = `800 ${serialFont}px Inter, sans-serif`;
      }
      ctx.fillText(serialStr, 260, serialY - (serialFont - 32) / 2);
    } else {
      // Large serial number: move below label with full available width
      const serialLabelY = isStackedModel ? 460 : 470;
      const serialValY = isStackedModel ? 502 : 520;
      ctx.fillText('SERIAL NO:', 48, serialLabelY);
      
      ctx.fillStyle = '#000000';
      const availableW = maxTextX - 48; // 526px
      let serialFont = 40;
      if (serialStr.length > 20) serialFont = 30;
      else if (serialStr.length > 14) serialFont = 34;

      ctx.font = `800 ${serialFont}px Inter, sans-serif`;
      while (ctx.measureText(serialStr).width > availableW && serialFont > 22) {
        serialFont -= 2;
        ctx.font = `800 ${serialFont}px Inter, sans-serif`;
      }

      if (ctx.measureText(serialStr).width > availableW) {
        // Very long serial: wrap cleanly across two lines
        const mid = Math.ceil(serialStr.length / 2);
        const line1 = serialStr.substring(0, mid);
        const line2 = serialStr.substring(mid);
        ctx.font = '800 24px Inter, sans-serif';
        ctx.fillText(line1, 48, serialValY);
        ctx.fillText(line2, 48, serialValY + 32);
      } else {
        ctx.fillText(serialStr, 48, serialValY);
      }
    }

    // Scannable QR Code filling right side
    const qrText = getQrText(item);
    const qrDataUrl = await generateQrDataUrl(qrText);
    const qrImg = new Image();
    qrImg.src = qrDataUrl;
    await new Promise(r => {
      if (qrImg.complete) r();
      else qrImg.onload = r;
    });

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    return canvas;
  }

  function drawTextWithSpacing(ctx, text, x, y, spacing) {
    let curX = x;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      ctx.fillText(char, curX, y);
      curX += ctx.measureText(char).width + spacing;
    }
  }

  async function exportSingleStickerPng(item) {
    showToast('Generating high-res PNG...', 'info');
    const canvas = await renderStickerToCanvas(item);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeSerial = String(item.serial).replace(/[\/\\?%*:|"<>]/g, '_');
      a.download = `Sticker_${item.number}_${safeSerial}.png`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Downloaded Sticker #${item.number} PNG!`, 'success');
    });
  }

  async function exportAllZip() {
    const items = getActiveItems();
    if (items.length === 0) {
      alert('No stickers to export.');
      return;
    }

    if (!window.JSZipLib) {
      alert('ZIP library not loaded.');
      return;
    }

    showToast(`Generating ${items.length} high-res stickers for ZIP...`, 'info');
    const zip = new window.JSZipLib();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const canvas = await renderStickerToCanvas(item);
      const dataUrl = canvas.toDataURL('image/png');
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const safeSerial = String(item.serial).replace(/[\/\\?%*:|"<>]/g, '_');
      const filename = `Sticker_${String(item.number).padStart(3, '0')}_${safeSerial}.png`;
      zip.file(filename, base64Data, { base64: true });
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AJTS_Stickers_${state.activeTab}_${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded ZIP containing all sticker PNGs!', 'success');
  }

  // Application Entry Point
  document.addEventListener('DOMContentLoaded', () => {
    initDomElements();
    initAuthModule();
    initEvents();
    renderTable();
    updateViewport(); // Starts in Master Sheet view as configured in state
  });

})();
