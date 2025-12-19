// Vercel Serverless Function
// This securely handles Groq API calls without exposing the API key

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { patientName, age, gender, symptoms } = req.body;

        // Validate input
        if (!patientName || !age || !gender || !symptoms) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['patientName', 'age', 'gender', 'symptoms']
            });
        }

        // Get API key from environment variable
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            console.error('GROQ_API_KEY not set in environment variables');
            return res.status(500).json({ 
                error: 'Server configuration error',
                message: 'API key not configured on server'
            });
        }

        // Prepare AI prompt
        const prompt = `You are an expert medical AI assistant. Generate a detailed prescription based on the following patient information:

Patient Name: ${patientName}
Age: ${age} years
Gender: ${gender}
Symptoms: ${symptoms}

Please provide:
1. A clear diagnosis
2. Detailed prescription with medicine names, dosages, and duration
3. Medical advice and precautions
4. Follow-up recommendations

Format the response as JSON with this structure:
{
  "diagnosis": "diagnosis here",
  "medicines": [
    {
      "name": "medicine name",
      "dosage": "dosage and frequency",
      "duration": "duration",
      "notes": "special instructions if any"
    }
  ],
  "advice": ["advice 1", "advice 2", "advice 3"]
}`;

        // Call Groq API
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert medical AI assistant. Always respond with valid JSON only, no additional text.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json().catch(() => ({}));
            console.error('Groq API Error:', errorData);
            
            return res.status(groqResponse.status).json({
                error: 'AI service error',
                message: errorData.error?.message || 'Failed to generate prescription',
                status: groqResponse.status
            });
        }

        const data = await groqResponse.json();
        const aiResponse = data.choices[0].message.content;

        // Parse AI response
        let prescriptionData;
        try {
            prescriptionData = JSON.parse(aiResponse);
        } catch (e) {
            // Try to extract JSON from markdown code blocks
            const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || 
                            aiResponse.match(/```\n([\s\S]*?)\n```/);
            if (jsonMatch) {
                prescriptionData = JSON.parse(jsonMatch[1]);
            } else {
                throw new Error('Could not parse AI response');
            }
        }

        // Return successful response
        return res.status(200).json({
            success: true,
            data: prescriptionData
        });

    } catch (error) {
        console.error('Error in generate-prescription:', error);
        
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
