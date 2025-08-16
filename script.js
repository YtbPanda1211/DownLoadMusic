async function downloadTrack() {
    const url = document.getElementById('urlInput').value.trim();
    const spinner = document.getElementById('spinner');
    const downloadText = document.getElementById('downloadText');
    const errorElement = document.getElementById('error');

    // Validate input
    if (!url) {
        errorElement.textContent = "Vui lòng nhập URL bài nhạc";
        errorElement.classList.remove('hidden');
        return;
    }

    spinner.classList.remove('hidden');
    downloadText.textContent = "Đang xử lý...";
    errorElement.classList.add('hidden');

    try {
        // Gọi API backend (bạn cần tự triển khai)
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Tạo link tải về
        const a = document.createElement('a');
        a.href = data.downloadUrl;
        a.download = data.filename || 'track.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
    } catch (error) {
        errorElement.textContent = "Lỗi: " + error.message;
        errorElement.classList.remove('hidden');
    } finally {
        spinner.classList.add('hidden');
        downloadText.textContent = "Tải về";
    }
}
