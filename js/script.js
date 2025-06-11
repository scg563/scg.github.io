$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

    });
});

//Initialize Isotope
  var iso = new Isotope('.grid', {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
  });

//Filter Button Events
  var buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filterValue = this.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });

        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
  });

//Initialize Lightbox
  const lightbox = GLightbox({
      selector: '.glightbox'
});

 const skills = document.querySelectorAll('.skill');

    const animateSkill = (skill) => {
      const circle = skill.querySelector('.progress-circle');
      const tooltip = skill.querySelector('.tooltip');
      const percent = parseInt(skill.dataset.percent);
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;

      let count = 0;
      const updateTooltip = () => {
        tooltip.textContent = count + "%";
        if (count < percent) {
          count++;
          requestAnimationFrame(updateTooltip);
        }
      };

      setTimeout(() => {
        circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
        updateTooltip();
      }, 200);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          animateSkill(entry.target);
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.5
    });

    skills.forEach(skill => {
      observer.observe(skill);
    });