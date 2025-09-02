from app import db
from datetime import datetime
from sqlalchemy import func

class Student(db.Model):
    """Model for storing student memorization data"""
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False, index=True)
    nilai_hafalan = db.Column(db.Integer, nullable=False)
    tanggal_input = db.Column(db.DateTime, default=func.now(), nullable=False)
    catatan = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<Student {self.nama}: {self.nilai_hafalan}>'
    
    def to_dict(self):
        """Convert student object to dictionary"""
        return {
            'id': self.id,
            'nama': self.nama,
            'nilai_hafalan': self.nilai_hafalan,
            'tanggal_input': self.tanggal_input.strftime('%Y-%m-%d %H:%M:%S') if self.tanggal_input else None,
            'catatan': self.catatan
        }
    
    def validate(self):
        """Validate student data"""
        errors = []
        
        if not self.nama or len(self.nama.strip()) == 0:
            errors.append("Nama santri tidak boleh kosong")
        
        if len(self.nama) > 100:
            errors.append("Nama santri tidak boleh lebih dari 100 karakter")
            
        if self.nilai_hafalan is None:
            errors.append("Nilai hafalan harus diisi")
        elif not isinstance(self.nilai_hafalan, int):
            errors.append("Nilai hafalan harus berupa angka")
        elif self.nilai_hafalan < 0 or self.nilai_hafalan > 100:
            errors.append("Nilai hafalan harus antara 0-100")
            
        if self.catatan and len(self.catatan) > 500:
            errors.append("Catatan tidak boleh lebih dari 500 karakter")
            
        return errors
