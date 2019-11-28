# macOS wheel action

This action downloads macOS Python for building wheels. Expect more later.

## Inputs

### `versions`

The versions of Python to download. A comma separated string. Must have a suitable binary available.

## Example usage

uses: henryiii/macos-wheel-action@master
with:
  versions: '3.8.0,3.7.3'
