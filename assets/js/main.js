/* Fungsi bersama: navbar, footer, tema, scroll, utilitas */
const NAV=[["index.html","Beranda"],["about.html","Tentang Kami"],["members.html","Anggota"],["gallery.html","Galeri"],["activities.html","Kegiatan"],["stories.html","Cerita Kami"]];
const SOCIAL=[]; // contoh: [["Instagram","https://instagram.com/akun"]]
const page=location.pathname.split("/").pop()||"index.html";
const saved=localStorage.getItem("theme");
document.documentElement.dataset.theme=saved||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");

async function loadJSON(p){const r=await fetch(p);if(!r.ok)throw new Error(p);return r.json()}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmtDate=d=>new Date(d).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});

function reveal(root=document){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
  root.querySelectorAll(".rv:not(.in)").forEach(el=>io.observe(el));
}

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("site-header").outerHTML=`<header class="nav"><div class="wrap">
   <a class="brand" href="index.html"><img src="assets/images/logo.svg" alt="" width="34" height="34">Bright Scholarship</a>
   <nav class="menu" id="menu" aria-label="Navigasi utama">${NAV.map(([h,t])=>`<a href="${h}" ${h===page?'class="on" aria-current="page"':""}>${t}</a>`).join("")}</nav>
   <div><button class="icon-btn" id="theme" aria-label="Ganti mode terang/gelap">◐</button>
   <button class="icon-btn" id="burger" aria-label="Buka menu" aria-expanded="false">☰</button></div></div></header>`;
  document.getElementById("site-footer").outerHTML=`<footer><div class="wrap"><div class="cols">
   <div><strong style="color:#fff;font-size:1.2rem">Bright Scholarship Memories</strong><p>Beasiswa mempertemukan kami, perjalanan membentuk kami, dan kenangan akan selalu menjadi bagian dari cerita kami.</p></div>
   <div class="links">${NAV.map(([h,t])=>`<a href="${h}">${t}</a>`).join("")}</div>
   ${SOCIAL.length?`<div class="links">${SOCIAL.map(([n,u])=>`<a href="${esc(u)}" rel="noopener" target="_blank">${esc(n)}</a>`).join("")}</div>`:""}</div>
   <p class="note" style="background:rgba(255,255,255,.08);color:#cfdcec;margin-top:28px">Website ini adalah dokumentasi komunitas penerima Bright Scholarship dan bukan website resmi Yayasan Baitul Maal BRILiaN (YBM BRILiaN).</p>
   <p>© <span id="yr"></span> Komunitas Bright Scholarship</p></div></footer><button id="top" aria-label="Kembali ke atas">↑</button>`;
  document.getElementById("yr").textContent=new Date().getFullYear();
  const menu=document.getElementById("menu"),b=document.getElementById("burger");
  b.onclick=()=>{const o=menu.classList.toggle("open");b.setAttribute("aria-expanded",o)};
  document.getElementById("theme").onclick=()=>{const t=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=t;localStorage.setItem("theme",t)};
  const top=document.getElementById("top");top.onclick=()=>scrollTo({top:0});
  addEventListener("scroll",()=>top.style.display=scrollY>500?"block":"none",{passive:true});
  document.querySelectorAll("[data-count]").forEach(async el=>{ // statistik dihitung dari data JSON
    try{el.textContent=(await loadJSON(el.dataset.count)).length}catch{}});
  reveal();
});
