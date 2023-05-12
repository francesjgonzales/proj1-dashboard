function hamburgerBtn(){document.querySelector(".nav-menu__item").classList.toggle("nav-menu__links")}function filterBtn(){document.querySelector(".deals-table__menu-item-filter").classList.toggle("deals-table__menu-item-filter-links")}console.log("Hey"),fetch("app/multipleData.json").then((t=>{if(!t.ok)throw new Error("API request failed. Check the json file.");return t.json()})).then((t=>{let e=document.getElementById("dealsOutput"),o="";for(let e of t.deals){const t=parseFloat(e.dealValue).toLocaleString("en-US",{style:"currency",currency:"USD"}),n=new Date(e.closeDate).toDateString(),l=new Date(e.lastContact).toDateString();o+=`\n            <tr>\n            <th> ${e.company} </th>\n            <td><i class="fa-solid fa-pen-to-square"></i></td>\n            <td style="background-color: ${e.stageColor};"><p class="deals-table__content-stageText">${e.stageText}</p></td>\n            <td style="background-color: ${e.priorityColor};"><p class="deals-table__content-priorityText">${e.priorityText}</p></td>\n            <td class="deals-table__content-dealValue">${t}</td>\n            <td>${n} <i class="fa-solid fa-bell"></i></td>\n            <td>${e.poc}</td>\n            <td><img src="${e.image}" alt="user-image"\n            class="deals-table__content-user-image"></td>\n            <td>${l}</td>\n            <td><i class="fa-solid fa-phone"></i> ${e.phone}</td>\n            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>\n        </tr> `}e.innerHTML=o;const n=e.querySelectorAll("tbody td:nth-child(5)");console.log(n);let l=0;n.forEach((function(t){const e=t.textContent,o=parseFloat(e.replace("$",""));console.log(1e3*o),l+=1e3*o}));const a=document.getElementById("totalSum"),c=l.toLocaleString("en-US",{style:"currency",currency:"USD"});a.textContent=c})).catch((t=>{console.error("Catch",t)})),fetch("app/multipleData.json").then((t=>{if(!t.ok)throw new Error("API request failed. Check the json file.");return t.json()})).then((t=>{let e=document.getElementById("multipleDataOutput"),o="";for(let e of t.closed){const t=parseFloat(e.dealValue).toLocaleString("en-US",{style:"currency",currency:"USD"}),n=new Date(e.closeDate).toDateString(),l=new Date(e.lastContact).toDateString();o+=`\n            <tr>\n            <th> ${e.company}</th>\n            <td><i class="fa-solid fa-pen-to-square"></i></td>\n            <td style="background-color: ${e.stageColor};"><p>${e.stageText}</p></td>\n            <td style="background-color: ${e.priorityColor};"><p>${e.priorityText}</p></td>\n            <td class="closed-table__content-closedValue">${t}</td>\n            <td>${n} <i class="fa-solid fa-bell"></i></td>\n            <td>${e.poc}</td>\n            <td><img src="${e.image}" alt="user-image"\n                    class="deals-table__content-user-image"></td>\n            <td>${l}</td>\n            <td><i class="fa-solid fa-phone"></i> ${e.phone}</td>\n            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>\n        </tr>`}e.innerHTML=o;const n=e.querySelectorAll("tbody td:nth-child(5)");console.log(n);let l=0;n.forEach((function(t){const e=t.textContent,o=parseFloat(e.replace("$",""));console.log(1e3*o),l+=1e3*o}));const a=document.getElementById("totalClosedSum"),c=l.toLocaleString("en-US",{style:"currency",currency:"USD"});a.textContent=c})).catch((t=>{console.error("Catch",t)})),fetch("app/multipleData.json").then((t=>{if(!t.ok)throw new Error("API request failed. Check the json file.");return t.json()})).then((t=>{let e=document.getElementById("overallDataOutput"),o="";const n=t.deals;console.log(n);const l=t.closed;console.log(l);const a=n.concat(l);console.log(a);for(let t of a){const e=parseFloat(t.dealValue).toLocaleString("en-US",{style:"currency",currency:"USD"}),n=new Date(t.closeDate).toDateString(),l=new Date(t.lastContact).toDateString();o+=`\n            <tr>\n            <th> ${t.company}</th>\n            <td><i class="fa-solid fa-pen-to-square"></i></td>\n            <td style="background-color: ${t.stageColor};"><p>${t.stageText}</p></td>\n            <td style="background-color: ${t.priorityColor};"><p>${t.priorityText}</p></td>\n            <td class="closed-table__content-closedValue">${e}</td>\n            <td>${n} <i class="fa-solid fa-bell"></i></td>\n            <td>${t.poc}</td>\n            <td><img src="${t.image}" alt="user-image"\n                    class="deals-table__content-user-image"></td>\n            <td>${l}</td>\n            <td><i class="fa-solid fa-phone"></i> ${t.phone}</td>\n            <td><i class="fa-solid fa-ellipsis-vertical"></i></td>\n        </tr>`}e.innerHTML=o;const c=e.querySelectorAll("tbody td:nth-child(5)");let s=0;c.forEach((function(t){const e=t.textContent,o=parseFloat(e.replace("$",""));console.log(1e3*o),s+=1e3*o}));const r=document.getElementById("totalBoardSum"),d=s.toLocaleString("en-US",{style:"currency",currency:"USD"});r.textContent=d})).catch((t=>{console.error("Catch",t)}));