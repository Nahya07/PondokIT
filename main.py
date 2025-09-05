import os
from flask import Flask, render_template, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# SECRET_KEY aman (ubah jadi random panjang di produksi)
app.secret_key = os.urandom(24)

# Konfigurasi database PostgreSQL (pakai ENV biar aman)
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:Allahyahfadz99@db.nxsdokouecgsmeoigukz.supabase.co:5432/postgres"
)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi database
db = SQLAlchemy(app)

# --- Model Database ---
class Pondok(db.Model):
    __tablename__ = 'pondoks'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    pondok_name = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f'<Pondok {self.pondok_id}>'

# Model untuk data santri + hafalan
class Santri(db.Model):
    __tablename__ = 'santri'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    hafalan = db.Column(db.String(200), nullable=False)
    kelas = db.Column(db.String(10), nullable=True)

# --- Fungsi utilitas ---
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- ROUTES & API ENDPOINTS ---

@app.route('/')
def index():
    return render_template('index.html')

# Register pondok baru
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    pondok_id = data.get('pondokId', '').strip()
    password = data.get('password')

    if not pondok_id or not password:
        return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

    existing_pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()
    if existing_pondok:
        return jsonify({'success': False, 'message': 'Nama pondok sudah terdaftar.'}), 409

    password_hash = generate_password_hash(password)
    pondok_name = pondok_id.split('#')[0].strip()

    new_pondok = Pondok(pondok_id=pondok_id, password_hash=password_hash, pondok_name=pondok_name)
    db.session.add(new_pondok)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Pendaftaran berhasil!'})

# Login pondok
@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    pondok_id = credentials.get('pondokId')
    password = credentials.get('password')

    pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()

    if pondok and check_password_hash(pondok.password_hash, password):
        return jsonify({'success': True, 'pondokName': pondok.pondok_name})
    return jsonify({'success': False, 'message': 'ID Pondok atau password salah.'}), 401

# Ambil semua data santri
@app.route('/api/get-data', methods=['GET'])
def get_data():
    try:
        santri_list = Santri.query.all()
        hasil = [
            {"id": s.id, "nama": s.nama, "hafalan": s.hafalan, "kelas": s.kelas}
            for s in santri_list
        ]
        return jsonify({'success': True, 'data': hasil})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# Simpan data santri baru
@app.route('/api/save-data', methods=['POST'])
def save_data():
    try:
        data = request.json
        nama = data.get('nama')
        hafalan = data.get('hafalan')
        kelas = data.get('kelas')

        if not nama or not hafalan:
            return jsonify({'success': False, 'message': 'Nama dan hafalan wajib diisi'}), 400

        new_santri = Santri(nama=nama, hafalan=hafalan, kelas=kelas)
        db.session.add(new_santri)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Data santri berhasil disimpan!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# Upload file foto
@app.route('/unggah', methods=['POST'])
def upload_file():
    UPLOAD_FOLDER = 'static/uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    if 'file' not in request.files:
        return 'Tidak ada file di request', 400

    file = request.files['file']

    if file.filename == '':
        return 'Tidak ada file dipilih', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return 'Foto berhasil diunggah', 200

    return 'Jenis file tidak diizinkan', 400

# Run server
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
