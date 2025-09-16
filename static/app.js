  <script>
// --- Semua Deklarasi Variabel dan Objek Global ---
const translations = {
    id: {
        app_title: "Monitoring Hafalan Santri",
        login_welcome: "السلام عليكم ورحمة الله وبركاته<br>Selamat Datang!",
        login_welcome_text: "Terima kasih sudah mengunjungi aplikasi monitoring hafalan kami. Semoga bermanfaat.",
        login_title: "Sistem Monitoring Hafalan",
        login_subtitle: "Silakan masukkan kode akses untuk melanjutkan.",
        access_code_placeholder: "Kode Akses Anda",
        login_button: "Masuk",
        login_error: "Kode yang Anda masukkan salah.",
        hadith_text: "\"Sebaik-baik kalian adalah orang<br>yang belajar Al-Qur'an dan mengajarkannya.\"",
        tooltip_realtime: "Monitoring Real-time",
        tooltip_guardian: "Akses Wali Santri",
        tooltip_report: "Laporan Terstruktur",
        footer_text: "Project dibuat oleh (MUHAMMAD NAHYA FADLALLAH) © 2025 All Rights Reserved",
        unique_code_copied: "Kode akses berhasil disalin!",
        complaint_info: "PUSAT BANTUAN"
    },
    en: {
        app_title: "Student Memorization Monitoring",
        login_welcome: "السلام عليكم ورحمة الله وبركاته<br>Welcome!",
        login_welcome_text: "Thank you for visiting our memorization monitoring application. We hope you find it useful.",
        login_title: "Memorization Monitoring System",
        login_subtitle: "Please enter the access code to continue.",
        access_code_placeholder: "Your Access Code",
        login_button: "Login",
        login_error: "The code you entered is incorrect.",
        hadith_text: "\"The best of you are those<br>who learn the Qur'an and teach it.\"",
        tooltip_realtime: "Real-time Monitoring",
        tooltip_guardian: "Guardian Access",
        tooltip_report: "Structured Reports",
        footer_text: "Project created by the team (muhammad nahya fadlallah)",
        unique_code_copied: "Access code copied successfully!",
        complaint_info: "Complaint Info"
    },
    ja: {
        app_title: "生徒の暗記モニタリング",
        login_welcome: "السلام عليكم ورحمة الله وبركاته<br>ようこそ！",
        login_welcome_text: "私たちの暗記モニタリングアプリケーションをご覧いただきありがとうございます。お役に立てば幸いです。",
        login_title: "暗記モニタリングシステム",
        login_subtitle: "続行するにはアクセスコードを入力してください。",
        access_code_placeholder: "アクセスコード",
        login_button: "ログイン",
        login_error: "入力したコードが間違っています。",
        hadith_text: "「あなた方の中で最も優れた者は<br>クルアーンを学び、それを教える者である。」",
        tooltip_realtime: "リアルタイムモニタリング",
        tooltip_guardian: "保護者アクセス",
        tooltip_report: "構造化レポート",
        footer_text: "プロジェクト作成者チーム (muhammad nahya fadlallah)",
        unique_code_copied: "アクセスコードが正常にコピーされました！",
        complaint_info: "苦情情報"
    },
    ar: {
        app_title: "مراقبة حفظ الطلاب",
        login_welcome: "السلام عليكم ورحمة الله وبركاته<br>أهلاً وسهلاً!",
        login_welcome_text: "شكراً لزيارتكم تطبيقنا لمراقبة الحفظ. نأمل أن يكون مفيداً لكم.",
        login_title: "نظام مراقبة الحفظ",
        login_subtitle: "الرجاء إدخال رمز الدخول للمتابعة.",
        access_code_placeholder: "رمز الدخول الخاص بك",
        login_button: "دخول",
        login_error: "الرمز الذي أدخلته غير صحيح.",
        hadith_text: "خيركم من تعلم القرآن وعلمه",
        tooltip_realtime: "مراقبة فورية",
        tooltip_guardian: "وصول ولي الأمر",
        tooltip_report: "تقارير منظمة",
        footer_text: "تم إنشاء المشروع بواسطة فريق (محمد نحيا فضل الله)",
        unique_code_copied: "تم نسخ رمز الدخول بنجاح!",
        complaint_info: "معلومات الشكوى"
    },
    ru: {
        app_title: "Мониторинг запоминания студентов",
        login_welcome: "السلام عليكم ورحمة الله وبركاته<br>Добро пожаловать!",
        login_welcome_text: "Спасибо, что посетили наше приложение для мониторинга запоминания. Надеемся, оно будет вам полезно.",
        login_title: "Система мониторинга запоминания",
        login_subtitle: "Пожалуйста, введите код доступа, чтобы продолжить.",
        access_code_placeholder: "Ваш код доступа",
        login_button: "Войти",
        login_error: "Вы ввели неверный код.",
        hadith_text: "\"Лучшими из вас являются те,<br>кто изучает Коран и учит ему других.\"",
        tooltip_realtime: "Мониторинг в реальном времени",
        tooltip_guardian: "Доступ для опекунов",
        tooltip_report: "Структурированные отчеты",
        footer_text: "Проект создан командой (мухаммад нахья фадлаллах)",
        unique_code_copied: "Код доступа успешно скопирован!",
        complaint_info: "Информация о жалобах"
    },
    jw: {
        app_title: "Monitoring Apalan Santri",
        login_welcome: "السلام عليكم ورحمة الله وبركاته<br>Sugeng Rawuh!",
        login_welcome_text: "Matur nuwun sampun ngunjungi aplikasi monitoring apalan kita. Mugi-mugi mupangati.",
        login_title: "Sistem Monitoring Apalan",
        login_subtitle: "Monggo ketik kode akses kangge nglanjutaken.",
        access_code_placeholder: "Kode Akses Panjenengan",
        login_button: "Mlebet",
        login_error: "Kode ingkang panjenengan ketik salah.",
        hadith_text: "\"Sak apik-apike sliramu yaiku wong<br>sing sinau Al-Qur'an lan ngajarake.\"",
        tooltip_realtime: "Monitoring Real-time",
        tooltip_guardian: "Akses Wali Santri",
        tooltip_report: "Laporan Rapi",
        footer_text: "Proyek digarap dening tim (muhammad nahya fadlallah)",
        unique_code_copied: "Kode akses kasil disalin!",
        complaint_info: "Info Pengaduan"
    }
};

const pages = {
    roleSelection: document.getElementById('role-selection-page'),
    pondokRegister: document.getElementById('pondok-register-page'),
    pondokLogin: document.getElementById('pondok-login-page'),
    accessCode: document.getElementById('access-code-page'),
    waliDashboard: document.getElementById('wali-dashboard-page'),
    detailSantri: document.getElementById('detail-santri-page'),
    guruDashboard: document.getElementById('guru-dashboard-page'),
    guruForm: document.getElementById('guru-form-page'),
    guruManagement: document.getElementById('guru-management-page'),
    jadwalDonasi: document.getElementById('jadwal-donasi-page'),
    about: document.getElementById('about-page'),
    feedPage: document.getElementById('feed-page')
};

let appDataCache = {};
let loginContext = null;
let alarmInterval = null;
let prayerTimesToday = {};

// --- Semua Fungsi-Fungsi Aplikasi Anda ---
// Fungsi renderFutureChart yang sudah diperbaiki
function renderFutureChart(data) {
    d3.select("#hafalan-future-chart svg").remove();
    const container = d3.select("#hafalan-future-chart");
    if (!container.node()) return; // Tambahkan pengecekan null
    const width = container.node().getBoundingClientRect().width;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const validData = data.filter(d => d && !isNaN(d.nilai) && d.tanggal instanceof Date);
    if (validData.length === 0) {
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "#ccc")
            .text("Tidak ada data untuk grafik.");
        return;
    }

    const x = d3.scaleTime()
        .domain(d3.extent(validData, d => d.tanggal))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(validData, d => d.nilai) + 5])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const area = d3.area()
        .x(d => x(d.tanggal))
        .y0(y(0))
        .y1(d => y(d.nilai));

    const line = d3.line()
        .x(d => x(d.tanggal))
        .y(d => y(d.nilai));

    const gradient = svg.append("defs").append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%").attr("x2", "0%")
        .attr("y1", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FFD700").attr("stop-opacity", 0.5);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#FFD700").attr("stop-opacity", 0);

    svg.append("path")
        .datum(validData)
        .attr("fill", "url(#area-gradient)")
        .attr("d", area);

    svg.append("path")
        .datum(validData)
        .attr("fill", "none")
        .attr("stroke", "#FFD700")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeWeek.every(1)).tickFormat(d3.timeFormat("%b %d")))
        .attr("color", "#ccc");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .attr("color", "#ccc");

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "#333")
        .style("border-radius", "5px")
        .style("padding", "8px")
        .style("color", "#fff")
        .style("pointer-events", "none")
        .style("opacity", 0);

    svg.selectAll("circle")
        .data(validData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.tanggal))
        .attr("cy", d => y(d.nilai))
        .attr("r", 5)
        .attr("fill", "#FFD700")
        .attr("stroke", "#1a1a1a")
        .attr("stroke-width", 2)
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1)
                .html(`<strong>Tanggal:</strong> ${d.tanggal.toLocaleDateString('id-ID')}<br><strong>Setoran:</strong> ${d.nilai}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
    if (translations[lang] && translations[lang].app_title) {
        document.title = translations[lang].app_title;
    }
    localStorage.setItem('selectedLanguage', lang);
}

function showPage(pageName) {
    Object.values(pages).forEach(page => {
        if (page) {
            page.classList.add('hidden');
            page.classList.remove('flex');
        }
    });
    if (pages[pageName]) {
        pages[pageName].classList.remove('hidden');
        pages[pageName].classList.add('flex');
    }
}
function showHomePage() {
    showPage('roleSelection');
}

function checkLoginState() {
    const role = sessionStorage.getItem('role');
    const pondokDbId = sessionStorage.getItem('currentPondokId');
    if (role && pondokDbId) {
        if (role === 'guru') {
            renderGuruDashboard();
            showPage('guruDashboard');
        } else if (role === 'wali') {
            renderWaliDashboard();
            showPage('waliDashboard');
        }
    } else {
        showPage('roleSelection');
    }
}

function goBackFromJadwal() {
    const role = sessionStorage.getItem('role');
    if (role === 'guru') {
        backToGuruDashboard();
    } else if (role === 'wali') {
        backToWaliDashboard();
    } else {
        showPage('roleSelection');
    }
}

function backToWaliDashboard() {
    renderWaliDashboard();
    showPage('waliDashboard');
}

function backToGuruDashboard() {
    renderGuruDashboard();
    showPage('guruDashboard');
}

function backFromFeed() {
    const role = sessionStorage.getItem('role');
    if (role === 'guru') {
        showPage('guruDashboard');
    } else if (role === 'wali') {
        showPage('waliDashboard');
    } else {
        showPage('roleSelection');
    }
}

function showToast(type, message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `p-4 mb-3 rounded-lg shadow-xl text-white transform transition-all duration-300 translate-x-full opacity-0`;
    
    let bgColor = '';
    if (type === 'success') {
        bgColor = 'bg-green-500';
    } else if (type === 'error') {
        bgColor = 'bg-red-500';
    } else if (type === 'info') {
        bgColor = 'bg-blue-500';
    } else if (type === 'notification') {
        bgColor = 'bg-yellow-400';
    }
    
    toast.classList.add(bgColor);
    toast.innerHTML = `<div class="flex items-center"><div class="flex-shrink-0"><i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} mr-2"></i></div><div><p class="font-bold">${message}</p></div></div>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
        toast.classList.add('translate-x-0', 'opacity-100');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('translate-x-0', 'opacity-100');
        toast.classList.add('translate-x-full', 'opacity-0');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 5000);
}

function copyAccessCode() {
    const codeEl = document.getElementById('unique-access-code');
    const range = document.createRange();
    range.selectNode(codeEl);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('success', translations[localStorage.getItem('selectedLanguage') || 'id'].unique_code_copied);
        }
    } catch (err) {
        console.error('Failed to copy text:', err);
        showToast('error', "Gagal menyalin kode. Silakan salin manual: " + codeEl.textContent);
    }
    window.getSelection().removeAllRanges();
}

function copyDonationNumber() {
    const numberEl = document.getElementById('donation-number');
    const range = document.createRange();
    range.selectNode(numberEl);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('success', 'Nomor telepon berhasil disalin!');
        }
    } catch (err) {
        console.error('Failed to copy text:', err);
        showToast('error', "Gagal menyalin nomor. Silakan salin manual: " + numberEl.textContent);
    }
    window.getSelection().removeAllRanges();
}

async function fetchData() {
    const pondokDbId = sessionStorage.getItem('currentPondokId');
    if (!pondokDbId) return null;
    if (appDataCache[pondokDbId]) {
        return appDataCache[pondokDbId];
    }
    try {
        const response = await fetch('/api/get-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pondokDbId: pondokDbId })
        });
        const result = await response.json();
        if (result.success) {
            appDataCache[pondokDbId] = result.data;
            return appDataCache[pondokDbId];
        } else {
            console.error("Gagal mengambil data dari server:", result.message);
            return null;
        }
    } catch (error) {
        console.error("Gagal mengirim data ke server:", error);
        return null;
    }
}

async function saveData(endpoint, payload) {
    const currentPondokId = sessionStorage.getItem('currentPondokId');
    if (!currentPondokId) {
        showToast('error', "Sesi login berakhir. Silakan login kembali.");
        logout();
        return false;
    }
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.success) {
            appDataCache = {};
            return true;
        } else {
            console.error("Gagal menyimpan data:", result.message);
            showToast('error', "Gagal menyimpan data: " + result.message);
            return false;
        }
    } catch (error) {
        console.error("Gagal mengirim data ke server:", error);
        showToast('error', "Error koneksi ke server.");
        return false;
    }
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch('/unggah', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            return result.file_url;
        } else {
            showToast('error', 'Gagal mengunggah foto: ' + result.message);
            return null;
        }
    } catch (error) {
        showToast('error', 'Error koneksi saat mengunggah foto.');
        return null;
    }
}

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.log("Browser ini tidak mendukung notifikasi desktop");
    } else if (Notification.permission === "granted") {
        console.log("Izin notifikasi sudah diberikan.");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                showToast('info', "Notifikasi diaktifkan!");
            }
        });
    }
}

function sendNotification(title, body) {
    if (Notification.permission === "granted") {
        const options = {
            body: body,
            icon: 'https://placehold.co/64x64/2a9d8f/ffffff?text=SQ'
        };
        const notification = new Notification(title, options);
        notification.onclick = function(event) {
            event.preventDefault();
            window.focus();
        }
    } else {
        console.log("Izin notifikasi tidak diberikan.");
    }
}

function sendNotificationToGuardian(santriName, setoran, penilaian) {
    sendNotification("Update Hafalan Santri", `${santriName} telah selesai menyetorkan hafalannya. Setoran: ${setoran}. Penilaian: ${penilaian}.`);
}

function sendNewPostNotification(author, mediaType) {
    sendNotification("Postingan Baru", `Postingan baru dari ${author} telah ditambahkan. Yuk, cek sekarang!`);
}

function handleRoleSelection(role) {
    loginContext = role;
    if (role === 'wali') {
        showPage('accessCode');
    } else if (role === 'guru') {
        showPage('pondokLogin');
    }
}

function logout() {
    sessionStorage.clear();
    loginContext = null;
    const accessCodeInput = document.getElementById('access-code');
    if (accessCodeInput) {
        accessCodeInput.value = '';
    }
    const pondokLoginForm = document.getElementById('pondok-login-form');
    if (pondokLoginForm) {
        pondokLoginForm.reset();
    }
    showPage('roleSelection');
}

async function renderWaliDashboard() {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.santri) return;
    const kelasListContainer = document.getElementById('kelas-list-container');
    const santriListContainer = document.getElementById('santri-list-container');
    if (kelasListContainer) kelasListContainer.classList.remove('hidden');
    if (santriListContainer) santriListContainer.classList.add('hidden');
    const kelasGrid = document.getElementById('kelas-grid');
    if (!kelasGrid) return;
    kelasGrid.innerHTML = '';
    
    const uniqueKelas = [...new Set(pondokData.santri.map(s => s.kelas))].sort();
    
    uniqueKelas.forEach(kelas => {
        const card = document.createElement('div');
        card.className = 'text-center cursor-pointer p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1';
        card.innerHTML = `<div class="flex items-center justify-center mb-4 text-4xl text-yellow-400"><i class="fas fa-mosque"></i></div><h3 class="text-xl font-bold text-yellow-400">Kelas ${kelas}</h3><p class="text-sm text-gray-400 mt-2">Lihat daftar santri</p>`;
        card.onclick = () => showSantriListByKelas(kelas);
        kelasGrid.appendChild(card);
    });
}

function showSantriListByKelas(kelas) {
    const pondokData = appDataCache[sessionStorage.getItem('currentPondokId')];
    if (!pondokData) return;
    
    const filteredSantri = pondokData.santri.filter(s => s.kelas === kelas).sort((a, b) => a.nama.localeCompare(b.nama));
    
    const kelasListContainer = document.getElementById('kelas-list-container');
    const santriListContainer = document.getElementById('santri-list-container');
    const currentClassTitle = document.getElementById('current-class-title');
    const santriGallery = document.getElementById('santri-gallery');
    
    if (kelasListContainer) kelasListContainer.classList.add('hidden');
    if (santriListContainer) santriListContainer.classList.remove('hidden');
    if (currentClassTitle) currentClassTitle.textContent = `Daftar Santri Kelas ${kelas}`;
    
    sessionStorage.setItem('currentWaliKelas', kelas);
    
    if (santriGallery) {
        santriGallery.innerHTML = '';
        if (filteredSantri.length === 0) {
            santriGallery.innerHTML = '<p class="text-center text-gray-500 py-10">Tidak ada santri di kelas ini.</p>';
        } else {
            filteredSantri.forEach(santri => {
                const fotoUrl = santri.foto || 'https://placehold.co/400x400?text=No+Photo';
                const card = document.createElement('div');
                card.className = 'text-center cursor-pointer group santri-card';
                card.dataset.name = santri.nama;
                card.innerHTML = `
                    <div class="relative">
                        <img src="${fotoUrl}" alt="Foto ${santri.nama}" class="w-full h-auto aspect-square rounded-full object-cover transition-transform duration-300 group-hover:scale-105 border-4 border-yellow-400 shadow-lg" onerror="this.onerror=null;this.src='https://placehold.co/400x400?text=Error';">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-300 flex items-center justify-center">
                            <span class="text-white opacity-0 group-hover:opacity-100 font-bold">Lihat Detail</span>
                        </div>
                    </div>
                    <p class="mt-4 font-semibold text-gray-200">${santri.nama}</p>
                    <p class="text-sm text-gray-400">Kelas ${santri.kelas}</p>
                `;
                card.onclick = () => showSantriDetail(santri.id);
                santriGallery.appendChild(card);
            });
        }
    }
}

async function showSantriDetail(santriId) {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.santri) {
        console.error("Gagal memuat data pondok.");
        showPage('waliDashboard');
        showToast('error', "Gagal memuat detail santri. Silakan coba lagi.");
        return;
    }
    
    const santri = pondokData.santri.find(s => s.id === santriId);
    if (!santri) {
        console.error("Santri tidak ditemukan di data.");
        showPage('waliDashboard');
        showToast('error', "Santri tidak ditemukan.");
        return;
    }
    
    sessionStorage.setItem('currentWaliKelas', santri.kelas);
    const guru = pondokData.guru.find(g => g.mengajar_kelas === santri.kelas);
    const hafalan = pondokData.hafalan
        .filter(h => h.santri_id === santriId)
        .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    
    document.getElementById('detail-foto').src = santri.foto || 'https://placehold.co/400x400?text=No+Photo';
    document.getElementById('detail-nama').textContent = santri.nama;
    document.getElementById('detail-kelas').textContent = `Kelas ${santri.kelas}`;
    document.getElementById('detail-pengajar').textContent = guru ? `Pengajar: ${guru.nama}` : 'Pengajar belum diatur';
    
    const statusEl = document.getElementById('detail-status-target');
    if (santri.tercapai) {
        statusEl.className = 'mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800';
        statusEl.innerHTML = `✅ Mencapai Target`;
    } else {
        statusEl.className = 'mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800';
        statusEl.innerHTML = `⚠️ Belum Mencapai Target`;
    }
    
    const target = santri.target || {};
    const totalHafalanJuzEl = document.getElementById('total-hafalan-juz');
    if (totalHafalanJuzEl) totalHafalanJuzEl.textContent = santri.total_hafalan_juz || '-';
    const targetHarianEl = document.getElementById('target-harian');
    if (targetHarianEl) targetHarianEl.textContent = target.harian || '-';
    const targetMingguanEl = document.getElementById('target-mingguan');
    if (targetMingguanEl) targetMingguanEl.textContent = target.mingguan || '-';
    const targetBulananEl = document.getElementById('target-bulanan');
    if (targetBulananEl) targetBulananEl.textContent = target.bulanan || '-';
    const targetTahunanEl = document.getElementById('target-tahunan');
    if (targetTahunanEl) targetTahunanEl.textContent = target.tahunan || '-';
    
    const chartData = hafalan.map(h => ({
        tanggal: new Date(h.tanggal),
        nilai: h.setoran.length // Anda mungkin perlu menyesuaikan ini
    }));
    renderFutureChart(chartData);
    
    const historyBody = document.getElementById('hafalan-history');
    if (historyBody) {
        historyBody.innerHTML = '';
        if (hafalan.length > 0) {
            hafalan.forEach(h => {
                const row = historyBody.insertRow();
                row.innerHTML = `<td class="py-4 px-6 text-sm text-gray-200">${new Date(h.tanggal).toLocaleDateString('id-ID')}</td><td class="py-4 px-6 text-sm text-gray-200 font-medium">${h.setoran}</td><td class="py-4 px-6 text-sm text-gray-400">${h.jenis}</td><td class="py-4 px-6 text-sm"><span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${h.penilaian === 'Lancar' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${h.penilaian}</span></td>`;
            });
        } else {
            historyBody.innerHTML = '<tr><td colspan="4" class="text-center py-8 text-gray-400">Belum ada riwayat setoran.</td></tr>';
        }
    }
    showPage('detailSantri');
}

async function renderGuruDashboard() {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.santri) return;
    const uniqueAccessCodeElement = document.getElementById('unique-access-code');
    if (uniqueAccessCodeElement) {
        uniqueAccessCodeElement.textContent = pondokData.uniqueAccessCode || 'Tidak ada kode';
    }
    const whatsappLinkElement = document.getElementById('whatsapp-link');
    if (whatsappLinkElement) {
        whatsappLinkElement.href = `https://wa.me/?text=${encodeURIComponent('Halo, wali santri! Berikut adalah kode akses unik untuk monitoring hafalan anak Anda: ' + pondokData.uniqueAccessCode)}`;
    }
    const listContainer = document.getElementById('guru-santri-list');
    if (listContainer) {
        listContainer.innerHTML = '';
        pondokData.santri.sort((a, b) => a.nama.localeCompare(b.nama)).forEach(santri => {
            const item = document.createElement('div');
            item.className = 'bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center cursor-pointer';
            item.innerHTML = `<img src="${santri.foto}" alt="${santri.nama}" class="w-16 h-16 rounded-full object-cover mb-2" onerror="this.onerror=null;this.src='https://placehold.co/400x400?text=Error';"><p class="font-bold text-gray-100">${santri.nama}</p><p class="text-sm text-gray-400 mb-2">Kelas ${santri.kelas}</p><div class="flex space-x-2"><button onclick="showGuruForm(${santri.id})" class="px-2 py-1 text-xs font-semibold text-black bg-yellow-400 rounded-md hover:bg-yellow-500">Ubah Data</button><button onclick="deleteSantri(${santri.id})" class="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Hapus</button></div>`;
            item.onclick = () => showGuruForm(santri.id);
            listContainer.appendChild(item);
        });
    }
}

async function showGuruForm(santriId) {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.santri) {
        console.error("Data pondok tidak ditemukan atau tidak memiliki properti 'santri'.");
        showToast('error', "Gagal memuat data santri. Silakan coba lagi.");
        return;
    }
    const form = document.getElementById('santri-form');
    if (form) form.reset();
    const hafalanSection = document.getElementById('hafalan-management-section');
    if (hafalanSection) hafalanSection.classList.add('hidden');
    const santriIdInput = document.getElementById('santri-id');
    if (santriIdInput) santriIdInput.value = santriId || '';
    const fotoStatus = document.getElementById('foto-status');

    if (santriId) {
        const santri = pondokData.santri.find(s => s.id === santriId);
        if (!santri) {
            console.error(`Santri dengan ID ${santriId} tidak ditemukan.`);
            showToast('error', "Santri tidak ditemukan.");
            return;
        }
        const formTitle = document.getElementById('form-title');
        if (formTitle) formTitle.textContent = `Ubah Data: ${santri.nama}`;
        const namaInput = document.getElementById('nama');
        if (namaInput) namaInput.value = santri.nama;
        const kelasSelect = document.getElementById('kelas');
        if (kelasSelect) kelasSelect.value = santri.kelas;
        const totalHafalanJuzInput = document.getElementById('total-hafalan-juz').value;
        const totalHafalanJuz = totalHafalanJuzInput === '' ? null : parseInt(totalHafalanJuzInput, 10);
        
        const currentPhotoUrl = document.getElementById('current-photo-url');
        if (currentPhotoUrl) currentPhotoUrl.value = santri.foto || '';
        if (fotoStatus) fotoStatus.textContent = santri.foto ? 'Foto sudah ada, tidak perlu diunggah lagi.' : 'Belum ada foto. Unggah sekarang.';

        const target = santri.target || {};
        const formTargetHarian = document.getElementById('form-target-harian');
        if (formTargetHarian) formTargetHarian.value = target.harian || '';
        const formTargetMingguan = document.getElementById('form-target-mingguan');
        if (formTargetMingguan) formTargetMingguan.value = target.mingguan || '';
        const formTargetBulanan = document.getElementById('form-target-bulanan');
        if (formTargetBulanan) formTargetBulanan.value = target.bulanan || '';
        const formTargetTahunan = document.getElementById('form-target-tahunan');
        if (formTargetTahunan) formTargetTahunan.value = target.tahunan || '';
        const checkedRadio = document.querySelector(`input[name="tercapai"][value="${santri.tercapai}"]`);
        if (checkedRadio) {
            checkedRadio.checked = true;
        }

        if (hafalanSection) hafalanSection.classList.remove('hidden');
        renderGuruHafalanTable(santriId);
    } else {
        const formTitle = document.getElementById('form-title');
        if (formTitle) formTitle.textContent = 'Tambah Santri Baru';
        if (fotoStatus) fotoStatus.textContent = 'Unggah foto baru untuk santri ini.';
    }
    showPage('guruForm');
}

async function deleteSantri(santriId) {
    const result = confirm('Apakah Anda yakin ingin menghapus data santri ini? Semua data hafalan yang terkait juga akan dihapus.');
    if (result) {
        const saveSuccess = await saveData('/api/delete-santri', { santriId });
        if (saveSuccess) {
            showToast('success', 'Data santri berhasil dihapus!');
            renderGuruDashboard();
        } else {
            showToast('error', "Gagal menghapus data di server.");
        }
    }
}

async function showGuruManagementPage() {
    const guruForm = document.getElementById('guru-form');
    if (guruForm) guruForm.reset();
    const guruIdInput = document.getElementById('guru-id');
    if (guruIdInput) guruIdInput.value = '';
    await renderGuruList();
    showPage('guruManagement');
}

async function renderGuruList() {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.guru) return;
    const tableBody = document.getElementById('guru-list-table');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    pondokData.guru.sort((a, b) => a.nama.localeCompare(b.nama)).forEach(guru => {
        const row = tableBody.insertRow();
        row.innerHTML = `<td class="py-4 px-6 text-sm font-medium text-gray-100">${guru.nama}</td><td class="py-4 px-6 text-sm text-gray-400">${guru.mengajar_kelas}</td><td class="py-4 px-6 text-sm font-medium space-x-2"><button onclick="editGuru(${guru.id})" class="text-yellow-400 hover:text-yellow-500">Ubah</button><button onclick="deleteGuru(${guru.id})" class="text-red-600 hover:text-red-700">Hapus</button></td>`;
    });
}

// Tambahkan kode fungsi-fungsi ini di sini
function togglePasswordVisibility(inputId, toggleButton) {
    const input = document.getElementById(inputId);
    const eyeIcon = `<i class="fas fa-eye text-gray-500"></i>`;
    const eyeSlashIcon = `<i class="fas fa-eye-slash text-gray-500"></i>`;
    if (input.type === "password") {
        input.type = "text";
        toggleButton.innerHTML = eyeSlashIcon;
    } else {
        input.type = "password";
        toggleButton.innerHTML = eyeIcon;
    }
}
function showAboutPage() { showPage('about'); }
function playWelcomeAnimation() {
    const modal = document.getElementById('welcome-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    const title = document.getElementById('welcome-title');
    const subtitle = document.getElementById('welcome-subtitle');
    const message = document.getElementById('welcome-message');
    setTimeout(() => { title.classList.remove('-translate-y-10', 'opacity-0'); title.classList.add('translate-y-0', 'opacity-100'); }, 100);
    setTimeout(() => { subtitle.classList.remove('translate-y-10', 'opacity-0'); subtitle.classList.add('translate-y-0', 'opacity-100'); }, 600);
    setTimeout(() => { message.classList.remove('translate-y-10', 'opacity-0'); message.classList.add('translate-y-0', 'opacity-100'); }, 1100);
    setTimeout(() => { modal.classList.add('hidden'); showPage('roleSelection'); }, 3000);
}
function showJadwalDonasiPage() { fetchJadwalSholat(); showPage('jadwalDonasi'); }
function getCoordinates() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
                error => reject(error)
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}
async function fetchJadwalSholat() {
    const container = document.getElementById('jadwal-sholat-container');
    const lokasiEl = document.getElementById('jadwal-lokasi');
    if (!container || !lokasiEl) return;
    container.innerHTML = `<div class="col-span-full text-center">Memuat...</div>`;
    let latitude = -6.2088;
    let longitude = 106.8456;
    let locationName = "Jakarta, Indonesia";
    try {
        const coords = await getCoordinates();
        latitude = coords.latitude;
        longitude = coords.longitude;
        const geoNameResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`);
        if (geoNameResponse.ok) {
            const geoNameData = await geoNameResponse.json();
            locationName = `${geoNameData.city || geoNameData.locality}, ${geoNameData.countryName}`;
        } else {
            locationName = "Lokasi Anda Saat Ini";
        }
    } catch (error) {
        console.warn("Gagal mendapatkan lokasi GPS, menggunakan lokasi default (Jakarta).", error);
    }
    lokasiEl.textContent = `Untuk wilayah ${locationName} dan sekitarnya.`;
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${locationName}&country=${locationName.split(',')[1].trim()}&method=8`);
        if (!response.ok) throw new Error(`API Waktu Solat Error: ${response.status}`);
        const data = await response.json();
        const todayTimings = data.data.timings;
        container.innerHTML = '';
        const jadwalPenting = {
            'Subuh': todayTimings.Fajr,
            'Zuhur': todayTimings.Dhuhr,
            'Asar': todayTimings.Asr,
            'Magrib': todayTimings.Maghrib,
            'Isya': todayTimings.Isha,
            'Imsak': todayTimings.Imsak,
        };
        prayerTimesToday = {
            'Fajr': todayTimings.Fajr.substring(0, 5),
            'Dhuhr': todayTimings.Dhuhr.substring(0, 5),
            'Asr': todayTimings.Asr.substring(0, 5),
            'Maghrib': todayTimings.Maghrib.substring(0, 5),
            'Isha': todayTimings.Isha.substring(0, 5),
        };
        for (const [nama, waktu] of Object.entries(jadwalPenting)) {
            container.innerHTML += `<div class="bg-gray-700 p-4 rounded-lg shadow-sm text-center"><p class="font-semibold text-yellow-400">${nama}</p><p class="text-2xl font-bold text-white">${waktu.substring(0, 5)}</p></div>`;
        }
        setupPrayerAlarm();
    } catch (error) {
        container.innerHTML = `<div class="col-span-full text-center text-red-500">Gagal memuat jadwal solat. Pastikan anda mempunyai sambungan internet.</div>`;
        console.error("Error fetching prayer times:", error);
    }
}
function handleAlarmToggleChange() {
    const isChecked = document.getElementById('alarm-toggle').checked;
    localStorage.setItem('alarmEnabled', isChecked);
    if (isChecked) {
        const audio = document.getElementById('azan-alarm');
        audio.play().then(() => audio.pause()).catch(e => console.log("User interaction needed to play audio."));
        setupPrayerAlarm();
        showToast('info', 'Alarm Azan diaktifkan. Notifikasi akan muncul saat waktu salat tiba.');
    } else {
        if (alarmInterval) clearInterval(alarmInterval);
        showToast('info', 'Alarm Azan dinonaktifkan.');
    }
}
function setupPrayerAlarm() {
    if (alarmInterval) clearInterval(alarmInterval);
    const alarmEnabled = localStorage.getItem('alarmEnabled') === 'true';
    if (!alarmEnabled) return;
    alarmInterval = setInterval(checkPrayerTimes, 30000);
}
function checkPrayerTimes() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    for (const [prayer, time] of Object.entries(prayerTimesToday)) {
        if (time === currentTime) {
            const prayerName = { Fajr: "Subuh", Dhuhr: "Zuhur", Asr: "Asar", Maghrib: "Magrib", Isha: "Isya" }[prayer];
            playAlarm(prayerName);
        }
    }
}
function playAlarm(prayerName) {
    const audio = document.getElementById('azan-alarm');
    audio.play().catch(e => {
        console.error("Gagal memutar audio alarm:", e);
        const notification = document.getElementById('alarm-notification');
        document.getElementById('alarm-text').textContent = `Waktu Salat ${prayerName} telah tiba.`;
        notification.classList.remove('hidden');
        setTimeout(() => dismissAlarm(), 5000);
    });
    const notification = document.getElementById('alarm-notification');
    document.getElementById('alarm-text').textContent = `Telah Masuk Waktu Salat ${prayerName}`;
    notification.classList.remove('hidden');
    setTimeout(() => dismissAlarm(), 300000);
}
function dismissAlarm() {
    const audio = document.getElementById('azan-alarm');
    audio.pause();
    audio.currentTime = 0;
    const notification = document.getElementById('alarm-notification');
    notification.classList.add('hidden');
}
function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'dark') {
        body.classList.add('dark');
        if (themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
    } else {
        body.classList.remove('dark');
        if (themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
    }
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}
function showSantriListByKelas(kelas) {
    const pondokData = appDataCache[sessionStorage.getItem('currentPondokId')];
    if (!pondokData) return;
    const filteredSantri = pondokData.santri.filter(s => s.kelas === kelas).sort((a, b) => a.nama.localeCompare(b.nama));
    const kelasListContainer = document.getElementById('kelas-list-container');
    const santriListContainer = document.getElementById('santri-list-container');
    const currentClassTitle = document.getElementById('current-class-title');
    const santriGallery = document.getElementById('santri-gallery');
    if (kelasListContainer) kelasListContainer.classList.add('hidden');
    if (santriListContainer) santriListContainer.classList.remove('hidden');
    if (currentClassTitle) currentClassTitle.textContent = `Daftar Santri Kelas ${kelas}`;
    sessionStorage.setItem('currentWaliKelas', kelas);
    if (santriGallery) {
        santriGallery.innerHTML = '';
        if (filteredSantri.length === 0) {
            santriGallery.innerHTML = '<p class="text-center text-gray-500 py-10">Tidak ada santri di kelas ini.</p>';
        } else {
            filteredSantri.forEach(santri => {
                const fotoUrl = santri.foto || 'https://placehold.co/400x400?text=No+Photo';
                const card = document.createElement('div');
                card.className = 'text-center cursor-pointer group santri-card';
                card.dataset.name = santri.nama;
                card.innerHTML = `<div class="relative"><img src="${fotoUrl}" alt="Foto ${santri.nama}" class="w-full h-auto aspect-square rounded-full object-cover transition-transform duration-300 group-hover:scale-105 border-4 border-yellow-400 shadow-lg" onerror="this.onerror=null;this.src='https://placehold.co/400x400?text=Error';"><div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-300 flex items-center justify-center"><span class="text-white opacity-0 group-hover:opacity-100 font-bold">Lihat Detail</span></div></div><p class="mt-4 font-semibold text-gray-200">${santri.nama}</p><p class="text-sm text-gray-400">Kelas ${santri.kelas}</p>`;
                card.onclick = () => showSantriDetail(santri.id);
                santriGallery.appendChild(card);
            });
        }
    }
}
async function editGuru(guruId) {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.guru) return;
    const guru = pondokData.guru.find(g => g.id === guruId);
    if (guru) {
        document.getElementById('guru-id').value = guru.id;
        document.getElementById('guru-nama').value = guru.nama;
        document.getElementById('guru-kelas').value = guru.mengajar_kelas;
        window.scrollTo(0, 0);
    }
}

async function deleteGuru(guruId) {
    const result = confirm('Apakah Anda yakin ingin menghapus data guru ini?');
    if (!result) return;
    const pondokId = sessionStorage.getItem('currentPondokId');
    const saveSuccess = await saveData('/api/delete-guru', { pondokId, guruId });
    if (saveSuccess) {
        showToast('success', 'Data guru berhasil dihapus!');
        renderGuruList();
    } else {
        showToast('error', "Gagal menghapus data guru.");
    }
}

async function renderGuruHafalanTable(santriId) {
    const pondokData = await fetchData();
    if (!pondokData || !pondokData.hafalan) return;
    const tableBody = document.getElementById('guru-hafalan-table');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const hafalanList = pondokData.hafalan.filter(h => h.santri_id === santriId).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    if (hafalanList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">Belum ada setoran.</td></tr>';
        return;
    }
    hafalanList.forEach(h => {
        const row = tableBody.insertRow();
        row.innerHTML = `<td class="py-2 px-4">${h.tanggal}</td><td class="py-2 px-4 font-medium">${h.setoran}</td><td class="py-2 px-4">${h.jenis}</td><td class="py-2 px-4">${h.penilaian}</td><td class="py-2 px-4"><button onclick="deleteHafalan(${h.id}, ${santriId})" class="text-red-500 hover:text-red-700">Hapus</button></td>`;
    });
}
async function deleteHafalan(hafalanId, santriId) {
    const result = confirm('Apakah Anda yakin ingin menghapus setoran hafalan ini?');
    if (!result) return;
    const pondokId = sessionStorage.getItem('currentPondokId');
    const saveSuccess = await saveData('/api/delete-hafalan', { pondokId, hafalanId });
    if (saveSuccess) {
        showToast('success', 'Setoran hafalan berhasil dihapus!');
        renderGuruHafalanTable(santriId);
    } else {
        showToast('error', "Gagal menghapus setoran hafalan.");
    }
}
function showPostForm() { document.getElementById('post-form-modal').classList.remove('hidden'); }
function closePostForm() {
    document.getElementById('post-form-modal').classList.add('hidden');
    document.getElementById('new-post-form').reset();
}
async function renderFeed() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;
    feedContainer.innerHTML = '';
    
    const allPondokData = appDataCache;
    const allPosts = Object.values(allPondokData).flatMap(data => data.posts || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (allPosts.length === 0) {
        feedContainer.innerHTML = '<p class="text-center text-gray-400 py-10">Belum ada postingan. Jadilah yang pertama membuat postingan!</p>';
        return;
    }

    allPosts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'bg-gray-800 p-4 rounded-xl shadow-lg relative';
        
        let mediaHtml = '';
        if (post.mediaType === 'image') {
            mediaHtml = `<img src="${post.mediaUrl}" alt="Post Media" class="w-full rounded-lg my-4">`;
        } else if (post.mediaType === 'video') {
            mediaHtml = `<video src="${post.mediaUrl}" controls class="w-full rounded-lg my-4"></video>`;
        }
        
        postEl.innerHTML = `<div class="flex items-center space-x-4 mb-4"><div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">${post.author.charAt(0)}</div><div><p class="font-bold text-gray-100">${post.author}</p><p class="text-xs text-gray-400">${new Date(post.timestamp).toLocaleString('id-ID')}</p></div>${sessionStorage.getItem('role') === 'guru' ? `<button onclick="deletePost(${post.id})" class="ml-auto text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>` : ''}</div><p class="text-gray-300 mb-4">${post.text}</p>${mediaHtml}<div class="flex items-center space-x-4 mt-4 text-gray-400"><button onclick="likePost(${post.id})" class="flex items-center space-x-1 hover:text-yellow-400"><i class="fa-solid fa-heart"></i><span>${post.likes}</span></button><button onclick="sharePost(${post.id})" class="flex items-center space-x-1 hover:text-yellow-400"><i class="fa-solid fa-share"></i></button><div class="flex-grow"></div><button onclick="toggleComments(${post.id})" class="flex items-center space-x-1 hover:text-yellow-400"><i class="fa-solid fa-comment"></i><span>${post.comments ? post.comments.length : 0}</span></button></div><div id="comments-container-${post.id}" class="comments-container hidden mt-4 border-t border-gray-700 pt-4"><div id="comment-list-${post.id}" class="space-y-2"></div><form onsubmit="addComment(event, ${post.id})" class="mt-4 flex space-x-2"><input type="text" id="comment-input-${post.id}" placeholder="Tulis komentar..." class="flex-grow p-2 border rounded-md bg-gray-700 text-gray-200"><button type="submit" class="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">Kirim</button></form></div>`;
        feedContainer.appendChild(postEl);
        if (post.comments) {
            renderComments(post.id, post.comments);
        }
    });
}
function renderComments(postId, comments) {
    const commentList = document.getElementById(`comment-list-${postId}`);
    if (!commentList) return;
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'p-2 bg-gray-700 rounded-lg';
        commentEl.innerHTML = `<p class="font-semibold text-sm text-gray-100">${comment.author}</p><p class="text-sm text-gray-300">${comment.text}</p>`;
        commentList.appendChild(commentEl);
    });
}
function toggleComments(postId) {
    const commentsContainer = document.getElementById(`comments-container-${postId}`);
    if (commentsContainer) {
        commentsContainer.classList.toggle('hidden');
    }
}
async function likePost(postId) {
    const success = await saveData('/api/like-post', { postId });
    if (success) {
        renderFeed();
    } else {
        showToast('error', 'Gagal menyukai postingan.');
    }
}
async function addComment(event, postId) {
    event.preventDefault();
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value;
    if (!commentText) return;
    
    const commentData = {
        postId: postId,
        author: sessionStorage.getItem('pondokName') || 'Wali Santri',
        text: commentText,
        timestamp: new Date().toISOString()
    };

    const success = await saveData('/api/add-comment', commentData);
    if (success) {
        renderFeed();
        commentInput.value = '';
    } else {
        showToast('error', 'Gagal menambahkan komentar.');
    }
}
function sharePost(postId) {
    const pondokData = appDataCache[sessionStorage.getItem('currentPondokId')];
    const post = pondokData.posts.find(p => p.id === postId);
    if (!post) return;
    
    const shareText = `Lihat postingan terbaru dari ${post.author} di Aplikasi SantriQ!\n\n"${post.text}"\n\n${post.mediaUrl || ''}`;
    const shareUrl = `https://santriq.app/post/${postId}`;
    
    if (navigator.share) {
        navigator.share({ title: 'Postingan SantriQ', text: shareText, url: shareUrl }).catch(error => console.error('Error sharing:', error));
    } else {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
    }
}
async function deletePost(postId) {
    const role = sessionStorage.getItem('role');
    if (role !== 'guru') {
        showToast('error', 'Anda tidak memiliki izin untuk menghapus postingan.');
        return;
    }
    
    const result = confirm('Apakah Anda yakin ingin menghapus postingan ini?');
    if (!result) return;
    
    const success = await saveData('/api/delete-post', { postId });
    if (success) {
        showToast('success', 'Postingan berhasil dihapus!');
        renderFeed();
    } else {
        showToast('error', 'Gagal menghapus postingan.');
    }
}

// --- INITIALIZATION ---
// Semua kode yang berinteraksi dengan elemen DOM harus di dalam event ini
document.addEventListener('DOMContentLoaded', () => {

    // --- Inisialisasi awal
    const savedLang = localStorage.getItem('selectedLanguage') || 'id';
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) languageSelector.value = savedLang;
    setLanguage(savedLang);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if(themeToggleBtn) { themeToggleBtn.addEventListener('click', toggleTheme); }
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const alarmToggle = document.getElementById('alarm-toggle');
    if (alarmToggle) {
        alarmToggle.checked = localStorage.getItem('alarmEnabled') === 'true';
        alarmToggle.addEventListener('change', handleAlarmToggleChange);
    }
    
    const genderedKelas = [];
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        genderedKelas.push(`Kelas ${letter} putra`, `Kelas ${letter} putri`);
    }
    
    const kelasSelectSantri = document.getElementById('kelas');
    if (kelasSelectSantri) {
        kelasSelectSantri.innerHTML = '';
        genderedKelas.forEach(kelas => {
            kelasSelectSantri.add(new Option(kelas, kelas));
        });
    }
    const kelasSelectGuru = document.getElementById('guru-kelas');
    if (kelasSelectGuru) {
        kelasSelectGuru.innerHTML = '';
        genderedKelas.forEach(kelas => {
            kelasSelectGuru.add(new Option(kelas, kelas));
        });
    }

    const targetHarianSelect = document.getElementById('form-target-harian');
    if (targetHarianSelect) {
        targetHarianSelect.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            targetHarianSelect.add(new Option(`${i} Halaman`, `${i} Halaman`));
        }
    }
    const targetMingguanSelect = document.getElementById('form-target-mingguan');
    if (targetMingguanSelect) {
        targetMingguanSelect.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            targetMingguanSelect.add(new Option(`${i} Halaman`, `${i} Halaman`));
        }
    }

    // --- Semua Event Listener ---
    const pondokRegisterForm = document.getElementById('pondok-register-form');
    if (pondokRegisterForm) {
        pondokRegisterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const pondokId = document.getElementById('register-pondok-id').value.trim();
            const password = document.getElementById('register-password').value;
            const errorEl = document.getElementById('register-error');
            if (!pondokId.includes('#') || password.length < 6) {
                errorEl.textContent = "Format Nama Pondok salah atau kata sandi terlalu pendek.";
                errorEl.classList.remove('hidden');
                return;
            }
            const pondokName = pondokId.split('#')[0].trim();
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pondokId, password, pondokName })
                });
                const result = await response.json();
                if (result.success) {
                    showToast('success', `Pendaftaran berhasil! Kode Akses Unik Anda: ${result.accessCode}. Salin kode ini dan berikan kepada wali santri.`);
                    showPage('pondokLogin');
                } else {
                    errorEl.textContent = result.message;
                    errorEl.classList.remove('hidden');
                }
            } catch (error) {
                errorEl.textContent = "Terjadi kesalahan saat mendaftar.";
                errorEl.classList.remove('hidden');
            }
        });
    }

    const pondokLoginForm = document.getElementById('pondok-login-form');
    if (pondokLoginForm) {
        pondokLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const pondokId = document.getElementById('login-pondok-id').value.trim();
            const password = document.getElementById('login-password').value;
            const errorEl = document.getElementById('pondok-login-error');
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pondokId, password })
                });
                const result = await response.json();
                if (result.success) {
                    sessionStorage.setItem('currentPondokId', result.pondokDbId);
                    sessionStorage.setItem('pondokName', result.pondokName);
                    sessionStorage.setItem('role', 'guru');
                    checkLoginState();
                } else {
                    errorEl.textContent = result.message;
                    errorEl.classList.remove('hidden');
                }
            } catch (error) {
                errorEl.textContent = "Terjadi kesalahan saat login.";
                errorEl.classList.remove('hidden');
            }
        });
    }

    const accessCodeForm = document.getElementById('access-code-form');
    if (accessCodeForm) {
        accessCodeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const accessCode = document.getElementById('access-code').value.trim();
            const errorEl = document.getElementById('access-code-error');
            errorEl.classList.add('hidden');
            try {
                const response = await fetch('/api/wali-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accessCode })
                });
                const result = await response.json();
                if (result.success) {
                    sessionStorage.setItem('currentPondokId', result.pondokDbId);
                    sessionStorage.setItem('pondokName', result.pondokName);
                    sessionStorage.setItem('role', 'wali');
                    checkLoginState();
                } else {
                    errorEl.textContent = result.message;
                    errorEl.classList.remove('hidden');
                }
            } catch (error) {
                console.error("Error:", error);
                errorEl.textContent = "Terjadi kesalahan koneksi. Silakan coba lagi.";
                errorEl.classList.remove('hidden');
            }
        });
    }

    const santriForm = document.getElementById('santri-form');
    if (santriForm) {
        santriForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = this;
            const pondokId = sessionStorage.getItem('currentPondokId');
            const fotoInput = document.getElementById('foto');
            const currentPhotoUrl = document.getElementById('current-photo-url').value;
            let fotoUrl = currentPhotoUrl || null;
            if (fotoInput.files.length > 0) {
                fotoUrl = await uploadFile(fotoInput.files[0]);
                if (!fotoUrl) return;
            }
            const santriId = document.getElementById('santri-id').value ? parseInt(document.getElementById('santri-id').value) : null;
            const nama = document.getElementById('nama').value;
            const kelas = document.getElementById('kelas').value;
            const totalHafalanJuzInput = document.getElementById('total-hafalan-juz').value;
            const totalHafalanJuz = totalHafalanJuzInput === '' ? null : parseInt(totalHafalanJuzInput, 10);
            const harian = document.getElementById('form-target-harian').value;
            const mingguan = document.getElementById('form-target-mingguan').value;
            const bulanan = document.getElementById('form-target-bulanan').value;
            const tahunan = document.getElementById('form-target-tahunan').value;
            const tercapai = document.querySelector('input[name="tercapai"]:checked')?.value === 'true';
            const santriData = {
                id: santriId,
                nama,
                kelas,
                foto: fotoUrl,
                total_hafalan_juz: totalHafalanJuz,
                target: { harian, mingguan, bulanan, tahunan, tercapai }
            };
            const saveSuccess = await saveData('/api/save-santri', { pondokId: pondokId, santriData: santriData });
            if (saveSuccess) {
                showToast('success', 'Data santri berhasil disimpan!');
                backToGuruDashboard();
            } else {
                showToast('error', "Gagal menyimpan data di server.");
            }
        });
    }

    const guruForm = document.getElementById('guru-form');
    if (guruForm) {
        guruForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const pondokId = sessionStorage.getItem('currentPondokId');
            if (!pondokId) return;
            const guruId = document.getElementById('guru-id').value ? parseInt(document.getElementById('guru-id').value) : null;
            const nama = document.getElementById('guru-nama').value;
            const kelas = document.getElementById('guru-kelas').value;
            const guruData = { id: guruId, nama, mengajar_kelas: kelas };
            const saveSuccess = await saveData('/api/save-guru', { pondokId, guruData });
            if (saveSuccess) {
                renderGuruList();
                this.reset();
                document.getElementById('guru-id').value = '';
                showToast('success', 'Data guru berhasil disimpan!');
            } else {
                showToast('error', "Gagal menyimpan data guru.");
            }
        });
    }
    
    const hafalanForm = document.getElementById('hafalan-form');
    if (hafalanForm) {
        hafalanForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const pondokId = sessionStorage.getItem('currentPondokId');
            if (!pondokId) return;
            const santriId = parseInt(document.getElementById('santri-id').value);
            const newHafalan = {
                tanggal: document.getElementById('hafalan-tanggal').value,
                setoran: document.getElementById('hafalan-setoran').value,
                jenis: document.getElementById('hafalan-jenis').value,
                penilaian: document.getElementById('hafalan-penilaian').value,
                santriId: santriId,
            };
            const saveSuccess = await saveData('/api/save-hafalan', { pondokId, hafalanData: newHafalan });
            if (saveSuccess) {
                const santri = (await fetchData()).santri.find(s => s.id === santriId);
                sendNotificationToGuardian(santri.nama, newHafalan.setoran, newHafalan.penilaian);
                showToast('success', 'Data hafalan berhasil disimpan!');
                renderGuruHafalanTable(santriId);
                this.reset();
            } else {
                showToast('error', "Gagal menambahkan setoran hafalan.");
            }
        });
    }
    
    const newPostForm = document.getElementById('new-post-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const text = document.getElementById('post-text').value;
            const mediaFile = document.getElementById('post-media').files[0];
            
            if (!text && !mediaFile) {
                showToast('error', 'Postingan tidak boleh kosong.');
                return;
            }
            
            let mediaUrl = null;
            let mediaType = null;
            
            if (mediaFile) {
                if (mediaFile.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.preload = 'metadata';
                    video.onloadedmetadata = async () => {
                        window.URL.revokeObjectURL(video.src);
                        if (video.duration > 120) {
                            showToast('error', 'Durasi video tidak boleh lebih dari 2 menit.');
                            return;
                        }
                        mediaUrl = await uploadFile(mediaFile);
                        if (!mediaUrl) return;
                        mediaType = 'video';
                        const postData = {
                            author: sessionStorage.getItem('pondokName') || 'Wali Santri',
                            authorRole: sessionStorage.getItem('role'),
                            text: text,
                            mediaUrl: mediaUrl,
                            mediaType: mediaType,
                            timestamp: new Date().toISOString(),
                            likes: 0,
                            comments: []
                        };
                        const success = await saveData('/api/add-post', postData);
                        if (success) {
                            showToast('success', 'Postingan berhasil diunggah!');
                            sendNewPostNotification(postData.author, postData.mediaType);
                            closePostForm();
                            renderFeed();
                        } else {
                            showToast('error', 'Gagal mengunggah postingan.');
                        }
                    };
                    video.src = URL.createObjectURL(mediaFile);
                } else {
                    mediaUrl = await uploadFile(mediaFile);
                    if (!mediaUrl) return;
                    mediaType = 'image';
                    const postData = {
                        author: sessionStorage.getItem('pondokName') || 'Wali Santri',
                        authorRole: sessionStorage.getItem('role'),
                        text: text,
                        mediaUrl: mediaUrl,
                        mediaType: mediaType,
                        timestamp: new Date().toISOString(),
                        likes: 0,
                        comments: []
                    };
                    const success = await saveData('/api/add-post', postData);
                    if (success) {
                        showToast('success', 'Postingan berhasil diunggah!');
                        sendNewPostNotification(postData.author, postData.mediaType);
                        closePostForm();
                        renderFeed();
                    } else {
                        showToast('error', 'Gagal mengunggah postingan.');
                    }
                }
            } else {
                const postData = {
                    author: sessionStorage.getItem('pondokName') || 'Wali Santri',
                    authorRole: sessionStorage.getItem('role'),
                    text: text,
                    mediaUrl: mediaUrl,
                    mediaType: mediaType,
                    timestamp: new Date().toISOString(),
                    likes: 0,
                    comments: []
                };
                const success = await saveData('/api/add-post', postData);
                if (success) {
                    showToast('success', 'Postingan berhasil diunggah!');
                    sendNewPostNotification(postData.author, postData.mediaType);
                    closePostForm();
                    renderFeed();
                } else {
                    showToast('error', 'Gagal mengunggah postingan.');
                }
            }
        });
    }

	// --- Panggil Fungsi Inisialisasi Aplikasi ---
	playWelcomeAnimation();
    });
    </script>
