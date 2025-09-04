import os
from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Tambahkan SECRET_KEY untuk manajemen sesi
# GANTI INI dengan kode rahasia yang kuat!
app.secret_key = 'anda-harus-mengganti-ini-dengan-kode-rahasia-yang-kuat'

# Konfigurasi folder tempat file akan disimpan
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Batasan untuk jenis file yang diizinkan
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# --- 'database' sementara ---
app_data = {
    'pondoks': [
        {
            'pondokId': "PPTI#1",
            'password_hash': generate_password_hash("123"), # Kata sandi sudah di-hash
            'pondokName': "PONDOK PESANTREN TAHFIDZ INTERNASIONAL",
            'data': {
                'santri': [
                    {"id": 1, "nama": "Ahmad Zaki", "kelas": "A", "foto": "https://placehold.co/400x400/a3e635/4d7c0f?text=AZ"},
                    {"id": 2, "nama": "Budi Santoso", "kelas": "B", "foto": "https://placehold.co/400x400/60a5fa/1e3a8a?text=BS"},
                    {"id": 3, "nama": "Citra Lestari", "kelas": "A", "foto": "https://placehold.co/400x400/f87171/7f1d1d?text=CL"},
                ],
                'hafalan': [
                    {"id": 1, "santri_id": 1, "tanggal": "2025-08-27", "setoran": "An-Naba: 1-20", "jenis": "Hafalan Baru", "penilaian": "Lancar"},
                ],
                'target': [
                    {"santri_id": 1, "harian": "10 Baris", "mingguan": "2 Halaman", "bulanan": "1.5 Juz", "tahunan": "10 Juz", "tercapai": True, "progres_persen": {"harian": 100, "mingguan": 80, "bulanan": 90}},
                ],
                'guru': [
                    {"id": 1, "nama": "Ustadz Nahya", "mengajar_kelas": "A"},
                ]
            }
        }
    ],
    'galeri': [] # Bagian baru untuk menyimpan daftar foto
}

# --- Fungsi utilitas ---
def find_pondok(pondok_id):
    return next((p for p in app_data['pondoks'] if p['pondokId'].lower() == pondok_id.lower()), None)

def allowed_file(filename):
    """Fungsi untuk memeriksa ekstensi file yang diizinkan."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- ROUTES & API ENDPOINTS ---

@app.route('/')
def index():
    """Menampilkan halaman utama dengan formulir unggah."""
    return render_template('index.html', galeri=app_data['galeri'])

# Endpoint untuk Pendaftaran Pondok Baru
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    pondok_id = data.get('pondokId').strip()
    password = data.get('password')

    if find_pondok(pondok_id):
        return jsonify({'success': False, 'message': 'Nama pondok dan nomor unik sudah terdaftar.'}), 409

    # Menggunakan generate_password_hash untuk keamanan
    password_hash = generate_password_hash(password)

    new_pondok = {
        'pondokId': pondok_id,
        'password_hash': password_hash,
        'pondokName': pondok_id.split('#')[0].strip(),
        'data': {'santri': [], 'hafalan': [], 'target': [], 'guru': []}
    }
    app_data['pondoks'].append(new_pondok)
    return redirect(url_for('index'))

# Endpoint untuk Login Pondok dan Guru
@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    pondok_id = credentials.get('pondokId')
    password = credentials.get('password')

    pondok = find_pondok(pondok_id)

    # Menggunakan check_password_hash untuk verifikasi
    if pondok and check_password_hash(pondok['password_hash'], password):
        return redirect(url_for('index'))
    else:
        return jsonify({'success': False, 'message': 'Nama Pondok atau kata sandi salah.'}), 401

# Endpoint untuk mengambil data pondok
@app.route('/api/get-data', methods=['POST'])
def get_data():
    pondok_id = request.json.get('pondokId')
    pondok = find_pondok(pondok_id)
    if pondok:
        return jsonify({'success': True, 'data': pondok['data']})
    else:
        return jsonify({'success': False, 'message': 'Pondok tidak ditemukan.'}), 404

# Endpoint untuk menyimpan perubahan data
@app.route('/api/save-data', methods=['POST'])
def save_data():
    data = request.json
    pondok_id = data.get('pondokId')
    new_data = data.get('data')

    pondok = find_pondok(pondok_id)
    if pondok:
        pondok['data'] = new_data
        return jsonify({'success': True, 'message': 'Data berhasil disimpan.'})
    else:
        return jsonify({'success': False, 'message': 'Gagal menyimpan data.'}), 404

# Endpoint untuk mengunggah foto
@app.route('/unggah', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'Tidak ada bagian file di permintaan', 400

    file = request.files['file']

    if file.filename == '':
        return 'Tidak ada file yang dipilih', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Tambahkan nama file ke database galeri
        app_data['galeri'].append(filename)

        return 'Foto berhasil diunggah', 200

    return 'Jenis file tidak diizinkan', 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')