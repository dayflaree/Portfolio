// Portfolio Navigation and Interactions
class PortfolioApp {
    constructor() {
        this.currentSection = 'about';
        this.init();
    }

    init() {
        this.setupAmbientAudio(); // Setup audio first
        this.setupWarningScreen();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupKeyboardNavigation();
        this.setupAnimations();
        this.setupImageModal();
        this.setupRatIcon();
        this.setupNameCycling();
        this.setupEmailScreen();
        this.setupImageProtection();
    }

    setupWarningScreen() {
        const warningScreen = document.getElementById('warningScreen');
        const proceedBtn = document.getElementById('proceedBtn');
        
        // Check if warning has already been shown this session
        if (sessionStorage.getItem('warningShown') === 'true') {
            console.log('Warning already shown, setting audio ready');
            warningScreen.style.display = 'none';
            this.audioReady = true; // Allow audio to start immediately
            return;
        }
        
        // Show warning screen for first-time visitors
        warningScreen.classList.add('show');
        
        // Mark warning as shown for this session
        sessionStorage.setItem('warningShown', 'true');
        
        // Handle proceed button click
        proceedBtn.addEventListener('click', () => {
            console.log('Proceed button clicked, setting audio ready');
            this.audioReady = true; // Allow audio to start immediately
            warningScreen.classList.add('fade-out');
            
            // Remove warning screen after fade completes
            setTimeout(() => {
                warningScreen.style.display = 'none';
            }, 2000); // Match the CSS transition duration
        });
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const contentSections = document.querySelectorAll('.content-section');

        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetSection = e.currentTarget.dataset.section;
                this.switchSection(targetSection);
            });

            // Add hover sound effect simulation
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.currentTarget);
            });
        });
    }

    switchSection(sectionId) {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(`#${sectionId}`).classList.add('active');

        this.currentSection = sectionId;
        this.animateSectionTransition();
    }

    animateSectionTransition() {
        const activeSection = document.querySelector('.content-section.active');
        const skillCards = activeSection.querySelectorAll('.skill-card');
        
        // Stagger animation for skill cards
        skillCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            // Parallax effect for video background
            const videoBackground = document.querySelector('.video-background');
            if (videoBackground) {
                videoBackground.style.transform = `translateY(${parallax}px)`;
            }

            // Logo rotation on scroll
            const logo = document.querySelector('.logo');
            if (logo) {
                const rotation = scrolled * 0.1;
                logo.style.transform = `rotate(${rotation}deg)`;
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    setupKeyboardNavigation() {
        const sections = ['writing', 'game-dev', 'programming', 'qa-testing', 'design'];
        let currentIndex = 0;

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
                    this.switchSection(sections[currentIndex]);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    currentIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
                    this.switchSection(sections[currentIndex]);
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    e.preventDefault();
                    const sectionIndex = parseInt(e.key) - 1;
                    if (sectionIndex < sections.length) {
                        this.switchSection(sections[sectionIndex]);
                    }
                    break;
            }
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe skill cards and contact section
        document.querySelectorAll('.skill-card, .contact').forEach(el => {
            observer.observe(el);
        });

        // Typing effect for main title
        this.typeWriterEffect();
    }

    typeWriterEffect() {
        const titleElement = document.querySelector('.title-line');
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.1)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupNameCycling() {
        const nameDisplay = document.getElementById('nameDisplay');
        const names = [
            'Elijah Staley',
            'Dayflare', 
            'John Dayshower',
            '90Degrees',
            'DayDev'
        ];
        
        let currentIndex = 0;
        
        // Shuffle the names for random order
        this.shuffleArray(names);
        
        // Wait for typing animation to complete, then start cycling
        setTimeout(() => {
            setInterval(() => {
                nameDisplay.textContent = names[currentIndex];
                currentIndex = (currentIndex + 1) % names.length;
            }, 1000); // Change every second
        }, 2000); // Wait 2 seconds for typing to complete
    }

    setupEmailScreen() {
        const emailLink = document.getElementById('emailLink');
        const emailScreen = document.getElementById('emailScreen');
        const emailText = document.getElementById('emailText');
        const copiedText = document.getElementById('copiedText');
        
        // Handle email link click
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            emailScreen.classList.add('show');
        });
        
        // Handle email text click (copy to clipboard)
        emailText.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('elijah.j.staley@proton.me');
                
                // Show "copied" text
                copiedText.style.display = 'block';
                
                // Hide after 2 seconds and close screen
                setTimeout(() => {
                    copiedText.style.display = 'none';
                    emailScreen.classList.remove('show');
                }, 2000);
                
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = 'elijah.j.staley@proton.me';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show "copied" text
                copiedText.style.display = 'block';
                
                // Hide after 2 seconds and close screen
                setTimeout(() => {
                    copiedText.style.display = 'none';
                    emailScreen.classList.remove('show');
                }, 2000);
            }
        });
    }

    setupImageProtection() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Disable common keyboard shortcuts for saving/copying
        document.addEventListener('keydown', (e) => {
            // Disable F12 (Developer Tools)
            if (e.key === 'F12') {
                e.preventDefault();
            }
            
            // Disable Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
            }
            
            // Disable Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
            }
            
            // Disable Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
            }
        });

        // Disable drag and drop
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Disable text selection on images
        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });
    }

    setupAmbientAudio() {
        this.ambientAudio = null;
        this.ambientTracks = ['assets/audio/ambience1.mp3', 'assets/audio/ambience2.mp3', 'assets/audio/ambience3.mp3', 'assets/audio/ambience4.mp3'];
        this.trackNames = [
            'Cat Watcher...',
            'Say Cheese!',
            'Lights Out!',
            'Causing Mischief...'
        ];
        this.currentTrackIndex = 0;
        this.isAmbientMuted = false;
        this.audioStarted = false;
        this.audioReady = false;
        
        // Start audio on first user interaction (only after warning is gone)
        this.setupAudioListeners();
    }

    setupAudioListeners() {
        const startAudio = (e) => {
            console.log('Audio click detected:', e.target.tagName, 'audioStarted:', this.audioStarted, 'audioReady:', this.audioReady);
            
            // Don't interfere with link clicks
            if (e.target.tagName === 'A') {
                console.log('Link click detected, skipping audio');
                return;
            }
            
            if (!this.audioStarted && this.audioReady) {
                console.log('Starting ambient audio...');
                this.audioStarted = true;
                this.showMusicTracker();
                this.startAmbientLoop();
                // Remove listeners after starting
                document.removeEventListener('click', startAudio);
                document.removeEventListener('keydown', startAudio);
            } else {
                console.log('Audio not ready or already started');
            }
        };
        
        document.addEventListener('click', startAudio);
        document.addEventListener('keydown', startAudio);
    }

    startAmbientLoop() {
        // Shuffle both tracks and names together to keep them in sync
        const combined = this.ambientTracks.map((track, index) => ({
            track: track,
            name: this.trackNames[index]
        }));
        
        this.shuffleArray(combined);
        
        // Extract shuffled arrays
        this.ambientTracks = combined.map(item => item.track);
        this.trackNames = combined.map(item => item.name);
        
        this.playNextAmbientTrack();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    showMusicTracker() {
        const musicTracker = document.querySelector('.music-tracker');
        if (musicTracker) {
            musicTracker.classList.add('show');
        }
    }

    updateMusicTracker() {
        const trackDisplay = document.getElementById('currentTrack');
        if (trackDisplay && this.trackNames[this.currentTrackIndex]) {
            trackDisplay.textContent = this.trackNames[this.currentTrackIndex];
        }
    }

    playNextAmbientTrack() {
        if (this.ambientAudio) {
            this.ambientAudio.pause();
            this.ambientAudio = null;
        }

        const trackSrc = this.ambientTracks[this.currentTrackIndex];
        console.log('Loading ambient track:', trackSrc);
        this.ambientAudio = new Audio(trackSrc);
        this.ambientAudio.volume = 0.05; // 5% volume
        this.ambientAudio.loop = false;
        
        // Update music tracker display
        this.updateMusicTracker();
        
        console.log('Setting ambient audio volume to:', this.ambientAudio.volume);
        
        this.ambientAudio.addEventListener('ended', () => {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.ambientTracks.length;
            this.playNextAmbientTrack();
        });

        this.ambientAudio.addEventListener('error', (error) => {
            console.log('Ambient track could not be loaded:', trackSrc, error);
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.ambientTracks.length;
            this.playNextAmbientTrack();
        });

        if (!this.isAmbientMuted) {
            this.ambientAudio.play().catch((error) => {
                console.log('Autoplay prevented, user interaction required:', error);
            });
        }
    }

    muteAmbient() {
        this.isAmbientMuted = true;
        if (this.ambientAudio) {
            this.ambientAudio.pause();
        }
    }

    unmuteAmbient() {
        this.isAmbientMuted = false;
        if (this.ambientAudio) {
            this.ambientAudio.play().catch((error) => {
                console.log('Could not resume ambient audio:', error);
            });
        }
    }

    setupRatIcon() {
        const ratIcon = document.getElementById('ratIcon');
        
        // Check if video has already been played this session
        if (sessionStorage.getItem('ratVideoPlayed') === 'true') {
            ratIcon.style.display = 'none';
            return;
        }

        ratIcon.addEventListener('click', () => {
            this.playScareVideo();
        });
    }

    playScareVideo() {
        const ratIcon = document.getElementById('ratIcon');
        
        // Mute ambient audio
        this.muteAmbient();
        
        // Create video element
        const video = document.createElement('video');
        video.src = 'assets/scare.mp4';
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.zIndex = '9999';
        video.style.objectFit = 'cover';
        video.volume = 1.0;
        video.autoplay = true;
        video.muted = false;
        
        // Add to page
        document.body.appendChild(video);
        
        // Hide rat icon
        ratIcon.style.display = 'none';
        
        // Mark as played in session storage
        sessionStorage.setItem('ratVideoPlayed', 'true');
        
        // Remove video when it ends and unmute ambient
        video.addEventListener('ended', () => {
            document.body.removeChild(video);
            this.unmuteAmbient();
        });
        
        // Handle any errors
        video.addEventListener('error', () => {
            console.log('Video could not be loaded');
            document.body.removeChild(video);
            this.unmuteAmbient();
        });
    }

    setupImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeBtn = document.querySelector('.close');

        // Get all clickable images
        const websiteImages = document.querySelectorAll('.website-screenshot img');
        const designImages = document.querySelectorAll('.design-item img');
        const gameImages = document.querySelectorAll('.game-screenshot img');

        // Add click event listeners to website screenshots
        websiteImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Add click event listeners to design images
        designImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Add click event listeners to game screenshots
        gameImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close modal when clicking the X button
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }

    // Utility method to add custom CSS animations
    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: slideInUp 0.8s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.addCustomStyles();
    
    // Add some console styling for fun
    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #fff; background: #000; padding: 10px; font-family: "JetBrains Mono", monospace;');
    console.log('%cUse arrow keys or number keys (1-5) to navigate sections', 'color: #666; font-family: "JetBrains Mono", monospace;');
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Recalculate any size-dependent animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
        }, 10);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);
});

