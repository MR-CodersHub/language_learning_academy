/**
 * Fluentra Academy Courses Engine
 */

const COURSES_DATA = [
  {
    id: 1,
    title: 'Complete German Mastery: Zero to Fluent (A1-B2)',
    category: 'German',
    badge: 'Popular',
    level: 'Beginner',
    rating: 4.9,
    reviews: 1420,
    duration: '85 Hours',
    students: '12,450',
    instructor: {
      name: 'Dr. Kristin Becker',
      role: 'Former Goethe Institute Head',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$129',
    currentPrice: '$79',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'IELTS Academic Exam Preparation Elite Masterclass',
    category: 'IELTS',
    badge: 'Best Seller',
    level: 'Advanced',
    rating: 4.8,
    reviews: 3280,
    duration: '42 Hours',
    students: '25,890',
    instructor: {
      name: 'Jonathan Miller',
      role: 'Ex-IELTS Examiner (15+ Years)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$149',
    currentPrice: '$99',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Conversational Japanese for Beginners (N5-N4)',
    category: 'Japanese',
    badge: 'Trending',
    level: 'Beginner',
    rating: 4.9,
    reviews: 980,
    duration: '60 Hours',
    students: '8,320',
    instructor: {
      name: 'Yukiko Takahashi',
      role: 'Saitama University Linguist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$119',
    currentPrice: '$69',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Advanced French: Literature, Art, and Culture',
    category: 'French',
    badge: 'Expert Tier',
    level: 'Advanced',
    rating: 4.7,
    reviews: 540,
    duration: '50 Hours',
    students: '4,120',
    instructor: {
      name: 'Prof. Lucas Dubois',
      role: 'Sorbonne University Associate',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$139',
    currentPrice: '$89',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Business English Elite: Negotiations and Leadership',
    category: 'Business English',
    badge: 'Career Accent',
    level: 'Intermediate',
    rating: 4.9,
    reviews: 2110,
    duration: '35 Hours',
    students: '18,500',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Corporate Trainer & Coach',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$159',
    currentPrice: '$119',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Comprehensive Spanish Path: Beginner to Advanced (A1-C1)',
    category: 'Spanish',
    badge: 'Popular',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 1890,
    duration: '90 Hours',
    students: '14,320',
    instructor: {
      name: 'Manuel Ortiz',
      role: 'Madrid Language Guild Director',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$129',
    currentPrice: '$79',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    title: 'Korean K-Culture Accent: Spoken Fluency (Hangul to Chatting)',
    category: 'Korean',
    badge: 'Trending',
    level: 'Beginner',
    rating: 4.9,
    reviews: 860,
    duration: '48 Hours',
    students: '9,150',
    instructor: {
      name: 'Min-Ji Kim',
      role: 'Seoul National University Scholar',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$109',
    currentPrice: '$59',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: 'Spoken English Confidence: Absolute Accent & Vocal Control',
    category: 'Spoken English',
    badge: 'Quick Boot',
    level: 'Beginner',
    rating: 4.7,
    reviews: 1540,
    duration: '28 Hours',
    students: '11,200',
    instructor: {
      name: 'Jonathan Miller',
      role: 'Ex-IELTS Examiner (15+ Years)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$89',
    currentPrice: '$49',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 9,
    title: 'Core Fundamentals of English Grammar & Writing Accent',
    category: 'English',
    badge: 'Foundation',
    level: 'Beginner',
    rating: 4.8,
    reviews: 2890,
    duration: '38 Hours',
    students: '20,400',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Corporate Trainer & Coach',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
    },
    originalPrice: '$99',
    currentPrice: '$49',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const coursesGrid = document.getElementById('coursesCatalogGrid');
  const searchInput = document.getElementById('courseSearchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let activeCategory = 'All';
  let activeSearchQuery = '';

  const renderCourses = () => {
    if (!coursesGrid) return;

    // Filter Logic
    const filtered = COURSES_DATA.filter(course => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      const matchesSearch = course.title.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
                            course.category.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
                            course.instructor.name.toLowerCase().includes(activeSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Clear Previous Cards
    coursesGrid.innerHTML = '';

    if (filtered.length === 0) {
      coursesGrid.innerHTML = `
        <div class="form-group-full text-center" style="grid-column: 1 / -1; padding: 60px 20px;">
          <div class="badge-icon orange" style="margin: 0 auto 24px auto; width: 64px; height: 64px; font-size: 24px;">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <h3 style="font-size: 22px; margin-bottom: 8px;">No Courses Found</h3>
          <p style="color: var(--text-muted);">We couldn't find any courses matching your selection. Try adjusting your keyword search or category filter.</p>
        </div>
      `;
      return;
    }

    // Render Cards with entrance animations
    filtered.forEach((course, index) => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.4s ease ${index * 0.05}s`;

      // Level badge color styling
      let levelColor = 'rgba(16, 185, 129, 0.1)';
      let levelText = 'rgb(16, 185, 129)';
      if (course.level === 'Intermediate') {
        levelColor = 'rgba(245, 158, 11, 0.1)';
        levelText = 'rgb(245, 158, 11)';
      } else if (course.level === 'Advanced') {
        levelColor = 'rgba(239, 68, 68, 0.1)';
        levelText = 'rgb(239, 68, 68)';
      }

      card.innerHTML = `
        <div class="course-img-wrap">
          <img src="${course.image}" alt="${course.title}" loading="lazy">
          <span class="course-badge">${course.badge}</span>
          <div class="course-save" onclick="this.classList.toggle('saved');" title="Bookmark Course">
            <i class="fa-regular fa-bookmark"></i>
          </div>
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span class="course-category" style="color: var(--primary); font-weight:600; font-size:12px;">${course.category}</span>
            <div class="course-rating">
              <i class="fa-solid fa-star"></i>
              <span>${course.rating} (${course.reviews})</span>
            </div>
          </div>
          <h3 class="course-title">
            <a href="#">${course.title}</a>
          </h3>
          
          <!-- Skill Level Roster -->
          <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0 16px 0;">
            <span style="padding: 3px 10px; font-size: 11px; font-weight: 700; border-radius: var(--radius-full); text-transform: uppercase; background: ${levelColor}; color: ${levelText}; border: 1px solid ${levelText}30;">
              ${course.level}
            </span>
            <span style="font-size: 12px; color: var(--text-muted);"><i class="fa-solid fa-clock"></i> ${course.duration}</span>
          </div>

          <div class="course-instructor">
            <div class="course-inst-avatar">
              <img src="${course.instructor.avatar}" alt="${course.instructor.name}" loading="lazy">
            </div>
            <div class="course-inst-info">
              <h4>${course.instructor.name}</h4>
              <p>${course.instructor.role}</p>
            </div>
          </div>
          <div class="course-footer">
            <div class="course-price-wrap">
              <span class="course-price-orig">${course.originalPrice}</span>
              <span class="course-price-actual">${course.currentPrice}</span>
            </div>
            <a href="#" class="course-enroll">Enroll Now</a>
          </div>
        </div>
      `;

      coursesGrid.appendChild(card);

      // Trigger slide-up animation
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    });
  };

  // --- FILTER CLICKS ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      renderCourses();
    });
  });

  // --- SEARCH INPUT KEYUPS ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value;
      renderCourses();
    });
  }

  // Initial Run
  renderCourses();
});
