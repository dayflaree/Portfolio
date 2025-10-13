// Simple Portfolio Navigation
class PortfolioApp {
    constructor() {
        this.currentSection = 'about';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupEmailScreen();
        this.setupImageModal();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const contentSections = document.querySelectorAll('.content-section');

        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetSection = e.currentTarget.dataset.section;
                this.switchSection(targetSection);
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

    setupImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeBtn = document.querySelector('.close');

        // Get all clickable images
        const designImages = document.querySelectorAll('.design-item img');
        const gameImages = document.querySelectorAll('.game-screenshot img');
        const freelanceImages = document.querySelectorAll('.freelance-item img');

        // Add click event listeners to design images
        designImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        // Add click event listeners to game screenshots
        gameImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        // Add click event listeners to freelance images
        freelanceImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal when clicking the X button
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
});