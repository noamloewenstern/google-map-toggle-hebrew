# Maps Toggle - Hebrew Google Maps Extension

A simple Chrome extension that allows users to easily toggle Hebrew language support on Google Maps by adding or removing the `hl=iw` URL parameter.

## Features

- **One-click toggle**: Quickly switch between Hebrew and default language on Google Maps
- **Visual status indicator**: Clear visual feedback showing whether Hebrew is enabled or disabled
- **Smart detection**: Automatically detects if you're on a Google Maps page
- **Clean interface**: Minimalist popup with intuitive controls

## How it Works

The extension adds the URL parameter `hl=iw` to Google Maps URLs, which forces the interface to display in Hebrew. When the parameter is removed, Google Maps reverts to its default language behavior.

### URL Parameter Details
- **Parameter**: `hl` (language hint)
- **Value**: `iw` (Hebrew/Israeli locale)
- **Example**: `https://maps.google.com/maps?hl=iw`

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension will appear in your Chrome toolbar

## Usage

1. Navigate to any Google Maps page (`maps.google.com` or `google.com/maps`)
2. Click the Maps Toggle extension icon in your toolbar
3. The popup will show the current status:
   - ✅ **Green**: Hebrew is enabled (`hl=iw` parameter present)
   - ⛔ **Red**: Hebrew is disabled (parameter absent)
   - ⚠️ **Yellow**: Not on a Google Maps page
4. Click "Toggle Hebrew" to switch between enabled and disabled states
5. The page will automatically reload with the new language setting

## Permissions

This extension requires the following permissions:

- **tabs**: To access and modify the current tab's URL
- **Host permissions**: `https://maps.google.com/*` and `https://www.google.com/maps/*`

## Browser Compatibility

- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)

## Technical Details

- **Manifest Version**: 3 (Chrome Extension Manifest V3)
- **API Used**: `chrome.tabs` for URL manipulation
- **Languages**: JavaScript, HTML, CSS
- **Size**: Lightweight with minimal resource usage

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this extension.

## License

This project is open source. Feel free to use and modify as needed.
