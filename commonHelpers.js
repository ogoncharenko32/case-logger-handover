import{f as C,i as g}from"./assets/vendor-77e16229.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const L=document.querySelector(".date-picker");C(L,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,enableTime:!1,onClose(e){l=e[0],d(),m()}});let c=new Map,l=new Date;const i=e=>e.toDateString().replace(/ /g,""),y=document.querySelector(".input-form");y.addEventListener("submit",e=>{e.preventDefault();const t=e.target.elements.forminputcase.value,o=e.target.elements.forminputstatus.value,n=e.target.elements.forminputdescription.value,s=e.target.elements.forminputtextarea.value;q(t,o,n,s),m(),y.reset()});const q=(e,t,o,n)=>{const s={id:new Date().getTime(),caseLink:e,caseStatus:t,caseDescr:o,caseComment:n},a=i(l);c.has(a)||c.set(a,new Map),c.get(a).set(s.id,s),b(c)},h=e=>{const t={};return e.forEach((o,n)=>{t[n]=Object.fromEntries(o)}),t},E=e=>{const t=new Map;for(const o in e)t.set(o,new Map(Object.entries(e[o])));return t},b=e=>localStorage.setItem("case-list",JSON.stringify(h(e))),d=()=>{const e=localStorage.getItem("case-list");if(e){const t=JSON.parse(e);c=E(t)}},D=(e,t)=>{const o=document.querySelector(".cases-table"),n=document.createElement("li");n.classList.add(e),n.insertAdjacentHTML("beforeend",`<div><a href="${t.caseLink}" target="_blank">${v(t.caseLink)}</a></div><div><p class="case-info">${t.caseStatus}</p></div><div><p class="case-info">${t.caseDescr}</p><p class="case-info-overlay">${t.caseDescr}</p></div><div><p class="case-info">${t.caseComment}</p><p class="case-info-overlay">${t.caseComment}</p></div><div class="case-btn-div"><button class="edit-btn" type="button">Edit</button><button class="delete-btn" type="button">Delete</button></div>`),o.append(n)};function v(e){return e.includes("jira")?e.slice(e.lastIndexOf("/")+1):e.includes("lightning.force")?"SFDC link":e}const m=()=>{const e=c.get(i(l)),t=document.querySelector(".cases-table");t.innerHTML="",e&&e.forEach((o,n)=>{D(n,o)})},M=document.querySelector(".cases-table");M.addEventListener("click",e=>{e.target.nodeName==="BUTTON"&&(e.target.className==="delete-btn"&&O(e),e.target.className==="edit-btn"&&x(e))});const O=e=>{if(!confirm("Are U Sure?"))return;const n=e.target.parentNode.parentNode,s=n.classList[0];c.get(i(l)).delete(s),document.querySelector(".cases-table").removeChild(n),b(c),g.show({message:"Case deleted!",messageColor:"teal",color:"red",position:"topCenter",timeout:2e3,iconColor:"#fff",maxWidth:"432px"})},x=e=>{const t=e.target.parentNode.parentNode;T(t)},k=document.querySelector(".export-btn");k.addEventListener("click",e=>{const t=c.get(i(l));let o="";console.log(t),t.forEach(n=>{o+=`# ${v(n.caseLink)} | ${n.caseStatus} | ${n.caseDescr} | ${n.caseComment} 
`}),navigator.clipboard.writeText(o).then(g.show({message:"List of cases copied to clipboard",messageColor:"teal",color:"green",position:"topCenter",timeout:2e3,iconColor:"#fff",maxWidth:"432px"}))});d();m();function T(e){const t=document.querySelector(".js-modal-form");t.innerHTML="";const o=document.createElement("ul");o.insertAdjacentHTML("afterbegin",`<li>
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
          </button>`);const n=document.querySelector(".modal"),s=document.querySelector(".modal-close-btn"),a=document.querySelector(".modal-save-btn");n.classList.remove("is-hidden"),s.addEventListener("click",S),a.addEventListener("click",r=>w(r,e)),j(e)}function S(){const e=document.querySelector(".modal");document.querySelector(".modal-close-btn").removeEventListener("click",S),e.classList.add("is-hidden")}function j(e){d();const t=e.classList[0],o=c.get(i(l)).get(t);console.log("caseObj :",o);const n=document.querySelector(".modal-form-input-case"),s=document.querySelector(".modal-form-input-status"),a=document.querySelector(".modal-form-input-description"),r=document.querySelector(".modal-form-input-textarea");n.value=o.caseLink,s.value=o.caseStatus,a.value=o.caseDescr,r.value=o.caseComment}function w(e,t){d();const o=document.querySelector(".modal-form-input-case"),n=document.querySelector(".modal-form-input-status"),s=document.querySelector(".modal-form-input-description"),a=document.querySelector(".modal-form-input-textarea"),r=t.classList[0],p=c.get(i(l));if(p&&p.has(r)){const u=p.get(r);u.caseLink=o.value,u.caseStatus=n.value,u.caseDescr=s.value,u.caseComment=a.value,b(c),m(),document.querySelector(".modal").classList.add("is-hidden")}document.querySelector(".modal-save-btn").removeEventListener("click",e)}const N=document.querySelector(".input-form-state-button-js");let f=!0;N.addEventListener("click",e=>$(e));function $(e){if(f){const t=document.querySelector(".form-wrapper-js");t.style.display="none",f=!1,e.target.textContent="menu",e.target.style.position="static"}else{const t=document.querySelector(".form-wrapper-js");t.style.width="",t.style.display="block",f=!0,e.target.textContent="hide",e.target.style.position="absolute"}}
//# sourceMappingURL=commonHelpers.js.map
