// Add interactive shine effect
document.querySelectorAll('.card-shine').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Simple tab switching functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all tab buttons and content sections
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    // Function to handle tab switching
    function switchTab(oldTab, newTab) {
        newTab.focus();
        // Change background color and text color for tabs
        newTab.classList.add('text-brand-500', 'bg-brand-50');
        newTab.querySelector('.tab-count').classList.add('bg-brand-500', 'text-white');
        newTab.querySelector('.tab-count').classList.remove('bg-gray-100', 'text-gray-600');

        oldTab.classList.remove('text-brand-500', 'bg-brand-50');
        oldTab.querySelector('.tab-count').classList.remove('bg-brand-500', 'text-white');
        oldTab.querySelector('.tab-count').classList.add('bg-gray-100', 'text-gray-600');

        // Show the selected tab panel
        const newPanelId = newTab.getAttribute('aria-controls');
        const oldPanelId = oldTab.getAttribute('aria-controls');

        document.getElementById(newPanelId).classList.remove('hidden');
        document.getElementById(oldPanelId).classList.add('hidden');
    }

    // Add event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const currentTab = document.querySelector('[role="tab"][aria-selected="true"]');
            switchTab(currentTab, tab);
            currentTab.setAttribute('aria-selected', 'false');
            tab.setAttribute('aria-selected', 'true');
        });
    });
});

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));

// Toggle dropdowns
function setupDropdown(buttonId, menuId) {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    button.addEventListener('click', (event) => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
        event.stopPropagation();
    });
}

// Setup both dropdowns
setupDropdown('notifications-menu-button', 'notifications-menu');
setupDropdown('profile-menu-button', 'profile-menu');

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
    const dropdowns = ['notifications-menu', 'profile-menu'];
    dropdowns.forEach(id => {
        const menu = document.getElementById(id);
        const button = document.getElementById(`${id}-button`);
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
        }
    });
});

// Project Filters
const projectFilters = {
    init() {
        this.projectCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6 > div');
        this.searchInput = document.querySelector('input[placeholder="Search projects..."]');
        this.filterButtons = document.querySelectorAll('.flex.items-center.gap-2 button');
        this.bindEvents();
    },

    bindEvents() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                // this.filterButtons.forEach(btn => {
                //     btn.classList.remove('text-brand-500', 'bg-brand-50');
                //     btn.classList.add('text-gray-600', 'hover:bg-gray-50');
                // });

                // // Add active class to clicked button
                // button.classList.remove('text-gray-600', 'hover:bg-gray-50');
                // button.classList.add('text-brand-500', 'bg-brand-50');

                this.applyFilters();
            });
        });

        // Search input
        this.searchInput.addEventListener('input', () => {
            this.applyFilters();
        });
    },

    applyFilters() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.flex.items-center.gap-2 button.text-brand-500').textContent.trim();

        this.projectCards.forEach(card => {
            let showCard = true;

            // Apply package type filter
            if (activeFilter !== 'All Packages') {
                const isHourly = card.querySelector('.text-blue-600') !== null; // VA or OBM package
                if (activeFilter === 'Hourly' && !isHourly) {
                    showCard = false;
                }
                if (activeFilter === 'Fixed Price' && isHourly) {
                    showCard = false;
                }
            }

            // Apply search filter
            if (showCard && searchTerm) {
                const projectName = card.querySelector('h3').textContent.toLowerCase();
                const clientName = card.querySelector('.text-sm.text-gray-500').textContent.toLowerCase();
                if (!projectName.includes(searchTerm) && !clientName.includes(searchTerm)) {
                    showCard = false;
                }
            }

            // Show/hide card with animation
            if (showCard) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
};

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    projectFilters.init();
});




