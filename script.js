document.addEventListener('DOMContentLoaded', () => {
    // === Particles.js Initialization ===
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#007bff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#007bff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // === Scroll-based Animations with Intersection Observer ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // === Drag-and-Drop for Project Cards ===
    const projectList = document.getElementById('project-list');
    const projectCards = document.querySelectorAll('.project-card');
    
    let draggingItem = null;

    projectCards.forEach(card => {
        card.addEventListener('dragstart', () => {
            draggingItem = card;
            setTimeout(() => {
                card.classList.add('dragging');
            }, 0);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            draggingItem = null;
        });

        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(projectList, e.clientX);
            if (afterElement == null) {
                projectList.appendChild(draggingItem);
            } else {
                projectList.insertBefore(draggingItem, afterElement);
            }
        });
    });

    function getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.project-card:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
