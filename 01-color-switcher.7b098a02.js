const t={backgroundBody:document.querySelector("body"),buttonStart:document.querySelector("[data-start]"),buttonStop:document.querySelector("[data-stop]")};t.buttonStop.disabled=!0;let o=null;t.buttonStart.addEventListener("click",(function(e){o=setInterval((()=>{t.backgroundBody.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.buttonStart.disabled=!0,t.buttonStop.disabled=!1})),t.buttonStop.addEventListener("click",(function(e){clearInterval(o),t.buttonStart.disabled=!1,t.buttonStop.disabled=!0}));
//# sourceMappingURL=01-color-switcher.7b098a02.js.map