document.addEventListener('DOMContentLoaded', function() {
	const skillSpans = document.querySelectorAll('.skill-bar span');
	const revealTargets = document.querySelectorAll('.about-panel, .skills-panel, .card');

	skillSpans.forEach(span => {
		const width = span.style.width || span.getAttribute('data-width') || '0%';
		span.dataset.targetWidth = width;
		span.style.width = '0%';
	});

	const observerOpts = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 };

	const revealObserver = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal');
				obs.unobserve(entry.target);
			}
		});
	}, observerOpts);

	revealTargets.forEach(t => revealObserver.observe(t));

	const skillsObserver = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				skillSpans.forEach(span => {
					span.style.width = span.dataset.targetWidth;
				});
				obs.disconnect(); 
			}
		});
	}, observerOpts);

	const aboutSection = document.querySelector('.about');
	if (aboutSection) skillsObserver.observe(aboutSection);
});
	(function(){
		const rotator = document.getElementById('role-rotator');
		if (!rotator) return;

		let roles = [];
		try { roles = JSON.parse(rotator.getAttribute('data-roles')); } catch(e){ roles = [rotator.textContent.trim()]; }
		let idx = 0;
		let charIdx = 0;
		let deleting = false;
		const typeSpeed = 70;
		const deleteSpeed = 40;
		const pauseAfter = 900; // ms

		function tick(){
			const current = roles[idx % roles.length];
			if (!deleting) {
				charIdx++;
				rotator.textContent = current.slice(0, charIdx);
				if (charIdx === current.length) {
					deleting = true;
					setTimeout(tick, pauseAfter);
					return;
				}
				setTimeout(tick, typeSpeed);
			} else {
				charIdx--;
				rotator.textContent = current.slice(0, charIdx);
				if (charIdx === 0) {
					deleting = false;
					idx++;
					setTimeout(tick, 200);
					return;
				}
				setTimeout(tick, deleteSpeed);
			}
		}
		// start after a short delay so page load feels stable
		setTimeout(tick, 600);
	})();

