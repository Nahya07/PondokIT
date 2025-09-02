# Overview

A Flask-based Student Memorization Management System (Sistem Manajemen Hafalan Santri) designed for Islamic schools to track and manage student Quran memorization progress. The application provides functionality to add, view, edit, and filter student memorization data with scores and notes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture
- **Framework**: Flask web framework with Python
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy extension
- **Database Schema**: Single `Student` model with fields for name, memorization score (0-100), input date, and optional notes
- **Application Structure**: Modular design with separate files for app configuration, models, and routes
- **Error Handling**: Comprehensive validation and error logging with user-friendly flash messages

## Frontend Architecture
- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive UI
- **Styling**: Bootstrap CSS with Replit dark theme integration
- **Icons**: Bootstrap Icons for enhanced visual interface
- **Layout**: Base template with extending child templates for consistent navigation and styling
- **Language**: Indonesian language interface for local Islamic school context

## Data Management
- **Model Validation**: Built-in validation for student data including name length, score range, and note length constraints
- **Database Operations**: CRUD operations with proper error handling and database connection management
- **Data Display**: Sortable and filterable student lists with search functionality

## Configuration Management
- **Environment Variables**: Database URL and session secret configured via environment variables
- **Development Setup**: Local PostgreSQL database with fallback configuration
- **Database Connection**: Connection pooling and health checks configured for production reliability

# External Dependencies

## Core Framework Dependencies
- **Flask**: Web framework for Python applications
- **SQLAlchemy/Flask-SQLAlchemy**: Database ORM and Flask integration
- **Werkzeug**: WSGI utilities including ProxyFix for HTTPS URL generation

## Frontend Dependencies
- **Bootstrap 5**: CSS framework loaded via CDN with Replit dark theme
- **Bootstrap Icons**: Icon library for UI enhancement
- **Bootstrap JavaScript**: Client-side components and interactions

## Database
- **PostgreSQL**: Primary database system for data persistence
- **SQLAlchemy**: Database abstraction layer with connection pooling

## Development Tools
- **Python Logging**: Built-in logging for debugging and error tracking
- **Flask Debug Mode**: Development server with hot reload capability