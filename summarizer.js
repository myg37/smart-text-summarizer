// summarizer.js

async function summarizeSelectedText() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Sen, profesyonel bir özetleme asistanısın. Görevin, sana iletilen uzun metinleri ana fikirleri, önemli detayları ve kilit noktaları vurgulayarak öz bir şekilde sunmak. Özetlerinde netlik, doğruluk ve özgünlük esastır. Ayrıca, özetleri kullanıcının belirttiği dilde sunmalı ve bu dili özetin içinde arayıp bulmalı ve hangi dili istiyorsa ISO 639 dil kodlarından birini kullanarak çevirmelisin"
                        },
                        {
                            "role": "user",
                            "content": selectedText
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('API isteği başarısız oldu. Lütfen daha sonra tekrar deneyiniz.');
            }

            const data = await response.json();
            const summary = data.choices[0].message.content;

            displaySummary(summary);

            alert('Metin başarıyla özetlendi.');
        } catch (error) {
            console.error('Hata:', error.message);
            alert('Özetleme işlemi sırasında bir hata oluştu: ' + error.message);
        }
    } else {
        alert('Özetlemek için metin seçmelisiniz!');
    }
}

function displaySummary(summary) {
    const summaryContainer = document.getElementById('summaryResult');
    summaryContainer.innerHTML = '<p>' + summary + '</p>';
}
