
const today = new Date().toISOString().split('T')[0];
const dateInput = document.getElementById('date');
dateInput.value = today;
dateInput.max = today;

document.getElementById('apod-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedDate = document.getElementById('date').value;
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');
    const placeholderDiv = document.getElementById('placeholder');

    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    placeholderDiv.style.display = 'none';

    // Replace 'DEMO_KEY' with your actual NASA API key from https://api.nasa.gov/
    const apiKey = 'DEMO_KEY';

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch APOD data');
            return response.json();
        })
        .then(data => {
            loadingDiv.style.display = 'none';
            resultDiv.style.display = 'block';

            document.getElementById('apod-title').textContent = data.title;
            document.getElementById('apod-date').textContent = data.date;

            const copyrightEl = document.getElementById('apod-copyright');
            if (data.copyright) {
                copyrightEl.textContent = `© ${data.copyright}`;
                copyrightEl.style.display = 'block';
            } else {
                copyrightEl.style.display = 'none';
            }

            const mediaContainer = document.getElementById('media-container');
            if (data.media_type === 'image') {
                mediaContainer.innerHTML = `<img src="${data.url}" alt="${data.title}">`;
            } else {
                mediaContainer.innerHTML = `<iframe src="${data.url}" title="${data.title}" allowfullscreen></iframe>`;
            }

            document.getElementById('apod-description').textContent = data.explanation;

            const hdLinkContainer = document.getElementById('hd-link-container');
            if (data.hdurl) {
                hdLinkContainer.innerHTML = `<a href="${data.hdurl}" target="_blank" rel="noopener noreferrer" class="hd-link">View HD Image</a>`;
            } else {
                hdLinkContainer.innerHTML = '';
            }
        })
        .catch(err => {
            loadingDiv.style.display = 'none';
            errorDiv.textContent = err.message;
            errorDiv.style.display = 'block';
        });
});