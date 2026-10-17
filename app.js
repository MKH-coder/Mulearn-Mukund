// Oober - Go Everywhere Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // Current State
    let currentCity = 'Kerela , IN';
    let selectedRide = {
        name: 'Oober Auto',
        price: '₹115',
        type: 'auto'
    };

    // Modal Helpers
    const openModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    };

    const closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            closeModal(modalId);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // City Selection
    const changeCityLink = document.getElementById('change-city-link');
    const cityDisplay = document.getElementById('city-display');
    const cityChoices = document.querySelectorAll('.city-pill-choice');
    const confirmCityBtn = document.getElementById('confirm-city-btn');
    let tempCity = currentCity;

    if (changeCityLink) {
        changeCityLink.addEventListener('click', () => {
            openModal('city-modal');
        });
    }

    cityChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            cityChoices.forEach(c => c.classList.remove('active'));
            choice.classList.add('active');
            tempCity = choice.innerText + ' , IN';
        });
    });

    if (confirmCityBtn) {
        confirmCityBtn.addEventListener('click', () => {
            currentCity = tempCity;
            if (cityDisplay) cityDisplay.innerText = currentCity;
            closeModal('city-modal');
        });
    }

    // Timing & Schedule Selector
    const timingBtn = document.getElementById('timing-btn');
    const scheduleBannerBtn = document.getElementById('schedule-banner-btn');
    const timingText = document.getElementById('timing-text');
    const scheduleDate = document.getElementById('schedule-date');
    const scheduleTime = document.getElementById('schedule-time');
    const saveScheduleBtn = document.getElementById('save-schedule-btn');

    // Default date to today
    if (scheduleDate) {
        const today = new Date().toISOString().split('T')[0];
        scheduleDate.value = today;
        scheduleDate.min = today;
    }

    if (timingBtn) {
        timingBtn.addEventListener('click', () => {
            openModal('schedule-modal');
        });
    }

    if (scheduleBannerBtn) {
        scheduleBannerBtn.addEventListener('click', () => {
            openModal('schedule-modal');
        });
    }

    if (saveScheduleBtn) {
        saveScheduleBtn.addEventListener('click', () => {
            const dateVal = scheduleDate.value;
            const timeVal = scheduleTime.value;
            if (dateVal && timeVal) {
                const dateObj = new Date(dateVal);
                const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                timingText.innerText = `${formattedDate}, ${timeVal}`;
            } else {
                timingText.innerText = 'Pickup Now';
            }
            closeModal('schedule-modal');
        });
    }

    // See Prices & Ride Booking
    const seePricesBtn = document.getElementById('see-prices-btn');
    const startLocInput = document.getElementById('start-location');
    const endLocInput = document.getElementById('end-location');
    const modalRouteDisplay = document.getElementById('modal-route-display');
    const rideOptions = document.querySelectorAll('.ride-option-card');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');

    if (seePricesBtn) {
        seePricesBtn.addEventListener('click', () => {
            const start = startLocInput.value.trim() || 'Current Location';
            const end = endLocInput.value.trim() || 'Destination';
            if (modalRouteDisplay) {
                modalRouteDisplay.innerText = `${start} → ${end}`;
            }
            openModal('price-modal');
        });
    }

    rideOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            rideOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            const carType = opt.getAttribute('data-car');
            const price = opt.getAttribute('data-price');
            const name = opt.querySelector('h4').innerText;

            selectedRide = { name, price, type: carType };
            if (confirmBookingBtn) {
                confirmBookingBtn.innerText = `Confirm ${name} (${price})`;
            }
        });
    });

    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', () => {
            confirmBookingBtn.innerText = 'Connecting to nearby drivers...';
            confirmBookingBtn.disabled = true;

            setTimeout(() => {
                alert(`Ride Confirmed!\n\nDriver arriving in 3 minutes in ${selectedRide.name}.\nPickup: ${startLocInput.value}\nDestination: ${endLocInput.value}\nTotal Fare: ${selectedRide.price}`);
                confirmBookingBtn.innerText = `Confirm ${selectedRide.name}`;
                confirmBookingBtn.disabled = false;
                closeModal('price-modal');
            }, 1000);
        });
    }

    // GPS location detection button
    const detectGpsBtn = document.getElementById('detect-gps-btn');
    if (detectGpsBtn) {
        detectGpsBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                detectGpsBtn.style.opacity = '0.5';
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        detectGpsBtn.style.opacity = '1';
                        startLocInput.value = `Current Location (${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)})`;
                    },
                    () => {
                        detectGpsBtn.style.opacity = '1';
                        startLocInput.value = 'Panampilly Nagar, Kochi, Kerala';
                    }
                );
            } else {
                startLocInput.value = 'Panampilly Nagar, Kochi, Kerala';
            }
        });
    }

    // Authentication Modal (Log in / Sign up / Check Activity)
    const loginNavBtn = document.getElementById('login-nav-btn');
    const signupNavBtn = document.getElementById('signup-nav-btn');
    const activityBtn = document.getElementById('activity-btn');
    const authModalTitle = document.getElementById('auth-modal-title');
    const authContinueBtn = document.getElementById('auth-continue-btn');
    const authPhoneInput = document.getElementById('auth-phone-input');

    const handleAuthOpen = (title) => {
        if (authModalTitle) authModalTitle.innerText = title;
        openModal('auth-modal');
    };

    if (loginNavBtn) loginNavBtn.addEventListener('click', () => handleAuthOpen('Log in to Oober'));
    if (signupNavBtn) signupNavBtn.addEventListener('click', () => handleAuthOpen('Create your Oober account'));
    if (activityBtn) activityBtn.addEventListener('click', () => handleAuthOpen('Log in to check your activity'));

    if (authContinueBtn) {
        authContinueBtn.addEventListener('click', () => {
            const phone = authPhoneInput.value.trim();
            if (!phone) {
                authPhoneInput.focus();
                return;
            }
            authContinueBtn.innerText = 'Verifying...';
            setTimeout(() => {
                alert(`Welcome back! You are logged in with +91 ${phone}`);
                authContinueBtn.innerText = 'Continue';
                authPhoneInput.value = '';
                closeModal('auth-modal');
            }, 800);
        });
    }

    // Driver Earnings Calculator
    const hoursSlider = document.getElementById('hours-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const earningsDisplay = document.getElementById('earnings-display');
    const calcApplyBtn = document.getElementById('calc-apply-btn');
    const driverSignupBtn = document.getElementById('driver-signup-btn');
    const driverLearnBtn = document.getElementById('driver-learn-btn');

    const calculateEarnings = (hours) => {
        // Average hourly gross in Kerala ~₹480/hr
        const ratePerHour = 480;
        const total = hours * ratePerHour;
        return '₹' + total.toLocaleString('en-IN');
    };

    if (hoursSlider && hoursDisplay && earningsDisplay) {
        hoursSlider.addEventListener('input', (e) => {
            const hours = parseInt(e.target.value, 10);
            hoursDisplay.innerText = `${hours} hrs`;
            earningsDisplay.innerText = calculateEarnings(hours);
        });
    }

    if (calcApplyBtn) {
        calcApplyBtn.addEventListener('click', () => {
            handleAuthOpen('Sign up to Drive with Oober');
        });
    }

    if (driverSignupBtn) {
        driverSignupBtn.addEventListener('click', () => {
            handleAuthOpen('Become an Oober Driver Partner');
        });
    }

    if (driverLearnBtn) {
        driverLearnBtn.addEventListener('click', () => {
            handleAuthOpen('Driver Partner Sign In');
        });
    }

    // Explore Cards Quick Action
    document.querySelectorAll('.explore-card').forEach(card => {
        card.addEventListener('click', () => {
            const action = card.getAttribute('data-action');
            if (action === 'ride' || action === 'auto' || action === 'moto' || action === 'intercity') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (action === 'auto') {
                    selectedRide = { name: 'Oober Auto', price: '₹115', type: 'auto' };
                } else if (action === 'moto') {
                    selectedRide = { name: 'Oober Moto', price: '₹65', type: 'moto' };
                }
            } else if (action === 'business') {
                handleAuthOpen('Oober for Business Enterprise Sign Up');
            } else if (action === 'package') {
                openModal('price-modal');
            }
        });
    });

    // Fullscreen Toggle
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }

    // Mobile Navigation Drawer Toggle
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = '#0a0a0c';
                navMenu.style.padding = '1.5rem';
                navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
    }
});
