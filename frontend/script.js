// Toggle between Login and Register forms
const toggleLink = document.getElementById('toggleLink');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

toggleLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (loginForm.classList.contains('active-form')) {
        // Switch to Register form
        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('hidden-form');
        registerForm.classList.add('active-form');
        toggleLink.textContent = 'Login here';
        document.querySelector('.toggle-form').innerHTML = 'Already have an account? <a href="#" id="toggleLink">Login here</a>';
    } else {
        // Switch to Login form
        registerForm.classList.remove('active-form');
        registerForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');
        toggleLink.textContent = 'Register here';
        document.querySelector('.toggle-form').innerHTML = 'Don\'t have an account? <a href="#" id="toggleLink">Register here</a>';
    }

    // Re-attach the event listener to the new link
    document.getElementById('toggleLink').addEventListener('click', arguments.callee);
});

// Form submission handling
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert('Login successful!');
        // Add login logic here
    } else {
        alert('Please fill out all fields.');
    }
});

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
            // Add registration logic here
        } else {
            alert('Passwords do not match.');
        }
    } else {
        alert('Please fill out all fields.');
    }
});

// Initialize Chatbase AI Widget
(function(){
    if(!window.chatbase||window.chatbase("getState")!=="initialized"){
        window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
        };
        window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
                if(prop==="q"){return target.q}
                return(...args)=>target(prop,...args)
            }
        })
    }
    const onLoad=function(){
        const script=document.createElement("script");
        script.src="https://www.chatbase.co/embed.min.js";
        script.id="a8x2aNtBaMl_4_tRFcmlX"; // Your Chatbase script ID
        script.domain="www.chatbase.co";
        document.body.appendChild(script)
    };
    if(document.readyState==="complete"){onLoad()}
    else{window.addEventListener("load",onLoad)}
})();

// Optional: Remove old chat widget code if no longer needed
const oldChatWidget = document.getElementById('chat-widget');
if (oldChatWidget) {
    oldChatWidget.remove();
}
const oldChatToggle = document.getElementById('chat-toggle');
if (oldChatToggle) {
    oldChatToggle.remove();
}
document.addEventListener('DOMContentLoaded', function() {
    // Sample review data
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

    // Sample gallery images
    const galleryImages = [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ];

    // DOM Elements
    const reviewsGrid = document.getElementById('reviews-grid');
    const galleryGrid = document.querySelector('.gallery-grid');
    const starRating = document.querySelectorAll('.star-rating i');
    const reviewForm = document.getElementById('review-form');
    const uploadArea = document.getElementById('upload-area');
    const fileUpload = document.getElementById('file-upload');
    const previewContainer = document.getElementById('preview-container');
    const viewAllPhotosBtn = document.getElementById('view-all-photos');
    const toggleOptions = document.querySelectorAll('.toggle-option');

    // Initialize page
    function initPage() {
        renderReviews();
        renderGallery();
        setupEventListeners();
    }

    // Render reviews
    function renderReviews() {
        reviewsGrid.innerHTML = '';
        
        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.style.animationDelay = `${index * 0.1}s`;
            
            // Generate stars HTML
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>';
                }
            }
            
            // Generate pros HTML
            let prosHtml = '';
            if (review.pros && review.pros.length > 0) {
                prosHtml = `<ul>${review.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>`;
            }
            
            // Generate cons HTML
            let consHtml = '';
            if (review.cons && review.cons.length > 0) {
                consHtml = `<ul>${review.cons.map(con => `<li>${con}</li>`).join('')}</ul>`;
            }
            
            // Generate reply HTML if exists
            let replyHtml = '';
            if (review.hasReply) {
                replyHtml = `
                    <div class="review-reply">
                        <div class="reply-header">
                            <i class="fas fa-reply"></i>
                            ${review.reply.author} • ${review.reply.date}
                        </div>
                        <p>${review.reply.content}</p>
                    </div>
                `;
            }
            
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
                    <div class="review-rating">
                        ${starsHtml}
                    </div>
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

    // Render gallery
    function renderGallery() {
        galleryGrid.innerHTML = ''; // Clear existing gallery items
        
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.backgroundImage = `url(${image}?auto=format&fit=crop&w=500&q=80)`;
            
            galleryItem.innerHTML = `
                <div class="gallery-overlay">
                    <i class="fas fa-expand"></i>
                </div>
            `;
            
            // Add click event for gallery items
            galleryItem.addEventListener('click', function() {
                openLightbox(image);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Open lightbox for gallery images
    function openLightbox(imageUrl) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="${imageUrl}?auto=format&fit=crop&w=1200&q=80" alt="Gallery image">
            </div>
        `;
        
        lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        });
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
    }

    // Setup event listeners
    function setupEventListeners() {
        // Star rating
        starRating.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                starRating.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas', 'active');
                    } else {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const hoverRating = parseInt(this.getAttribute('data-rating'));
                starRating.forEach((s, i) => {
                    if (i < hoverRating) {
                        s.classList.add('hovered');
                    } else {
                        s.classList.remove('hovered');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                starRating.forEach(s => {
                    s.classList.remove('hovered');
                });
            });
        });
        
        // Toggle options
        toggleOptions.forEach(option => {
            option.addEventListener('click', function() {
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // File upload
        uploadArea.addEventListener('click', function() {
            fileUpload.click();
        });
        
        fileUpload.addEventListener('change', function(e) {
            const files = e.target.files;
            handleFiles(files);
        });
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        // View all photos button
        viewAllPhotosBtn.addEventListener('click', function() {
            alert('This would show all photos in a lightbox or separate page');
        });
        
        // Form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const rating = document.querySelector('.star-rating .active');
            const title = document.getElementById('review-title').value;
            const content = document.getElementById('review-content').value;
            
            if (!rating) {
                alert('Please select a rating');
                return;
            }
            
            if (!title || !content) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this data to your server
            alert('Thank you for your review!');
            this.reset();
            previewContainer.innerHTML = '';
            starRating.forEach(star => {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            });
            toggleOptions[0].classList.add('active');
            toggleOptions[1].classList.remove('active');
        });
    }

    // Handle uploaded files
    function handleFiles(files) {
        previewContainer.innerHTML = '';
        
        for (let i = 0; i < Math.min(files.length, 5); i++) {
            const file = files[i];
            
            if (!file.type.match('image.*')) {
                continue;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="remove-image">&times;</div>
                `;
                
                previewContainer.appendChild(previewItem);
                
                // Add click event to remove button
                previewItem.querySelector('.remove-image').addEventListener('click', function() {
                    previewItem.remove();
                });
            };
            
            reader.readAsDataURL(file);
        }
    }

    // Initialize the page
    initPage();
});

// 3D Product Model Initialization
let productModel, camera, scene, renderer, controls;

// 3D Product Model Initialization
let productModel, camera, scene, renderer, controls;

function init3DModel() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000a19);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(document.getElementById('product-model').clientWidth, document.getElementById('product-model').clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('product-model').appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x00f0ff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Add GLTFLoader
    const loader = new THREE.GLTFLoader();
    
    // Load your Smart_curtains.glb model
    loader.load(
        'path/to/Smart_curtains.glb', // Update this path to your model's location
        function (gltf) {
            productModel = gltf.scene;
            
            // Scale and position the model if needed
            productModel.scale.set(0.5, 0.5, 0.5);
            productModel.position.set(0, -1, 0);
            
            // Add the model to the scene
            scene.add(productModel);
            
            // Adjust camera to fit the model
            const box = new THREE.Box3().setFromObject(productModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            camera.position.z = size.length() * 1.5;
            controls.target.copy(center);
            controls.update();
        },
        undefined, // Progress callback (optional)
        function (error) {
            console.error('Error loading model:', error);
            
            // Fallback: Create a placeholder if model fails to load
            const geometry = new THREE.BoxGeometry(2, 3, 0.1);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x0066cc,
                wireframe: true
            });
            productModel = new THREE.Mesh(geometry, material);
            scene.add(productModel);
        }
    );
    
    // Add OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    controls.maxDistance = 10;
    controls.minDistance = 3;
    
    // Model control buttons
    document.querySelectorAll('.model-control').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'rotate':
                    controls.autoRotate = !controls.autoRotate;
                    controls.autoRotateSpeed = 2;
                    this.classList.toggle('active');
                    break;
                    
                case 'zoom':
                    // Toggle between close and far view
                    if (camera.position.z > 7) {
                        gsap.to(camera.position, { z: 5, duration: 1 });
                    } else {
                        gsap.to(camera.position, { z: 8, duration: 1 });
                    }
                    break;
                    
                case 'material':
                    // Toggle between solid and wireframe view
                    if (productModel) {
                        productModel.traverse(function(child) {
                            if (child.isMesh) {
                                child.material.wireframe = !child.material.wireframe;
                            }
                        });
                        this.classList.toggle('active');
                    }
                    break;
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}
function onWindowResize() {
    camera.aspect = document.getElementById('product-model').clientWidth / document.getElementById('product-model').clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('product-model').clientWidth, document.getElementById('product-model').clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    
    // Add subtle animation to the model
    if (productModel) {
        productModel.rotation.y += 0.002;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D model
    init3DModel();
    
    // Animate features on scroll
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
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
        // Randomize animation duration and delay
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        // Randomize size and opacity
        const size = 5 + Math.random() * 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = 0.3 + Math.random() * 0.4;
    });
    
    // Interactive holographic effect for buttons
    const holographicBtns = document.querySelectorAll('.holographic-btn');
    holographicBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        });
    });
});

// This will be replaced later with actual product model loading
function loadProductModel(modelPath) {
    // This function will be implemented when you have the 3D model files
    console.log('Loading product model from:', modelPath);
    // Example implementation would use THREE.GLTFLoader or similar
}



// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('header nav');
    nav.insertBefore(mobileMenuBtn, nav.querySelector('.links'));
    
    mobileMenuBtn.addEventListener('click', function() {
        const links = document.querySelector('header nav .links');
        links.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('header nav .links a').forEach(link => {
        link.addEventListener('click', function() {
            const links = document.querySelector('header nav .links');
            if (links.classList.contains('show')) {
                links.classList.remove('show');
            }
        });
    });
});
