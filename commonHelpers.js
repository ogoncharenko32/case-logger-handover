import{f as C,i as g}from"./assets/vendor-77e16229.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const L=document.querySelector(".date-picker");C(L,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,enableTime:!1,onClose(e){l=e[0],d(),m()}});let c=new Map,l=new Date;const i=e=>e.toDateString().replace(/ /g,""),y=document.querySelector(".input-form");y.addEventListener("submit",e=>{e.preventDefault();const t=e.target.elements.forminputcase.value,o=e.target.elements.forminputstatus.value,s=e.target.elements.forminputdescription.value,n=e.target.elements.forminputtextarea.value;q(t,o,s,n),m(),y.reset()});const q=(e,t,o,s)=>{const n={id:new Date().getTime(),caseLink:e,caseStatus:t,caseDescr:o,caseComment:s},a=i(l);c.has(a)||c.set(a,new Map),c.get(a).set(n.id,n),b(c)},h=e=>{const t={};return e.forEach((o,s)=>{t[s]=Object.fromEntries(o)}),t},D=e=>{const t=new Map;for(const o in e)t.set(o,new Map(Object.entries(e[o])));return t},b=e=>localStorage.setItem("case-list",JSON.stringify(h(e))),d=()=>{const e=localStorage.getItem("case-list");if(e){const t=JSON.parse(e);c=D(t)}},E=(e,t)=>{const o=document.querySelector(".cases-table"),s=document.createElement("li");s.classList.add(e),s.insertAdjacentHTML("beforeend",`<div><a href="${t.caseLink}" target="_blank">${v(t.caseLink)}</a></div><div><p class="case-info">${t.caseStatus}</p></div><div><p class="case-info">${t.caseDescr}</p><p class="case-info-overlay">${t.caseDescr}</p></div><div><p class="case-info">${t.caseComment}</p><p class="case-info-overlay">${t.caseComment}</p></div><div class="case-btn-div"><button class="edit-btn" type="button">Edit</button><button class="delete-btn" type="button">Delete</button></div>`),o.append(s)};function v(e){return e.includes("jira")?e.slice(e.lastIndexOf("/")+1):e.includes("lightning.force")?"SFDC link":e}const m=()=>{const e=c.get(i(l)),t=document.querySelector(".cases-table");t.innerHTML="",e&&e.forEach((o,s)=>{E(s,o)})},M=document.querySelector(".cases-table");M.addEventListener("click",e=>{e.target.nodeName==="BUTTON"&&(e.target.className==="delete-btn"&&k(e),e.target.className==="edit-btn"&&x(e))});const k=e=>{if(!confirm("Are U Sure?"))return;const s=e.target.parentNode.parentNode,n=s.classList[0];c.get(i(l)).delete(n),document.querySelector(".cases-table").removeChild(s),b(c),g.show({message:"Case deleted!",messageColor:"teal",color:"red",position:"topCenter",timeout:2e3,iconColor:"#fff",maxWidth:"432px"})},x=e=>{const t=e.target.parentNode.parentNode;w(t)},O=document.querySelector(".export-btn");O.addEventListener("click",e=>{const t=c.get(i(l));let o="";console.log(t),t.forEach(s=>{o+=`# ${v(s.caseLink)} | ${s.caseStatus} | ${s.caseDescr} | ${s.caseComment} 
`}),navigator.clipboard.writeText(o).then(g.show({message:"List of cases copied to clipboard",messageColor:"teal",color:"green",position:"topCenter",timeout:2e3,iconColor:"#fff",maxWidth:"432px"}))});d();m();function w(e){const t=document.querySelector(".js-modal-form");t.innerHTML="";const o=document.createElement("ul");o.insertAdjacentHTML("afterbegin",`<li>
            <label class="modal-input-form-label"
              >Case<input
                class="form-input modal-form-input-case"
                name="forminputcase"
                type="text"
                required
            /></label>
          </li>
          <li>
            <label class="modal-input-form-label"
              >Status
              <select
                class="form-input modal-form-input-status"
                name="forminputstatus"
                id=""
                required
              >
                <option value="Ongoing" selected>Ongoing</option>
                <option value="WFC">WFC</option>
                <option value="Escalated to T2">Escalated to T2</option>
                <option value="Pending RMA">Pending RMA</option>
                <option value="Pending for MW">Pending for MW</option>
                <option value="Resolved">Resolved</option>
                <option value="Escalated to CSM">Escalated to CSM</option>
                <option value="Escalated to RnD">Escalated to RnD</option>
                <option value="Closed">Closed</option>
              </select></label
            >
          </li>
          <li>
            <label class="modal-input-form-label"
              >Description<input
                class="form-input modal-form-input-description"
                name="forminputdescription"
                type="text"
                required
            /></label>
          </li>
          <li>
            <label class="modal-input-form-label"
              >Comment<textarea
                class="form-input modal-form-input-textarea form-input-textarea"
                name="forminputtextarea"
                type="text"
              ></textarea>
            </label>
          </li>`),t.append(o),o.insertAdjacentHTML("afterend",`<button class="modal-save-btn input-form-button" type="button">
          Save
        </button>
        <button class="modal-close-btn input-form-button" type="button">
          Close
          </button>`);const s=document.querySelector(".modal"),n=document.querySelector(".modal-close-btn"),a=document.querySelector(".modal-save-btn");s.classList.remove("is-hidden"),n.addEventListener("click",S),a.addEventListener("click",r=>j(r,e)),T(e)}function S(){const e=document.querySelector(".modal");document.querySelector(".modal-close-btn").removeEventListener("click",S),e.classList.add("is-hidden")}function T(e){d();const t=e.classList[0],o=c.get(i(l)).get(t);console.log("caseObj :",o);const s=document.querySelector(".modal-form-input-case"),n=document.querySelector(".modal-form-input-status"),a=document.querySelector(".modal-form-input-description"),r=document.querySelector(".modal-form-input-textarea");s.value=o.caseLink,n.value=o.caseStatus,a.value=o.caseDescr,r.value=o.caseComment}function j(e,t){d();const o=document.querySelector(".modal-form-input-case"),s=document.querySelector(".modal-form-input-status"),n=document.querySelector(".modal-form-input-description"),a=document.querySelector(".modal-form-input-textarea"),r=t.classList[0],p=c.get(i(l));if(p&&p.has(r)){const u=p.get(r);u.caseLink=o.value,u.caseStatus=s.value,u.caseDescr=n.value,u.caseComment=a.value,b(c),m(),document.querySelector(".modal").classList.add("is-hidden")}document.querySelector(".modal-save-btn").removeEventListener("click",e)}const $=document.querySelector(".input-form-state-button-js");let f=!0;$.addEventListener("click",e=>N(e));function N(e){if(f){const t=document.querySelector(".form-wrapper-js");t.style.display="none",f=!1,e.target.textContent="menu",e.target.style.position="static"}else{const t=document.querySelector(".form-wrapper-js");t.style.width="",t.style.display="block",f=!0,e.target.textContent="hide",e.target.style.position="absolute"}}function F(){const e=document.querySelector(".clock");setInterval(()=>{const t=new Date().getHours(),o=new Date().getMinutes(),s=new Date().getSeconds();e.textContent=`${t<10?`0${t}`:t}:${o<10?`0${o}`:o}:${s<10?`0${s}`:s}`},1e3)}F();
//# sourceMappingURL=commonHelpers.js.map
