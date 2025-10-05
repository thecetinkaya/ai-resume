// ai-processor.ts
import prisma from '../config/prismaClient';
import * as fs from 'fs/promises';
const pdf = require('pdf-parse');

async function analyzeCvInBackground(analysisId: string, filePath: string) {
    // AI çağrısı genellikle uzun sürer, bu yüzden try/catch ile sarmak şarttır.
    try {
        // 1. Durumu 'PROCESSING' olarak güncelle
        await prisma.cvAnalysis.update({
            where: { id: analysisId },
            data: { analysisStatus: 'PROCESSING' },
        });

        // --- BURADA GERÇEK AI ANALİZ İŞLEMİ YAPILIR ---

        // PDF'i oku
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer);
        const cvText = data.text;

        console.log('PDF text extracted:', cvText.substring(0, 200) + '...');

        // Gemini API ile detaylı CV analizi (hata tespiti dahil)
        const prompt = `
Aşağıdaki CV metnini detaylıca analiz et ve SADECE JSON formatında çıktı ver. CV'deki hataları, eksiklikleri ve iyileştirme önerilerini de dahil et.

CV Metni: ${cvText}

Sadece bu JSON formatında yanıt ver:
{
  "name": "İsim Soyisim",
  "skills": "JavaScript, React, Node.js",
  "score": 85,
  "summary": "Kısa özet",
  "errors": [
    "İletişim bilgileri eksik",
    "Yazım hatası: 'experiance' -> 'experience'",
    "Tarih formatı tutarsız"
  ],
  "suggestions": [
    "Profesyonel bir email adresi kullanın",
    "Başarıları sayısal verilerle destekleyin",
    "CV'yi 2 sayfa ile sınırlandırın"
  ],
  "strengths": [
    "Güçlü teknik beceriler",
    "Çeşitli proje deneyimi"
  ],
  "missing_sections": [
    "Referanslar",
    "Sertifikalar"
  ]
}
`;

        console.log('Making Gemini API call...');

        // Önce mevcut modelleri listeleyelim
        try {
            console.log('Fetching available models...');
            const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);

            if (modelsResponse.ok) {
                const modelsData = await modelsResponse.json();
                console.log('Available models:', JSON.stringify(modelsData, null, 2));
            }
        } catch (error) {
            console.log('Model listing failed:', error);
        }

        // Basit model adlarını dene (API dokümanlarından)
        const simpleModelNames = [
            'gemini-flash-latest',
            'gemini-2.0-flash-001',
            'gemini-2.5-flash-lite',
            'gemini-pro-latest',
            'gemini-2.0-flash-lite'
        ]; let apiResult;
        let successfulModel = '';

        for (const modelName of simpleModelNames) {
            try {
                console.log(`Trying simple model: ${modelName}`);

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt
                                    }
                                ]
                            }
                        ]
                    })
                });

                if (response.ok) {
                    apiResult = await response.json();
                    successfulModel = modelName;
                    console.log(`Success with model: ${modelName}`);
                    break;
                } else {
                    const errorText = await response.text();
                    console.log(`Failed with model ${modelName}: ${response.status} - ${errorText}`);
                }
            } catch (error: any) {
                console.log(`Error with model ${modelName}:`, error.message);
            }
        }

        if (!apiResult) {
            throw new Error('All Gemini models failed. Please check your API key and quota.');
        }
        console.log('Gemini API response:', JSON.stringify(apiResult, null, 2));

        if (!apiResult.candidates || !apiResult.candidates[0] || !apiResult.candidates[0].content) {
            throw new Error('Invalid Gemini API response structure');
        }

        let responseText = apiResult.candidates[0].content.parts[0].text;

        // Markdown code block'larını temizle
        responseText = responseText.replace(/```json\n?/g, '');
        responseText = responseText.replace(/```\n?/g, '');
        responseText = responseText.trim();

        console.log('Cleaned response text:', responseText);

        const analysisResult = JSON.parse(responseText);

        // 2. Analiz Sonuçlarını Kaydetme ve Durumu 'COMPLETED' yapma
        await prisma.cvAnalysis.update({
            where: { id: analysisId },
            data: {
                analysisStatus: 'COMPLETED',
                applicantName: analysisResult.name,
                extractedSkills: analysisResult.skills,
                matchScore: analysisResult.score,
                summary: analysisResult.summary,
                // Yeni hata analizi alanları
                errors: analysisResult.errors ? JSON.stringify(analysisResult.errors) : null,
                suggestions: analysisResult.suggestions ? JSON.stringify(analysisResult.suggestions) : null,
                strengths: analysisResult.strengths ? JSON.stringify(analysisResult.strengths) : null,
                missingSections: analysisResult.missing_sections ? JSON.stringify(analysisResult.missing_sections) : null,
            },
        });

        // 3. Geçici dosyayı sil
        fs.unlink(filePath);

    } catch (error) {
        console.error(`AI Analiz Hatası (ID: ${analysisId}):`, error);

        // Hata durumunda durumu 'FAILED' olarak güncelle
        await prisma.cvAnalysis.update({
            where: { id: analysisId },
            data: { analysisStatus: 'FAILED' },
        });
    }
}

export { analyzeCvInBackground };