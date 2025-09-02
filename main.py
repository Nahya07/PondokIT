from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Ini adalah 'database' sementara yang disimpan di memori server.
# SANGAT PENTING: Untuk penggunaan permanen, ganti ini dengan database sungguhan seperti PostgreSQL.
# Menggunakan variabel ini akan MENGHILANGKAN SEMUA data saat server direstart!
app_data = {
    'pondoks': [
        {
            'pondokId': "PPTI#1",
            'password': "123",
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
    ]
}

# Fungsi utilitas untuk menemukan pondok berdasarkan ID
def find_pondok(pondok_id):
    return next((p for p in app_data['pondoks'] if p['pondokId'].lower() == pondok_id.lower()), None)

# --- ROUTES & API ENDPOINTS ---

# Route utama untuk melayani berkas index.html
@app.route('/')
def index():
    return render_template('index.html')

# Endpoint untuk Pendaftaran Pondok Baru
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    pondok_id = data.get('pondokId').strip()
    password = data.get('password')

    if find_pondok(pondok_id):
        return jsonify({'success': False, 'message': 'Nama pondok dan nomor unik sudah terdaftar.'}), 409

    new_pondok = {
        'pondokId': pondok_id,
        'password': password,
        'pondokName': pondok_id.split('#')[0].strip(),
        'data': {'santri': [], 'hafalan': [], 'target': [], 'guru': []}
    }
    app_data['pondoks'].append(new_pondok)
    return jsonify({'success': True, 'message': 'Pendaftaran berhasil!'})

# Endpoint untuk Login Pondok dan Guru
@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    pondok_id = credentials.get('pondokId')
    password = credentials.get('password')

    pondok = find_pondok(pondok_id)

    if pondok and pondok['password'] == password:
        return jsonify({'success': True, 'pondokName': pondok['pondokName']})
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

if __name__ == '__main__':
    # Gunakan host '0.0.0.0' agar dapat diakses dari luar Replit/Render
    app.run(host='0.0.0.0', debug=True)