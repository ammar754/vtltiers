let users = [
  {
    rank: 1,
    avatar: "https://crafatar.com/avatars/8e0e9c8f-5b57-4b4d-8b4a-2e3c3c3e3e3e?size=64&overlay",
    name: "Ammar",
    title: "Grandmaster Kombat",
    points: 405,
    region: "Indonesia",
    tiers: [
      { icon: "🌑", label: "HT1", type: "ht" },
      { icon: "💎", label: "LT1", type: "lt" },
      { icon: "🗡️", label: "LT1", type: "lt" },
      { icon: "❤️", label: "LT1", type: "lt" },
      { icon: "🧪", label: "HT1", type: "ht" },
      { icon: "👾", label: "HT1", type: "ht" }
    ]
  },
  {
    rank: 2,
    avatar: "https://crafatar.com/avatars/1e1e1e1e-5b57-4b4d-8b4a-2e3c3c3e3e3e?size=64&overlay",
    name: "Budi",
    title: "Master Kombat",
    points: 330,
    region: "Indonesia",
    tiers: [
      { icon: "🧪", label: "HT1", type: "ht" },
      { icon: "👾", label: "HT1", type: "ht" },
      { icon: "🌑", label: "HT1", type: "ht" },
      { icon: "🗡️", label: "HT2", type: "ht" },
      { icon: "🪓", label: "LT2", type: "lt" }
    ]
  }
];

function renderUsers() {
  users.forEach((u, i) => u.rank = i + 1);
  const rows = document.getElementById('ranking-rows');
  rows.innerHTML = "";
  users.forEach(user => {
    rows.innerHTML += `
      <div class="ranking-row">
        <div class="col col-rank">
          <div class="rank-badge">
            <span class="rank-number">${user.rank}.</span>
            <img src="${user.avatar}" class="player-avatar" />
          </div>
        </div>
        <div class="col col-player">
          <div class="player-details">
            <span class="player-name">${user.name}</span>
            <span class="player-title">${user.title} <span class="player-points">(${user.points} poin)</span></span>
          </div>
        </div>
        <div class="col col-region">
          <span class="region">${user.region}</span>
        </div>
        <div class="col col-tiers">
          <div class="tiers-list">
            ${user.tiers.map(tier => `
              <div class="tier-badge">
                <span class="tier-icon">${tier.icon}</span>
                <span class="tier-label ${tier.type}">${tier.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });
}
function renderAdminUsersList() {
  const list = document.getElementById("adminUsersList");
  if (!list) return;
  if (users.length === 0) {
    list.innerHTML = '<div class="admin-users-list"><em>Belum ada pemain.</em></div>';
    return;
  }
  list.innerHTML = '<div class="admin-users-list">' +
    users.map((u, i) => `
      <div class="admin-user-row">
        <span>
          <span class="admin-user-name">${u.name}</span>
          <span class="admin-user-region">(${u.region})</span>
        </span>
        <button class="admin-del-btn" data-idx="${i}">Hapus</button>
      </div>
    `).join('') +
    '</div>';
  // Pasang event listener pada tombol hapus
  document.querySelectorAll('.admin-del-btn').forEach(btn => {
    btn.onclick = function() {
      deleteUser(parseInt(this.getAttribute('data-idx')));
    };
  });
}
renderUsers();

function openAdmin() {
  document.getElementById("adminModal").classList.add("show");
  document.getElementById("adminLoginPanel").style.display = "";
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("adminUser").value = "";
  document.getElementById("adminPass").value = "";
  document.getElementById("adminLoginMsg").textContent = "";
}
function closeAdmin() {
  document.getElementById("adminModal").classList.remove("show");
}
function adminLogin() {
  let user = document.getElementById("adminUser").value.trim();
  let pass = document.getElementById("adminPass").value;
  if(user === "ammar2130" && pass === "ammar21304050"){
    document.getElementById("adminLoginPanel").style.display = "none";
    document.getElementById("adminPanel").style.display = "";
    document.getElementById("adminMsg").textContent = "";
    renderAdminUsersList();
  } else {
    document.getElementById("adminLoginMsg").textContent = "Nama pengguna/kata sandi salah!";
  }
}
function addUser() {
  let name = document.getElementById("nameInput").value.trim();
  let region = document.getElementById("regionInput").value.trim();
  if (!name || !region) {
    document.getElementById("adminMsg").textContent = "Isi semua kolom pemain!";
    return;
  }
  users.push({
    rank: users.length+1,
    avatar: "https://crafatar.com/avatars/00000000-0000-0000-0000-000000000000?size=64&overlay",
    name: name,
    title: "Pemain Baru",
    points: 0,
    region: region,
    tiers: []
  });
  renderUsers();
  renderAdminUsersList();
  document.getElementById("adminMsg").textContent = "Pemain berhasil ditambahkan!";
}
function deleteUser(idx) {
  users.splice(idx, 1);
  renderUsers();
  renderAdminUsersList();
  document.getElementById("adminMsg").textContent = "Pemain dihapus!";
}
function addTier() {
  let tier = document.getElementById("tierInput").value.trim();
  if (!tier) {
    document.getElementById("adminMsg").textContent = "Isi nama tier!";
    return;
  }
  document.getElementById("adminMsg").textContent = "Tier ditambah! (dummy, update user manual)";
}

// ====== PENTING: PASANG SEMUA EVENT LISTENER JIKA HTML SUDAH DIMUAT ======
window.onload = function() {
  document.getElementById('openAdminBtn').onclick = openAdmin;
  document.getElementById('closeBtn1').onclick = closeAdmin;
  document.getElementById('closeBtn2').onclick = closeAdmin;
  document.getElementById('loginBtn').onclick = adminLogin;
  document.getElementById('addUserBtn').onclick = addUser;
  document.getElementById('addTierBtn').onclick = addTier;
};
