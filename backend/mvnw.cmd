@REM Maven Wrapper for Windows
@echo off
setlocal

set MAVEN_CMD_LINE_ARGS=%*
if "%JAVA_HOME%" == "" goto noJavaHome
set JAVA_EXE="%JAVA_HOME%\bin\java.exe"
goto runWrapper

:noJavaHome
set JAVA_EXE=java

:runWrapper
%JAVA_EXE% -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java no se encuentra en el PATH ni en JAVA_HOME. Por favor instale Java 17 o superior.
    exit /b 1
)

mvn %MAVEN_CMD_LINE_ARGS%
