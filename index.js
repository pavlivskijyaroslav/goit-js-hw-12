import{a as b,S as v,i as n}from"./assets/vendor-xwsNXkQR.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();async function f(a,o){try{const t=await b.get("https://pixabay.com/api/",{params:{key:"40329359-a15cc1b2c03eb2718994197fd",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}});return{hits:t.data.hits,totalHits:t.data.totalHits}}catch(t){console.log(t)}}const l=document.querySelector(".gallery"),g=document.querySelector(".loader"),m=document.querySelector(".load-more"),S=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(a,o){const t=a.map(r=>`
<li class="gallery-item">
  <a class="gallery-link" href="${r.largeImageURL}">
    <img 
      class="gallery-image" 
      src="${r.largeImageURL}" 
      alt="${r.tags}" 
    />
        <ul class="stats">
    <li class="stats-item">Likes <p>${r.likes}</p>
    </li>
    <li class="stats-item">Views <p>${r.views}</p>
    </li>
    <li class="stats-item">Comments <p>${r.comments}</p>
    </li>
    <li class="stats-item">Downloads <p>${r.downloads}</p>
    </li>
  </ul>
  </a>
  

</li>
`).join("");o===1?l.innerHTML=t:l.insertAdjacentHTML("beforeend",t),S.refresh()}function H(){l&&l.children.length>0&&(l.innerHTML="")}function h(){g.style.display="block"}function w(){g.style.display="none"}function L(){m.style.display="block"}function p(){m.style.display="none"}const R=document.querySelector(".form"),P=document.querySelector("input[name='search-text']"),q=document.querySelector(".load-more");let c="",i=1,u=0;R.addEventListener("submit",async a=>{if(a.preventDefault(),c=P.value.trim(),i=1,u=0,p(),H(),!c){n.warning({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"yellow",message:"Enter text to search for"});return}h();try{const o=await f(c,i),t=o.hits,r=o.totalHits;if(t.length===0){n.info({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"yellow",message:"No images found. Try another search.",position:"topRight"});return}y(t,i),u=Math.ceil(r/15),i>=u?(n.info({close:!1,progressBar:!1,timeout:3e3,pauseOnHover:!1,position:"topRight",color:"blue",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),p()):L()}catch(o){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)}finally{w()}});q.addEventListener("click",async()=>{i+=1,p(),h();try{const o=(await f(c,i)).hits;y(o,i);const t=document.querySelector(".gallery-item");if(t){const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}i>=u?(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),p()):L()}catch(a){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(a)}finally{w()}});
//# sourceMappingURL=index.js.map
