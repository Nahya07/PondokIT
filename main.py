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
    pondok_id = db.Column(db.String(500), unique=True, nullable=False)
    password_hash = db.Column(db.String(500), nullable=False)
    pondok_name = db.Column(db.String(500), nullable=False)
    santri = db.relationship('Santri', backref='pondok', lazy=True)
    guru = db.relationship('Guru', backref='pondok', lazy=True)

    def __repr__(self):
        return f'<Pondok {self.pondok_id}>'

class Santri(db.Model):
    __tablename__ = 'santri'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(500), nullable=False)
    foto = db.Column(db.String(500), nullable=True) # Ini akan menyimpan URL foto
    kelas = db.Column(db.String(500), nullable=True)
    pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)
    target = db.relationship('Target', backref='santri', uselist=False, lazy=True)
    hafalan_setoran = db.relationship('Hafalan', backref='santri', lazy=True)

class Guru(db.Model):
    __tablename__ = 'guru'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(500), nullable=False)
    mengajar_kelas = db.Column(db.String(500), nullable=True)
    pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)

class Hafalan(db.Model):
    __tablename__ = 'hafalan'
    id = db.Column(db.Integer, primary_key=True)
    santri_id = db.Column(db.Integer, db.ForeignKey('santri.id'), nullable=False)
    tanggal = db.Column(db.String(500), nullable=False)
    setoran = db.Column(db.String(500), nullable=False)
    jenis = db.Column(db.String(500), nullable=False)
    penilaian = db.Column(db.String(500), nullable=False)

class Target(db.Model):
    __tablename__ = 'target'
    id = db.Column(db.Integer, primary_key=True)
    santri_id = db.Column(db.Integer, db.ForeignKey('santri.id'), nullable=False, unique=True)
    harian = db.Column(db.String(500), nullable=True)
    mingguan = db.Column(db.String(500), nullable=True)
    bulanan = db.Column(db.String(500), nullable=True)
    tahunan = db.Column(db.String(500), nullable=True)
    tercapai = db.Column(db.Boolean, nullable=False, default=False)
    progres_persen_harian = db.Column(db.Integer, default=0)
    progres_persen_mingguan = db.Column(db.Integer, default=0)
    progres_persen_bulanan = db.Column(db.Integer, default=0)

# --- Fungsi utilitas ---
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- ROUTES & API ENDPOINTS ---

@app.route('/')
def index():
    return render_template('index.html')

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

@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    pondok_id = credentials.get('pondokId')
    password = credentials.get('password')

    pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()

    if pondok and check_password_hash(pondok.password_hash, password):
        return jsonify({'success': True, 'pondokName': pondok.pondok_name, 'pondokDbId': pondok.id})
    return jsonify({'success': False, 'message': 'ID Pondok atau password salah.'}), 401

@app.route('/api/get-data', methods=['POST'])
def get_data():
    try:
        data = request.json
        pondok_db_id = data.get('pondokId')

        if not pondok_db_id:
            return jsonify({'success': False, 'message': 'ID Pondok tidak ditemukan.'}), 400

        santri_list = Santri.query.filter_by(pondok_id=pondok_db_id).all()
        guru_list = Guru.query.filter_by(pondok_id=pondok_db_id).all()

        # Filter hafalan dan target berdasarkan santri yang ada di pondok
        santri_ids = [s.id for s in santri_list]
        hafalan_list = Hafalan.query.filter(Hafalan.santri_id.in_(santri_ids)).all()
        target_list = Target.query.filter(Target.santri_id.in_(santri_ids)).all()

        hasil_santri = [{"id": s.id, "nama": s.nama, "kelas": s.kelas, "foto": s.foto} for s in santri_list]
        hasil_guru = [{"id": g.id, "nama": g.nama, "mengajar_kelas": g.mengajar_kelas} for g in guru_list]
        hasil_hafalan = [{"id": h.id, "santri_id": h.santri_id, "tanggal": h.tanggal, "setoran": h.setoran, "jenis": h.jenis, "penilaian": h.penilaian} for h in hafalan_list]
        hasil_target = [{"id": t.id, "santri_id": t.santri_id, "harian": t.harian, "mingguan": t.mingguan, "bulanan": t.bulanan, "tahunan": t.tahunan, "tercapai": t.tercapai, "progres_persen": {"harian": t.progres_persen_harian, "mingguan": t.progres_persen_mingguan, "bulanan": t.progres_persen_bulanan}} for t in target_list]

        return jsonify({'success': True, 'data': {'santri': hasil_santri, 'guru': hasil_guru, 'hafalan': hasil_hafalan, 'target': hasil_target}})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/save-santri', methods=['POST'])
def save_santri():
    try:
        data = request.json
        santri_id = data.get('id')
        nama = data.get('nama')
        kelas = data.get('kelas')
        foto_url = data.get('foto') # Menangkap URL foto
        pondok_db_id = data.get('pondokId')

        if not nama or not kelas or not foto_url or not pondok_db_id:
            return jsonify({'success': False, 'message': 'Data tidak lengkap'}), 400

        if santri_id:
            santri = Santri.query.get(santri_id)
            if not santri or santri.pondok_id != pondok_db_id:
                 return jsonify({'success': False, 'message': 'Santri tidak valid.'}), 400

            santri.nama = nama
            santri.kelas = kelas
            santri.foto = foto_url
            db.session.commit()
            return jsonify({'success': True, 'message': 'Data santri berhasil diperbarui!'})
        else:
            new_santri = Santri(nama=nama, kelas=kelas, foto=foto_url, pondok_id=pondok_db_id)
            db.session.add(new_santri)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Data santri berhasil ditambahkan!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-santri', methods=['POST'])
def delete_santri():
    try:
        data = request.json
        santri_id = data.get('santriId')
        pondok_db_id = data.get('pondokId')

        if not santri_id or not pondok_db_id:
             return jsonify({'success': False, 'message': 'Data tidak lengkap'}), 400

        santri = Santri.query.get(santri_id)
        if not santri or santri.pondok_id != pondok_db_id:
             return jsonify({'success': False, 'message': 'Santri tidak valid.'}), 400

        db.session.delete(santri)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Santri berhasil dihapus!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/save-guru', methods=['POST'])
def save_guru():
    try:
        data = request.json
        guru_id = data.get('id')
        nama = data.get('nama')
        mengajar_kelas = data.get('mengajar_kelas')
        pondok_db_id = data.get('pondokId')

        if not nama or not mengajar_kelas or not pondok_db_id:
            return jsonify({'success': False, 'message': 'Data tidak lengkap'}), 400

        if guru_id: # Update
            guru = Guru.query.get(guru_id)
            if not guru or guru.pondok_id != pondok_db_id:
                return jsonify({'success': False, 'message': 'Guru tidak valid.'}), 400

            guru.nama = nama
            guru.mengajar_kelas = mengajar_kelas
            db.session.commit()
            return jsonify({'success': True, 'message': 'Data guru berhasil diperbarui!'})
        else: # Add
            new_guru = Guru(nama=nama, mengajar_kelas=mengajar_kelas, pondok_id=pondok_db_id)
            db.session.add(new_guru)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Data guru berhasil ditambahkan!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-guru', methods=['POST'])
def delete_guru():
    try:
        data = request.json
        guru_id = data.get('guruId')
        pondok_db_id = data.get('pondokId')

        if not guru_id or not pondok_db_id:
            return jsonify({'success': False, 'message': 'Data tidak lengkap'}), 400

        guru = Guru.query.get(guru_id)
        if not guru or guru.pondok_id != pondok_db_id:
            return jsonify({'success': False, 'message': 'Guru tidak valid.'}), 400

        db.session.delete(guru)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Data guru berhasil dihapus!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/save-hafalan', methods=['POST'])
def save_hafalan():
    try:
        data = request.json
        santri_id = data.get('santriId')
        tanggal = data.get('tanggal')
        setoran = data.get('setoran')
        jenis = data.get('jenis')
        penilaian = data.get('penilaian')

        if not santri_id or not tanggal or not setoran or not jenis or not penilaian:
             return jsonify({'success': False, 'message': 'Data tidak lengkap'}), 400

        new_hafalan = Hafalan(santri_id=santri_id, tanggal=tanggal, setoran=setoran, jenis=jenis, penilaian=penilaian)
        db.session.add(new_hafalan)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Setoran hafalan berhasil ditambahkan!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-hafalan', methods=['POST'])
def delete_hafalan():
    try:
        data = request.json
        hafalan_id = data.get('hafalanId')

        if not hafalan_id:
             return jsonify({'success': False, 'message': 'Data tidak lengkap'}), 400

        hafalan = Hafalan.query.get(hafalan_id)
        if not hafalan:
             return jsonify({'success': False, 'message': 'Setoran hafalan tidak ditemukan.'}), 404

        db.session.delete(hafalan)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Setoran hafalan berhasil dihapus!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/save-target', methods=['POST'])
def save_target():
    try:
        data = request.json
        santri_id = data.get('santriId')
        harian = data.get('harian')
        mingguan = data.get('mingguan')
        bulanan = data.get('bulanan')
        tahunan = data.get('tahunan')
        tercapai = data.get('tercapai')
        progres_harian = data.get('progres_persen_harian')
        progres_mingguan = data.get('progres_persen_mingguan')
        progres_bulanan = data.get('progres_persen_bulanan')

        if not santri_id:
            return jsonify({'success': False, 'message': 'ID Santri tidak ditemukan'}), 400

        target = Target.query.filter_by(santri_id=santri_id).first()
        if target:
            target.harian = harian
            target.mingguan = mingguan
            target.bulanan = bulanan
            target.tahunan = tahunan
            target.tercapai = tercapai
            target.progres_persen_harian = progres_harian
            target.progres_persen_mingguan = progres_mingguan
            target.progres_persen_bulanan = progres_bulanan
        else:
            new_target = Target(santri_id=santri_id, harian=harian, mingguan=mingguan, bulanan=bulanan, tahunan=tahunan, tercapai=tercapai, progres_persen_harian=progres_harian, progres_persen_mingguan=progres_mingguan, progres_persen_bulanan=progres_bulanan)
            db.session.add(new_target)

        db.session.commit()
        return jsonify({'success': True, 'message': 'Target hafalan berhasil disimpan!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/unggah', methods=['POST'])
def upload_file():
    UPLOAD_FOLDER = 'static/uploads'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'Tidak ada file di request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'success': False, 'message': 'Tidak ada file dipilih'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Mengembalikan URL publik dari file yang diunggah
        file_url = f'/static/uploads/{filename}'
        return jsonify({'success': True, 'file_url': file_url})

    return jsonify({'success': False, 'message': 'Jenis file tidak diizinkan'}), 400

# Run server
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)