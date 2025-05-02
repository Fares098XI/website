// ==================== THEME TOGGLE ====================
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('light-mode', !e.matches);
        }
    });
}

// ==================== LOGIN/REGISTER TOGGLE ====================
function handleFormToggle(event) {
    event.preventDefault();
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm.classList.contains('active-form')) {
        // Switch to Register form
        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('hidden-form');
        registerForm.classList.add('active-form');
        document.querySelector('.toggle-form').innerHTML = 'Already have an account? <a href="#" id="toggleLink">Login here</a>';
    } else {
        // Switch to Login form
        registerForm.classList.remove('active-form');
        registerForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');
        document.querySelector('.toggle-form').innerHTML = 'Don\'t have an account? <a href="#" id="toggleLink">Register here</a>';
    }
    
    // Re-attach event listener to the new link
    document.getElementById('toggleLink').addEventListener('click', handleFormToggle);
}

// ==================== FORM SUBMISSIONS ====================
function setupFormSubmissions() {
    // Login form submission handler
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            alert('Login successful!');
            // Add actual login logic here
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Register form submission handler
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (firstName && lastName && regEmail && regPassword && confirmPassword) {
            if (regPassword === confirmPassword) {
                alert('Registration successful!');
                // Add actual registration logic here
            } else {
                alert('Passwords do not match.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// ==================== REVIEW SYSTEM ====================
const reviews = [
    {
        id: 1,
        userName: "Sarah L.",
        userAvatar: "https://randomuser.me/api/portraits/women/43.jpg",
        isVerified: true,
        date: "March 18, 2025",
        rating: 5,
        title: "A Must-Have for Smart Homes!",
        content: "I was looking for an energy-saving solution, and this curtain exceeded my expectations! The design is sleek, and it fits perfectly into my smart home setup. The app is intuitive, and installation was a breeze. Would highly recommend!",
        pros: ["Saves energy", "Beautiful design", "Easy to use"],
        cons: ["Limited color options"],
        helpfulCount: 47,
        hasReply: true,
        reply: {
            author: "Smart Curtain Team",
            date: "March 19, 2025",
            content: "Thank you, Sarah! We're thrilled you love it. We're working on adding more color options soon!"
        }
    },
    {
       id: 2,
       userName: "Michael T.",
       userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
       isVerified: true,
       date: "February 28, 2025",
       rating: 4,
       title: "Great investment for energy savings",
       content: "After 3 months of use, I've noticed a significant reduction in my electricity bill. The curtains are well-made and the automatic adjustment based on sunlight is brilliant. Only wish the mobile app had more customization options.",
       pros: ["Noticeable energy savings", "High quality materials", "Smart features"],
       cons: ["App could be better", "Pricey"],
       helpfulCount: 32,
       hasReply: false
     },
     {
       id: 3,
       userName: "David K.",
       userAvatar: "https://randomuser.me/api/portraits/men/76.jpg",
       isVerified: true,
       date: "April 5, 2025",
       rating: 5,
       title: "Perfect for my home office",
       content: "These curtains have transformed my workspace! The light control is perfect for reducing glare on my screens, and I love that they generate power while doing it. Installation was straightforward with the included guide.",
       pros: ["Excellent light control", "Easy installation", "Quiet operation"],
       cons: ["None so far"],
       helpfulCount: 18,
       hasReply: true,
       reply: {
           author: "Smart Curtain Team",
           date: "April 6, 2025",
           content: "Thanks for your feedback! We're glad they're working well in your home office."
       }
    }
];

function renderReviews() {
    const reviewsGrid = document.getElementById('reviews-grid');
    if (!reviewsGrid) return;
    
    reviewsGrid.innerHTML = '';
    
    reviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.style.animationDelay = `${index * 0.1}s`;
        
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += i <= review.rating 
                ? '<i class="fas fa-star"></i>' 
                : '<i class="far fa-star"></i>';
        }
        
        const prosHtml = review.pros?.length ? `<ul>${review.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>` : '';
        const consHtml = review.cons?.length ? `<ul>${review.cons.map(con => `<li>${con}</li>`).join('')}</ul>` : '';
        
        const replyHtml = review.hasReply ? `
            <div class="review-reply">
                <div class="reply-header">
                    <i class="fas fa-reply"></i>
                    ${review.reply.author} • ${review.reply.date}
                </div>
                <p>${review.reply.content}</p>
            </div>
        ` : '';
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <img src="${review.userAvatar}" alt="${review.userName}" class="user-avatar">
                <div class="user-info">
                    <div class="user-name">
                        ${review.userName}
                        ${review.isVerified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">${starsHtml}</div>
            </div>
            <div class="review-body">
                <h3 class="review-title">${review.title}</h3>
                <p class="review-content">${review.content}</p>
                <div class="review-pros-cons">
                    <div class="pros-cons-list pros-list">
                        <h4><i class="fas fa-check-circle"></i> Pros</h4>
                        ${prosHtml}
                    </div>
                    <div class="pros-cons-list cons-list">
                        <h4><i class="fas fa-times-circle"></i> Cons</h4>
                        ${consHtml}
                    </div>
                </div>
                ${replyHtml}
            </div>
        `;
        
        reviewsGrid.appendChild(reviewCard);
    });
}

// ==================== GALLERY SYSTEM ====================
const galleryImages = [
     "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
     "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
     "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
];

function renderGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.backgroundImage = `url(${image}?auto=format&fit=crop&w=500&q=80)`;
        galleryItem.innerHTML = '<div class="gallery-overlay"><i class="fas fa-expand"></i></div>';
        
        galleryItem.addEventListener('click', () => openLightbox(image));
        galleryGrid.appendChild(galleryItem);
    });
}

function openLightbox(imageUrl) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imageUrl}?auto=format&fit=crop&w=1200&q=80" alt="Gallery image">
        </div>
    `;
    
    lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'auto';
    });
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
}

// ==================== REVIEW FORM ====================
function setupReviewForm() {
    const reviewForm = document.getElementById('review-form');
    if (!reviewForm) return;

    const starRating = document.querySelectorAll('.star-rating i');
    const uploadArea = document.getElementById('upload-area');
    const fileUpload = document.getElementById('file-upload');
    const previewContainer = document.getElementById('preview-container');
    const toggleOptions = document.querySelectorAll('.toggle-option');

    // Star rating interaction
    starRating.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            starRating.forEach((s, i) => {
                s.classList.toggle('fas', i < rating);
                s.classList.toggle('far', i >= rating);
                s.classList.toggle('active', i < rating);
            });
        });
    });

    // File upload handling
    uploadArea.addEventListener('click', () => fileUpload.click());
    fileUpload.addEventListener('change', (e) => handleFiles(e.target.files));
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Form submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = document.querySelector('.star-rating .active');
        const title = document.getElementById('review-title').value;
        const content = document.getElementById('review-content').value;
        
        if (!rating || !title || !content) {
            alert('Please complete all required fields');
            return;
        }
        
        alert('Thank you for your review!');
        reviewForm.reset();
        previewContainer.innerHTML = '';
    });
}

function handleFiles(files) {
    const previewContainer = document.getElementById('preview-container');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = '';
    
    Array.from(files).slice(0, 5).forEach(file => {
        if (!file.type.match('image.*')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <div class="remove-image">&times;</div>
            `;
            previewItem.querySelector('.remove-image').addEventListener('click', () => previewItem.remove());
            previewContainer.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

// ==================== 3D MODEL VIEWER ====================
let scene, camera, renderer, controls, productModel;

function init3DModel() {
    const container = document.getElementById('product-model');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Loading 3D viewer...</div>';
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    
    // Temporary test cube
    const testCube = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    scene.add(testCube);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 3));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'model.glb',
        (gltf) => {
            scene.remove(testCube);
            productModel = gltf.scene;
            
            // Auto-scale and center model
            const box = new THREE.Box3().setFromObject(productModel);
            const size = box.getSize(new THREE.Vector3());
            const scale = 3 / Math.max(size.x, size.y, size.z);
            productModel.scale.set(scale, scale, scale);
            productModel.position.sub(box.getCenter(new THREE.Vector3()));
            
            scene.add(productModel);
            camera.position.z = size.length() * 1.5;
            
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
        },
        undefined,
        (error) => {
            console.error("Model load failed:", error);
            container.innerHTML = `
                <div class="error">
                    <p>Failed to load 3D model</p>
                    <p>${error.message}</p>
                </div>
            `;
        }
    );
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Window resize handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// ==================== MOBILE MENU ====================
function setupMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('header nav');
    if (!nav) return;
    
    nav.insertBefore(mobileMenuBtn, nav.querySelector('.links'));
    
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('header nav .links').classList.toggle('show');
    });
    
    document.querySelectorAll('header nav .links a').forEach(link => {
        link.addEventListener('click', () => {
            const links = document.querySelector('header nav .links');
            links.classList.remove('show');
        });
    });
}

// ==================== ANIMATIONS ====================
function setupAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
    
    // Floating particles animation
    document.querySelectorAll('.floating-particle').forEach((particle, index) => {
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = 5 + Math.random() * 10;
        
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = 0.3 + Math.random() * 0.4;
    });
}

// ==================== CHATBASE INITIALIZATION ====================
function initChatbase() {
    (function(){
        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
            window.chatbase=(...args)=>{
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(args)
            };
            window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                    if(prop==="q")return target.q
                    return(...args)=>target(prop,...args)
                }
            })
        }
        const onLoad=function(){
            const script=document.createElement("script");
            script.src="https://www.chatbase.co/embed.min.js";
            script.id="a8x2aNtBaMl_4_tRFcmlX";
            script.domain="www.chatbase.co";
            document.body.appendChild(script)
        };
        if(document.readyState==="complete"){onLoad()}
        else{window.addEventListener("load",onLoad)}
    })();
    
    window.chatbase('config', {
        chatboxTitle: 'RootNRipple Assistant',
        themeColor: '#FF1010',
        welcomeMessage: 'Welcome to RootNRipple! Ask me anything.',
        fontSize: '16px',
        bubbleBackground: '#000000',
        bubbleTextColor: '#FFFFFF'
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    setupThemeToggle();
    
    const toggleLink = document.getElementById('toggleLink');
    if (toggleLink) toggleLink.addEventListener('click', handleFormToggle);
    
    setupFormSubmissions();
    renderReviews();
    renderGallery();
    setupReviewForm();
    setupMobileMenu();
    setupAnimations();
    initChatbase();
    
    // Initialize 3D model if container exists
    if (document.getElementById('product-model')) {
        init3DModel();
    }
});
