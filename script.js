/**
 * The Achievers School — Interactive Frontend Script
 * Gulshan-e-Hadeed, Karachi, Pakistan
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Mobile Navigation Drawer Handling
  // -------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileMenuOpen');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const drawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // -------------------------------------------------------------
  // 2. Sticky Header Scroll Effect & Back-to-Top Button
  // -------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sticky header shadow
    if (scrollPos > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scroll to top button
    if (scrollPos > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------
  // 3. Active Nav Link on Scroll Spy
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // -------------------------------------------------------------
  // 4. Academic Programs Filter Tabs
  // -------------------------------------------------------------
  const programTabs = document.querySelectorAll('.tab-btn[data-filter]');
  const programCards = document.querySelectorAll('.program-card');

  window.filterPrograms = function(filterValue) {
    programTabs.forEach(tab => {
      if (tab.dataset.filter === filterValue) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    programCards.forEach(card => {
      const category = card.dataset.category;
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.35s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });

    // Smooth scroll down to explorer if invoked from other sections
    const explorerSection = document.getElementById('programs-explorer');
    if (explorerSection) {
      explorerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  programTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterPrograms(filter);
    });
  });

  // -------------------------------------------------------------
  // 5. Statistics Counter Animation
  // -------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      const formatted = current >= 1000 ? Math.floor(current).toLocaleString() : Math.floor(current);
      const spanHtml = el.querySelector('span') ? el.querySelector('span').outerHTML : '+';
      el.innerHTML = `${formatted}${spanHtml}`;
    }, stepTime);
  }

  const statsSection = document.querySelector('.impact-stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(num => countUp(num));
      }
    }, { threshold: 0.35 });

    observer.observe(statsSection);
  }

  // -------------------------------------------------------------
  // 6. Photo Gallery Filter & Lightbox Viewer
  // -------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.tab-btn[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  // Filter gallery
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.galleryFilter;
      activeGalleryItems = [];

      galleryItems.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          activeGalleryItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Open Lightbox
  function openLightbox(index) {
    if (!activeGalleryItems[index]) return;
    currentGalleryIndex = index;
    const currentItem = activeGalleryItems[currentGalleryIndex];
    const highResSrc = currentItem.dataset.src || currentItem.querySelector('img').src;
    const caption = currentItem.dataset.caption || '';

    lightboxImg.src = highResSrc;
    lightboxCaption.textContent = caption;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextLightbox() {
    currentGalleryIndex = (currentGalleryIndex + 1) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrevLightbox() {
    currentGalleryIndex = (currentGalleryIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = activeGalleryItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  // Close lightbox if backdrop clicked
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextLightbox();
    if (e.key === 'ArrowLeft') showPrevLightbox();
  });

  // -------------------------------------------------------------
  // 7. Video Tour Modal
  // -------------------------------------------------------------
  const btnTourTrigger = document.getElementById('btnTourTrigger');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');

  if (btnTourTrigger && videoModal) {
    btnTourTrigger.addEventListener('click', () => {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  // -------------------------------------------------------------
  // 8. Working Admission Enquiry Form Validation & Demo Receipt
  // -------------------------------------------------------------
  const enquiryForm = document.getElementById('admissionEnquiryForm');
  const parentNameInput = document.getElementById('parentName');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const childNameInput = document.getElementById('childName');
  const gradeWingSelect = document.getElementById('gradeWing');
  const sessionSelect = document.getElementById('session');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitFormBtn');

  const demoModal = document.getElementById('demoSubmissionModal');
  const demoModalCloseBtn = document.getElementById('demoModalCloseBtn');
  const demoPayloadSummary = document.getElementById('demoPayloadSummary');

  function validateInput(input, condition) {
    if (!condition) {
      input.classList.add('error');
      return false;
    } else {
      input.classList.remove('error');
      return true;
    }
  }

  function validateEmail(email) {
    if (!email) return true; // optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePakPhone(phone) {
    // Allows e.g. 03001234567, 0332-3475805, 02134712233, +923323475805
    const clean = phone.replace(/[\s\-\(\)]/g, '');
    return clean.length >= 10 && clean.length <= 13;
  }

  // Clear errors on input
  [parentNameInput, phoneInput, emailInput, childNameInput, gradeWingSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('error');
      });
      input.addEventListener('change', () => {
        input.classList.remove('error');
      });
    }
  });

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Parent Name
      const parentNameVal = parentNameInput.value.trim();
      if (!validateInput(parentNameInput, parentNameVal.length >= 3)) {
        isValid = false;
      }

      // Validate Phone
      const phoneVal = phoneInput.value.trim();
      if (!validateInput(phoneInput, validatePakPhone(phoneVal))) {
        isValid = false;
      }

      // Validate Email (if provided)
      const emailVal = emailInput.value.trim();
      if (!validateInput(emailInput, validateEmail(emailVal))) {
        isValid = false;
      }

      // Validate Child Name
      const childNameVal = childNameInput.value.trim();
      if (!validateInput(childNameInput, childNameVal.length >= 2)) {
        isValid = false;
      }

      // Validate Grade Wing
      const gradeVal = gradeWingSelect.value;
      if (!validateInput(gradeWingSelect, gradeVal !== '')) {
        isValid = false;
      }

      if (!isValid) {
        // Focus first error field
        const firstError = enquiryForm.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      // Form is valid: Simulate submission state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Enquiry...';

      const payload = {
        school: "The Achievers School — Gulshan-e-Hadeed, Karachi",
        submittedAt: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
        parentName: parentNameVal,
        phone: phoneVal,
        email: emailVal || "(Not provided)",
        childName: childNameVal,
        gradeWing: gradeVal,
        academicSession: sessionSelect.value,
        inquiryMessage: messageInput.value.trim() || "(No additional notes provided)"
      };

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Render preview in modal
        demoPayloadSummary.textContent = JSON.stringify(payload, null, 2);
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset form
        enquiryForm.reset();
      }, 700);
    });
  }

  if (demoModalCloseBtn) {
    demoModalCloseBtn.addEventListener('click', () => {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
