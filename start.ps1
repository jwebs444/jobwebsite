$ErrorActionPreference = "Stop"

$systemPython = Get-Command python -ErrorAction SilentlyContinue
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if ($systemPython) {
    $pythonExecutable = $systemPython.Source
} elseif (Test-Path -LiteralPath $bundledPython) {
    $pythonExecutable = $bundledPython
} else {
    throw "Python 3 was not found. Install Python 3 or run this project from Codex Desktop."
}

Set-Location -LiteralPath $PSScriptRoot
& $pythonExecutable "app.py"
