import{a as c,S as f,i as l}from"./assets/vendor-8qRJBGGt.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();c.defaults.baseURL="https://pixabay.com/api/";const d=function(o){return c.get("",{params:{key:"49375112-dd0d1364feb3efc0ffe9630b6",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})},u=function({webformatURL:o,largeImageURL:r,tags:s,likes:i,views:e,comments:t,downloads:n}){return`
    <li class="gallery-item">
    <a class="gallery-link" href="${r}">
      <img
        class="gallery-image"
        src="${o}"
        alt="${s}"
      />
    </a>
   
    <ul class = "description-list">
        <li class="description"><span>Likes</span> ${i}</li>
        <li class="description"><span>Views</span> ${e}</li>
        <li class="description"><span>Comments</span> ${t}</li>
        <li class="description"><span>Downloads</span> ${n}</li>
        </ul>
      
  </li>`},p=function(){new f(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"}).refresh()},a={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),backdrop:document.querySelector(".backdrop")},m=()=>{a.backdrop.classList.remove("is-hidden")},g=()=>{a.backdrop.classList.add("is-hidden")},y=function(o){o.preventDefault();const r=o.currentTarget.elements["search-text"].value.trim();if(r===""){alert("Please enter a valid data");return}m(),d(r).then(({data:{hits:s}})=>{if(s.length===0){l.error({messageColor:"#fff",close:!1,icon:"x",iconText:"x",iconColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",timeout:1e4}),a.gallery.innerHTML="";return}const i=s.map(e=>u(e)).join("");a.gallery.innerHTML=i,p(),a.form.reset()}).catch(s=>{l.error({messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:"Oops! Something went wrong. Please try again later.",timeout:1e4}),a.gallery.innerHTML=""}).finally(()=>{g(),a.form.reset()})};a.form.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
