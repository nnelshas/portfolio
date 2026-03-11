@echo off
REM Windows shim for jekyll-imagemagick: it calls `convert`, but Windows ships a different convert.exe.
REM This delegates to ImageMagick v7's `magick.exe convert`.
REM Requires ImageMagick installed (magick.exe on PATH).

magick.exe convert %*

