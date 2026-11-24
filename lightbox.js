/* Click-to-expand for project pages.
   Any <img> inside a ".gallery figure" opens in the .lightbox overlay;
   the arrows move between images in the same gallery. */
(function () {
    var box = document.querySelector('.lightbox');
    if (!box) return;

    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    var figures = [];
    var current = 0;
    var lastFocus = null;

    var show = function (i) {
        current = (i + figures.length) % figures.length;
        var src = figures[current].querySelector('img');
        img.src = src.src;
        img.alt = src.alt;
        var caption = figures[current].querySelector('figcaption');
        cap.textContent = caption ? caption.textContent : '';
    };

    var open = function (fig) {
        lastFocus = document.activeElement;
        figures = Array.prototype.slice.call(fig.closest('.gallery').querySelectorAll('figure'));
        box.classList.toggle('is-single', figures.length < 2);
        show(figures.indexOf(fig));
        box.hidden = false;
        document.body.style.overflow = 'hidden';
        box.querySelector('.lightbox-close').focus();
    };

    var close = function () {
        box.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll('.gallery figure').forEach(function (fig) {
        var thumb = fig.querySelector('img');
        thumb.tabIndex = 0;
        thumb.setAttribute('role', 'button');
        thumb.addEventListener('click', function () { open(fig); });
        thumb.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(fig); }
        });
    });

    box.addEventListener('click', function (e) {
        if (e.target === box || e.target.closest('.lightbox-close')) close();
    });
    box.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
    document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
})();
