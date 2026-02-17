// script.js for Gojo Rentals

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selectors ---
    const loadingOverlay = document.getElementById('loadingOverlay');
    const header = document.querySelector('header');
    const logoHomeLink = document.getElementById('logoHomeLink');
    const homeLink = document.getElementById('homeLink');
    const listingsLink = document.getElementById('listingsLink');
    const wishlistLink = document.getElementById('wishlistLink');
    const aboutLink = document.getElementById('aboutLink');
    const contactLink = document.getElementById('contactLink');
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const profileIconBtn = document.getElementById('profileIconBtn');
    const userNameSpan = document.getElementById('userName');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const homeSection = document.getElementById('home');
    const listingsSection = document.getElementById('listings');
    const propertyDetailSection = document.getElementById('propertyDetail');
    const contactSection = document.getElementById('contactSection');
    const wishlistSection = document.getElementById('wishlistSection');
    const aboutSection = document.getElementById('aboutSection');
    const mainSections = [homeSection, listingsSection, propertyDetailSection, contactSection, wishlistSection, aboutSection];

    const searchForm = document.getElementById('searchForm');
    const locationInput = document.getElementById('locationInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchBtnText = document.getElementById('searchBtnText');
    const sortOptions = document.getElementById('sortOptions');
    const viewToggleButtons = document.querySelectorAll('.view-toggle .view-option');
    const listingsGrid = document.getElementById('listingsGrid');
    const noResultsMessage = document.getElementById('noResultsMessage');

    const backBtn = document.getElementById('backBtn');
    const propertyTitle = document.getElementById('propertyTitle'); // sr-only title
    const propertyTitleDisplay = document.getElementById('propertyTitleDisplay'); // visible title
    const propertyMainImage = document.getElementById('propertyMainImage');
    const propertyImageRating = document.getElementById('propertyImageRating');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const propertyMapContainer = document.getElementById('propertyMap');
    const propertyLocation = document.getElementById('propertyLocation').querySelector('span');
    const propertyRating = document.getElementById('propertyRating').querySelector('span');
    const propertyOwnerAvatar = document.querySelector('.owner-avatar');
    const propertyOwnerName = document.getElementById('hostedByTitle');
    const propertyOwnerInfo = document.getElementById('hostInfo');
    const propertyDescription = document.getElementById('propertyDescription');
    const propertyFeatures = document.getElementById('propertyFeatures');
    const reserveBox = document.querySelector('.reserve-box');
    const reserveForm = document.getElementById('reservationForm');
    const reservePriceDisplay = document.getElementById('propertyPrice');
    const reserveCheckIn = document.getElementById('reserveCheckIn');
    const reserveCheckOut = document.getElementById('reserveCheckOut');
    const reserveGuests = document.getElementById('reserveGuests');
    const reservePriceDetails = document.getElementById('reservePriceDetails');
    const pricePerNightValue = document.getElementById('pricePerNightValue');
    const serviceFeeValue = document.getElementById('serviceFeeValue'); // Assume fixed for now
    const reserveTotal = document.getElementById('reserveTotal');
    const totalPrice = document.getElementById('totalPrice');
    const reserveBtn = document.getElementById('reserveBtn');
    const reserveBtnText = document.getElementById('reserveBtnText');
    const reserveMessage = document.getElementById('reserveMessage');

    const ratingStarsContainer = document.getElementById('ratingStars');
    const ratingStars = ratingStarsContainer.querySelectorAll('.star');
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewsList = document.getElementById('reviewsList');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const authModal = document.getElementById('authModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.querySelector('.modal .close-btn');

    const wishlistGrid = document.getElementById('wishlistGrid');
    const noWishlistMessage = document.getElementById('noWishlistMessage');

    const currentYearSpan = document.getElementById('currentYear');

    // --- State Variables ---
    let propertiesData = []; // Holds all property data
    let filteredProperties = []; // Holds currently displayed properties
    let currentView = 'home'; // 'home', 'listings', 'detail', 'wishlist', 'about', 'contact'
    let currentPropertyId = null;
    let currentLightboxIndex = 0;
    let currentPropertyImages = [];
    let map = null; // Leaflet map instance
    let wishlist = new Set(JSON.parse(localStorage.getItem('gojoWishlist') || '[]'));
    let currentUser = null; // Simulate user login state { name: 'User Name' } or null
    let currentLanguage = 'en'; // 'en' or 'am'

    // --- Simulated Property Data ---
    // In a real app, fetch this from an API
    const generateProperties = (count = 20) => {
        const locations = ['Bole', 'Kazanchis', 'Old Airport', 'CMC', 'Ayat', 'Gerji', 'Summit', 'Sarbet'];
        const types = ['Apartment', 'Villa', 'Guesthouse', 'Condo'];
        const sampleFeatures = [
            { icon: 'fa-wifi', name: 'Wifi' }, { icon: 'fa-tv', name: 'TV' }, { icon: 'fa-kitchen-set', name: 'Kitchen' },
            { icon: 'fa-car', name: 'Free Parking' }, { icon: 'fa-air-conditioner', name: 'Air Conditioning' },
            { icon: 'fa-bath', name: 'Private Bath' }, { icon: 'fa-person-swimming', name: 'Pool' }, { icon: 'fa-dumbbell', name: 'Gym' }
        ];
        const baseImages = [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
        ];
        const data = [];
        const addisAbabaBounds = {
            minLat: 8.84, maxLat: 9.08, minLng: 38.65, maxLng: 38.90
        };

        for (let i = 1; i <= count; i++) {
            const location = locations[Math.floor(Math.random() * locations.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
            const price = Math.floor(Math.random() * 4000) + 1500; // Price in ETB
            const numFeatures = Math.floor(Math.random() * 4) + 3;
            const propertyFeatures = sampleFeatures.sort(() => 0.5 - Math.random()).slice(0, numFeatures);
            const numImages = Math.floor(Math.random() * 3) + 4;
            const images = baseImages.sort(() => 0.5 - Math.random()).slice(0, numImages);
            const lat = Math.random() * (addisAbabaBounds.maxLat - addisAbabaBounds.minLat) + addisAbabaBounds.minLat;
            const lng = Math.random() * (addisAbabaBounds.maxLng - addisAbabaBounds.minLng) + addisAbabaBounds.minLng;

            data.push({
                id: `prop${i}`,
                title: `Beautiful ${type} in ${location}`,
                location: location,
                price: price,
                rating: parseFloat(rating),
                type: type,
                badge: Math.random() > 0.8 ? 'Superhost' : (Math.random() > 0.6 ? 'New' : null),
                images: images,
                description: `Discover comfort and style in this lovely ${type} located in the vibrant ${location} area. Perfect for short or long stays, offering modern amenities and convenient access to city attractions. Features include ${propertyFeatures.map(f => f.name).join(', ')}.`,
                features: propertyFeatures,
                coordinates: { lat: lat, lng: lng },
                host: { name: 'Michael', joinDate: '5 years ago', isSuperhost: Math.random() > 0.7 },
                reviews: [ // Sample reviews
                    { author: 'Sarah M.', date: 'March 2024', rating: 5, content: 'Amazing place, great location!', avatar: `https://randomuser.me/api/portraits/women/${i % 50 + 1}.jpg` },
                    { author: 'John D.', date: 'February 2024', rating: 4, content: 'Very comfortable, host was responsive.', avatar: `https://randomuser.me/api/portraits/men/${i % 50 + 1}.jpg` }
                ]
            });
        }
        return data;
    };

    // --- Utility Functions ---
    const showLoading = (show = true) => {
        if (show) {
            loadingOverlay.style.display = 'flex';
            setTimeout(() => loadingOverlay.style.opacity = 1, 10); // Fade in
        } else {
            loadingOverlay.style.opacity = 0;
            setTimeout(() => loadingOverlay.style.display = 'none', 300); // Wait for fade out
        }
    };

    const setButtonLoading = (button, isLoading, defaultText) => {
        const textSpan = button.querySelector('span'); // Assumes a span holds the text
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            if (textSpan) textSpan.style.visibility = 'hidden';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            if (textSpan) textSpan.style.visibility = 'visible';
            if (textSpan && defaultText) textSpan.textContent = defaultText;
        }
    };

    const formatPrice = (amount, currency = 'ETB') => {
        // Basic formatting, consider Intl.NumberFormat for more complex needs
        return `${amount.toLocaleString()} ${currency}`;
    };

    // --- View Management ---
    const showView = (viewName, propertyId = null) => {
        console.log(`Switching view to: ${viewName}`, propertyId ? `(Property ID: ${propertyId})` : '');
        currentView = viewName;
        currentPropertyId = propertyId;

        mainSections.forEach(section => {
            if (section) section.style.display = 'none';
            if (section) section.classList.remove('fade-in');
        });

        // Special handling for hero section (only on home/initial listings view)
        if (homeSection) {
            if (viewName === 'home' || viewName === 'listings') {
                homeSection.style.display = 'block';
                // Optional: Animate hero hide/show if needed
                 homeSection.style.height = '';
                 homeSection.style.padding = '';
                 homeSection.style.opacity = '1';
                 homeSection.style.overflow = '';
            } else {
                 // Collapse the hero section smoothly when navigating away
                 homeSection.style.height = '0';
                 homeSection.style.padding = '0';
                 homeSection.style.opacity = '0';
                 homeSection.style.overflow = 'hidden';
                // Ensure it's fully hidden after transition
                // setTimeout(() => { if (currentView !== 'home' && currentView !== 'listings') homeSection.style.display = 'none'; }, 400);
            }
        }

        let targetSection = null;
        switch (viewName) {
            case 'home':
                targetSection = listingsSection; // Show listings below hero on home
                if (targetSection) targetSection.style.marginTop = '0'; // Adjust margin if hero is shown
                filterAndSortListings(); // Display default listings
                break;
            case 'listings':
                targetSection = listingsSection;
                if (targetSection) targetSection.style.marginTop = '0'; // Adjust margin if hero is shown
                filterAndSortListings(); // Ensure listings are shown
                break;
            case 'detail':
                targetSection = propertyDetailSection;
                if (targetSection && propertyId) {
                    displayPropertyDetails(propertyId);
                    targetSection.style.marginTop = '60px'; // Standard top margin
                }
                break;
            case 'wishlist':
                targetSection = wishlistSection;
                updateWishlistUI();
                if (targetSection) targetSection.style.marginTop = '60px'; // Standard top margin
                break;
            case 'about':
                targetSection = aboutSection;
                 if (targetSection) targetSection.style.marginTop = '60px';
                break;
            case 'contact':
                targetSection = contactSection;
                 if (targetSection) targetSection.style.marginTop = '60px';
                break;
        }

        if (targetSection) {
            targetSection.style.display = 'block';
            // Use setTimeout to allow the display: block to apply before adding the class
            setTimeout(() => targetSection.classList.add('fade-in'), 10);
             window.scrollTo(0, 0); // Scroll to top on view change
        }

        // Update active nav link (optional)
        document.querySelectorAll('header nav a').forEach(link => link.classList.remove('active')); // Define 'active' class style if needed
        const activeLink = document.getElementById(`${viewName}Link`);
        if (activeLink) activeLink.classList.add('active');
    };


    // --- Listing Rendering ---
    const createSkeletonCard = () => {
        const card = document.createElement('div');
        card.className = 'listing-card skeleton-card';
        card.innerHTML = `
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton-details">
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>
        `;
        return card;
    };

    const renderListings = (propertiesToRender) => {
        listingsGrid.innerHTML = ''; // Clear previous listings or skeletons
        noResultsMessage.style.display = 'none';

        if (propertiesToRender.length === 0) {
            noResultsMessage.style.display = 'block';
            return;
        }

        propertiesToRender.forEach(prop => {
            const card = document.createElement('div');
            card.className = 'listing-card';
            card.dataset.propertyId = prop.id;
            const isLiked = wishlist.has(prop.id);

            card.innerHTML = `
                <div class="listing-image-container">
                    <img src="${prop.images[0]}" alt="${prop.title}" class="listing-image" loading="lazy">
                    ${prop.badge ? `<div class="listing-badge">${prop.badge}</div>` : ''}
                    <button class="like-button ${isLiked ? 'liked' : ''}" aria-label="${isLiked ? 'Unlike' : 'Like'} this property" data-property-id="${prop.id}">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="listing-details">
                    <div class="listing-location">
                        <span>${prop.location}</span>
                        <div class="listing-rating">
                             <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 14px; width: 14px; fill: currentcolor;"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 7.154-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-7.154a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
                            <span>${prop.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <h3 class="listing-title">${prop.title}</h3>
                    <div class="listing-price">${formatPrice(prop.price)} <span>/ night</span></div>
                </div>
            `;
            listingsGrid.appendChild(card);
        });
    };

    const showSkeletons = (count = 8) => {
        listingsGrid.innerHTML = ''; // Clear previous
        noResultsMessage.style.display = 'none';
        for (let i = 0; i < count; i++) {
            listingsGrid.appendChild(createSkeletonCard());
        }
         // Ensure the grid class is set for skeletons too
        listingsGrid.classList.add('listings-grid'); // Default to grid
    };

    // --- Search, Sort, Filter ---
    const filterAndSortListings = () => {
        showSkeletons(); // Show skeletons while filtering/sorting

        // Simulate API delay
        setTimeout(() => {
            let results = [...propertiesData];

            // Filter by Location
            const searchTerm = locationInput.value.trim().toLowerCase();
            if (searchTerm) {
                results = results.filter(prop =>
                    prop.location.toLowerCase().includes(searchTerm) ||
                    prop.title.toLowerCase().includes(searchTerm)
                );
                clearSearchBtn.style.display = 'block';
            } else {
                 clearSearchBtn.style.display = 'none';
            }

            // Filter by other criteria (Dates, Guests) - Simplified for now
            // const checkIn = document.getElementById('checkInSelect').value;
            // const checkOut = document.getElementById('checkOutSelect').value;
            // const guests = document.getElementById('guestsSelect').value;
            // Add actual filtering logic here if needed

            // Sort
            const sortBy = sortOptions.value;
            switch (sortBy) {
                case 'price_asc':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price_desc':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'rating_desc':
                    results.sort((a, b) => b.rating - a.rating);
                    break;
                // case 'default': // No sort needed or sort by ID/relevance
            }

            filteredProperties = results;
            renderListings(filteredProperties);
            setButtonLoading(searchBtn, false, 'Search'); // Ensure button is reset

        }, 500); // 0.5 second delay
    };

    // --- Property Detail Display ---
    const displayPropertyDetails = (propertyId) => {
        showLoading(true);
        // Simulate fetching details
        setTimeout(() => {
            const property = propertiesData.find(p => p.id === propertyId);
            if (!property) {
                console.error("Property not found:", propertyId);
                showLoading(false);
                showView('listings'); // Go back to listings if property not found
                return;
            }

            currentPropertyImages = property.images || [];
            currentLightboxIndex = 0;

            // Populate basic info
            propertyTitle.textContent = property.title; // for screen readers
            propertyTitleDisplay.textContent = property.title;
            propertyLocation.textContent = property.location;
            propertyRating.textContent = `${property.rating.toFixed(1)} (${property.reviews.length} reviews)`; // Example review count
            propertyDescription.innerHTML = property.description.replace(/\n/g, '<br>'); // Allow basic formatting
            reservePriceDisplay.innerHTML = `${formatPrice(property.price)} <span>/ night</span>`;

            // Populate host info
             const hostInfoText = `${property.host.isSuperhost ? 'Superhost' : 'Host'} · ${property.host.joinDate}`;
             propertyOwnerName.textContent = `Hosted by ${property.host.name}`;
             propertyOwnerInfo.textContent = hostInfoText;
             // Placeholder avatar, replace if you have host-specific avatars
             propertyOwnerAvatar.src = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${property.id.replace('prop', '') % 50 + 1}.jpg`;
             propertyOwnerAvatar.alt = `Host ${property.host.name}`;

            // Populate features
            propertyFeatures.innerHTML = '';
            property.features.forEach(feature => {
                const featureEl = document.createElement('div');
                featureEl.className = 'feature';
                featureEl.innerHTML = `<i class="fas ${feature.icon}" aria-hidden="true"></i> ${feature.name}`;
                propertyFeatures.appendChild(featureEl);
            });
            // Add a "Show all features" button if needed (more complex logic)

            // Populate gallery
            propertyMainImage.src = property.images[0];
            propertyMainImage.alt = `Main view of ${property.title}`;
            propertyImageRating.textContent = property.rating.toFixed(1);
            galleryThumbnails.innerHTML = '';
            property.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('div');
                thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                thumb.dataset.index = index;
                thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1} of ${property.title}" loading="lazy">`;
                galleryThumbnails.appendChild(thumb);
            });

             // Populate Reviews (basic example)
             reviewsList.innerHTML = ''; // Clear placeholders
             property.reviews.forEach(review => {
                 const reviewCard = document.createElement('div');
                 reviewCard.className = 'review-card';
                 reviewCard.innerHTML = `
                     <div class="review-header">
                         <img src="${review.avatar || 'placeholder-avatar.png'}" alt="Reviewer ${review.author}" class="review-avatar">
                         <div>
                             <div class="review-author">${review.author}</div>
                             <div class="review-date">${review.date}</div>
                         </div>
                         <div class="review-rating" aria-label="${review.rating} out of 5 stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                     </div>
                     <p class="review-content">${review.content}</p>
                 `;
                 reviewsList.appendChild(reviewCard);
             });
             if (property.reviews.length === 0) {
                 reviewsList.innerHTML = '<p>No reviews yet.</p>';
             }


            // Initialize Map
            initMap(property.coordinates.lat, property.coordinates.lng, property.title);

            // Reset reservation form state
            reserveForm.reset();
            reservePriceDetails.style.display = 'none';
            reserveTotal.style.display = 'none';
            reserveMessage.style.display = 'none';
            reserveMessage.className = 'modal-message'; // Reset class
            setButtonLoading(reserveBtn, false, 'Reserve');
             reserveBtn.classList.remove('reserved');


            // Initialize Rating Stars (reset selection)
            ratingStars.forEach(star => {
                 star.classList.remove('active');
                 star.setAttribute('aria-checked', 'false');
            });


            showLoading(false);
            propertyDetailSection.style.display = 'block';
            setTimeout(() => propertyDetailSection.classList.add('fade-in'), 10);
            window.scrollTo(0, 0); // Scroll to top

        }, 700); // Simulate loading delay
    };

    // --- Map Initialization ---
    const initMap = (lat, lng, title) => {
        if (map) {
            map.remove(); // Remove previous map instance if exists
        }
        if (propertyMapContainer && typeof L !== 'undefined') {
             // Check if container has size, if not wait briefly
             if (propertyMapContainer.offsetHeight === 0) {
                 setTimeout(() => initMap(lat, lng, title), 100);
                 return;
             }

            map = L.map(propertyMapContainer).setView([lat, lng], 14); // Adjust zoom level as needed

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${title}</b><br>Location approximate.`)
                .openPopup();

            // Invalidate map size after it becomes visible to fix potential grey areas
             setTimeout(() => {
                 if(map) map.invalidateSize();
             }, 200);

        } else if (typeof L === 'undefined') {
            console.error("Leaflet library (L) not loaded.");
             // Optionally display a message in the map container
             if (propertyMapContainer) propertyMapContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-light);">Map could not be loaded.</p>';
        } else {
            console.error("Map container not found.");
        }
    };


    // --- Image Gallery & Lightbox ---
    galleryThumbnails.addEventListener('click', (e) => {
        const thumbnail = e.target.closest('.thumbnail');
        if (thumbnail) {
            const index = parseInt(thumbnail.dataset.index, 10);
            propertyMainImage.src = currentPropertyImages[index];
            propertyMainImage.alt = `View ${index + 1} of ${propertyTitle.textContent}`;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            currentLightboxIndex = index;
        }
    });

    propertyMainImage.addEventListener('click', () => {
        if (currentPropertyImages.length > 0) {
            openLightbox(currentLightboxIndex);
        }
    });

    const openLightbox = (index) => {
        if (currentPropertyImages.length === 0) return;
        currentLightboxIndex = index;
        updateLightboxImage();
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.style.opacity = 1, 10);
         document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeLightbox = () => {
        lightbox.style.opacity = 0;
        setTimeout(() => lightbox.style.display = 'none', 300);
         document.body.style.overflow = ''; // Restore scroll
    };

    const updateLightboxImage = () => {
        lightboxImg.src = currentPropertyImages[currentLightboxIndex];
         lightboxImg.alt = `Image ${currentLightboxIndex + 1} of ${currentPropertyImages.length}`;
    };

    const showNextImage = () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentPropertyImages.length;
        updateLightboxImage();
    };

    const showPrevImage = () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentPropertyImages.length) % currentPropertyImages.length;
        updateLightboxImage();
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightbox.addEventListener('click', (e) => { // Close if clicking background
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (e) => { // Keyboard nav for lightbox
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });


    // --- Wishlist ---
    const saveWishlist = () => {
        localStorage.setItem('gojoWishlist', JSON.stringify(Array.from(wishlist)));
    };

    const toggleWishlist = (propertyId) => {
        const button = document.querySelector(`.like-button[data-property-id="${propertyId}"]`);
        if (wishlist.has(propertyId)) {
            wishlist.delete(propertyId);
            if (button) {
                button.classList.remove('liked');
                button.setAttribute('aria-label', 'Like this property');
            }
        } else {
            wishlist.add(propertyId);
             if (button) {
                 button.classList.add('liked');
                 button.setAttribute('aria-label', 'Unlike this property');
             }
        }
        saveWishlist();
         // If currently on the wishlist page, update the UI immediately
         if (currentView === 'wishlist') {
             updateWishlistUI();
         }
    };

     const updateWishlistUI = () => {
         wishlistGrid.innerHTML = ''; // Clear previous
         noWishlistMessage.style.display = 'none';

         const likedProperties = propertiesData.filter(prop => wishlist.has(prop.id));

         if (likedProperties.length === 0) {
             noWishlistMessage.style.display = 'block';
             return;
         }

         // Reuse the listing rendering logic, slightly adapted for wishlist
         likedProperties.forEach(prop => {
             const card = document.createElement('div');
             card.className = 'listing-card'; // Use same card style
             card.dataset.propertyId = prop.id;
             const isLiked = true; // Always liked on wishlist page

             card.innerHTML = `
                 <div class="listing-image-container">
                     <img src="${prop.images[0]}" alt="${prop.title}" class="listing-image" loading="lazy">
                     ${prop.badge ? `<div class="listing-badge">${prop.badge}</div>` : ''}
                     <button class="like-button liked" aria-label="Unlike this property" data-property-id="${prop.id}">
                         <i class="fas fa-heart" aria-hidden="true"></i>
                     </button>
                 </div>
                 <div class="listing-details">
                     <div class="listing-location">
                         <span>${prop.location}</span>
                         <div class="listing-rating">
                             <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 14px; width: 14px; fill: currentcolor;"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 7.154-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-7.154a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
                             <span>${prop.rating.toFixed(1)}</span>
                         </div>
                     </div>
                     <h3 class="listing-title">${prop.title}</h3>
                     <div class="listing-price">${formatPrice(prop.price)} <span>/ night</span></div>
                 </div>
             `;
             wishlistGrid.appendChild(card);
         });

          // Ensure correct view class (grid/list) - Apply default 'grid' or last used setting
         const currentLayout = document.querySelector('.view-toggle .view-option.active')?.dataset.view || 'grid';
          wishlistGrid.className = `listings-grid listings-${currentLayout}`; // Reset class correctly
     };


    // --- Authentication Simulation ---
    const updateAuthUI = () => {
        if (currentUser) {
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            profileIconBtn.style.display = 'flex'; // Use flex to align icon
            profileIconBtn.classList.add('show');
            userNameSpan.textContent = currentUser.name; // Display name if needed (currently hidden by default)
            // userNameSpan.style.display = 'inline';
        } else {
            loginBtn.style.display = 'inline-block';
            signupBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            profileIconBtn.style.display = 'none';
            profileIconBtn.classList.remove('show');
            userNameSpan.textContent = '';
            // userNameSpan.style.display = 'none';
        }
    };

    const openModal = (type) => { // type = 'login' or 'signup'
        let formHtml = '';
        if (type === 'login') {
            formHtml = `
                <h2 id="modalTitle">Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" name="email" placeholder="email@example.com" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" name="password" required>
                    </div>
                    <button type="submit" class="auth-btn"><span>Login</span></button>
                     <p class="modal-message" id="loginMessage"></p>
                     <div class="or-divider">OR</div>
                     <div class="social-login-buttons">
                         <button type="button" class="social-login-button"><i class="fab fa-google"></i> Continue with Google</button>
                         <button type="button" class="social-login-button"><i class="fab fa-facebook-f"></i> Continue with Facebook</button>
                         <button type="button" class="social-login-button"><i class="fab fa-apple"></i> Continue with Apple</button>
                     </div>
                     <p style="text-align: center; margin-top: 15px; font-size: 0.9rem;">Don't have an account? <a href="#" id="switchToSignup">Sign Up</a></p>
                </form>
            `;
        } else { // signup
            formHtml = `
                <h2 id="modalTitle">Sign Up</h2>
                <form id="signupForm">
                     <div class="form-group">
                         <label for="signupName">Full Name</label>
                         <input type="text" id="signupName" name="name" required>
                     </div>
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" name="email" placeholder="email@example.com" required>
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" name="password" required pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters">
                         <div class="password-strength-feedback" id="passwordStrength"></div>
                         <div class="password-requirements">
                            <span id="reqLength" class="unmet">At least 8 characters</span>
                            <span id="reqLower" class="unmet">A lowercase letter</span>
                            <span id="reqUpper" class="unmet">An uppercase letter</span>
                            <span id="reqNumber" class="unmet">A number</span>
                        </div>
                    </div>
                     <div class="form-group">
                         <label for="signupConfirmPassword">Confirm Password</label>
                         <input type="password" id="signupConfirmPassword" name="confirmPassword" required>
                     </div>
                    <button type="submit" class="auth-btn"><span>Sign Up</span></button>
                     <p class="modal-message" id="signupMessage"></p>
                      <div class="or-divider">OR</div>
                     <div class="social-login-buttons">
                         <button type="button" class="social-login-button"><i class="fab fa-google"></i> Continue with Google</button>
                          <button type="button" class="social-login-button"><i class="fab fa-facebook-f"></i> Continue with Facebook</button>
                         <button type="button" class="social-login-button"><i class="fab fa-apple"></i> Continue with Apple</button>
                     </div>
                      <p style="text-align: center; margin-top: 15px; font-size: 0.9rem;">Already have an account? <a href="#" id="switchToLogin">Log In</a></p>
                </form>
            `;
        }
        modalContent.innerHTML = formHtml;
        authModal.classList.add('show');
         document.body.style.overflow = 'hidden'; // Prevent background scroll

        // Add event listeners for dynamically added elements
        if (type === 'login') {
            const loginForm = document.getElementById('loginForm');
            const loginMessage = document.getElementById('loginMessage');
            loginForm.addEventListener('submit', (e) => handleAuthSubmit(e, 'login', loginForm, loginMessage));
            document.getElementById('switchToSignup').addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });

        } else { // signup
            const signupForm = document.getElementById('signupForm');
            const signupMessage = document.getElementById('signupMessage');
            const passwordInput = document.getElementById('signupPassword');
             const confirmPasswordInput = document.getElementById('signupConfirmPassword');
             const strengthFeedback = document.getElementById('passwordStrength');
             const reqLength = document.getElementById('reqLength');
             const reqLower = document.getElementById('reqLower');
             const reqUpper = document.getElementById('reqUpper');
             const reqNumber = document.getElementById('reqNumber');

             passwordInput.addEventListener('input', () => checkPasswordStrength(passwordInput, strengthFeedback, reqLength, reqLower, reqUpper, reqNumber));
              confirmPasswordInput.addEventListener('input', () => validateConfirmPassword(passwordInput, confirmPasswordInput));

            signupForm.addEventListener('submit', (e) => handleAuthSubmit(e, 'signup', signupForm, signupMessage));
            document.getElementById('switchToLogin').addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
        }

         // Add listeners for social buttons (just log for now)
         document.querySelectorAll('.social-login-button').forEach(button => {
             button.addEventListener('click', () => {
                 console.log(`Social login clicked: ${button.textContent.trim()}`);
                 // Implement actual social login flow here
                  const messageElement = document.getElementById(type === 'login' ? 'loginMessage' : 'signupMessage');
                 if (messageElement) {
                     messageElement.textContent = 'Social login not implemented yet.';
                     messageElement.className = 'modal-message error';
                 }
             });
         });

    };

    const closeModal = () => {
        authModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
        // Clear form content? Optional.
        // modalContent.innerHTML = '';
    };

    const checkPasswordStrength = (passwordInput, feedbackEl, lengthEl, lowerEl, upperEl, numEl) => {
         const password = passwordInput.value;
         let score = 0;
         let requirementsMet = {
             length: password.length >= 8,
             lower: /[a-z]/.test(password),
             upper: /[A-Z]/.test(password),
             number: /\d/.test(password)
         };

         if (requirementsMet.length) score++;
         if (requirementsMet.lower) score++;
         if (requirementsMet.upper) score++;
         if (requirementsMet.number) score++;
         if (/[^A-Za-z0-9]/.test(password)) score++; // Bonus for special char

         // Update requirement indicators
         const updateReq = (el, met) => { el.className = met ? 'met' : 'unmet'; };
         updateReq(lengthEl, requirementsMet.length);
         updateReq(lowerEl, requirementsMet.lower);
         updateReq(upperEl, requirementsMet.upper);
         updateReq(numEl, requirementsMet.number);

         // Update strength feedback text and class
         let strengthText = '';
         let strengthClass = '';
         if (password.length === 0) {
             strengthText = '';
             strengthClass = '';
         } else if (score < 3) {
             strengthText = 'Weak';
             strengthClass = 'weak';
         } else if (score < 4) {
             strengthText = 'Medium';
             strengthClass = 'medium';
         } else {
             strengthText = 'Strong';
             strengthClass = 'strong';
         }
         feedbackEl.textContent = strengthText;
         feedbackEl.className = `password-strength-feedback ${strengthClass}`;
         return requirementsMet.length && requirementsMet.lower && requirementsMet.upper && requirementsMet.number;
     };

      const validateConfirmPassword = (passwordInput, confirmInput) => {
         if (passwordInput.value !== confirmInput.value && confirmInput.value.length > 0) {
             confirmInput.setCustomValidity("Passwords do not match.");
         } else {
             confirmInput.setCustomValidity("");
         }
         confirmInput.reportValidity(); // Show validation message immediately
     };

    const handleAuthSubmit = (event, type, form, messageElement) => {
        event.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        setButtonLoading(submitButton, true);
        messageElement.textContent = ''; // Clear previous messages
        messageElement.className = 'modal-message';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

         // --- Signup Specific Validation ---
        if (type === 'signup') {
             const passwordInput = form.querySelector('#signupPassword');
             const confirmPasswordInput = form.querySelector('#signupConfirmPassword');
             const strengthFeedback = form.querySelector('#passwordStrength');
             const reqLength = form.querySelector('#reqLength');
             const reqLower = form.querySelector('#reqLower');
             const reqUpper = form.querySelector('#reqUpper');
             const reqNumber = form.querySelector('#reqNumber');

             const passwordStrongEnough = checkPasswordStrength(passwordInput, strengthFeedback, reqLength, reqLower, reqUpper, reqNumber);

             if (data.password !== data.confirmPassword) {
                  messageElement.textContent = 'Passwords do not match.';
                  messageElement.className = 'modal-message error';
                  setButtonLoading(submitButton, false);
                  confirmPasswordInput.focus();
                  confirmPasswordInput.setCustomValidity("Passwords do not match."); // Ensure browser validation shows
                  confirmPasswordInput.reportValidity();
                  return;
             } else {
                 confirmPasswordInput.setCustomValidity(""); // Clear validation message
             }

             if (!passwordStrongEnough) {
                 messageElement.textContent = 'Password does not meet requirements.';
                 messageElement.className = 'modal-message error';
                 setButtonLoading(submitButton, false);
                 passwordInput.focus();
                  passwordInput.reportValidity(); // Try to show browser pop-up if pattern fails
                 return;
             }
        }


        // --- Simulate API Call ---
        console.log(`Simulating ${type}...`, data);
        setTimeout(() => {
            // Simulate success/failure
            const isSuccess = Math.random() > 0.2; // 80% success rate

            if (isSuccess) {
                if (type === 'login') {
                    currentUser = { name: data.email.split('@')[0] }; // Simple name extraction
                    messageElement.textContent = 'Login successful!';
                    messageElement.className = 'modal-message success';
                } else { // signup
                     currentUser = { name: data.name };
                    messageElement.textContent = 'Sign up successful! You are now logged in.';
                    messageElement.className = 'modal-message success';
                }
                updateAuthUI();
                setTimeout(closeModal, 1500); // Close modal after success message
            } else {
                messageElement.textContent = `${type === 'login' ? 'Login' : 'Sign up'} failed. Please try again.`;
                messageElement.className = 'modal-message error';
                setButtonLoading(submitButton, false);
            }

            if (isSuccess) {
                setButtonLoading(submitButton, false); // Reset button state only if modal isn't closing immediately
            }

        }, 1000); // 1 second delay
    };

    const handleLogout = () => {
        currentUser = null;
        updateAuthUI();
        // Maybe show a message?
        console.log("User logged out");
    };

    // --- Reservation Simulation ---
    const calculateReservationTotal = () => {
        const property = propertiesData.find(p => p.id === currentPropertyId);
        if (!property || !reserveCheckIn.value || !reserveCheckOut.value) {
             reservePriceDetails.style.display = 'none';
             reserveTotal.style.display = 'none';
            return;
        }

        const checkInDate = new Date(reserveCheckIn.value);
        const checkOutDate = new Date(reserveCheckOut.value);

        if (checkOutDate <= checkInDate) {
             reservePriceDetails.style.display = 'none';
             reserveTotal.style.display = 'none';
             // Optionally show an error message
            return;
        }

        const nightCount = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const pricePerNight = property.price;
        const serviceFee = 150; // Example fixed service fee

        const subtotal = pricePerNight * nightCount;
        const total = subtotal + serviceFee;

         pricePerNightValue.textContent = `${formatPrice(pricePerNight)} x ${nightCount} night${nightCount > 1 ? 's' : ''}`;
         serviceFeeValue.textContent = formatPrice(serviceFee); // Use formatPrice
         totalPrice.textContent = formatPrice(total);

         reservePriceDetails.style.display = 'block';
         reserveTotal.style.display = 'block';
    };

    reserveCheckIn.addEventListener('change', calculateReservationTotal);
    reserveCheckOut.addEventListener('change', calculateReservationTotal);

    reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
             reserveMessage.textContent = 'Please log in to make a reservation.';
             reserveMessage.className = 'modal-message error';
             reserveMessage.style.display = 'block';
             setTimeout(() => openModal('login'), 500);
             return;
        }

        setButtonLoading(reserveBtn, true);
         reserveMessage.style.display = 'none'; // Hide previous messages
         reserveMessage.className = 'modal-message'; // Reset class

        // Simple validation
        if (!reserveCheckIn.value || !reserveCheckOut.value || !reserveGuests.value) {
            reserveMessage.textContent = 'Please fill in all reservation details.';
            reserveMessage.className = 'modal-message error';
            reserveMessage.style.display = 'block';
            setButtonLoading(reserveBtn, false);
            return;
        }
        const checkInDate = new Date(reserveCheckIn.value);
        const checkOutDate = new Date(reserveCheckOut.value);
        if (checkOutDate <= checkInDate) {
            reserveMessage.textContent = 'Check-out date must be after check-in date.';
             reserveMessage.className = 'modal-message error';
             reserveMessage.style.display = 'block';
             setButtonLoading(reserveBtn, false);
             return;
        }

        // Simulate reservation API call
        console.log("Simulating reservation...", {
            propertyId: currentPropertyId,
            checkIn: reserveCheckIn.value,
            checkOut: reserveCheckOut.value,
            guests: reserveGuests.value,
             total: totalPrice.textContent // Send calculated total maybe
        });

        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            if (success) {
                reserveMessage.textContent = 'Reservation successful! Check your email for confirmation.';
                reserveMessage.className = 'modal-message success';
                 reserveBtn.textContent = 'Reserved!';
                 reserveBtn.classList.add('reserved');
                 setButtonLoading(reserveBtn, false); // Remove spinner
                 reserveBtn.disabled = true; // Keep button disabled after success
            } else {
                reserveMessage.textContent = 'Reservation failed. Please try again later.';
                reserveMessage.className = 'modal-message error';
                setButtonLoading(reserveBtn, false); // Re-enable on failure
            }
            reserveMessage.style.display = 'block';
        }, 1500); // 1.5 second delay
    });

    // --- Rating & Review Simulation ---
     ratingStarsContainer.addEventListener('click', (e) => {
         const starButton = e.target.closest('.star');
         if (!starButton) return;

         const rating = parseInt(starButton.dataset.rating, 10);

         // Update visual state
         ratingStars.forEach((star, index) => {
             if (index < rating) {
                 star.classList.add('active');
                 star.setAttribute('aria-checked', 'true');
             } else {
                 star.classList.remove('active');
                  star.setAttribute('aria-checked', 'false');
             }
         });

         // Simulate sending rating to backend
         console.log(`Rated property ${currentPropertyId} with ${rating} stars.`);
         // Optionally show a confirmation message
     });

     addReviewBtn.addEventListener('click', () => {
         // In a real app, this would open a modal or form to write a review
         if (!currentUser) {
             alert('Please log in to add a review.');
             openModal('login');
             return;
         }
         const reviewContent = prompt(`Enter your review for property ${currentPropertyId}:`);
         if (reviewContent && reviewContent.trim() !== '') {
             // Simulate adding review
             const newReview = {
                 author: currentUser.name,
                 date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                 rating: parseInt(document.querySelector('.star.active:last-child')?.dataset.rating || '0', 10), // Get current rating
                 content: reviewContent.trim(),
                 avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' // Placeholder avatar for logged in user
             };

             console.log("Adding review:", newReview);

             // Add to the UI immediately (in real app, wait for API response)
             const reviewCard = document.createElement('div');
             reviewCard.className = 'review-card';
             reviewCard.innerHTML = `
                 <div class="review-header">
                     <img src="${newReview.avatar}" alt="Reviewer ${newReview.author}" class="review-avatar">
                      <div>
                           <div class="review-author">${newReview.author}</div>
                           <div class="review-date">${newReview.date}</div>
                       </div>
                      <div class="review-rating" aria-label="${newReview.rating} out of 5 stars">${'★'.repeat(newReview.rating)}${'☆'.repeat(5 - newReview.rating)}</div>
                  </div>
                  <p class="review-content">${newReview.content}</p>
             `;
             // Insert at the top or bottom of reviewsList
             if (reviewsList.firstChild && reviewsList.firstChild.nodeName !== 'P') { // Avoid inserting before "No reviews yet"
                 reviewsList.insertBefore(reviewCard, reviewsList.firstChild);
             } else {
                 reviewsList.innerHTML = ''; // Clear "No reviews" message if present
                 reviewsList.appendChild(reviewCard);
             }

             alert('Review added (simulated).');
         }
     });

    // --- Language Switcher ---
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing immediately if clicking button again
        const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
        languageBtn.setAttribute('aria-expanded', !isExpanded);
        languageDropdown.classList.toggle('show');
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            currentLanguage = lang;
            languageBtn.innerHTML = `<i class="fas fa-globe" aria-hidden="true"></i> ${lang.toUpperCase()}`;
            languageDropdown.classList.remove('show');
            languageBtn.setAttribute('aria-expanded', 'false');
            console.log(`Language switched to: ${lang}`);
            // Add actual translation logic here if needed
            // Example: updateUIText(lang);
        });
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('show');
            languageBtn.setAttribute('aria-expanded', 'false');
        }
    });


    // --- Event Listeners ---
    logoHomeLink.addEventListener('click', (e) => { e.preventDefault(); showView('home'); });
    homeLink.addEventListener('click', (e) => { e.preventDefault(); showView('home'); });
    listingsLink.addEventListener('click', (e) => { e.preventDefault(); showView('listings'); });
    wishlistLink.addEventListener('click', (e) => { e.preventDefault(); showView('wishlist'); });
    aboutLink.addEventListener('click', (e) => { e.preventDefault(); showView('about'); });
    contactLink.addEventListener('click', (e) => { e.preventDefault(); showView('contact'); });

    loginBtn.addEventListener('click', () => openModal('login'));
    signupBtn.addEventListener('click', () => openModal('signup'));
    logoutBtn.addEventListener('click', handleLogout);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    authModal.addEventListener('click', (e) => { // Close modal on background click
        if (e.target === authModal) closeModal();
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setButtonLoading(searchBtn, true);
        filterAndSortListings();
        showView('listings'); // Ensure listings view is shown after search
    });

     locationInput.addEventListener('input', () => {
         // Show clear button if input has text
         clearSearchBtn.style.display = locationInput.value.trim() ? 'block' : 'none';
     });

     clearSearchBtn.addEventListener('click', () => {
         locationInput.value = '';
         clearSearchBtn.style.display = 'none';
         // Optionally trigger search again or just clear
         // filterAndSortListings();
         locationInput.focus();
     });


    sortOptions.addEventListener('change', filterAndSortListings);

    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
             // Apply to both listing grids
             [listingsGrid, wishlistGrid].forEach(grid => {
                 if (grid) {
                     grid.classList.remove('listings-grid', 'listings-list');
                     grid.classList.add(`listings-${view}`);
                 }
             });

            viewToggleButtons.forEach(btn => {
                 btn.classList.remove('active');
                 btn.setAttribute('aria-pressed', 'false');
             });
            button.classList.add('active');
             button.setAttribute('aria-pressed', 'true');
        });
    });

    // Use event delegation for listing card clicks and like buttons
    document.body.addEventListener('click', (e) => {
        // Listing card click
        const card = e.target.closest('.listing-card:not(.skeleton-card)'); // Ensure not clicking a skeleton
        if (card && !e.target.closest('.like-button')) { // Don't trigger if like button was clicked
            const propertyId = card.dataset.propertyId;
            if (propertyId) {
                showView('detail', propertyId);
            }
        }

        // Like button click
        const likeButton = e.target.closest('.like-button');
        if (likeButton) {
            const propertyId = likeButton.dataset.propertyId;
            if (propertyId) {
                toggleWishlist(propertyId);
            }
        }
    });


    backBtn.addEventListener('click', () => {
        // Go back to the previous relevant view (usually listings or wishlist)
         if (currentView === 'detail') {
             // Determine if came from wishlist or listings? Harder without history tracking.
             // Default to listings for now.
             showView('listings');
         } else {
              showView('home'); // Default fallback
         }
    });

    // --- Initialization ---
    const initializeApp = () => {
        showLoading(true);
        currentYearSpan.textContent = new Date().getFullYear(); // Set footer year

        // Simulate fetching initial data
        setTimeout(() => {
            propertiesData = generateProperties(25); // Generate sample data
            filteredProperties = [...propertiesData]; // Initially show all

             // Initial UI setup based on state
             updateAuthUI();
             wishlist = new Set(JSON.parse(localStorage.getItem('gojoWishlist') || '[]')); // Load wishlist

            // Determine initial view (e.g., based on URL hash if implemented)
             // For now, start at 'home' which includes listings
            showView('home');

            showLoading(false);
        }, 1000); // Simulate initial data load time
    };

    initializeApp();

}); // End DOMContentLoaded