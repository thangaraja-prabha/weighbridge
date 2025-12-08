@echo off
echo Importing wb2025 database...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS wb2025;"
mysql -u root wb2025 < wb2025.sql
echo Database import completed!
pause
