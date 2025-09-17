// Maps Toggle Chrome Extension
// Handles toggling hl=iw parameter on Google Maps URLs
const paramKey = 'hl';
const paramValue = 'iw';
document.addEventListener('DOMContentLoaded', function () {
    const statusRow = document.getElementById('status-row');
    const statusIcon = document.getElementById('status-icon');
    const statusText = document.getElementById('status-text');
    const toggleButton = document.getElementById('toggle-button');
    const openMapsLink = document.getElementById('open-maps-link');

    // Initialize popup when opened
    initializePopup();

    // Handle toggle button click
    toggleButton.addEventListener('click', handleToggle);

    // Handle open maps link click
    openMapsLink.addEventListener('click', function (e) {
        e.preventDefault();
        chrome.tabs.create({
            url: 'https://maps.google.com/'
        });
    });

    async function initializePopup() {
        try {
            // Get the current active tab
            const tabs = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });
            const currentTab = tabs[0];

            if (!currentTab || !currentTab.url) {
                showWarningState('Unable to access current tab');
                return;
            }

            // Check if we're on a Google Maps URL
            if (isGoogleMapsUrl(currentTab.url)) {
                const url = new URL(currentTab.url);
                const isEnabled = url.searchParams.get(paramKey) === paramValue;

                if (isEnabled) {
                    showEnabledState();
                } else {
                    showDisabledState();
                }

                toggleButton.disabled = false;
                openMapsLink.style.display = 'none';
            } else {
                showWarningState('Not on Google Maps');
                toggleButton.disabled = true;
                openMapsLink.style.display = 'block';
            }
        } catch (error) {
            console.error('Error initializing popup:', error);
            showWarningState('Error accessing tab');
        }
    }

    function handleToggle() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            const currentTab = tabs[0];

            if (!currentTab || !isGoogleMapsUrl(currentTab.url)) {
                return;
            }

            const url = new URL(currentTab.url);
            const isEnabled = url.searchParams.get(paramKey) === paramValue;

            if (isEnabled) {
                // Remove the parameter
                url.searchParams.delete(paramKey);
            } else {
                // Add the parameter
                url.searchParams.set(paramKey, paramValue);
            }

            // Update the tab with the new URL
            chrome.tabs.update(currentTab.id, {
                url: url.toString()
            });
        });
    }

    function isGoogleMapsUrl(url) {
        return url && /^https:\/\/(www\.)?maps\.google\.com\/maps/.test(url) || /^https:\/\/(www\.)?google\.com\/maps/.test(url);
    }

    function showEnabledState() {
        statusRow.className = 'status-row enabled';
        statusIcon.textContent = '✅';
        statusText.textContent = `Parameter enabled (${paramKey}=${paramValue})`;
    }

    function showDisabledState() {
        statusRow.className = 'status-row disabled';
        statusIcon.textContent = '⛔';
        statusText.textContent = 'Parameter disabled';
    }

    function showWarningState(message) {
        statusRow.className = 'status-row warning';
        statusIcon.textContent = '⚠️';
        statusText.textContent = message;
    }
});