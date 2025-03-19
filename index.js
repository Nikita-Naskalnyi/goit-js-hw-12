import{a as g,S as L,i as d}from"./assets/vendor-8qRJBGGt.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();g.defaults.baseURL="https://pixabay.com/api/";const u=async function(a,e){return await g.get("",{params:{key:"49375112-dd0d1364feb3efc0ffe9630b6",q:a,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}})},m=function({webformatURL:a,largeImageURL:e,tags:s,likes:i,views:t,comments:r,downloads:n}){return`
    <li class="gallery-item">
    <a class="gallery-link" href="${e}">
      <img
        class="gallery-image"
        src="${a}"
        alt="${s}"
      />
    </a>
   
    <ul class = "description-list">
        <li class="description"><span>Likes</span> ${i}</li>
        <li class="description"><span>Views</span> ${t}</li>
        <li class="description"><span>Comments</span> ${r}</li>
        <li class="description"><span>Downloads</span> ${n}</li>
        </ul>
      
  </li>`},p=function(){new L(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"}).refresh()},o={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),backdrop:document.querySelector(".backdrop"),loadMoreBtn:document.querySelector(".load-more-btn")};let l=1,c="";const h=()=>{o.backdrop.classList.remove("is-hidden")},y=()=>{o.backdrop.classList.add("is-hidden")},b=()=>{const a=o.gallery.firstElementChild;if(a){const{height:e}=a.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}},w=async function(a){if(a.preventDefault(),c=a.currentTarget.elements["search-text"].value.trim(),c===""){alert("Please enter a valid data");return}h(),l=1;try{const{data:e}=await u(c,l);if(e.hits.length===0){d.error({messageColor:"#fff",close:!1,icon:"x",iconText:"x",iconColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",timeout:1e4}),o.gallery.innerHTML="",o.loadMoreBtn.classList.add("is-hidden");return}const s=e.hits.map(i=>m(i)).join("");o.gallery.innerHTML=s,e.totalHits>15?(o.loadMoreBtn.classList.remove("is-hidden"),o.loadMoreBtn.addEventListener("click",f)):(o.loadMoreBtn.classList.add("is-hidden"),o.loadMoreBtn.removeEventListener("click",f)),p(),o.form.reset()}catch{d.error({messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:"Oops! Something went wrong. Please try again later.",timeout:1e4}),o.gallery.innerHTML=""}finally{y(),o.form.reset()}},f=async a=>{try{l++,h();const{data:e}=await u(c,l),s=e.hits.map(i=>m(i)).join("");o.gallery.insertAdjacentHTML("beforeend",s),p(),b(),l*15>=e.totalHits&&(o.loadMoreBtn.classList.add("is-hidden"),o.loadMoreBtn.removeEventListener("click",f),d.show({messageColor:"#ffffff",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#6C8CFF",timeout:5e3}))}catch{d.error({messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",message:"Oops! Something went wrong. Please try again later.",timeout:1e4})}finally{y()}};o.form.addEventListener("submit",w);
//# sourceMappingURL=index.js.map
