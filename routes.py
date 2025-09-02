from flask import render_template, request, redirect, url_for, flash, jsonify
from app import app, db
from models import Student
import logging

logger = logging.getLogger(__name__)

@app.route('/')
def index():
    """Home page showing summary and navigation"""
    try:
        total_students = Student.query.count()
        avg_score = db.session.query(db.func.avg(Student.nilai_hafalan)).scalar()
        avg_score = round(avg_score, 2) if avg_score else 0
        
        recent_students = Student.query.order_by(Student.tanggal_input.desc()).limit(5).all()
        
        return render_template('index.html', 
                             total_students=total_students,
                             avg_score=avg_score,
                             recent_students=recent_students)
    except Exception as e:
        logger.error(f"Error in index route: {str(e)}")
        flash("Terjadi kesalahan saat memuat data", "error")
        return render_template('index.html', 
                             total_students=0,
                             avg_score=0,
                             recent_students=[])

@app.route('/add_student', methods=['GET', 'POST'])
def add_student():
    """Add new student memorization data"""
    if request.method == 'POST':
        try:
            nama = request.form.get('nama', '').strip()
            nilai_hafalan = request.form.get('nilai_hafalan')
            catatan = request.form.get('catatan', '').strip()
            
            # Convert nilai_hafalan to integer
            try:
                nilai_hafalan = int(nilai_hafalan) if nilai_hafalan else None
            except ValueError:
                flash("Nilai hafalan harus berupa angka", "error")
                return render_template('add_student.html')
            
            # Create new student object
            student = Student(
                nama=nama,
                nilai_hafalan=nilai_hafalan,
                catatan=catatan if catatan else None
            )
            
            # Validate student data
            validation_errors = student.validate()
            if validation_errors:
                for error in validation_errors:
                    flash(error, "error")
                return render_template('add_student.html')
            
            # Save to database
            db.session.add(student)
            db.session.commit()
            
            flash(f"Data santri {nama} berhasil ditambahkan dengan nilai {nilai_hafalan}", "success")
            return redirect(url_for('view_students'))
            
        except Exception as e:
            logger.error(f"Error adding student: {str(e)}")
            db.session.rollback()
            flash("Terjadi kesalahan saat menyimpan data", "error")
            return render_template('add_student.html')
    
    return render_template('add_student.html')

@app.route('/view_students')
def view_students():
    """View all students with search and filter options"""
    try:
        # Get search and filter parameters
        search = request.args.get('search', '').strip()
        sort_by = request.args.get('sort_by', 'tanggal_input')
        sort_order = request.args.get('sort_order', 'desc')
        min_score = request.args.get('min_score', type=int)
        max_score = request.args.get('max_score', type=int)
        
        # Build query
        query = Student.query
        
        # Apply search filter
        if search:
            query = query.filter(Student.nama.ilike(f'%{search}%'))
        
        # Apply score filters
        if min_score is not None:
            query = query.filter(Student.nilai_hafalan >= min_score)
        if max_score is not None:
            query = query.filter(Student.nilai_hafalan <= max_score)
        
        # Apply sorting
        if sort_by in ['nama', 'nilai_hafalan', 'tanggal_input']:
            sort_column = getattr(Student, sort_by)
            if sort_order == 'desc':
                sort_column = sort_column.desc()
            query = query.order_by(sort_column)
        else:
            query = query.order_by(Student.tanggal_input.desc())
        
        students = query.all()
        
        return render_template('view_students.html', 
                             students=students,
                             search=search,
                             sort_by=sort_by,
                             sort_order=sort_order,
                             min_score=min_score,
                             max_score=max_score)
                             
    except Exception as e:
        logger.error(f"Error viewing students: {str(e)}")
        flash("Terjadi kesalahan saat memuat data santri", "error")
        return render_template('view_students.html', students=[])

@app.route('/edit_student/<int:student_id>', methods=['GET', 'POST'])
def edit_student(student_id):
    """Edit existing student data"""
    try:
        student = Student.query.get_or_404(student_id)
        
        if request.method == 'POST':
            nama = request.form.get('nama', '').strip()
            nilai_hafalan = request.form.get('nilai_hafalan')
            catatan = request.form.get('catatan', '').strip()
            
            # Convert nilai_hafalan to integer
            try:
                nilai_hafalan = int(nilai_hafalan) if nilai_hafalan else None
            except ValueError:
                flash("Nilai hafalan harus berupa angka", "error")
                return render_template('edit_student.html', student=student)
            
            # Update student data
            student.nama = nama
            student.nilai_hafalan = nilai_hafalan
            student.catatan = catatan if catatan else None
            
            # Validate student data
            validation_errors = student.validate()
            if validation_errors:
                for error in validation_errors:
                    flash(error, "error")
                return render_template('edit_student.html', student=student)
            
            # Save changes
            db.session.commit()
            
            flash(f"Data santri {nama} berhasil diperbarui", "success")
            return redirect(url_for('view_students'))
        
        return render_template('edit_student.html', student=student)
        
    except Exception as e:
        logger.error(f"Error editing student {student_id}: {str(e)}")
        db.session.rollback()
        flash("Terjadi kesalahan saat mengubah data", "error")
        return redirect(url_for('view_students'))

@app.route('/delete_student/<int:student_id>', methods=['POST'])
def delete_student(student_id):
    """Delete student data"""
    try:
        student = Student.query.get_or_404(student_id)
        nama = student.nama
        
        db.session.delete(student)
        db.session.commit()
        
        flash(f"Data santri {nama} berhasil dihapus", "success")
        
    except Exception as e:
        logger.error(f"Error deleting student {student_id}: {str(e)}")
        db.session.rollback()
        flash("Terjadi kesalahan saat menghapus data", "error")
    
    return redirect(url_for('view_students'))

@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors"""
    return render_template('base.html', 
                         content='<div class="container"><h1>Halaman Tidak Ditemukan</h1><p>Halaman yang Anda cari tidak ada.</p></div>'), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    db.session.rollback()
    logger.error(f"Internal server error: {str(error)}")
    return render_template('base.html', 
                         content='<div class="container"><h1>Terjadi Kesalahan</h1><p>Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.</p></div>'), 500
