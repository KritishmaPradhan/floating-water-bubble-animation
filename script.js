// Enhanced water circle interface with interactive features
document.addEventListener('DOMContentLoaded', function() {
    const waterCircle = document.querySelector('.water-circle');
    const bubbles = document.querySelectorAll('.bubble');
    const waves = document.querySelectorAll('.wave');
    const particles = document.querySelectorAll('.particle');
    
    // Add mouse interaction for ripple effect
    waterCircle.addEventListener('click', function(e) {
        createRipple(e);
    });
    
    // Create ripple effect on click
    function createRipple(event) {
        const rect = waterCircle.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        waterCircle.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
    
    // Add dynamic bubble generation
    function createRandomBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble dynamic-bubble';
        
        // Random size between 5-20px
        const size = Math.random() * 15 + 5;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        // Random position within circle bounds
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100; // Within circle
        const x = 50 + (radius * Math.cos(angle)) / 2;
        const y = 50 + (radius * Math.sin(angle)) / 2;
        
        bubble.style.left = x + '%';
        bubble.style.top = y + '%';
        
        // Random animation duration
        const duration = Math.random() * 3 + 3; // 3-6 seconds
        bubble.style.animationDuration = duration + 's';
        
        document.querySelector('.floating-elements').appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, duration * 1000);
    }
    
    // Generate random bubbles periodically
    setInterval(createRandomBubble, 2000);
    
    // Add mouse movement effect for waves
    waterCircle.addEventListener('mousemove', function(e) {
        const rect = waterCircle.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;
        
        waves.forEach((wave, index) => {
            const intensity = (index + 1) * 0.5;
            wave.style.transform = `translateX(${deltaX * intensity * 10}px) translateY(${deltaY * intensity * 5}px)`;
        });
    });
    
    // Reset wave positions when mouse leaves
    waterCircle.addEventListener('mouseleave', function() {
        waves.forEach(wave => {
            wave.style.transform = '';
        });
    });
    
    // Add color transition effect
    let colorIndex = 0;
    const colors = [
        'linear-gradient(180deg, rgba(64, 224, 255, 0.8) 0%, rgba(0, 191, 255, 0.9) 30%, rgba(30, 144, 255, 1) 70%, rgba(0, 100, 200, 1) 100%)',
        'linear-gradient(180deg, rgba(255, 64, 224, 0.8) 0%, rgba(255, 0, 191, 0.9) 30%, rgba(255, 30, 144, 1) 70%, rgba(200, 0, 100, 1) 100%)',
        'linear-gradient(180deg, rgba(64, 255, 224, 0.8) 0%, rgba(0, 255, 191, 0.9) 30%, rgba(30, 255, 144, 1) 70%, rgba(0, 200, 100, 1) 100%)',
        'linear-gradient(180deg, rgba(224, 255, 64, 0.8) 0%, rgba(191, 255, 0, 0.9) 30%, rgba(144, 255, 30, 1) 70%, rgba(100, 200, 0, 1) 100%)'
    ];
    
    // Change water color every 10 seconds
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        waterCircle.style.background = colors[colorIndex];
    }, 10000);
    
    // Add performance optimization for animations
    let isVisible = true;
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isVisible = false;
            waterCircle.style.animationPlayState = 'paused';
            bubbles.forEach(bubble => {
                bubble.style.animationPlayState = 'paused';
            });
            waves.forEach(wave => {
                wave.style.animationPlayState = 'paused';
            });
            particles.forEach(particle => {
                particle.style.animationPlayState = 'paused';
            });
        } else {
            isVisible = true;
            waterCircle.style.animationPlayState = 'running';
            bubbles.forEach(bubble => {
                bubble.style.animationPlayState = 'running';
            });
            waves.forEach(wave => {
                wave.style.animationPlayState = 'running';
            });
            particles.forEach(particle => {
                particle.style.animationPlayState = 'running';
            });
        }
    });
    
    console.log('Water Circle Interface loaded successfully!');
});
