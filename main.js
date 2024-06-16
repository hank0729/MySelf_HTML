const sections = document.querySelectorAll('.section');
let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1  // 增加靈敏度
};

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.profile, .portfolio, .contact').classList.add('active');
        } else {
            entry.target.querySelector('.profile, .portfolio, .contact').classList.remove('active');
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

// Fetch GitHub Projects
const githubUsername = 'HankLin0729'; // 替换为你的 GitHub 用户名
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
