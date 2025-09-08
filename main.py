    import os
    from flask import Flask, render_template, request, jsonify
    from flask_migrate import Migrate
    from werkzeug.security import generate_password_hash, check_password_hash
    from werkzeug.utils import secure_filename
    from flask_sqlalchemy import SQLAlchemy
    from sqlalchemy import create_engine
    import secrets # Tambahkan untuk membuat kode akses yang aman
    from datetime import datetime

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
    migrate = Migrate(app, db)

    # --- Model Database ---
    class Pondok(db.Model):
        __tablename__ = 'pondoks'
        id = db.Column(db.Integer, primary_key=True)
        pondok_id = db.Column(db.String(500), unique=True, nullable=False)
        password_hash = db.Column(db.String(500), nullable=False)
        pondok_name = db.Column(db.String(500), nullable=False)
        # Kolom baru untuk kode akses wali
        access_code = db.Column(db.String(50), unique=True, nullable=True)
        santri = db.relationship('Santri', backref='pondok', lazy=True)
        guru = db.relationship('Guru', backref='pondok_guru', lazy=True)
        hafalan = db.relationship('Hafalan', backref='pondok_hafalan', lazy=True)

        def repr(self):
            return f'<Pondok {self.pondok_id}>'

    class Santri(db.Model):
        __tablename__ = 'santri'
        id = db.Column(db.Integer, primary_key=True)
        nama = db.Column(db.String(500), nullable=False)
        kelas = db.Column(db.String(500), nullable=True)
        foto = db.Column(db.String(500), nullable=True)
        tercapai = db.Column(db.Boolean, nullable=True)
        target_harian = db.Column(db.String(500), nullable=True)
        target_mingguan = db.Column(db.String(500), nullable=True)
        target_bulanan = db.Column(db.String(500), nullable=True)
        target_tahunan = db.Column(db.String(500), nullable=True)
        pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)
        hafalan_history = db.relationship('Hafalan', backref='santri', lazy=True, cascade="all, delete-orphan")

    class Guru(db.Model):
        __tablename__ = 'guru'
        id = db.Column(db.Integer, primary_key=True)
        nama = db.Column(db.String(500), nullable=False)
        mengajar_kelas = db.Column(db.String(500), nullable=False)
        pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)

    class Hafalan(db.Model):
        __tablename__ = 'hafalan'
        id = db.Column(db.Integer, primary_key=True)
        tanggal = db.Column(db.Date, nullable=False)
        setoran = db.Column(db.String(500), nullable=False)
        jenis = db.Column(db.String(500), nullable=False)
        penilaian = db.Column(db.String(500), nullable=False)
        santri_id = db.Column(db.Integer, db.ForeignKey('santri.id'), nullable=False)
        pondok_id = db.Column(db.Integer, db.ForeignKey('pondoks.id'), nullable=False)

    # --- Fungsi utilitas ---
    def allowed_file(filename):
        ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    # --- ROUTES & API ENDPOINTS ---

    # PERBAIKAN: Hapus semua spasi di depan @app.route
    @app.route('/')
    def index():
        return render_template('index.html')

    # Register pondok baru
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
        access_code = secrets.token_urlsafe(8).upper() # Membuat kode akses unik

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
            'accessCode': new_pondok.access_code # Mengirimkan kode akses ke frontend
        })

    # Login pengurus/guru
    @app.route('/api/login', methods=['POST'])
    def login():
        credentials = request.json
        pondok_id = credentials.get('pondokId')
        password = credentials.get('password')

        pondok = Pondok.query.filter_by(pondok_id=pondok_id).first()

        if pondok and check_password_hash(pondok.password_hash, password):
            return jsonify({'success': True, 'pondokName': pondok.pondok_name, 'pondokDbId': pondok.id})
        return jsonify({'success': False, 'message': 'ID Pondok atau password salah.'}), 401

    # Login wali santri dengan kode akses (REVISI PENTING)
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

    # Ambil semua data pondok
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

            santri_json = [
                {
                    "id": s.id,
                    "nama": s.nama,
                    "kelas": s.kelas,
                    "foto": s.foto,
                    "tercapai": s.tercapai,
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

            return jsonify({
                'success': True,
                'data': {
                    'santri': santri_json,
                    'guru': guru_json,
                    'hafalan': hafalan_json,
                    'uniqueAccessCode': pondok_data.access_code
                }
            })
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500

    # Simpan data santri
    @app.route('/api/save-santri', methods=['POST'])
    def save_santri():
        try:
            data = request.json
            pondok_db_id = data.get('pondokId')
            santri_data = data.get('santriData')

            if not pondok_db_id or not santri_data:
                return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

            santri_id = santri_data.get('id')
            if santri_id:  # Update data santri
                santri_to_update = Santri.query.get(santri_id)
                if not santri_to_update:
                    return jsonify({'success': False, 'message': 'Santri tidak ditemukan.'}), 404

                santri_to_update.nama = santri_data['nama']
                santri_to_update.kelas = santri_data['kelas']
                santri_to_update.foto = santri_data['foto']
                santri_to_update.tercapai = santri_data['target']['tercapai']
                santri_to_update.target_harian = santri_data['target']['harian']
                santri_to_update.target_mingguan = santri_data['target']['mingguan']
                santri_to_update.target_bulanan = santri_data['target']['bulanan']
                santri_to_update.target_tahunan = santri_data['target']['tahunan']
            else:  # Tambah santri baru
                new_santri = Santri(
                    nama=santri_data['nama'],
                    kelas=santri_data['kelas'],
                    foto=santri_data['foto'],
                    tercapai=santri_data['target']['tercapai'],
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

    # Hapus data santri
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

    # Simpan data guru
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

    # Hapus data guru
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

    # Simpan data hafalan
    @app.route('/api/save-hafalan', methods=['POST'])
    def save_hafalan():
        try:
            data = request.json
            pondok_db_id = data.get('pondokId')
            hafalan_data = data.get('hafalanData')

            if not pondok_db_id or not hafalan_data:
                return jsonify({'success': False, 'message': 'Data tidak lengkap.'}), 400

            # Note: Frontend akan mengirimkan tanggal sebagai string, kita perlu mengkonversinya ke objek date
            tanggal_obj = datetime.strptime(hafalan_data['tanggal'], '%Y-%m-%d').date()

            new_hafalan = Hafalan(
                tanggal=tanggal_obj,
                setoran=hafalan_data['setoran'],
                jenis=hafalan_data['jenis'],
                penilaian=hafalan_data['penilaian'],
                santri_id=hafalan_data['santriId'],
                pondok_id=pondok_db_id
            )
            db.session.add(new_hafalan)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Data hafalan berhasil disimpan!'})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500

    # Hapus data hafalan
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

    # Upload file foto
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

    # Run server
    if __name__ == '__main__':
        with app.app_context():
            # Tambahkan ini untuk membuat kolom baru di database jika belum ada
            # HANYA JALANKAN INI SAAT PERTAMA KALI
            # db.create_all() 
            pass 
        app.run(debug=True, host='0.0.0.0', port=5000)