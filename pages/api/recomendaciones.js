import { OpenAI} from 'openai';

export default async function handler(req, res) {
   console.log('API /api/recomendaciones llamada');
   console.log(require('openai').version)
   if (req.method === 'POST') {
    const { preferencias } = req.body;
     const configuration = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
     });
     

     try {
      const completion = await configuration.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'assistant',
            content:`Recomienda productos basados en estas preferencias: ${preferencias}.`,
          },
          {
            role: 'user',
            content: preferencias,
          },
        ],
      });
    
      console.log(completion);
      const recomendaciones = completion.choices[0].message.content.trim().split('\n').filter((linea) => linea.trim() !== '');

      res.status(200).json({ recomendaciones });
     } catch (error) {
       console.error('Error al generar recomendaciones:', error);
       res.status(500).json({ error: 'Error al generar recomendaciones.' });
     }
   } else {
     res.status(405).end();
   }
}