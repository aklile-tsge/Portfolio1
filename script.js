const menuToggle = document.getElementById('menu-toggle');
const crossIcon = document.getElementById('cross-icon');
const navMenu = document.getElementById('nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const toggleHeaders = document.querySelectorAll('.toggle-header');

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.toggle-content').forEach(content => {
        content.style.display = 'none';
    });

    setupHomeCanvas();
    setupAboutCanvas();
    setupServicesCanvas();
    setupWorkCanvas();
    setupContactCanvas();
    setupServiceCanvases();

    typeWriter();
});

menuToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
    menuToggle.style.display = 'none';
    crossIcon.style.display = 'block';
});

crossIcon.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.style.display = 'block';
    crossIcon.style.display = 'none';
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.style.display = 'block';
        crossIcon.style.display = 'none';
    });
});

toggleHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        if (targetContent.style.display === 'block') {
            targetContent.style.display = 'none';
            header.classList.remove('active');
        } else {
            targetContent.style.display = 'block';
            header.classList.add('active');
        }
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        workItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const passwordInput = contactForm.querySelector('input[type="password"]');
    const messageInput = contactForm.querySelector('textarea');
    
    formStatus.textContent = "";
    nameInput.style.borderColor = "";
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";
    messageInput.style.borderColor = "";
    
    if (nameInput.value.trim() === "") {
        nameInput.style.borderColor = "red";
        formStatus.textContent = "Please enter your name";
        formStatus.style.color = "red";
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = "red";
        formStatus.textContent = "Please enter a valid email address";
        formStatus.style.color = "red";
        return;
    }
    
    if (passwordInput.value.length < 8) {
        passwordInput.style.borderColor = "red";
        formStatus.textContent = "Password must be at least 8 characters";
        formStatus.style.color = "red";
        return;
    }
    
    if (messageInput.value.trim() === "") {
        messageInput.style.borderColor = "red";
        formStatus.textContent = "Please enter your message";
        formStatus.style.color = "red";
        return;
    }
    
    formStatus.textContent = "Sending message...";
    formStatus.style.color = "blue";
    
    setTimeout(() => {
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";
        contactForm.reset();
        
        setTimeout(() => {
            formStatus.textContent = "";
        }, 3000);
    }, 1500);
});

window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

function typeWriter() {
    const typewriterTexts = [
        "I am a Computer Science Student",
        "I am a Web Developer", 
        "I am a Video Editor"
    ];
    
    const typewriterElement = document.querySelector('.typewriter-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = typewriterTexts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

function setupHomeCanvas() {
    const canvas = document.getElementById('homeCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 150;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `rgba(255, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.random() * 0.5 + 0.3})`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function setupAboutCanvas() {
    const canvas = document.getElementById('aboutCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const binaryChars = "01";
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function setupServicesCanvas() {
    const canvas = document.getElementById('servicesCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const shapes = [];
    const shapeCount = 15;
    
    for (let i = 0; i < shapeCount; i++) {
        shapes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 100 + 50,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            type: Math.floor(Math.random() * 3),
            color: `rgba(255, ${Math.floor(Math.random() * 100)}, 0, ${Math.random() * 0.2 + 0.1})`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        shapes.forEach(shape => {
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            
            if (shape.x < -shape.size || shape.x > canvas.width + shape.size) {
                shape.speedX *= -1;
            }
            if (shape.y < -shape.size || shape.y > canvas.height + shape.size) {
                shape.speedY *= -1;
            }
            
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation * Math.PI / 180);
            ctx.fillStyle = shape.color;
            
            switch(shape.type) {
                case 0:
                    ctx.beginPath();
                    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 1:
                    ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                    break;
                case 2:
                    ctx.beginPath();
                    ctx.moveTo(0, -shape.size / 2);
                    ctx.lineTo(shape.size / 2, shape.size / 2);
                    ctx.lineTo(-shape.size / 2, shape.size / 2);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function setupWorkCanvas() {
    const canvas = document.getElementById('workCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const gridSize = 20;
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);
    const grid = [];
    
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = {
                active: Math.random() > 0.9,
                counter: Math.floor(Math.random() * 100)
            };
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = grid[i][j];
                cell.counter++;
                
                if (cell.counter > 100) {
                    cell.active = !cell.active;
                    cell.counter = 0;
                }
                
                if (cell.active) {
                    const intensity = 1 - (cell.counter / 100);
                    ctx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.3})`;
                    ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function setupContactCanvas() {
    const canvas = document.getElementById('contactCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const dots = [];
    const dotCount = window.innerWidth < 768 ? 30 : 80;
    
    for (let i = 0; i < dotCount; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        dots.forEach(dot => {
            dot.x += dot.speedX;
            dot.y += dot.speedY;
            
            if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
            if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fill();
            
            dots.forEach(otherDot => {
                const distance = Math.sqrt((dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2);
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance/150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(dot.x, dot.y);
                    ctx.lineTo(otherDot.x, otherDot.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function setupServiceCanvases() {
    const serviceCanvases = document.querySelectorAll('.service-canvas');
    
    serviceCanvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const serviceType = canvas.dataset.service;
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        switch(serviceType) {
            case 'video':
                drawVideoIcon(ctx, canvas.width, canvas.height);
                break;
            case 'web':
                drawWebIcon(ctx, canvas.width, canvas.height);
                break;
            case 'code':
                drawCodeIcon(ctx, canvas.width, canvas.height);
                break;
        }
    });
    
    function drawVideoIcon(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;
        
        let pulse = 0;
        let growing = true;
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            if (growing) {
                pulse += 0.01;
                if (pulse >= 0.3) growing = false;
            } else {
                pulse -= 0.01;
                if (pulse <= 0) growing = true;
            }
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * (1 + pulse), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.5 - pulse})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(centerX - radius * 0.4, centerY - radius * 0.5);
            ctx.lineTo(centerX - radius * 0.4, centerY + radius * 0.5);
            ctx.lineTo(centerX + radius * 0.5, centerY);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    function drawWebIcon(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;
        let rotation = 0;
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            rotation += 0.005;
            if (rotation > Math.PI * 2) rotation = 0;
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);
            ctx.translate(-centerX, -centerY);
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(
                    centerX + Math.cos(angle) * radius,
                    centerY + Math.sin(angle) * radius
                );
                ctx.stroke();
            }
            
            ctx.restore();
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fill();
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    function drawCodeIcon(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.3;
        
        const codeLines = [
            "<div>",
            "  <h1>Hello</h1>",
            "  <p>World</p>",
            "</div>"
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        let typing = true;
        
        function animate() {
            ctx.clearRect(centerX - size * 0.5, centerY - size * 0.8, size * 1, size * 1.6);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = `${size * 0.15}px monospace`;
            
            for (let i = 0; i < lineIndex; i++) {
                ctx.fillText(codeLines[i], centerX - size * 0.4, centerY - size * 0.5 + i * size * 0.2);
            }
            
            if (lineIndex < codeLines.length) {
                const currentLine = codeLines[lineIndex].substring(0, charIndex);
                ctx.fillText(currentLine, centerX - size * 0.4, centerY - size * 0.5 + lineIndex * size * 0.2);
                
                if (typing) {
                    charIndex++;
                    if (charIndex > codeLines[lineIndex].length) {
                        typing = false;
                        setTimeout(() => {
                            lineIndex++;
                            charIndex = 0;
                            typing = true;
                            
                            if (lineIndex >= codeLines.length) {
                                setTimeout(() => {
                                    lineIndex = 0;
                                    charIndex = 0;
                                }, 1000);
                            }
                        }, 500);
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});