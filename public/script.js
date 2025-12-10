document.addEventListener('DOMContentLoaded', () => {
    const topicInput = document.getElementById('topicInput');
    const generateBtn = document.getElementById('generateBtn');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const articleContent = document.getElementById('articleContent');
    const copyBtn = document.getElementById('copyBtn');

    generateBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();
        if (!topic) {
            alert('Please enter a topic');
            return;
        }

        // UI Updates
        generateBtn.disabled = true;
        resultDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic })
            });

            const data = await response.json();

            if (response.ok) {
                articleContent.innerHTML = data.article;
                resultDiv.classList.remove('hidden');
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        } finally {
            loadingDiv.classList.add('hidden');
            generateBtn.disabled = false;
        }
    });

    copyBtn.addEventListener('click', () => {
        const content = articleContent.innerHTML;
        navigator.clipboard.writeText(content).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });
});
