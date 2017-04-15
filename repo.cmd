@echo off

title Restaurant To Github
color e
prompt $sGithub$s$e$s

if errorlevel 1 goto one
if errorlevel 0 goto end

:one
echo Try again
goto end

:end