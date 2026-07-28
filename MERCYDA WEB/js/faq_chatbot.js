/*!
 * FAQ Chatbot Widget — MERCYDA'Z GPS Support
 * ---------------------------------------------------------------
 * Drop this file in after your existing #faqBtn markup:
 *   <script src="./faq-chatbot.js"></script>
 *
 * It hooks into the existing #faqBtn element (no HTML changes needed),
 * builds a chat panel on click. Tap-to-browse only — no free-text input.
 * ---------------------------------------------------------------
 */
(function () {
  "use strict";

  // ── 1. FAQ KNOWLEDGE BASE ────────────────────────────────────────
  const FAQ_DATA = [
    // General GPS Device & App Usage
    { category: "General", q: "Is it mandatory to install a GPS device in cars?", a: "It depends on your region and vehicle type. In many regions, it is mandatory for commercial vehicles as per transport regulations." },
    { category: "General", q: "Do I need internet to use the GPS tracking system?", a: "Yes. A stable internet connection is required to view live location and reports through the app." },
    { category: "General", q: "How can I track my vehicle in real time?", a: "Log in to the MERCYDA'Z app and select your vehicle to view its live location on the map." },
    { category: "General", q: "Can I monitor multiple vehicles at once using a single account?", a: "Yes. You can track multiple vehicles if they are registered under the same account." },
    { category: "General", q: "How do I connect my GPS device to the MERCYDA'Z mobile app?", a: "Download the app, log in with your credentials, and your registered devices will appear automatically." },
    { category: "General", q: "What should I do if the device is not showing my vehicle location?", a: "Check if the device has power, GPS signal, and mobile network coverage. Restart if needed. Contact support if the issue continues." },
    { category: "General", q: "How can I reset or restart my GPS device?", a: "Most devices have a reset button. Refer to the manual or contact support." },
    { category: "General", q: "Who can access my GPS data?", a: "Only you and authorized users with your login credentials." },
    { category: "General", q: "What happens to my data if I uninstall the app?", a: "Your data stays on our servers. Reinstall the app and log in to access it again." },
    { category: "General", q: "Does the GPS device work when the vehicle is off?", a: "Yes, if it is connected to a constant power source. Otherwise, tracking pauses." },
    { category: "General", q: "Does it work in rural or remote areas?", a: "Yes, as long as GPS satellite and mobile network coverage are available." },
    { category: "General", q: "What happens if there's no internet or GPS signal?", a: "The device stores data and sends it once the connection is restored." },
    { category: "General", q: "Can the same device be transferred to another vehicle?", a: "Yes, but reinstallation and configuration are required." },
    { category: "General", q: "Does the GPS device affect the vehicle's battery?", a: "No, it consumes minimal power and has negligible effect." },
    { category: "General", q: "How accurate is the location tracking in the application?", a: "Accuracy depends on GPS and network quality; usually within 100–500 meters." },
    { category: "General", q: "How effective is the route optimization in the app?", a: "The app provides efficient route mapping and trip playback for better travel planning." },
    { category: "General", q: "How easy is it to monitor all vehicles/assets in real time?", a: "Very easy. The dashboard gives a live view of all linked vehicles with alerts." },

    // Login & Account Management
    { category: "Account", q: "I forgot my password. How can I reset it?", a: "Use the \u201cForgot Password\u201d option on the login screen." },
    { category: "Account", q: "How can I change my phone number or email address?", a: "Contact customer support." },
    { category: "Account", q: "Can I log in from multiple devices?", a: "Yes, you can use your credentials on multiple devices." },
    { category: "Account", q: "How can I log out of the app?", a: "Use the logout option at the top right corner." },

    // Reports, History & Alerts
    { category: "Reports", q: "Can I view past trips or route history?", a: "Yes, in the History or Reports section of the app." },
    { category: "Reports", q: "How can I download or export route history or reports?", a: "Export from the Reports tab in Excel or PDF." },
    { category: "Reports", q: "How do I take daily or monthly reports?", a: "Choose the vehicle and date range in the Reports section, then select the type." },
    { category: "Reports", q: "How do I get trip or fuel reports?", a: "Trip reports are available in the app. Fuel reports depend on device compatibility." },
    { category: "Reports", q: "How many days of history or reports are stored in the app?", a: "Up to 90 days, depending on your plan." },
    { category: "Reports", q: "Can I set up a notification when the vehicle enters a specific area (Geo-fence)?", a: "Yes, if your device supports it. Contact support for setup." },
    { category: "Reports", q: "How do I receive alerts or notifications?", a: "Enable notifications in the app and your phone settings." },
    { category: "Reports", q: "What all alerts will be shown in the app?", a: "Alerts include over-speeding, idling, ignition on/off, power disconnect, and more." },
    { category: "Reports", q: "How do I set up speed alerts or due dates?", a: "Contact customer support." },
    { category: "Reports", q: "Can I get reports for distance, over-speed, ignition, SOS, etc.?", a: "Yes, depending on device features." },
    { category: "Reports", q: "What does the word \"Idle\" indicate in the app?", a: "It means the vehicle is on but not moving." },

    // Subscription & Recharge
    { category: "Subscription", q: "How can I renew or recharge my GPS service?", a: "You can recharge via the app, website, or by contacting support." },
    { category: "Subscription", q: "Can I renew from the app itself?", a: "Yes, through the recharge option under your device info." },
    { category: "Subscription", q: "Is there a monthly or yearly subscription?", a: "Yes. Yearly plans are most common. Monthly is available if required, usually for compliance with government expiry dates." },
    { category: "Subscription", q: "What are the available service plans?", a: "They vary by duration and features. Check in the app or contact support." },
    { category: "Subscription", q: "Will expired recharges be shown in the app?", a: "Yes, your subscription status is displayed." },
    { category: "Subscription", q: "How do I check recharge validity?", a: "Check the device info or subscription section in the app." },

    // App Functionality & Troubleshooting
    { category: "Troubleshooting", q: "What should I do if tracking is not showing in the app?", a: "Ensure the device has power and signal. Restart it. Contact support if the issue persists." },
    { category: "Troubleshooting", q: "Why is the location showing incorrectly or delayed?", a: "Likely due to poor GPS or mobile signal. Move the vehicle to an open area." },
    { category: "Troubleshooting", q: "Is the location shown in the app real-time?", a: "Yes, updated every few seconds depending on plan and signal." },
    { category: "Troubleshooting", q: "Why are some features not working in the app?", a: "Ensure your app is updated and your device supports those features." },
    { category: "Troubleshooting", q: "How do I select a specific vehicle when taking reports?", a: "Go to Reports, select the vehicle, and choose report type." },
    { category: "Troubleshooting", q: "How are alerts displayed in the app?", a: "As push notifications and inside the alerts section." },
    { category: "Troubleshooting", q: "Is there a demo video for using the app?", a: "Yes, available through customer support." },
    { category: "Troubleshooting", q: "What is \"Play Back\" and why is it not working?", a: "Playback shows past trip movement. If it doesn\u2019t work, check if data exists for the selected period." },
    { category: "Troubleshooting", q: "How can I enable notifications if I\u2019m not receiving them?", a: "Check both app and phone notification settings and grant permission." },

    // Support & Feedback
    { category: "Support", q: "How do I contact customer support?", a: "Call, email, or use the support option in the app." },
    { category: "Support", q: "How do I contact customer support through the app?", a: "Go to the Help/Support section and choose your preferred contact method." },
    { category: "Support", q: "How do you rate the real-time tracking feature?", a: "It is highly rated for accuracy and speed." },
    { category: "Support", q: "What type of activities do users typically use the GPS app for?", a: "Fleet tracking, personal vehicle monitoring, school transport, delivery, and logistics." },
  ];

  const CATEGORIES = ["General", "Account", "Reports", "Subscription", "Troubleshooting", "Support"];

  const GREETING =
    "Hi! I'm the MERCYDA'Z support assistant. Tap a topic below to see common questions and answers.";

  // ── 2. STYLES ─────────────────────────────────────────────────────
  const STYLE = `
    .faqc-panel * { box-sizing: border-box; }
    .faqc-panel {
      position: fixed;
      z-index: 99999;
      right: 24px;
      bottom: 96px;
      width: 360px;
      max-width: calc(100vw - 32px);
      height: 520px;
      max-height: calc(100vh - 140px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25), 0 2px 8px rgba(15,23,42,0.08);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      opacity: 0;
      transform: translateY(16px) scale(0.98);
      pointer-events: none;
      transition: opacity 0.18s ease, transform 0.18s ease;
    }
    .faqc-panel.faqc-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .faqc-header {
      background: linear-gradient(135deg, #0f766e, #0891b2);
      color: #fff;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .faqc-header-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    .faqc-header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .faqc-header-text { flex: 1; min-width: 0; }
    .faqc-header-title { font-weight: 700; font-size: 14.5px; line-height: 1.3; }
    .faqc-header-sub { font-size: 12px; opacity: 0.85; margin-top: 1px; }
    .faqc-close-btn {
      background: rgba(255,255,255,0.15);
      border: none; color: #fff; width: 28px; height: 28px;
      border-radius: 50%; cursor: pointer; font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background 0.15s;
    }
    .faqc-close-btn:hover { background: rgba(255,255,255,0.3); }

    .faqc-body {
      flex: 1;
      overflow-y: auto;
      padding: 14px 14px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f8fafc;
    }
    .faqc-msg { max-width: 86%; font-size: 13.5px; line-height: 1.45; }
    .faqc-msg-bot {
      align-self: flex-start;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      color: #1e293b;
      padding: 10px 13px;
      border-radius: 4px 14px 14px 14px;
    }
    .faqc-msg-user {
      align-self: flex-end;
      background: #0f766e;
      color: #fff;
      padding: 10px 13px;
      border-radius: 14px 4px 14px 14px;
    }
    .faqc-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 2px;
    }
    .faqc-chip {
      border: 1px solid #cbd5e1;
      background: #fff;
      color: #0f766e;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 10px;
      border-radius: 999px;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      white-space: nowrap;
    }
    .faqc-chip:hover { background: #ecfdf5; border-color: #0f766e; }
    .faqc-chip.faqc-chip-back {
      color: #64748b;
      border-color: #cbd5e1;
    }

    .faqc-suggest-list { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .faqc-suggest-item {
      text-align: left;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px 11px;
      font-size: 13px;
      color: #0f172a;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
    }
    .faqc-suggest-item:hover { border-color: #0f766e; background: #f0fdfa; }

    .faqc-contact-note {
      font-size: 11.5px;
      color: #64748b;
      text-align: center;
      padding: 10px 10px;
      border-top: 1px solid #e2e8f0;
      flex-shrink: 0;
      background: #fff;
    }

    #faqBtn { cursor: pointer; }

    @media (max-width: 480px) {
      .faqc-panel {
        right: 12px;
        left: 12px;
        width: auto;
        bottom: 86px;
        height: 70vh;
      }
    }
  `;

  // ── 3. HELPERS ─────────────────────────────────────────────────────
  function injectStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-faqc-style", "true");
    style.textContent = STYLE;
    document.head.appendChild(style);
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ── 4. WIDGET BUILD ───────────────────────────────────────────────
  function buildWidget() {
    const panel = el("div", "faqc-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "MERCYDA'Z support chat");

    // Header
    const header = el("div", "faqc-header");
    header.innerHTML = `
      <div class="faqc-header-avatar">
        <img src="./assets/faq_logo.png" alt="MERCYDA'Z">
      </div>
      <div class="faqc-header-text">
        <div class="faqc-header-title">MERCYDA'Z Support</div>
        <div class="faqc-header-sub">Tap a topic to get answers</div>
      </div>
    `;
    const closeBtn = el("button", "faqc-close-btn", "&times;");
    closeBtn.setAttribute("aria-label", "Close chat");
    header.appendChild(closeBtn);

    // Body (scrollable messages / chips / suggestions)
    const body = el("div", "faqc-body");

    const contactNote = el(
      "div",
      "faqc-contact-note",
      "Still stuck? Use the Contact section on the website to reach our team directly."
    );

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(contactNote);
    document.body.appendChild(panel);

    // ── message rendering helpers ──
    function addBotMessage(html) {
      const msg = el("div", "faqc-msg faqc-msg-bot", html);
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
      return msg;
    }

    function addUserMessage(text) {
      const msg = el("div", "faqc-msg faqc-msg-user", escapeHtml(text));
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    function renderTopicChips() {
      const wrap = el("div", "faqc-chips");
      CATEGORIES.forEach((cat) => {
        const chip = el("button", "faqc-chip", escapeHtml(cat));
        chip.type = "button";
        chip.addEventListener("click", () => showCategory(cat));
        wrap.appendChild(chip);
      });
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    function renderBackToTopicsChip() {
      const wrap = el("div", "faqc-chips");
      const chip = el("button", "faqc-chip faqc-chip-back", "\u2190 All topics");
      chip.type = "button";
      chip.addEventListener("click", () => {
        addBotMessage("Sure \u2014 pick another topic:");
        renderTopicChips();
      });
      wrap.appendChild(chip);
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    function showCategory(cat) {
      addUserMessage(cat);
      const items = FAQ_DATA.filter((e) => e.category === cat);
      addBotMessage(`Here are common questions about <strong>${escapeHtml(cat)}</strong>:`);
      renderSuggestionList(items);
      renderBackToTopicsChip();
    }

    function renderSuggestionList(entries) {
      const wrap = el("div", "faqc-suggest-list");
      entries.forEach((entry) => {
        const item = el("button", "faqc-suggest-item", escapeHtml(entry.q));
        item.type = "button";
        item.addEventListener("click", () => {
          addUserMessage(entry.q);
          addBotMessage(escapeHtml(entry.a));
        });
        wrap.appendChild(item);
      });
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    closeBtn.addEventListener("click", () => togglePanel(false));

    // Initial greeting (only rendered once, on first open)
    let greeted = false;
    function greetOnce() {
      if (greeted) return;
      greeted = true;
      addBotMessage(escapeHtml(GREETING));
      renderTopicChips();
    }

    return { panel, greetOnce };
  }

  // ── 5. WIRE UP THE EXISTING #faqBtn ───────────────────────────────
  function init() {
    injectStyles();
    const { panel, greetOnce } = buildWidget();

    function togglePanelImpl(force) {
      const shouldOpen = typeof force === "boolean" ? force : !panel.classList.contains("faqc-open");
      panel.classList.toggle("faqc-open", shouldOpen);
      if (shouldOpen) {
        greetOnce();
      }
    }
    window.__faqcToggle = togglePanelImpl;

    // Public API so other elements (e.g. footer FAQ link) can open the chat too.
    window.openFaqChat = function () {
      togglePanel(true);
    };

    const trigger = document.getElementById("faqBtn");
    if (trigger) {
      trigger.addEventListener("click", () => togglePanelImpl());
    } else {
      // eslint-disable-next-line no-console
      console.warn('[faq-chatbot] #faqBtn not found on the page \u2014 the widget was built but has no trigger.');
    }
  }

  function togglePanel(force) {
    if (window.__faqcToggle) window.__faqcToggle(force);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();