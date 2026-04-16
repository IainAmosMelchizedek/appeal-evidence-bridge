(function () {
  const QUICKSUBMIT_URL = "https://eauth.va.gov/accessva/?cspSelectFor=quicksubmit";

  const triggerPhrases = [
    "open for new evidence",
    "submit new evidence before",
    "appeals file is open"
  ];

  function pageHasTrigger() {
    const text = document.body.innerText.toLowerCase();
    return triggerPhrases.some(phrase => text.includes(phrase));
  }

  function alreadyInjected() {
    return !!document.getElementById("aeb-banner");
  }

  function injectBanner() {
    if (alreadyInjected()) return;
    if (!pageHasTrigger()) return;

    const banner = document.createElement("div");
    banner.id = "aeb-banner";
    banner.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 340px;
      background: #ffffff;
      border: 2px solid #1a4f8a;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      z-index: 99999;
      font-family: Arial, sans-serif;
    `;

    banner.innerHTML = `
      <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1a4f8a;">
        You can submit evidence electronically
      </p>
      <p style="margin:0 0 14px;font-size:13px;color:#222;line-height:1.6;">
        Your appeal is open for new evidence. You do not need to mail or fax anything.
        Upload your documents directly through the VA's QuickSubmit tool — right now, from this page.
      </p>
      <a href="${QUICKSUBMIT_URL}"
         target="_blank"
         style="display:block;background:#1a4f8a;color:#ffffff;text-align:center;
                padding:12px;border-radius:6px;text-decoration:none;
                font-size:15px;font-weight:700;margin-bottom:14px;">
        Open QuickSubmit &rarr;
      </a>
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#333;">Before you upload:</p>
      <ul style="margin:0 0 14px;padding-left:18px;font-size:13px;color:#333;line-height:2;">
        <li>Check your submission deadline on this page</li>
        <li>Make sure your documents are in PDF format</li>
        <li>Upload all evidence in one session if possible</li>
        <li>Write down your confirmation number when done</li>
      </ul>
      <p style="margin:0 0 10px;font-size:11px;color:#666;line-height:1.5;">
        This tool is not affiliated with VA.gov. It was built by a veteran
        to surface the electronic submission path the VA does not display.
      </p>
      <button id="aeb-dismiss"
        style="background:none;border:none;font-size:12px;color:#888;
               cursor:pointer;padding:0;text-decoration:underline;">
        Dismiss this message
      </button>
    `;

    document.body.appendChild(banner);

    document.getElementById("aeb-dismiss").addEventListener("click", function () {
      banner.remove();
    });
  }

  const observer = new MutationObserver(function () {
    if (pageHasTrigger()) {
      injectBanner();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  injectBanner();
})();