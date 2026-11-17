(function () {
    var root = document.documentElement;

    /* ---------- Intro loader: "Hi" -> name types out -> fade ---------- */
    var loader = document.querySelector('.loader');
    if (loader && root.classList.contains('show-loader')) {
        var typed = loader.querySelector('.loader-typed');
        var name = 'Sarah';
        var i = 0;

        var finish = function () {
            loader.classList.add('is-done');
            root.classList.remove('show-loader');
            try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
            setTimeout(function () { loader.remove(); }, 700);
        };

        setTimeout(function type() {
            typed.textContent = name.slice(0, ++i);
            if (i < name.length) setTimeout(type, 140);
        }, 1400);

        setTimeout(finish, 3400);
        loader.addEventListener('click', finish);
    } else if (loader) {
        loader.remove();
    }

    /* ---------- Full-screen menu ---------- */
    var menuBtn = document.querySelector('.menu-btn');
    var overlay = document.getElementById('menu-overlay');
    if (menuBtn && overlay) {
        var closeBtn = overlay.querySelector('.menu-close');

        var openMenu = function () {
            overlay.hidden = false;
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };
        var closeMenu = function () {
            overlay.hidden = true;
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            menuBtn.focus();
        };

        menuBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
        overlay.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !overlay.hidden) closeMenu();
        });
    }

    /* ---------- Project tabs ---------- */
    var tabs = document.querySelectorAll('.tabs [role="tab"]');
    var cards = document.querySelectorAll('.project-card');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var filter = tab.dataset.filter;
            tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
            cards.forEach(function (card) {
                var types = (card.dataset.type || '').split(' ');
                card.hidden = filter !== 'all' && types.indexOf(filter) === -1;
            });
        });
    });
})();
