/* Daftar anggota: pencarian, filter, dan jendela detail */
(async()=>{
  const grid=document.getElementById("grid"),dlg=document.getElementById("dlg");
  const data=await loadJSON("data/members.json");
  const q=document.getElementById("q"),fu=document.getElementById("fu"),fm=document.getElementById("fm"),fy=document.getElementById("fy");
  const fill=(el,k,label)=>{el.innerHTML=`<option value="">${label}</option>`+[...new Set(data.map(m=>m[k]))].sort().map(v=>`<option>${esc(v)}</option>`).join("")};
  fill(fu,"university","Semua universitas");fill(fm,"major","Semua program studi");fill(fy,"year","Semua angkatan");
  function render(){
    const t=q.value.toLowerCase();
    const list=data.filter(m=>(!t||(m.name+m.university+m.major+m.interests.join(" ")).toLowerCase().includes(t))&&(!fu.value||m.university===fu.value)&&(!fm.value||m.major===fm.value)&&(!fy.value||String(m.year)===fy.value));
    grid.innerHTML=list.length?list.map(m=>`<article class="card member rv"><img src="${esc(m.photo)}" alt="Foto ${esc(m.name)}" loading="lazy"><div class="body"><h3>${esc(m.name)}</h3><p>${esc(m.university)}<br>${esc(m.major)} · Angkatan ${esc(m.year)}</p><p>${m.interests.map(i=>`<span class="tag">${esc(i)}</span>`).join("")}</p><p class="quote">“${esc(m.quote)}”</p><button class="btn ghost" data-id="${esc(m.id)}">Lihat Profil</button></div></article>`).join(""):"<p>Tidak ada anggota yang cocok. Ubah kata kunci atau filter.</p>";
    reveal(grid);
  }
  [q,fu,fm,fy].forEach(e=>e.addEventListener("input",render));render();
  grid.addEventListener("click",e=>{const id=e.target.dataset.id;if(!id)return;const m=data.find(x=>x.id===id);
    dlg.innerHTML=`<img src="${esc(m.photo)}" alt="Foto ${esc(m.name)}"><div class="body"><button class="icon-btn close" aria-label="Tutup">✕</button><h2>${esc(m.name)}</h2><p>${esc(m.university)} · ${esc(m.major)} · Angkatan ${esc(m.year)}</p><p>${esc(m.bio)}</p><h3>Perjalanan pendidikan</h3><p>${esc(m.education)}</p><h3>Prestasi</h3><p>${esc(m.achievements)}</p><h3>Pengalaman organisasi</h3><p>${esc(m.organizations)}</p><h3>Cita-cita</h3><p>${esc(m.dream)}</p><h3>Kontribusi yang ingin diberikan</h3><p>${esc(m.contribution)}</p></div>`;
    dlg.showModal();});
  dlg.addEventListener("click",e=>{if(e.target===dlg||e.target.classList.contains("close"))dlg.close()});
})();
