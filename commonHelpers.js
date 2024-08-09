import{f as g,i as v}from"./assets/vendor-77e16229.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const S=document.querySelector(".date-picker");g(S,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,enableTime:!1,onClose(e){l=e[0],f(),u()}});let c=new Map,l=new Date;const i=e=>e.toDateString().replace(/ /g,""),b=document.querySelector(".input-form");b.addEventListener("submit",e=>{e.preventDefault();const t=e.target.elements.forminputcase.value,s=e.target.elements.forminputstatus.value,n=e.target.elements.forminputdescription.value,o=e.target.elements.forminputtextarea.value;L(t,s,n,o),u(),b.reset()});const L=(e,t,s,n)=>{const o={id:new Date().getTime(),caseLink:e,caseStatus:t,caseDescr:s,caseComment:n},a=i(l);c.has(a)||c.set(a,new Map),c.get(a).set(o.id,o),p(c)},C=e=>{const t={};return e.forEach((s,n)=>{t[n]=Object.fromEntries(s)}),t},q=e=>{const t=new Map;for(const s in e)t.set(s,new Map(Object.entries(e[s])));return t},p=e=>localStorage.setItem("case-list",JSON.stringify(C(e))),f=()=>{const e=localStorage.getItem("case-list");if(e){const t=JSON.parse(e);c=q(t)}},h=(e,t)=>{const s=document.querySelector(".cases-table"),n=document.createElement("li");n.classList.add(e),n.insertAdjacentHTML("beforeend",`<div><a href="${t.caseLink}" target="_blank">${t.caseLink.slice(t.caseLink.lastIndexOf("/")+1)}</a></div><div><p class="case-info">${t.caseStatus}</p></div><div><p class="case-info">${t.caseDescr}</p></div><div><p class="case-info">${t.caseComment}</p></div><div class="case-btn-div"><button class="edit-btn" type="button">Edit</button><button class="delete-btn" type="button">Delete</button></div>`),s.append(n)},u=()=>{const e=c.get(i(l)),t=document.querySelector(".cases-table");t.innerHTML="",e&&e.forEach((s,n)=>{h(n,s)})},E=document.querySelector(".cases-table");E.addEventListener("click",e=>{e.target.nodeName==="BUTTON"&&(e.target.className==="delete-btn"&&M(e),e.target.className==="edit-btn"&&D(e))});const M=e=>{if(!confirm("Are U Sure?"))return;const n=e.target.parentNode.parentNode,o=n.classList[0];c.get(i(l)).delete(o),document.querySelector(".cases-table").removeChild(n),p(c),v.show({message:"Case deleted!",messageColor:"teal",color:"red",position:"topCenter",timeout:2e3,iconColor:"#fff",maxWidth:"432px"})},D=e=>{const t=e.target.parentNode.parentNode;x(t)},O=document.querySelector(".export-btn");O.addEventListener("click",e=>{const t=c.get(i(l));let s="";t.forEach(n=>{s+=`# ${n.caseLink.slice(n.caseLink.lastIndexOf("/")+1)} | ${n.caseStatus} | ${n.caseDescr} | ${n.caseComment} 
`}),navigator.clipboard.writeText(s).then(v.show({message:"List of cases copied to clipboard",messageColor:"teal",color:"green",position:"topCenter",timeout:2e3,iconColor:"#fff",maxWidth:"432px"}))});f();u();function x(e){const t=document.querySelector(".js-modal-form");t.innerHTML="";const s=document.createElement("ul");s.insertAdjacentHTML("afterbegin",`<li>
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
          </li>`),t.append(s),s.insertAdjacentHTML("afterend",`<button class="modal-save-btn input-form-button" type="button">
          Save
        </button>
        <button class="modal-close-btn input-form-button" type="button">
          Close
          </button>`);const n=document.querySelector(".modal"),o=document.querySelector(".modal-close-btn"),a=document.querySelector(".modal-save-btn");n.classList.remove("is-hidden"),o.addEventListener("click",y),a.addEventListener("click",r=>k(r,e)),T(e)}function y(){const e=document.querySelector(".modal");document.querySelector(".modal-close-btn").removeEventListener("click",y),e.classList.add("is-hidden")}function T(e){const t=e.classList[0],s=c.get(i(l)).get(t),n=document.querySelector(".modal-form-input-case"),o=document.querySelector(".modal-form-input-status"),a=document.querySelector(".modal-form-input-description"),r=document.querySelector(".modal-form-input-textarea");n.value=s.caseLink,o.value=s.caseStatus,a.value=s.caseDescr,r.value=s.caseComment}function k(e,t){f();const s=document.querySelector(".modal-form-input-case"),n=document.querySelector(".modal-form-input-status"),o=document.querySelector(".modal-form-input-description"),a=document.querySelector(".modal-form-input-textarea"),r=t.classList[0],m=c.get(i(l));if(m&&m.has(r)){const d=m.get(r);d.caseLink=s.value,d.caseStatus=n.value,d.caseDescr=o.value,d.caseComment=a.value,p(c),u(),document.querySelector(".modal").classList.add("is-hidden")}document.querySelector(".modal-save-btn").removeEventListener("click",e)}
//# sourceMappingURL=commonHelpers.js.map
