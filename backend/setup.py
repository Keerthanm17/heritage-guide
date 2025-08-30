#!/usr/bin/env python3
"""
Setup script for gTTS Flask Backend
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    
    requirements = [
        "Flask==2.3.3",
        "Flask-CORS==4.0.0", 
        "gTTS==2.4.0",
        "Werkzeug==2.3.7"
    ]
    
    for package in requirements:
        try:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✓ {package} installed successfully")
        except subprocess.CalledProcessError as e:
            print(f"✗ Failed to install {package}: {e}")
            return False
    
    return True

def create_requirements_file():
    """Create requirements.txt file"""
    requirements_content = """Flask==2.3.3
Flask-CORS==4.0.0
gTTS==2.4.0
Werkzeug==2.3.7
"""
    
    with open("requirements.txt", "w") as f:
        f.write(requirements_content)
    
    print("✓ requirements.txt created")

def main():
    print("=== gTTS Flask Backend Setup ===")
    print()
    
    # Create requirements.txt
    create_requirements_file()
    
    # Install packages
    if install_requirements():
        print()
        print("=== Setup Complete! ===")
        print("You can now start the backend with:")
        print("  python app.py")
        print()
        print("The backend will be available at: http://localhost:5000")
    else:
        print()
        print("=== Setup Failed! ===")
        print("Please check the error messages above and try again.")
        sys.exit(1)

if __name__ == "__main__":
    main()
