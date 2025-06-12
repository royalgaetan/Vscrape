@echo off
:: Get date components
for /f "tokens=1-4 delims= " %%a in ("%date%") do (
    set dow=%%a
    set day=%%b
    set month=%%c
    set year=%%d
)

:: Get time components (HH:MM)
for /f "tokens=1,2 delims=:" %%a in ("%time%") do (
    set hour=%%a
    set min=%%b
)

:: Clean leading 0s (optional)
if "%hour:~0,1%"==" " set hour=0%hour:~1,1%

:: Format like: 26 Jun 2025<17:39>
set "formatted=%day% %month% %year%<%hour%:%min%>"

:: Use powershell to avoid newline
echo|set /p="%formatted%" | clip
