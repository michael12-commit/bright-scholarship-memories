/* Galeri: filter kategori dan tampilan besar */
(async()=>{
  const el=document.getElementById("gal"),chips=document.getElementById("chips"),dlg=document.getElementById("dlg");
  const data=await loadJSON("data/gallery.json");
  const cats=["Semua",...new Set(data.map(g=>g.category))];let cur="Semua";
  chips.innerHTML=cats.map(c=>`<button class="chip ${c===cur?"on":""}">${esc(c)}</button>`).join("");
  function render(){
    el.innerHTML=data.map((g,i)=>({g,i})).filter(({g})=>cur==="Semua"||g.category===cur).map(({g,i})=>`<figure class="${esc(g.size)} rv" data-i="${i}" tabindex="0" role="button"><img src="${esc(g.src)}" alt="${esc(g.title)}" loading="lazy"><figcaption>${esc(g.title)}</figcaption></figure>`).join("");
    reveal(el);
  }
  chips.onclick=e=>{if(!e.target.classList.contains("chip"))return;cur=e.target.textContent;chips.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===e.target));render()};
  const open=f=>{const g=data[f.dataset.i];dlg.innerHTML=`<img src="${esc(g.src)}" alt="${esc(g.title)}"><div class="body"><button class="icon-btn close" aria-label="Tutup">✕</button><h3>${esc(g.title)}</h3><p class="quote">${esc(fmtDate(g.date))} · ${esc(g.location)}</p><p>${esc(g.caption)}</p></div>`;dlg.showModal()};
  el.addEventListener("click",e=>{const f=e.target.closest("figure");if(f)open(f)});
  el.addEventListener("keydown",e=>{if(e.key==="Enter"){const f=e.target.closest("figure");if(f)open(f)}});
  dlg.addEventListener("click",e=>{if(e.target===dlg||e.target.classList.contains("close"))dlg.close()});
  render();
})();
