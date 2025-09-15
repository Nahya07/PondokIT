// ===============================
// Utility: Navigasi antar halaman
// ===============================
function showPage(pageId) {
    const pages = document.querySelectorAll('[id$="-page"]');
    pages.forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId + "-page").classList.remove('hidden');
}

// ===============================
// Role Selection & Feed
// ===============================
function showFeedPage(role) {
    console.log("Show feed page for:", role);
    if (role === 'public') {
        showPage("wali-dashboard");
        loadData();
    }
}

function handleRoleSelection(role) {
    if (role === 'wali') {
        showPage("access-code");
    } else if (role === 'guru') {
        showPage("pondok-login");
    }
}

// ===============================
// Tentang Aplikasi
// ===============================
function showAboutPage() {
    alert("SantriQ dibuat untuk memonitor hafalan santri ✨");
}

// ===============================
// Logout
// ===============================
function logout() {
    sessionStorage.clear();
    alert("Anda telah logout.");
    showPage("role-selection");
}

// ===============================
// Wali Dashboard & Jadwal Donasi
// ===============================
function showJadwalDonasiPage() {
    showPage("jadwal-donasi");
}
function goBackFromJadwal() {
    showPage("wali-dashboard");
}

// ===============================
// Guru Dashboard
// ===============================
function backToGuruDashboard() {
    showPage("guru-dashboard");
    loadData();
}

// ===============================
// Copy Helpers
// ===============================
function copyDonationNumber() {
    const el = document.getElementById("donation-number");
    if (!el) return;
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor donasi disalin: " + text);
    });
}

function copyAccessCode() {
    const el = document.getElementById("unique-access-code");
    if (!el) return;
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Kode akses disalin: " + text);
    });
}

// ===============================
// Password Toggle
// ===============================
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === "password") {
        input.type = "text";
        btn.querySelector("i").classList.remove("fa-eye");
        btn.querySelector("i").classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        btn.querySelector("i").classList.remove("fa-eye-slash");
        btn.querySelector("i").classList.add("fa-eye");
    }
}

// ===============================
// Theme Toggle
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const icon = document.getElementById("theme-icon");
            if (document.body.classList.contains("dark")) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }
        });
    }
});

// ===============================
// API Call Helpers
// ===============================
async function apiCall(url, data) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return { success: false, message: "Tidak bisa terhubung ke server" };
    }
}

// ===============================
// Data Loader (Guru & Santri)
// ===============================
async function loadData() {
    const pondokDbId = sessionStorage.getItem("pondokDbId");
    if (!pondokDbId) return;

    const result = await apiCall("/api/get-data", { pondokDbId });
    if (!result.success) {
        alert("Gagal memuat data: " + result.message);
        return;
    }

    // Render guru
    const guruList = result.data.guru;
    const guruContainer = document.getElementById("guru-santri-list");
    if (guruContainer) {
        guruContainer.innerHTML = "";
        guruList.forEach(g => {
            const div = document.createElement("div");
            div.className = "p-4 bg-gray-700 rounded-lg shadow text-center";
            div.innerHTML = `
                <p class="font-bold">${g.nama}</p>
                <p class="text-sm text-gray-300">Kelas: ${g.mengajar_kelas}</p>
                <button class="mt-2 px-3 py-1 bg-red-500 text-white rounded" onclick="deleteGuru(${g.id})">Hapus</button>
            `;
            guruContainer.appendChild(div);
        });
    }

    // Render santri
    const santriList = result.data.santri;
    if (guruContainer) {
        santriList.forEach(s => {
            const div = document.createElement("div");
            div.className = "p-4 bg-gray-700 rounded-lg shadow text-center";
            div.innerHTML = `
                <p class="font-bold">${s.nama}</p>
                <p class="text-sm text-gray-300">Kelas: ${s.kelas}</p>
                <button class="mt-2 px-3 py-1 bg-yellow-500 text-black rounded" onclick="editSantri(${s.id})">Edit</button>
                <button class="mt-2 px-3 py-1 bg-red-500 text-white rounded" onclick="deleteSantri(${s.id})">Hapus</button>
            `;
            guruContainer.appendChild(div);
        });
    }

    // Access Code
    const codeEl = document.getElementById("unique-access-code");
    if (codeEl) codeEl.innerText = result.data.uniqueAccessCode;
}

// ===============================
// Form: Register Pondok
// ===============================
const registerForm = document.getElementById("pondok-register-form");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pondokId = document.getElementById("register-pondok-id").value;
        const password = document.getElementById("register-password").value;
        const pondokName = pondokId.split("#")[0];

        const result = await apiCall("/api/register", {
            pondokId, password, pondokName
        });

        if (result.success) {
            alert("Pendaftaran berhasil! Kode akses: " + result.accessCode);
            showPage("pondok-login");
        } else {
            document.getElementById("register-error").innerText = result.message;
            document.getElementById("register-error").classList.remove("hidden");
        }
    });
}

// ===============================
// Form: Login Guru
// ===============================
const loginForm = document.getElementById("pondok-login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pondokId = document.getElementById("login-pondok-id").value;
        const password = document.getElementById("login-password").value;

        const result = await apiCall("/api/login", { pondokId, password });

        if (result.success) {
            sessionStorage.setItem("pondokDbId", result.pondokDbId);
            alert("Login berhasil: " + result.pondokName);
            showPage("guru-dashboard");
            loadData();
        } else {
            document.getElementById("pondok-login-error").innerText = result.message;
            document.getElementById("pondok-login-error").classList.remove("hidden");
        }
    });
}

// ===============================
// Form: Login Wali
// ===============================
const waliForm = document.getElementById("access-code-form");
if (waliForm) {
    waliForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const accessCode = document.getElementById("access-code").value;

        const result = await apiCall("/api/wali-login", { accessCode });

        if (result.success) {
            sessionStorage.setItem("pondokDbId", result.pondokDbId);
            alert("Login berhasil: " + result.pondokName);
            showPage("wali-dashboard");
            loadData();
        } else {
            document.getElementById("access-code-error").innerText = result.message;
            document.getElementById("access-code-error").classList.remove("hidden");
        }
    });
}

// ===============================
// CRUD Guru (Binding Form)
// ===============================
const guruForm = document.getElementById("guru-form");
if (guruForm) {
    guruForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nama = document.getElementById("guru-nama").value;
        const kelas = document.getElementById("guru-kelas").value;

        if (!nama || !kelas) {
            alert("Nama dan kelas guru wajib diisi!");
            return;
        }

        await saveGuru(nama, kelas);
        guruForm.reset();
    });
}

async function saveGuru(nama, kelas) {
    const pondokDbId = sessionStorage.getItem("pondokDbId");
    const result = await apiCall("/api/save-guru", {
        pondokId: pondokDbId,
        guruData: { nama, mengajar_kelas: kelas }
    });
    alert(result.message);
    loadData();
}

async function deleteGuru(id) {
    if (!confirm("Hapus guru ini?")) return;
    const result = await apiCall("/api/delete-guru", { guruId: id });
    alert(result.message);
    loadData();
}

// ===============================
// CRUD Santri (Binding Form)
// ===============================
const santriForm = document.getElementById("santri-form");
if (santriForm) {
    santriForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nama = document.getElementById("santri-nama").value;
        const kelas = document.getElementById("santri-kelas").value;

        if (!nama || !kelas) {
            alert("Nama dan kelas santri wajib diisi!");
            return;
        }

        await saveSantri({ nama, kelas });
        santriForm.reset();
    });
}

async function saveSantri(data) {
    const pondokDbId = sessionStorage.getItem("pondokDbId");
    const result = await apiCall("/api/save-santri", {
        pondokId: pondokDbId,
        santriData: data
    });
    alert(result.message);
    loadData();
}

async function deleteSantri(id) {
    if (!confirm("Hapus santri ini?")) return;
    const result = await apiCall("/api/delete-santri", { santriId: id });
    alert(result.message);
    loadData();
}

function editSantri(id) {
    alert("Form edit santri (id=" + id + ") belum diimplementasi penuh, tapi API sudah siap.");
}

// ===============================
// CRUD Hafalan
// ===============================
async function saveHafalan(data) {
    const pondokDbId = sessionStorage.getItem("pondokDbId");
    const result = await apiCall("/api/save-hafalan", {
        pondokId: pondokDbId,
        hafalanData: data
    });
    alert(result.message);
    loadData();
}

async function deleteHafalan(id) {
    if (!confirm("Hapus hafalan ini?")) return;
    const result = await apiCall("/api/delete-hafalan", { hafalanId: id });
    alert(result.message);
    loadData();
}
function renderFutureChart(data) {
    const container = d3.select("#hafalan-future-chart");
    container.selectAll("*").remove(); // bersihkan grafik lama

    if (!data || data.length === 0) {
        container.append("p")
            .attr("class", "text-center text-gray-400")
            .text("Belum ada data hafalan.");
        return;
    }

    const width = container.node().clientWidth;
    const height = container.node().clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.tanggal))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nilai)]).nice()
        .range([height - margin.bottom, margin.top]);

    // Garis dengan gradient neon
    const gradientId = "neon-gradient";
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%").attr("x2", "100%")
        .attr("y1", "0%").attr("y2", "0%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#00ffcc");
    gradient.append("stop").attr("offset", "50%").attr("stop-color", "#00aaff");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#ff00ff");

    const line = d3.line()
        .x(d => x(d.tanggal))
        .y(d => y(d.nilai))
        .curve(d3.curveMonotoneX);

    // Glow effect
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", `url(#${gradientId})`)
        .attr("stroke-width", 4)
        .attr("d", line)
        .style("filter", "url(#glow)");

    // Filter glow
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur")
        .attr("stdDeviation", "4")
        .attr("result", "blur");
    filter.append("feMerge").selectAll("feMergeNode")
        .data(["blur", "SourceGraphic"])
        .enter().append("feMergeNode")
        .attr("in", d => d);

    // Titik interaktif dengan pulse
    const nodes = svg.selectAll(".node")
        .data(data)
        .enter().append("circle")
        .attr("class", "node")
        .attr("cx", d => x(d.tanggal))
        .attr("cy", d => y(d.nilai))
        .attr("r", 6)
        .attr("fill", "#00ffff")
        .style("cursor", "pointer");

    nodes.on("mouseover", function (event, d) {
        d3.select(this)
            .transition().duration(300)
            .attr("r", 12)
            .attr("fill", "#ff00ff");
    }).on("mouseout", function (event, d) {
        d3.select(this)
            .transition().duration(300)
            .attr("r", 6)
            .attr("fill", "#00ffff");
    });

    // Axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%d %b")));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5));
}

