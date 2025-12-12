// ===== API CONFIG =====
// const API_BASE = 'https://nel0n9hinl.execute-api.us-east-1.amazonaws.com/prod';
const API_BASE = 'https://5pouad4fa7.execute-api.us-east-1.amazonaws.com/Prod';

// ===== DOM ELEMENTS =====
const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultCard = document.getElementById('resultCard');
const shortUrl = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');
const openBtn = document.getElementById('openBtn');

let currentShortUrl = '';

// ===== URL VALIDATION =====
// ===== URL VALIDATION =====
function isValidUrl(url) {
    // Basic check for domain pattern
    const urlPattern = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/.*)?$/i;
    return urlPattern.test(url);
}

function normalizeUrl(url) {
    // Add https:// if no protocol is present
    if (!/^https?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
}

// ===== MAIN SHORTEN FUNCTION =====
async function shortenUrl() {
    const longUrl = urlInput.value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Hide previous error
    errorMessage.classList.remove('show');
    urlInput.classList.remove('shake');

    if (!longUrl) {
        // Show error and shake
        urlInput.classList.add('shake');
        errorMessage.classList.add('show');
        setTimeout(() => urlInput.classList.remove('shake'), 500);
        return;
    }

    if (!isValidUrl(longUrl)) {
        // Show error and shake
        urlInput.classList.add('shake');
        errorMessage.classList.add('show');
        setTimeout(() => urlInput.classList.remove('shake'), 500);
        return;
    }

    // Normalize the URL (add https:// if missing)
    const normalizedUrl = normalizeUrl(longUrl);

    // Show loading overlay
    document.getElementById('loadingOverlay').classList.add('active');
    shortenBtn.disabled = true;
    resultCard.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE}/shorten`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ longUrl: normalizedUrl })
        });

        const data = await response.json();

        if (!response.ok || !data.shortCode) {
            throw new Error(data.error || 'Failed to shorten URL');
        }

        currentShortUrl = `${window.location.origin}/${data.shortCode}`;
        shortUrl.textContent = currentShortUrl;

        // Add to history
        addToHistory(longUrl, currentShortUrl);

        resultCard.classList.remove('hidden');
        resultCard.classList.add('fade-in');

    } catch (err) {
        alert(err.message || 'An error occurred');
        console.error(err);

    } finally {
        // Hide loading overlay
        document.getElementById('loadingOverlay').classList.remove('active');
        shortenBtn.disabled = false;
    }
}

// ===== EVENT HANDLERS =====
shortenBtn.addEventListener('click', shortenUrl);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') shortenUrl();
});

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(currentShortUrl);

        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                <span>Copied!</span>
            `;

        setTimeout(() => (copyBtn.innerHTML = originalText), 2000);

    } catch {
        alert('Failed to copy link');
    }
});

openBtn.addEventListener('click', () => {
    if (currentShortUrl) window.open(currentShortUrl, '_blank');
});

// ===== THEME TOGGLE =====
const storageKey = 'theme-preference';

const onClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
};

const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey);
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
};

const reflectPreference = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value);
    document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
};

const theme = {
    value: getColorPreference(),
};

reflectPreference();

window.onload = () => {
    reflectPreference();
    document.querySelector('#theme-toggle').addEventListener('click', onClick);
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
});

// ===== HISTORY MANAGEMENT =====
const STORAGE_KEY = 'tinylink_history';

function loadHistory() {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
}

function saveHistory(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function addToHistory(longUrl, shortUrl) {
    const history = loadHistory();

    const exists = history.some(item => item.longUrl === longUrl);
    if (exists) return;

    history.unshift({
        id: Date.now(),
        longUrl,
        shortUrl,
        timestamp: new Date().toISOString()
    });

    if (history.length > 50) history.pop();

    saveHistory(history);
    renderHistory();
}
let confirmCallback = null;

function showConfirmation(title, message, onConfirm) {
    const modal = document.getElementById('confirmationModal');
    const confirmTitle = document.getElementById('confirmTitle');
    const confirmMessage = document.getElementById('confirmMessage');

    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    modal.classList.add('active');

    confirmCallback = onConfirm;
}

function hideConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('active');
    confirmCallback = null;
}

function deleteFromHistory(id) {
    showConfirmation(
        'Delete This Link?',
        'Are you sure you want to remove this shortened link from your history?',
        () => {
            const history = loadHistory();
            const filtered = history.filter(item => item.id !== id);
            saveHistory(filtered);
            renderHistory();
            hideConfirmation();
        }
    );
}

function clearAllHistory() {
    showConfirmation(
        'Delete All History?',
        'Are you sure you want to clear all your shortened links? This action cannot be undone.',
        () => {
            localStorage.removeItem(STORAGE_KEY);
            renderHistory();
            hideConfirmation();
        }
    );
}
document.getElementById('confirmBtn').addEventListener('click', () => {
    if (confirmCallback) {
        confirmCallback();
    }
});

document.getElementById('cancelBtn').addEventListener('click', hideConfirmation);

document.getElementById('confirmationModal').addEventListener('click', (e) => {
    if (e.target.id === 'confirmationModal') {
        hideConfirmation();
    }
});

function renderHistory() {
    const history = loadHistory();
    const container = document.getElementById('historyContainer');

    if (history.length === 0) {
        container.innerHTML = `
                <div class="text-center py-12 text-gray-400 history-empty">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p>No history yet. Start shortening URLs!</p>
                </div>
            `;
        return;
    }

    container.innerHTML = history.map(item => `
        <div class="history-item" data-id="${item.id}">
        <div class="flex items-start gap-4">
            <div class="flex-1 min-w-0">
                <div class="mb-2">
                    <span class="text-gray-400 text-xs font-medium">Original URL</span>
                    <a href="${item.longUrl}" target="_blank" class="history-url mt-1 block hover:underline">${item.longUrl}</a>
                </div>
                <div>
                    <span class="text-gray-400 text-xs font-medium">Short URL</span>
                    <a href="${item.shortUrl}" target="_blank" class="history-short-url mt-1 block hover:underline">${item.shortUrl}</a>
                </div>
            </div>
                    <button class="delete-btn" onclick="deleteFromHistory(${item.id})" title="Delete">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
}

// ===== EVENT LISTENERS =====
document.getElementById('clearAllBtn').addEventListener('click', clearAllHistory);
window.addEventListener('DOMContentLoaded', renderHistory);
// ===== WEBSITE LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('website-loader').classList.add('hidden');
    }, 1000); // 1 second delay
});

// ===== ROTATING AUTO-TYPING ANIMATION =====
function rotatingTypeWriter() {
    const texts = [
        'Transform long URLs into powerful short links',
        'Share smarter with branded short links',
        'Track clicks and measure your impact',
        'Create, customize, and control your links',
        'Boost engagement with memorable URLs'
    ];

    const element = document.getElementById('typewriterText');
    if (!element) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            // Deleting characters
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length; // Move to next text
                setTimeout(type, 500); // Pause before typing next text
                return;
            }
            setTimeout(type, 30); // Faster deletion
        } else {
            // Typing characters
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end of text
                return;
            }
            setTimeout(type, 50); // Typing speed
        }
    }

    // Clear initial text and start typing after loading screen
    element.textContent = '';
    setTimeout(type, 1200);
}

window.addEventListener('load', rotatingTypeWriter);

// ===== SHARE BUTTON MODAL =====
const shareBtn = document.getElementById('shareBtn');
const shareModal = document.getElementById('shareModal');
const shareCloseBtn = document.getElementById('shareCloseBtn');
const shareUrlInput = document.getElementById('shareUrlInput');
const shareCopyBtn = document.getElementById('shareCopyBtn');

if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        if (!currentShortUrl) {
            alert('Please shorten a URL first!');
            return;
        }

        // Set the URL in the modal
        shareUrlInput.value = currentShortUrl;

        // Show the modal
        shareModal.classList.add('active');
    });
}

// Close modal handlers
if (shareCloseBtn) {
    shareCloseBtn.addEventListener('click', () => {
        shareModal.classList.remove('active');
    });
}

// Close modal when clicking outside
shareModal?.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
});

// Copy button in modal
if (shareCopyBtn) {
    shareCopyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(shareUrlInput.value);
            const originalText = shareCopyBtn.textContent;
            shareCopyBtn.textContent = 'Copied!';
            setTimeout(() => {
                shareCopyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            alert('Failed to copy link');
        }
    });
}

// Social media sharing
const shareIconBtns = document.querySelectorAll('.share-icon-btn');
shareIconBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-platform');
        const url = encodeURIComponent(currentShortUrl || window.location.href);
        const title = encodeURIComponent('Check out this link from TinyLink!');
        const text = encodeURIComponent('Check out this shortened URL');

        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
                break;
            case 'reddit':
                shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});
