/* Kegiatan: timeline dengan filter kategori */
(async()=>{
  const el=document.getElementById("tl"),chips=document.getElementById("chips");
  const data=(await loadJSON("data/activities.json")).sort((a,b)=>b.date.localeCompare(a.date));
  const cats=["Semua",...new Set(data.map(a=>a.category))];let cur="Semua";
  chips.innerHTML=cats.map(c=>`<button class="chip ${c===cur?"on":""}">${esc(c)}</button>`).join("");
  function render(){
    el.innerHTML=data.filter(a=>cur==="Semua"||a.category===cur).map(a=>`<article class="card rv"><img src="${esc(a.photo)}" alt="Dokumentasi ${esc(a.name)}" loading="lazy"><div class="body"><span class="tag">${esc(a.category)}</span><h3>${esc(a.name)}</h3><p class="quote">${esc(fmtDate(a.date))} · ${esc(a.location)}</p><p>${esc(a.description)}</p><p><small>${esc(a.people||"")}</small></p></div></article>`).join("");
    reveal(el);
  }
  chips.onclick=e=>{if(!e.target.classList.contains("chip"))return;cur=e.target.textContent;chips.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c===e.target));render()};
  render();
})();
