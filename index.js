import{a as L,i as n,S as b}from"./assets/vendor-xwsNXkQR.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();async function f(a,r){try{const e=(await L.get("https://pixabay.com/api/",{params:{key:"40329359-a15cc1b2c03eb2718994197fd",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}})).data.hits;return!e||e.length===0?(n.error({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"red",message:"Sorry, there are no images matching your search query. Please try again!"}),[]):e}catch(o){return console.log(o),n.error({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",message:"Something went wrong. Please try again later."}),[]}}const l=document.querySelector(".gallery"),g=document.querySelector(".loader"),m=document.querySelector(".load-more"),S=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function d(a,r){const o=a.map(e=>`
<li class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
    <img 
      class="gallery-image" 
      src="${e.largeImageURL}" 
      alt="${e.tags}" 
    />
        <ul class="stats">
    <li class="stats-item">Likes <p>${e.likes}</p>
    </li>
    <li class="stats-item">Views <p>${e.views}</p>
    </li>
    <li class="stats-item">Comments <p>${e.comments}</p>
    </li>
    <li class="stats-item">Downloads <p>${e.downloads}</p>
    </li>
  </ul>
  </a>
  

</li>
`).join("");r===1?l.innerHTML=o:l.insertAdjacentHTML("beforeend",o),S.refresh()}function v(){l&&l.children.length>0&&(l.innerHTML="")}function y(){g.style.display="block"}function p(){g.style.display="none"}function h(){m.style.display="block"}function w(){m.style.display="none"}const q=document.querySelector(".form"),B=document.querySelector("input[name='search-text']"),O=document.querySelector(".load-more");let c="",i=1;q.addEventListener("submit",async a=>{if(a.preventDefault(),c=B.value.trim(),i=1,w(),v(),!c){n.warning({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"yellow",message:"Enter text to search for"});return}y();try{const r=await f(c,i);r&&r.length>0&&(d(r,i),h())}catch(r){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(r)}finally{p()}});O.addEventListener("click",async()=>{w(),y();const r=Math.ceil(200/15);if(i>r)return p(),n.error({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",message:"We're sorry, but you've reached the end of search results."});i+=1;try{const o=await f(c,i);if(o&&o.length>0){d(o,i);const e=document.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}h()}}catch(o){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)}finally{p()}});
//# sourceMappingURL=index.js.map
