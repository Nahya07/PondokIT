import os
from flask import Flask, render_template, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Tambahkan SECRET_KEY untuk manajemen sesi
# GANTI INI dengan kode rahasia yang kuat!
app.secret_key = 'anda-harus-mengganti-ini-dengan-kode-rahasia-yang-kuat'

# Konfigurasi database PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://nahya:All@hyahfadz99@localhost/PondokIT_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi database
db = SQLAlchemy(app)

# --- Model Database ---
# Ini adalah cetak biru untuk tabel 'pondok' di database
class Pondok(db.Model):
    __tablename__ = 'pondoks'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    pondok_name = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f'<Pondok {self.pondok_id}>'

# --- Fungsi utilitas ---
def allowed_file(filename):
    """Fungsi untuk memeriksa ekstensi file yang diizinkan."""
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- ROUTES & API ENDPOINTS ---

@app.route('/')
def index():
    return render_template('index.html')

# Endpoint untuk Pendaftaran Pondok Baru
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    pondok_id = data.get('pondokId').strip()
    password = data.get('password')

    existing_pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()
    if existing_pondok:
        return jsonify({'success': False, 'message': 'Nama pondok dan nomor unik sudah terdaftar.'}), 409

    password_hash = generate_password_hash(password)
    pondok_name = pondok_id.split('#')[0].strip()

    new_pondok = Pondok(pondok_id=pondok_id, password_hash=password_hash, pondok_name=pondok_name)
    db.session.add(new_pondok)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Pendaftaran berhasil!'})

# Endpoint untuk Login Pondok dan Guru
@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    pondok_id = credentials.get('pondokId')
    password = credentials.get('password')

    pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()

    if pondok and check_password_hash(pondok.password_hash, password):
        return jsonify({'success': True, 'pondokName': pondok.pondok_name})
    else:
        return jsonify({'success': False, 'message': 'Nama Pondok atau kata sandi salah.'}), 401

@app.route('/api/get-data', methods=['POST'])
def get_data():
    # Ini harus diperbaiki untuk mengambil data dari database
    return jsonify({'success': False, 'message': 'Fungsi ini belum diimplementasikan dengan benar.'}), 501

@app.route('/api/save-data', methods=['POST'])
def save_data():
    # Ini harus diperbaiki untuk menyimpan data ke database
    return jsonify({'success': False, 'message': 'Fungsi ini belum diimplementasikan dengan benar.'}), 501

# Endpoint untuk mengunggah foto
@app.route('/unggah', methods=['POST'])
def upload_file():
    UPLOAD_FOLDER = 'static/uploads'
    if 'file' not in request.files:
        return 'Tidak ada bagian file di permintaan', 400

    file = request.files['file']

    if file.filename == '':
        return 'Tidak ada file yang dipilih', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return 'Foto berhasil diunggah', 200

    return 'Jenis file tidak diizinkan', 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')