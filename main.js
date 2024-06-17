const sections = document.querySelectorAll('.section');
let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.profile, .portfolio, .contact, .awards').classList.add('active');
            if (entry.target.id === 'profile-section') {
                startSnowflakes();
                stopFireflakes();
            } else if (entry.target.id === 'portfolio-section') {
                startFireflakes();
                stopSnowflakes();
            }
        } else {
            entry.target.querySelector('.profile, .portfolio, .contact, .awards').classList.remove('active');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('mousemove', function(e) {
    const circle = document.getElementById('circle');
    const dot = document.getElementById('dot');
    circle.style.left = e.pageX + 'px';
    circle.style.top = e.pageY + 'px';
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
});

const githubUsername = 'HankLin0729'; 
const githubProjectsContainer = document.getElementById('github-projects');

fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
        repos.forEach(repo => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description provided'}</p>
            `;
            githubProjectsContainer.appendChild(projectElement);
        });
    })
    .catch(error => {
        console.error('Error fetching GitHub projects:', error);
        githubProjectsContainer.innerHTML = '<p>Unable to load projects at this time.</p>';
    });

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.backgroundColor = getRandomColor(); // 设置随机颜色
    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

function createFireflake() {
    const fireflake = document.createElement('div');
    fireflake.classList.add('fireflake');
    fireflake.style.left = Math.random() * document.getElementById('fire-container').offsetWidth + 'px';
    fireflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    fireflake.style.opacity = Math.random();
    fireflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    document.getElementById('fire-container').appendChild(fireflake);

    setTimeout(() => {
        fireflake.remove();
    }, 5000);
}

let snowflakeInterval;
let fireflakeInterval;

function startSnowflakes() {
    if (!snowflakeInterval) {
        snowflakeInterval = setInterval(createSnowflake, getRandomInt(100, 180));
    }
}

function stopSnowflakes() {
    clearInterval(snowflakeInterval);
    snowflakeInterval = null;
}

function startFireflakes() {
    if (!fireflakeInterval) {
        fireflakeInterval = setInterval(createFireflake, getRandomInt(150, 200));
    }
}

function stopFireflakes() {
    clearInterval(fireflakeInterval);
    fireflakeInterval = null;
}
