async function summarizeSelectedText() {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // API anahtarınızı buraya ekleyin
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
                            "content": "Google, internet araması, çevrimiçi bilgi dağıtımı, reklam teknolojileri ve arama motorları için yatırımlar yapan çok uluslu Amerikan şirketidir. Şirket İnternet tabanlı hizmet ve ürünler geliştirmektedir.[9] Kârının büyük bir kısmını Google Ads (eski adı ile AdWords) hizmeti üzerinden elde etmektedir. Şirket, Larry Page ve Sergey Brin tarafından, Stanford Üniversitesi'nde doktora öğrencisi oldukları dönemde kurulmuştur. İkili, 'Google Guys' olarak anılmaktadır.[12][13][14] Google, ilk olarak, 4 Eylül 1998 tarihinde özel bir şirket olarak kuruldu ve 19 Ağustos 2004 tarihinde halka arz edildi. Halka arzın gerçekleştiği dönemde, Larry Page, Sergey Brin ve Eric Schmidt, takip eden yirmi yıl boyunca, yani 2024 yılına kadar Google'da birlikte çalışmak üzere anlaştılar.[15] Kuruluşundan bu yana misyonu 'dünyadaki bilgiyi organize etmek ve bunu evrensel olarak erişilebilir ve kullanılabilir hale getirmektir.[16] Gayri resmî sloganı ise, Google mühendisi Amit Patel tarafından bulunan ve Paul Buchheit tarafından desteklenen[17] 'Don't be evil' (Kötü olma) dır. Şirket merkezi 2006 yılında, hâlâ aktif olan Mountain View, Kaliforniya'ya taşınmıştır. Şirketin merkezine, Googleplex adı verilmektedir.[18][19]"
                        },
                        {
                            "role": "assistant",
                            "content": "Google, çok uluslu bir Amerikan şirketidir ve internet araması, çevrimiçi bilgi dağıtımı, reklam teknolojileri ve arama motorlarına yatırım yapmaktadır. Kuruluşundan beri misyonu, dünya genelinde bilgiyi organize etmek ve evrensel erişilebilirliğini sağlamaktır."

                        },
                        {
                            "role": "user",
                            "content": selectedText
                        }
                    ]
                })
                /*
                    body: JSON.stringify({
                     prompt: selectedText,
                         max_tokens: 200, // Daha düşük bir max_tokens değeri kullanın
                     temperature: 0.5,
                     model: "gpt-3.5-turbo-1106",
                         top_p: 1,
                         n: 1,
                         stop: ['\n']
                     })
                     */
            });


            console.log('Response: ', response.statusText)

            if (!response.ok) {
                throw new Error('API isteği başarısız oldu. Lütfen daha sonra tekrar deneyiniz.');
            }

            const data = await response.json();
            const summary = data.choices[0].message.content;

            displaySummary(summary); // Özeti daha uygun bir şekilde göstermek için bir fonksiyon kullanın

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
    // Özetin daha uygun bir şekilde gösterilmesi için uygun bir HTML elementi kullanın
    const summaryContainer = document.getElementById('summaryResult');
    summaryContainer.innerHTML = '<p>' + summary + '</p>';
}
