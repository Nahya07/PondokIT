import os
from flask import Flask, render_template, request, jsonify, session
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import secrets
from datetime import datetime

# --- Konfigurasi Aplikasi dan Database ---
app = Flask(__name__)

# Mengambil SECRET_KEY dari variabel lingkungan untuk keamanan
app.secret_key = os.getenv("SECRET_KEY", secrets.token_hex(24))

# Mengambil DATABASE_URL dari variabel lingkungan
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    # Gunakan URL ini hanya untuk pengembangan lokal
    "postgresql://postgres:Allahyahfadz99@db.nxsdokouecgsmeoigukz.supabase.co:5432/postgres"
)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Tipe file yang diizinkan untuk diunggah
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'avi'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- Model Database ---
class Pondok(db.Model):
    __tablename__ = 'pondoks'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.String(500), unique=True, nullable=False)
    password_hash = db.Column(db.String(500), nullable=False)
    pondok_name = db.Column(db.String(500), nullable=False)
    access_code = db.Column(db.String(50), unique=True, nullable=True)
    santri = db.relationship('Santri', backref='pondok', lazy=True, cascade="all, delete-orphan")
    guru = db.relationship('Guru', backref='pondok_guru', lazy=True, cascade="all, delete-orphan")
    hafalan = db.relationship('Hafalan', backref='pondok_hafalan', lazy=True, cascade="all, delete-orphan")
    posts = db.relationship('Post', backref='pondok_post', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Pondok {self.pondok_name}>'

class Santri(db.Model):
    __tablename__ = 'santri'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)
    nama = db.Column(db.String(500), nullable=False)
    kelas = db.Column(db.String(500), nullable=False)
    foto = db.Column(db.String(500), nullable=True)
    tercapai = db.Column(db.Boolean, nullable=True)
    total_hafalan_juz = db.Column(db.Integer, nullable=True)
    target_harian = db.Column(db.String(500), nullable=True)
    target_mingguan = db.Column(db.String(500), nullable=True)
    target_bulanan = db.Column(db.String(500), nullable=True)
    target_tahunan = db.Column(db.String(500), nullable=True)
    
    def __repr__(self):
        return f'<Santri {self.nama}>'

class Guru(db.Model):
    __tablename__ = 'guru'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)
    nama = db.Column(db.String(500), nullable=False)
    mengajar_kelas = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Guru {self.nama}>'

class Hafalan(db.Model):
    __tablename__ = 'hafalan'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)
    santri_id = db.Column(db.Integer, db.ForeignKey('santri.id'), nullable=False)
    tanggal = db.Column(db.Date, nullable=False)
    setoran = db.Column(db.String(500), nullable=False)
    jenis = db.Column(db.String(500), nullable=False)
    penilaian = db.Column(db.String(500), nullable=False)
    
    def __repr__(self):
        return f'<Hafalan {self.id}>'

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)
    author = db.Column(db.String(500), nullable=False)
    author_role = db.Column(db.String(50), nullable=False)
    text = db.Column(db.Text, nullable=True)
    media_url = db.Column(db.String(500), nullable=True)
    media_type = db.Column(db.String(50), nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    likes = db.Column(db.Integer, nullable=False, default=0)
    comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Post {self.id}>'

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    author = db.Column(db.String(500), nullable=False)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Comment {self.id}>'

# --- Rute Utama ---
@app.route('/')
def index():
    return app.send_static_file('index.html')

# --- Rute Autentikasi ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    pondok_id = data.get('pondokId', '').strip()
    password = data.get('password')
    pondok_name = data.get('pondokName', '').strip()

    if not all([pondok_id, password, pondok_name]):
        return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

    existing_pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()
    if existing_pondok:
        return jsonify({'success': False, 'message': 'Nama pondok sudah terdaftar.'}), 409

    password_hash = generate_password_hash(password)
    access_code = secrets.token_urlsafe(8).upper()

    new_pondok = Pondok(
        pondok_id=pondok_id,
        password_hash=password_hash,
        pondok_name=pondok_name,
        access_code=access_code
    )
    db.session.add(new_pondok)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Pendaftaran berhasil!',
        'accessCode': new_pondok.access_code
    })

@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    pondok_id = credentials.get('pondokId')
    password = credentials.get('password')

    pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()

    if pondok and check_password_hash(pondok.password_hash, password):
        return jsonify({'success': True, 'pondokName': pondok.pondok_name, 'pondokDbId': pondok.id})
    return jsonify({'success': False, 'message': 'ID Pondok atau password salah.'}), 401

@app.route('/api/wali-login', methods=['POST'])
def wali_login():
    data = request.json
    access_code = data.get('accessCode')

    if not access_code:
        return jsonify({'success': False, 'message': 'Kode akses tidak boleh kosong.'}), 400

    pondok = Pondok.query.filter_by(access_code=access_code.upper()).first()

    if pondok:
        return jsonify({'success': True, 'pondokName': pondok.pondok_name, 'pondokDbId': pondok.id})
    return jsonify({'success': False, 'message': 'Kode akses salah.'}), 401

# --- Rute Pengambilan Data ---
@app.route('/api/get-data', methods=['POST'])
def get_data():
    try:
        data = request.json
        pondok_db_id = data.get('pondokDbId')

        if not pondok_db_id:
            return jsonify({'success': False, 'message': 'ID Pondok tidak ditemukan.'}), 400

        santri_list = Santri.query.filter_by(pondok_id=pondok_db_id).all()
        guru_list = Guru.query.filter_by(pondok_id=pondok_db_id).all()
        hafalan_list = Hafalan.query.filter_by(pondok_id=pondok_db_id).all()
        pondok_data = Pondok.query.get(pondok_db_id)
        posts_list = Post.query.filter_by(pondok_id=pondok_db_id).order_by(Post.timestamp.desc()).all()
        comments_list = Comment.query.filter(Comment.post.has(pondok_id=pondok_db_id)).order_by(Comment.timestamp.asc()).all()
        
        santri_json = [
            {
                "id": s.id,
                "nama": s.nama,
                "kelas": s.kelas,
                "foto": s.foto,
                "tercapai": s.tercapai,
                "total_hafalan_juz": s.total_hafalan_juz,
                "target": {
                    "harian": s.target_harian,
                    "mingguan": s.target_mingguan,
                    "bulanan": s.target_bulanan,
                    "tahunan": s.target_tahunan,
                }
            } for s in santri_list
        ]
        guru_json = [
            {"id": g.id, "nama": g.nama, "mengajar_kelas": g.mengajar_kelas} for g in guru_list
        ]
        hafalan_json = [
            {"id": h.id, "santri_id": h.santri_id, "tanggal": h.tanggal.strftime('%Y-%m-%d'), "setoran": h.setoran, "jenis": h.jenis, "penilaian": h.penilaian} for h in hafalan_list
        ]
        posts_json = []
        for p in posts_list:
            post_comments = [
                {"id": c.id, "author": c.author, "text": c.text, "timestamp": c.timestamp.isoformat()}
                for c in comments_list if c.post_id == p.id
            ]
            posts_json.append({
                "id": p.id,
                "author": p.author,
                "author_role": p.author_role,
                "text": p.text,
                "media_url": p.media_url,
                "media_type": p.media_type,
                "timestamp": p.timestamp.isoformat(),
                "likes": p.likes,
                "comments": post_comments
            })

        return jsonify({
            'success': True,
            'data': {
                'santri': santri_json,
                'guru': guru_json,
                'hafalan': hafalan_json,
                'uniqueAccessCode': pondok_data.access_code,
                'posts': posts_json
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# --- Rute Manajemen Guru ---
@app.route('/api/save-guru', methods=['POST'])
def save_guru():
    try:
        data = request.json
        pondok_db_id = data.get('pondokId')
        guru_data = data.get('guruData')

        if not pondok_db_id or not guru_data:
            return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

        guru_id = guru_data.get('id')
        if guru_id:  # Update guru
            guru_to_update = Guru.query.get(guru_id)
            if not guru_to_update:
                return jsonify({'success': False, 'message': 'Guru tidak ditemukan.'}), 404
            guru_to_update.nama = guru_data['nama']
            guru_to_update.mengajar_kelas = guru_data['mengajar_kelas']
        else:  # Tambah guru baru
            new_guru = Guru(
                nama=guru_data['nama'],
                mengajar_kelas=guru_data['mengajar_kelas'],
                pondok_id=pondok_db_id
            )
            db.session.add(new_guru)

        db.session.commit()
        return jsonify({'success': True, 'message': 'Data guru berhasil disimpan!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-guru', methods=['POST'])
def delete_guru():
    try:
        data = request.json
        guru_id = data.get('guruId')

        if not guru_id:
            return jsonify({'success': False, 'message': 'ID Guru tidak ditemukan.'}), 400

        guru_to_delete = Guru.query.get(guru_id)
        if not guru_to_delete:
            return jsonify({'success': False, 'message': 'Guru tidak ditemukan.'}), 404

        db.session.delete(guru_to_delete)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Data guru berhasil dihapus!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# --- Rute Manajemen Santri ---
@app.route('/api/save-santri', methods=['POST'])
def save_santri():
    try:
        data = request.json
        pondok_db_id = data.get('pondokId')
        santri_data = data.get('santriData')
        print("Data yang diterima oleh server:", santri_data)
        if not pondok_db_id or not santri_data:
            return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

        santri_id = santri_data.get('id')
        if santri_id:  # Update data santri
            santri_to_update = Santri.query.get(santri_id)
            if not santri_to_update:
                return jsonify({'success': False, 'message': 'Santri tidak ditemukan.'}), 404

            santri_to_update.nama = santri_data['nama']
            santri_to_update.kelas = santri_data['kelas']
            santri_to_update.foto = santri_data.get('foto')
            
            # Periksa dan konversi total_hafalan_juz
            total_juz = santri_data.get('total_hafalan_juz')
            santri_to_update.total_hafalan_juz = int(total_juz) if total_juz is not None and str(total_juz).isdigit() else None
            
            santri_to_update.tercapai = santri_data['target']['tercapai']
            santri_to_update.target_harian = santri_data['target']['harian']
            santri_to_update.target_mingguan = santri_data['target']['mingguan']
            santri_to_update.target_bulanan = santri_data['target']['bulanan']
            santri_to_update.target_tahunan = santri_data['target']['tahunan']
        else:  # Tambah santri baru
            # Periksa dan konversi total_hafalan_juz
            total_juz = santri_data.get('total_hafalan_juz')
            total_juz = int(total_juz) if total_juz is not None and str(total_juz).isdigit() else None
            
            new_santri = Santri(
                nama=santri_data['nama'],
                kelas=santri_data['kelas'],
                foto=santri_data.get('foto'),
                tercapai=santri_data['target']['tercapai'],
                total_hafalan_juz=total_juz,
                target_harian=santri_data['target']['harian'],
                target_mingguan=santri_data['target']['mingguan'],
                target_bulanan=santri_data['target']['bulanan'],
                target_tahunan=santri_data['target']['tahunan'],
                pondok_id=pondok_db_id
            )
            db.session.add(new_santri)

        db.session.commit()
        return jsonify({'success': True, 'message': 'Data santri berhasil disimpan!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-santri', methods=['POST'])
def delete_santri():
    try:
        data = request.json
        santri_id = data.get('santriId')

        if not santri_id:
            return jsonify({'success': False, 'message': 'ID Santri tidak ditemukan.'}), 400

        santri_to_delete = Santri.query.get(santri_id)
        if not santri_to_delete:
            return jsonify({'success': False, 'message': 'Santri tidak ditemukan.'}), 404

        db.session.delete(santri_to_delete)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Data santri berhasil dihapus!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# --- Rute Manajemen Hafalan ---
@app.route('/api/save-hafalan', methods=['POST'])
def save_hafalan():
    try:
        data = request.json
        pondok_db_id = data.get('pondokId')
        hafalan_data = data.get('hafalanData')

        if not pondok_db_id or not hafalan_data:
            return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400
        
        # Periksa apakah santri_id ada
        santri_id = hafalan_data.get('santriId')
        if not santri_id:
            return jsonify({'success': False, 'message': 'ID Santri tidak ditemukan.'}), 400

        tanggal_obj = datetime.strptime(hafalan_data['tanggal'], '%Y-%m-%d').date()

        new_hafalan = Hafalan(
            tanggal=tanggal_obj,
            setoran=hafalan_data['setoran'],
            jenis=hafalan_data['jenis'],
            penilaian=hafalan_data['penilaian'],
            santri_id=santri_id,
            pondok_id=pondok_db_id
        )
        db.session.add(new_hafalan)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Data hafalan berhasil disimpan!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-hafalan', methods=['POST'])
def delete_hafalan():
    try:
        data = request.json
        hafalan_id = data.get('hafalanId')

        if not hafalan_id:
            return jsonify({'success': False, 'message': 'ID Hafalan tidak ditemukan.'}), 400

        hafalan_to_delete = Hafalan.query.get(hafalan_id)
        if not hafalan_to_delete:
            return jsonify({'success': False, 'message': 'Hafalan tidak ditemukan.'}), 404

        db.session.delete(hafalan_to_delete)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Hafalan berhasil dihapus!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# --- Rute Unggah File ---
@app.route('/unggah', methods=['POST'])
def upload_file():
    UPLOAD_FOLDER = 'static/uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'Tidak ada file di request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'success': False, 'message': 'Tidak ada file dipilih'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({'success': True, 'file_url': f'/static/uploads/{filename}'})

    return jsonify({'success': False, 'message': 'Jenis file tidak diizinkan'}), 400

# --- Rute Feed ---
@app.route('/api/add-post', methods=['POST'])
def add_post():
    data = request.json
    pondok_db_id = data.get('pondokId')
    post_data = data.get('postData')

    if not pondok_db_id or not post_data:
        return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

    new_post = Post(
        pondok_id=pondok_db_id,
        author=post_data['author'],
        author_role=post_data['authorRole'],
        text=post_data.get('text'),
        media_url=post_data.get('mediaUrl'),
        media_type=post_data.get('mediaType')
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Postingan berhasil ditambahkan.', 'id': new_post.id})

@app.route('/api/like-post', methods=['POST'])
def like_post():
    data = request.json
    post_id = data.get('postId')
    
    if not post_id:
        return jsonify({'success': False, 'message': 'ID Postingan tidak ditemukan.'}), 400

    post_to_like = Post.query.get(post_id)
    if not post_to_like:
        return jsonify({'success': False, 'message': 'Postingan tidak ditemukan.'}), 404

    post_to_like.likes += 1
    db.session.commit()
    return jsonify({'success': True, 'message': 'Suka berhasil ditambahkan.'})

@app.route('/api/add-comment', methods=['POST'])
def add_comment():
    data = request.json
    post_id = data.get('postId')
    comment_data = data.get('commentData')

    if not post_id or not comment_data:
        return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

    new_comment = Comment(
        post_id=post_id,
        author=comment_data['author'],
        text=comment_data['text']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Komentar berhasil ditambahkan.', 'id': new_comment.id})

@app.route('/api/delete-post', methods=['POST'])
def delete_post():
    data = request.json
    post_id = data.get('postId')
    
    if not post_id:
        return jsonify({'success': False, 'message': 'ID Postingan tidak ditemukan.'}), 400

    post_to_delete = Post.query.get(post_id)
    if not post_to_delete:
        return jsonify({'success': False, 'message': 'Postingan tidak ditemukan.'}), 404
        
    # Hapus semua komentar terkait terlebih dahulu
    Comment.query.filter_by(post_id=post_id).delete()
    db.session.delete(post_to_delete)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Postingan berhasil dihapus.'})

# --- Jalankan Aplikasi ---
if __name__ == '__main__':
    with app.app_context():
        # Jalankan ini HANYA sekali saat pertama kali untuk membuat tabel
        # db.create_all()
        pass
    
    # Menjalankan Flask di server pengembangan internal, cocok untuk testing.
    # UNTUK PRODUKSI, GUNAKAN WEBSERVER WSGI SEPERTI GUNICORN
    # command: gunicorn --bind 0.0.0.0:5000 main:app
    app.run(debug=False, host='0.0.0.0', port=5000)
