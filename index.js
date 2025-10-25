import{a as L,i as l,S as b}from"./assets/vendor-DzBlEn4a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();function f(a,r){return L.get("https://pixabay.com/api/",{params:{key:"40329359-a15cc1b2c03eb2718994197fd",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}}).then(e=>{const s=e.data.hits;return!s||s.length===0?(l.error({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"red",message:"Sorry, there are no images matching your search query. Please try again!"}),[]):s}).catch(e=>(console.log(e),l.error({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",message:"Something went wrong. Please try again later."}),[]))}const n=document.querySelector(".gallery"),d=document.querySelector(".loader"),g=document.querySelector(".load-more"),S=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function m(a){const r=a.map(e=>`
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
`).join("");n.insertAdjacentHTML("beforeend",r),S.refresh()}function v(){n&&n.children.length>0&&(n.innerHTML="")}function h(){d.style.display="block"}function p(){d.style.display="none"}function y(){g.style.display="block"}function w(){g.style.display="none"}const q=document.querySelector(".form"),B=document.querySelector("input[name='search-text']"),O=document.querySelector(".load-more");let i="",u=1;q.addEventListener("submit",a=>{if(a.preventDefault(),i=B.value.trim(),w(),v(),!i){l.warning({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"yellow",message:"Enter text to search for"});return}h(),f(i).then(r=>{r&&r.length>0&&(m(r),y())}).catch(r=>{l.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(r)}).finally(()=>{p()})});O.addEventListener("click",()=>{w(),h();const r=Math.ceil(200/15);if(u>r)return p(),l.error({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",message:"We're sorry, but you've reached the end of search results."});u+=1,f(i,u).then(e=>{if(e&&e.length>0){m(e);const s=document.querySelector(".gallery-item");if(s){const t=s.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}y()}}).catch(e=>{l.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}).finally(()=>{p()})});
//# sourceMappingURL=index.js.map
