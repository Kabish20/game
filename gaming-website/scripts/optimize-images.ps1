param(
    [string]$AssetDirectory = (Join-Path $PSScriptRoot '..\public\assets\games\generated')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$webRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$resolvedAssetDirectory = (Resolve-Path $AssetDirectory).Path
if (-not $resolvedAssetDirectory.StartsWith($webRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Asset directory must be inside the web project."
}

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' } |
    Select-Object -First 1
$quality = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]85
)
$encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParameters.Param[0] = $quality
$converted = 0

Get-ChildItem -LiteralPath $resolvedAssetDirectory -Filter '*.png' | ForEach-Object {
    $isHero = $_.BaseName.StartsWith('hero-')
    $targetWidth = if ($isHero) { 1600 } else { 768 }
    $targetHeight = if ($isHero) { 900 } else { 1008 }
    $targetRatio = $targetWidth / $targetHeight

    $source = [System.Drawing.Image]::FromFile($_.FullName)
    try {
        $sourceRatio = $source.Width / $source.Height
        if ($sourceRatio -gt $targetRatio) {
            $cropHeight = $source.Height
            $cropWidth = $cropHeight * $targetRatio
            $cropX = ($source.Width - $cropWidth) / 2
            $cropY = 0
        }
        else {
            $cropWidth = $source.Width
            $cropHeight = $cropWidth / $targetRatio
            $cropX = 0
            $cropY = ($source.Height - $cropHeight) / 2
        }

        $output = New-Object System.Drawing.Bitmap(
            $targetWidth,
            $targetHeight,
            [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
        )
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($output)
            try {
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $destination = New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)
                $graphics.DrawImage(
                    $source,
                    $destination,
                    [single]$cropX,
                    [single]$cropY,
                    [single]$cropWidth,
                    [single]$cropHeight,
                    [System.Drawing.GraphicsUnit]::Pixel
                )
            }
            finally {
                $graphics.Dispose()
            }

            $outputPath = Join-Path $resolvedAssetDirectory ($_.BaseName + '.jpg')
            $temporaryPath = Join-Path $resolvedAssetDirectory ($_.BaseName + '.optimizing.jpg')
            $output.Save($temporaryPath, $jpegEncoder, $encoderParameters)
            Move-Item -LiteralPath $temporaryPath -Destination $outputPath -Force
            $converted += 1
        }
        finally {
            $output.Dispose()
        }
    }
    finally {
        $source.Dispose()
    }
}

$quality.Dispose()
$encoderParameters.Dispose()
Write-Output "Optimized $converted generated images in $resolvedAssetDirectory"
